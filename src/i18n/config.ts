import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import commonTa from './locales/ta/common.json';
import headerEn from './locales/en/header.json';
import headerTa from './locales/ta/header.json';
import campaignsEn from './locales/en/campaigns.json';
import campaignsTa from './locales/ta/campaigns.json';
import constitutionalValuesEn from './locales/en/constitutionalValues.json';
import constitutionalValuesTa from './locales/ta/constitutionalValues.json';
import timelineEn from './locales/en/timeline.json';
import timelineTa from './locales/ta/timeline.json';
import threatsAndResearchEn from './locales/en/threatsAndResearch.json';
import threatsAndResearchTa from './locales/ta/threatsAndResearch.json';
import nationalChaptersEn from './locales/en/nationalChapters.json';
import nationalChaptersTa from './locales/ta/nationalChapters.json';
import pledgeWallEn from './locales/en/pledgeWall.json';
import pledgeWallTa from './locales/ta/pledgeWall.json';
import knowledgeCentreEn from './locales/en/knowledgeCentre.json';
import knowledgeCentreTa from './locales/ta/knowledgeCentre.json';
import membershipJourneyEn from './locales/en/membershipJourney.json';
import membershipJourneyTa from './locales/ta/membershipJourney.json';
import whoConductsEn from './locales/en/whoConducts.json';
import whoConductsTa from './locales/ta/whoConducts.json';
import footerEn from './locales/en/footer.json';
import footerTa from './locales/ta/footer.json';
import heroEn from './locales/en/hero.json';
import heroTa from './locales/ta/hero.json';
import whyItMattersEn from './locales/en/whyItMatters.json';
import whyItMattersTa from './locales/ta/whyItMatters.json';
import fourPillarsEn from './locales/en/fourPillars.json';
import fourPillarsTa from './locales/ta/fourPillars.json';
import constitutionalPrinciplesEn from './locales/en/constitutionalPrinciples.json';
import constitutionalPrinciplesTa from './locales/ta/constitutionalPrinciples.json';
import objectivesEn from './locales/en/objectives.json';
import objectivesTa from './locales/ta/objectives.json';
import citizenResponsibilitiesEn from './locales/en/citizenResponsibilities.json';
import citizenResponsibilitiesTa from './locales/ta/citizenResponsibilities.json';
import conferenceDemandsEn from './locales/en/conferenceDemands.json';
import conferenceDemandsTa from './locales/ta/conferenceDemands.json';
import genZYouthHubEn from './locales/en/genZYouthHub.json';
import genZYouthHubTa from './locales/ta/genZYouthHub.json';
import joinMovementEn from './locales/en/joinMovement.json';
import joinMovementTa from './locales/ta/joinMovement.json';
import conferencePamphletEn from './locales/en/conferencePamphlet.json';
import conferencePamphletTa from './locales/ta/conferencePamphlet.json';
import welcomeVideoEn from './locales/en/welcomeVideo.json';
import welcomeVideoTa from './locales/ta/welcomeVideo.json';
import eventsSectionEn from './locales/en/eventsSection.json';
import eventsSectionTa from './locales/ta/eventsSection.json';

export const LANGUAGE_STORAGE_KEY = 'cpm-language';
// Tamil temporarily disabled — English is the primary site language for now.
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['ta', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const storedLanguage = typeof window !== 'undefined'
  ? window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  : null;

const initialLanguage: SupportedLanguage =
  storedLanguage === 'en' || storedLanguage === 'ta' ? storedLanguage : DEFAULT_LANGUAGE;

i18next.use(initReactI18next).init({
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
  defaultNS: 'common',
  ns: [
    'common',
    'header',
    'campaigns',
    'constitutionalValues',
    'timeline',
    'threatsAndResearch',
    'nationalChapters',
    'pledgeWall',
    'knowledgeCentre',
    'membershipJourney',
    'whoConducts',
    'footer',
    'hero',
    'whyItMatters',
    'fourPillars',
    'constitutionalPrinciples',
    'objectives',
    'citizenResponsibilities',
    'conferenceDemands',
    'genZYouthHub',
    'joinMovement',
    'conferencePamphlet',
    'welcomeVideo',
    'eventsSection',
  ],
  resources: {
    en: {
      common: commonEn,
      header: headerEn,
      campaigns: campaignsEn,
      constitutionalValues: constitutionalValuesEn,
      timeline: timelineEn,
      threatsAndResearch: threatsAndResearchEn,
      nationalChapters: nationalChaptersEn,
      pledgeWall: pledgeWallEn,
      knowledgeCentre: knowledgeCentreEn,
      membershipJourney: membershipJourneyEn,
      whoConducts: whoConductsEn,
      footer: footerEn,
      hero: heroEn,
      whyItMatters: whyItMattersEn,
      fourPillars: fourPillarsEn,
      constitutionalPrinciples: constitutionalPrinciplesEn,
      objectives: objectivesEn,
      citizenResponsibilities: citizenResponsibilitiesEn,
      conferenceDemands: conferenceDemandsEn,
      genZYouthHub: genZYouthHubEn,
      joinMovement: joinMovementEn,
      conferencePamphlet: conferencePamphletEn,
      welcomeVideo: welcomeVideoEn,
      eventsSection: eventsSectionEn,
    },
    ta: {
      common: commonTa,
      header: headerTa,
      campaigns: campaignsTa,
      constitutionalValues: constitutionalValuesTa,
      timeline: timelineTa,
      threatsAndResearch: threatsAndResearchTa,
      nationalChapters: nationalChaptersTa,
      pledgeWall: pledgeWallTa,
      knowledgeCentre: knowledgeCentreTa,
      membershipJourney: membershipJourneyTa,
      whoConducts: whoConductsTa,
      footer: footerTa,
      hero: heroTa,
      whyItMatters: whyItMattersTa,
      fourPillars: fourPillarsTa,
      constitutionalPrinciples: constitutionalPrinciplesTa,
      objectives: objectivesTa,
      citizenResponsibilities: citizenResponsibilitiesTa,
      conferenceDemands: conferenceDemandsTa,
      genZYouthHub: genZYouthHubTa,
      joinMovement: joinMovementTa,
      conferencePamphlet: conferencePamphletTa,
      welcomeVideo: welcomeVideoTa,
      eventsSection: eventsSectionTa,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage;
}

export default i18next;
