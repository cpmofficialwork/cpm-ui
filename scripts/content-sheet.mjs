#!/usr/bin/env node
/**
 * Two-way sync between the website's English/Tamil text and one spreadsheet.
 *
 *   npm run content:export                    code -> spreadsheet
 *   npm run content:import -- <file.xlsx>     spreadsheet -> code, then refreshes the spreadsheet
 *   npm run content:import -- <file.xlsx> --dry-run     show the changes, write nothing
 *
 * Google Sheets loop (the document URL never changes):
 *   1. Download: File > Download > Microsoft Excel (.xlsx), then run content:import.
 *   2. Upload the refreshed content-sheet/*.xlsx: File > Import > Upload > "Replace spreadsheet".
 *      Do this after every import and after every content:export.
 *
 * A hidden "_sync" tab remembers the text at export time. Import uses it to apply only
 * what the reviewer changed, so an old sheet can't silently undo a newer edit made in code.
 * Text is replaced in place, so comments and formatting in the source files are untouched.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import ExcelJS from 'exceljs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = path.join(ROOT, 'content-sheet', 'Website-Content-English-Tamil.xlsx');
const DATA = 'data'; // ID prefix for src/data/<lang>/constitutionalData.ts
const LANGS = ['en', 'ta'];
const SYNC_TAB = '_sync';
const AUTO_NOTE = '⚠ ';

// Tabs in the order a visitor meets them. To add a section, add a line here.
const SECTIONS = [
  { tab: 'Vision Popup', where: 'Popup shown first when someone opens the website (once per visit).', sources: ['visionIndia'] },
  { tab: 'Menu & Common', where: 'Top menu on every page, plus shared buttons and the "page not found" page.', sources: ['header', 'common'] },
  { tab: 'Events', where: 'Home page, first section: event details and the gallery and videos popup.', sources: ['eventsSection'] },
  { tab: 'Conference Pamphlet', where: 'Pamphlet reader, opened from the Events section.', sources: ['conferencePamphlet'] },
  { tab: 'Hero', where: 'Home page: main banner, below Events.', sources: ['hero'] },
  { tab: 'Why It Matters', where: 'Home page: section after the main banner.', sources: ['whyItMatters'] },
  { tab: 'Conference Demands', where: 'Home page: demands section.', sources: ['conferenceDemands'] },
  { tab: 'Four Pillars', where: 'Home page: 4 Pillars section.', sources: ['fourPillars'] },
  { tab: 'Constitutional Principles', where: 'Home page: 5 Principles section.', sources: ['constitutionalPrinciples'] },
  { tab: 'Constitutional Values', where: 'Home page: 12 Safeguards section and its detail popups.', sources: ['constitutionalValues', { data: 'CONSTITUTIONAL_VALUES' }] },
  { tab: 'Citizen Responsibilities', where: 'Home page: 6 Essentials section.', sources: ['citizenResponsibilities'] },
  { tab: 'Gen-Z Youth Hub', where: 'Home page: Gen-Z Hub section.', sources: ['genZYouthHub'] },
  { tab: 'Who Conducts', where: 'Home page: Who Conducts section and organizer profiles.', sources: ['whoConducts', { data: 'ORGANIZERS' }] },
  { tab: 'Footer', where: 'Bottom of every page.', sources: ['footer'] },
  { tab: 'Join Movement', where: 'Registration popup, opened from any "Join the Movement" button.', sources: ['joinMovement'] },
  // These components exist in the code, but no page shows them at the moment.
  { tab: 'Not live - Campaigns', live: false, sources: ['campaigns', { data: 'CAMPAIGNS' }] },
  { tab: 'Not live - Timeline', live: false, sources: ['timeline', { data: 'TIMELINE_MILESTONES' }] },
  { tab: 'Not live - Threats & Research', live: false, sources: ['threatsAndResearch', { data: 'THREATS_RESEARCH' }] },
  { tab: 'Not live - National Chapters', live: false, sources: ['nationalChapters', { data: 'STATE_CHAPTERS' }] },
  { tab: 'Not live - Pledge Wall', live: false, sources: ['pledgeWall', { data: 'INITIAL_PLEDGES' }] },
  { tab: 'Not live - Knowledge Centre', live: false, sources: ['knowledgeCentre', { data: 'CONSTITUTION_ARTICLES' }, { data: 'LANDMARK_CASES' }, { data: 'CONSTITUTIONAL_QUIZ' }] },
  { tab: 'Not live - Membership Journey', live: false, sources: ['membershipJourney'] },
  { tab: 'Not live - Objectives', live: false, sources: ['objectives'] },
];

// Technical values that are not reader-facing text.
const SKIP_FIELDS = new Set([
  'id', 'iconName', 'category', 'status', 'code', 'badgeColor', 'color', 'url',
  'contactEmail', 'handle', 'platform', 'pledgeDate', 'memberId', 'nationalGuardianId',
]);

const NOT_LIVE_BANNER = 'NOT ON THE WEBSITE right now: no page shows this section. Translate it only if you are asked to.';
const HAS_TAMIL = /[஀-௿]/;
const HAS_LETTERS = /[A-Za-z஀-௿]/;
const placeholders = (text) => text.match(/\{\{.*?\}\}/g) ?? [];
const htmlTags = (text) => text.match(/<[^>]+>/g) ?? [];
const same = (a, b) => (a ?? '').trim() === (b ?? '').trim();
const preview = (text) => { const t = (text ?? '').replace(/\s+/g, ' '); return t.length > 70 ? `${t.slice(0, 70)}…` : t; };

// ---------------------------------------------------------------- source files

const relPath = (lang, source) => source === DATA
  ? `src/data/${lang}/constitutionalData.ts`
  : `src/i18n/locales/${lang}/${source}.json`;

function collectStrings(node, at, out) {
  if (ts.isStringLiteralLike(node)) {
    out.set(at, { value: node.text, start: node.getStart(), end: node.getEnd() });
  } else if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((el, i) => collectStrings(el, `${at}[${i}]`, out));
  } else if (ts.isObjectLiteralExpression(node)) {
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        collectStrings(prop.initializer, at ? `${at}.${prop.name.text}` : prop.name.text, out);
      }
    }
  }
}

function parseStrings(file, text) {
  const isJson = file.endsWith('.json');
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, isJson ? ts.ScriptKind.JSON : ts.ScriptKind.TS);
  const strings = new Map();
  if (isJson) {
    collectStrings(sf.statements[0].expression, '', strings);
  } else {
    for (const statement of sf.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const decl of statement.declarationList.declarations) {
        if (decl.initializer) collectStrings(decl.initializer, decl.name.getText(), strings);
      }
    }
  }
  return strings;
}

const cache = new Map();
function loadFile(lang, source) {
  const file = relPath(lang, source);
  if (!cache.has(file)) {
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    cache.set(file, { file, text, strings: parseStrings(file, text) });
  }
  return cache.get(file);
}

// --------------------------------------------------------------- rows

function humanize(at) {
  const words = (s) => s
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return at.split('.').map((segment) => {
    const [, name, index] = segment.match(/^([^[]*)((?:\[\d+\])*)$/);
    const readable = name === name.toUpperCase()
      ? words(name)
      : name.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase());
    const numbers = [...index.matchAll(/\d+/g)].map((m) => Number(m[0]) + 1).join('.');
    return numbers ? `${readable} ${numbers}` : readable;
  }).join(' › ');
}

function autoNotes(field, en, ta) {
  const notes = [];
  if (!en) notes.push('English text missing');
  if (!ta) notes.push('Tamil text missing');
  if (en && HAS_TAMIL.test(en) && !/tamil/i.test(field)) notes.push('English column has Tamil text');
  if (ta && !HAS_TAMIL.test(ta) && !/english/i.test(field)) {
    notes.push(ta === en ? 'Tamil is the same as English: translate if needed' : 'Tamil column has no Tamil text');
  }
  const codes = [...new Set([...placeholders(en ?? ta ?? ''), ...htmlTags(en ?? ta ?? '')])];
  if (codes.length) notes.push(`Keep ${codes.join(' ')} exactly as written`);
  return notes.map((note) => AUTO_NOTE + note);
}

function rowsFor(section) {
  const rows = [];
  for (const src of section.sources) {
    const source = typeof src === 'string' ? src : DATA;
    const en = loadFile('en', source).strings;
    const ta = loadFile('ta', source).strings;
    const inSource = (key) => typeof src === 'string' || key === src.data || key.startsWith(`${src.data}[`) || key.startsWith(`${src.data}.`);
    const keys = [...new Set([...en.keys(), ...ta.keys()])].filter(inSource);
    for (const key of keys) {
      const field = key.split('.').pop().replace(/\[\d+\]/g, '');
      const enText = en.get(key)?.value;
      const taText = ta.get(key)?.value;
      if (SKIP_FIELDS.has(field)) continue;
      // Numbers and phone numbers that are identical in both languages.
      if (enText === taText && !HAS_LETTERS.test(enText)) continue;
      rows.push({
        id: `${source}:${key}`,
        group: key.split('.')[0],
        where: humanize(key),
        en: enText ?? '',
        ta: taText ?? '',
        notes: autoNotes(field, enText, taText),
      });
    }
  }
  return rows;
}

// --------------------------------------------------------------- write workbook

const FONT = 'Arial';
const NAVY = 'FF0A1F44';
const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });
const thin = { style: 'thin', color: { argb: 'FFD9D9D9' } };

function writeSectionTab(workbook, section, rows, keptNotes) {
  const live = section.live !== false;
  const ws = workbook.addWorksheet(section.tab, {
    properties: { tabColor: { argb: live ? 'FF2E7D32' : 'FF9E9E9E' } },
    views: [{ state: 'frozen', ySplit: 2 }],
  });
  ws.columns = [{ width: 34 }, { width: 62 }, { width: 62 }, { width: 34 }, { width: 30 }];

  ws.mergeCells('A1:E1');
  const banner = ws.getCell('A1');
  banner.value = live ? `Where on the website: ${section.where}` : NOT_LIVE_BANNER;
  banner.font = { name: FONT, size: 11, bold: true, color: { argb: live ? 'FF1B5E20' : 'FF5F5F5F' } };
  banner.fill = fill(live ? 'FFE8F5E9' : 'FFEEEEEE');
  banner.alignment = { vertical: 'middle', wrapText: true };
  ws.getRow(1).height = 30;

  const header = ws.getRow(2);
  header.values = ['Where on the page', 'English', 'Tamil', 'Notes', 'ID'];
  header.eachCell((cell) => {
    cell.font = { name: FONT, size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = fill(NAVY);
    cell.alignment = { vertical: 'middle' };
  });
  ws.autoFilter = 'A2:E2';

  let previousGroup = null;
  for (const row of rows) {
    const notes = [...(keptNotes.get(row.id) ?? []), ...row.notes].join('\n');
    const r = ws.addRow([row.where, row.en, row.ta, notes, row.id]);
    const top = row.group !== previousGroup && previousGroup !== null ? { style: 'thin', color: { argb: 'FF7F7F7F' } } : thin;
    previousGroup = row.group;
    r.eachCell({ includeEmpty: true }, (cell, col) => {
      cell.alignment = { vertical: 'top', wrapText: true };
      cell.border = { top, left: thin, right: thin, bottom: thin };
      cell.font = { name: FONT, size: 11 };
      if (col === 1) cell.font = { name: FONT, size: 10, color: { argb: 'FF555555' } };
      if (col === 3) cell.fill = fill('FFFFF9E5');
      if (col === 4) cell.font = { name: FONT, size: 10, color: { argb: 'FFB45309' } };
      if (col === 5) {
        cell.font = { name: FONT, size: 8, color: { argb: 'FF9E9E9E' } };
        cell.fill = fill('FFF5F5F5');
      }
    });
  }
}

function writeGuideTab(workbook, summary, example) {
  const ws = workbook.addWorksheet('Start here', {
    properties: { tabColor: { argb: NAVY } },
    views: [{ showGridLines: false }],
  });
  ws.columns = [{ width: 34 }, { width: 62 }, { width: 62 }, { width: 12 }, { width: 14 }];
  const line = (text, font = {}) => {
    const r = ws.addRow([text]);
    ws.mergeCells(r.number, 1, r.number, 5);
    r.getCell(1).font = { name: FONT, size: 11, ...font };
    r.getCell(1).alignment = { wrapText: true, vertical: 'top' };
    return r;
  };

  line('Website content: English and Tamil', { size: 16, bold: true, color: { argb: NAVY } });
  line('Each tab is one section of the website. Each row is one piece of text on that section.');
  ws.addRow([]);
  line('How to edit', { bold: true, size: 12 });
  line('1. Type your text in the Tamil column (yellow). You can also correct the English column.');
  line('2. Check the Notes column: ⚠ marks rows that need attention, such as missing Tamil. You can filter on it, and you can add your own comments there.');
  line('3. Do not change the "Where on the page" or ID columns, and do not delete or sort rows by hand. Use the filter buttons to find rows.');
  line('4. Keep codes such as {{num}} and <strong> exactly as written. The website fills in or uses them automatically.');
  line('5. Press Alt+Enter (or Ctrl+Enter in Google Sheets) for a new line inside a cell.');
  ws.addRow([]);

  line('Example row', { bold: true, size: 12 });
  const head = ws.addRow(['Where on the page', 'English', 'Tamil']);
  head.eachCell((cell) => {
    cell.font = { name: FONT, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = fill(NAVY);
  });
  const ex = ws.addRow([example.where, example.en, example.ta]);
  ex.eachCell((cell) => {
    cell.font = { name: FONT, size: 11 };
    cell.alignment = { wrapText: true, vertical: 'top' };
    cell.border = { top: thin, left: thin, right: thin, bottom: thin };
  });
  ex.getCell(3).fill = fill('FFFFF9E5');
  ws.addRow([]);

  line('Tabs', { bold: true, size: 12 });
  line('Green tabs are on the website now, so please do these first. Grey tabs are not shown on any page at the moment.');
  const tableHead = ws.addRow(['Tab', 'Where on the website', '', 'Rows', 'To check']);
  tableHead.eachCell({ includeEmpty: true }, (cell) => {
    cell.font = { name: FONT, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = fill(NAVY);
  });
  for (const { section, rows, flagged } of summary) {
    const r = ws.addRow([section.tab, section.where ?? 'Not on the website right now', '', rows, flagged]);
    ws.mergeCells(r.number, 2, r.number, 3);
    r.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: FONT, size: 11, color: { argb: section.live === false ? 'FF757575' : 'FF000000' } };
      cell.border = { top: thin, left: thin, right: thin, bottom: thin };
      cell.alignment = { wrapText: true, vertical: 'top' };
    });
  }
}

async function writeWorkbook(keptNotes = new Map()) {
  const workbook = new ExcelJS.Workbook();
  const built = SECTIONS.map((section) => ({ section, rows: rowsFor(section) }));
  const summary = built.map(({ section, rows }) => ({
    section,
    rows: rows.length,
    flagged: rows.filter((r) => r.notes.some((n) => !n.includes('exactly as written'))).length,
  }));
  const example = built.flatMap((b) => b.rows).find((r) => r.id === 'hero:headlineEmphasis');
  writeGuideTab(workbook, summary, example);

  for (const { section, rows } of built) writeSectionTab(workbook, section, rows, keptNotes);

  const sync = workbook.addWorksheet(SYNC_TAB, { state: 'hidden' });
  sync.addRow(['ID', 'English', 'Tamil']);
  for (const { rows } of built) for (const row of rows) sync.addRow([row.id, row.en, row.ta]);

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  await workbook.xlsx.writeFile(OUTPUT);
  const total = built.reduce((n, b) => n + b.rows.length, 0);
  const liveRows = built.filter((b) => b.section.live !== false).reduce((n, b) => n + b.rows.length, 0);
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT)}: ${total} rows in ${built.length} tabs (${liveRows} rows on live tabs).`);
}

// --------------------------------------------------------------- read workbook

function readCell(cell) {
  if (cell.value instanceof Date) return { text: '', isDate: true };
  return { text: String(cell.text ?? '').replace(/\r\n?/g, '\n'), isDate: false };
}

async function readWorkbook(file) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(file);
  const rows = new Map();
  const duplicates = new Set();
  let base = null;

  workbook.eachSheet((ws) => {
    const headerRow = [1, 2, 3].map((n) => ws.getRow(n)).find((r) => {
      const names = [];
      r.eachCell((c) => names.push(String(c.text).trim()));
      return names.includes('ID') && names.includes('English') && names.includes('Tamil');
    });
    if (!headerRow) return;
    const col = {};
    headerRow.eachCell((c, n) => { col[String(c.text).trim()] = n; });

    const isSync = ws.name === SYNC_TAB;
    if (isSync) base = new Map();
    ws.eachRow((row, n) => {
      if (n <= headerRow.number) return;
      const id = String(row.getCell(col.ID).text ?? '').trim();
      if (!id) return;
      const en = readCell(row.getCell(col.English));
      const ta = readCell(row.getCell(col.Tamil));
      if (isSync) {
        base.set(id, { en: en.text, ta: ta.text });
      } else {
        if (rows.has(id)) duplicates.add(id);
        const notes = col.Notes ? readCell(row.getCell(col.Notes)).text : '';
        rows.set(id, { en, ta, notes, tab: ws.name });
      }
    });
  });
  return { rows, base, duplicates };
}

// --------------------------------------------------------------- apply to code

function encodeLiteral(value, original) {
  const doubleQuoted = JSON.stringify(value);
  if (original[0] !== "'") return doubleQuoted;
  const inner = doubleQuoted.slice(1, -1).replace(/\\(.)/g, (m, c) => (c === '"' ? '"' : m)).replace(/'/g, "\\'");
  return `'${inner}'`;
}

function setJsonPath(target, other, at, value) {
  const segments = at.match(/[^.[\]]+/g).map((s) => (/^\d+$/.test(s) ? Number(s) : s));
  let cur = target;
  let ref = other;
  segments.slice(0, -1).forEach((segment, i) => {
    // A missing array item is cloned from the other language so it keeps its id and icon.
    if (cur[segment] === undefined) {
      cur[segment] = ref?.[segment] !== undefined
        ? structuredClone(ref[segment])
        : (typeof segments[i + 1] === 'number' ? [] : {});
    }
    cur = cur[segment];
    ref = ref?.[segment];
  });
  cur[segments.at(-1)] = value;
}

function applyChanges(changes) {
  const byFile = new Map();
  for (const change of changes) {
    const file = relPath(change.lang, change.source);
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push(change);
  }

  for (const [file, fileChanges] of byFile) {
    const loaded = cache.get(file);
    let text = loaded.text;
    const replacements = fileChanges.filter((c) => loaded.strings.has(c.key));
    const additions = fileChanges.filter((c) => !loaded.strings.has(c.key));

    replacements
      .map((c) => ({ c, literal: loaded.strings.get(c.key) }))
      .sort((a, b) => b.literal.start - a.literal.start)
      .forEach(({ c, literal }) => {
        const original = text.slice(literal.start, literal.end);
        text = text.slice(0, literal.start) + encodeLiteral(c.value, original) + text.slice(literal.end);
      });

    if (additions.length) {
      const json = JSON.parse(text);
      const otherLang = fileChanges[0].lang === 'en' ? 'ta' : 'en';
      const other = JSON.parse(loadFile(otherLang, fileChanges[0].source).text);
      additions.forEach((c) => setJsonPath(json, other, c.key, c.value));
      text = `${JSON.stringify(json, null, 2)}${loaded.text.endsWith('\n') ? '\n' : ''}`;
    }

    // Never write a file unless it reads back with exactly the new values.
    const check = parseStrings(file, text);
    for (const c of fileChanges) {
      if (check.get(c.key)?.value !== c.value) throw new Error(`Verification failed for ${c.id} (${c.lang}). Nothing was written for ${file}.`);
    }
    fs.writeFileSync(path.join(ROOT, file), text);
    cache.delete(file);
  }
}

async function runImport(file, dryRun) {
  const { rows, base, duplicates } = await readWorkbook(file);
  if (!rows.size) throw new Error(`No content rows found in ${file}. Is this the right spreadsheet?`);
  if (!base) console.warn('The hidden _sync tab is missing, so every difference from the code will be treated as an edit.\n');

  const changes = [];
  const warnings = [];
  const kept = new Map(); // id -> reviewer notes to carry into the refreshed sheet
  const keepNote = (id, note) => kept.set(id, [...(kept.get(id) ?? []), note]);

  for (const [id, row] of rows) {
    row.notes.split('\n').map((n) => n.trim()).filter((n) => n && !n.startsWith(AUTO_NOTE.trim())).forEach((n) => keepNote(id, n));
    if (duplicates.has(id)) {
      warnings.push(`Skipped ${id}: this ID appears on more than one row.`);
      continue;
    }
    const split = id.indexOf(':');
    const source = id.slice(0, split);
    const key = id.slice(split + 1);
    const fileExists = split > 0 && fs.existsSync(path.join(ROOT, relPath('en', source)));
    const current = fileExists ? { en: loadFile('en', source).strings.get(key)?.value, ta: loadFile('ta', source).strings.get(key)?.value } : {};
    if (current.en === undefined && current.ta === undefined) {
      warnings.push(`Skipped ${id} (tab "${row.tab}"): this text no longer exists in the code.`);
      continue;
    }

    for (const lang of LANGS) {
      const label = lang === 'en' ? 'English' : 'Tamil';
      const { text: sheet, isDate } = row[lang];
      const code = current[lang];
      const baseline = base ? base.get(id)?.[lang] : code;
      if (isDate) {
        warnings.push(`Skipped ${id} ${label}: Google Sheets turned this cell into a date. Retype it as plain text.`);
        continue;
      }
      if (same(sheet, baseline) || same(sheet, code)) continue;
      if (!sheet.trim()) {
        warnings.push(`Skipped ${id} ${label}: the cell was cleared. Import never deletes text, so remove it in the code if that was intended.`);
        continue;
      }
      const notApplied = (reason) => {
        warnings.push(`NOT APPLIED ${id} ${label}: ${reason}\n    sheet: ${preview(sheet)}\n    code:  ${preview(code)}`);
        keepNote(id, `${label} not applied (${reason}): ${sheet}`);
      };
      if (base && !same(code, baseline)) {
        notApplied('the website text also changed since this sheet was made');
        continue;
      }
      const reference = code ?? current[lang === 'en' ? 'ta' : 'en'] ?? '';
      const lostCodes = placeholders(reference).filter((p) => !sheet.includes(p));
      if (lostCodes.length) {
        notApplied(`it is missing ${lostCodes.join(' ')}`);
        continue;
      }
      if (code === undefined && source === DATA) {
        warnings.push(`Add by hand: ${id} ${label} is new text for src/data/${lang}/constitutionalData.ts: ${preview(sheet)}`);
        keepNote(id, `${label} not applied (add by hand in the code): ${sheet}`);
        continue;
      }
      const missingTags = htmlTags(reference).filter((tag) => !sheet.includes(tag));
      if (missingTags.length) warnings.push(`Check ${id} ${label}: formatting tag(s) removed: ${missingTags.join(' ')}`);
      changes.push({ id, source, key, lang, label, before: code, value: sheet, tab: row.tab });
    }
  }

  for (const c of changes) console.log(`[${c.tab}] ${c.label}  ${c.id}\n    was: ${preview(c.before)}\n    now: ${preview(c.value)}`);
  if (warnings.length) console.log(`\n${warnings.length} item(s) to look at:\n- ${warnings.join('\n- ')}`);
  const count = (lang) => changes.filter((c) => c.lang === lang).length;
  console.log(`\n${changes.length} change(s): ${count('en')} English, ${count('ta')} Tamil.`);

  if (dryRun) {
    console.log('Dry run: nothing was written.');
    return;
  }
  applyChanges(changes);
  await writeWorkbook(kept);
  console.log('Next: upload that file to Google Sheets with File > Import > Upload > "Replace spreadsheet".');
}

// --------------------------------------------------------------- cli

const [command, ...args] = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const file = args.find((a) => !a.startsWith('--'));

if (command === 'export') {
  await writeWorkbook();
} else if (command === 'import' && file) {
  await runImport(path.resolve(file), dryRun);
} else {
  console.error('Usage:\n  npm run content:export\n  npm run content:import -- <file.xlsx> [--dry-run]');
  process.exit(1);
}
