import {
  ConstitutionalValue,
  TimelineMilestone,
  ThreatCategory,
  StateChapter,
  Campaign,
  PledgeSignature,
  ConstitutionArticle,
  LandmarkCase,
  Organizer
} from '../../types';
import judgeImg from '../../assets/images/hari_parandhaman.jpeg';
import ministerImg from '../../assets/images/mano_thangaraj.jpeg';
import advocateImg from '../../assets/images/vanchinadhan.jpeg';

export const CONSTITUTIONAL_VALUES: ConstitutionalValue[] = [
  {
    id: 'fundamental-rights',
    number: 1,
    articleRef: 'Part III (Articles 12-35)',
    name: 'Fundamental Rights',
    tamilName: 'அடிப்படை உரிமைகள்',
    englishTitle: 'Guaranteed Freedoms Against Arbitrary State Power',
    shortDescription: 'Fundamental Rights protect citizens against arbitrary or excessive State power and guarantee essential freedoms and equality. They include equality before the law, freedom of speech and expression, freedom of religion, protection of life and personal liberty, and the right to approach the courts when these rights are violated.',
    detailedRelevance: 'They ensure that the rights of individuals cannot simply be overridden by the will of the majority or the government of the day.',
    historicalContext: 'Rooted in the 1928 Nehru Report and the 1931 Karachi Resolution, Fundamental Rights were incorporated as Part III of the Constitution by the Constituent Assembly and came into force on 26 January 1950.',
    landmarkJudgment: 'Maneka Gandhi v. Union of India (1978)',
    iconName: 'BookOpenCheck',
    category: 'rights'
  },
  {
    id: 'independent-institutions',
    number: 2,
    articleRef: 'Articles 148, 315 & 324',
    name: 'Independent Institutions',
    tamilName: 'சுதந்திரமான நிறுவனங்கள்',
    englishTitle: 'Election Commission, CAG, UPSC, CBI, ED, RAW & More',
    shortDescription: 'Constitutional institutions such as the Election Commission, Comptroller and Auditor General, Union Public Service Commission, CBI, ED, RAW and other independent bodies are designed to perform important public functions without political interference. Their independence and integrity help ensure that public power is exercised fairly, transparently and only in the public interest.',
    detailedRelevance: 'Strong institutions are essential because democracy cannot depend only on the good intentions of those who hold political power but also on the free and fair functioning of the independent institutions.',
    historicalContext: 'The Constituent Assembly wrote fixed tenures and service conditions for bodies such as the CAG, UPSC and Election Commission directly into the Constitution to shield them from executive pressure.',
    landmarkJudgment: 'Vineet Narain v. Union of India (1997)',
    iconName: 'Landmark',
    category: 'governance'
  },
  {
    id: 'independent-judiciary',
    number: 3,
    articleRef: 'Articles 50, 124 & 226',
    name: 'Independent Judiciary',
    tamilName: 'சுதந்திரமான நீதித்துறை',
    englishTitle: 'Courts Free From Fear, Favour or Political Pressure',
    shortDescription: 'An independent judiciary ensures that courts can decide cases according to the Constitution and law, without fear, favour or political pressure. The Supreme Court and High Courts have the power to examine government action and legislation and to provide remedies when constitutional rights are violated.',
    detailedRelevance: 'Judicial independence ensures that even the government and the majority remain subject to the Constitution.',
    historicalContext: 'Article 50 directs the State to separate the judiciary from the executive, a demand that traces back to the Indian National Movement and was later reinforced by the Second Judges Case (1993), which created the collegium system.',
    landmarkJudgment: 'Supreme Court Advocates-on-Record Association v. Union of India (2015)',
    iconName: 'Gavel',
    category: 'governance'
  },
  {
    id: 'free-fair-elections',
    number: 4,
    articleRef: 'Articles 324 & 326',
    name: 'Free and Fair Elections',
    tamilName: 'சுதந்திரமான, நியாயமான தேர்தல்கள்',
    englishTitle: "The People's Choice, Free From Intimidation or Influence",
    shortDescription: 'Elections are the means through which citizens choose their representatives and hold governments accountable. For democracy to be meaningful, elections must be free, fair, transparent and conducted on an equal basis, with citizens able to make their choices without intimidation, discrimination or improper influence.',
    detailedRelevance: 'Elections are not merely a mechanism for changing governments; they are an expression of the constitutional principle that political power ultimately belongs to the people.',
    historicalContext: 'Universal adult suffrage under Article 326 was a radical democratic leap in 1950, while Article 324 vests the superintendence, direction and control of elections in an independent Election Commission.',
    landmarkJudgment: 'Union of India v. Association for Democratic Reforms (2002)',
    iconName: 'Vote',
    category: 'core'
  },
  {
    id: 'institutional-checks-balances',
    number: 5,
    articleRef: 'Articles 32, 226 & 368',
    name: 'Institutional Checks and Balances',
    tamilName: 'நிறுவன கட்டுப்பாடுகளும் சமநிலைகளும்',
    englishTitle: 'Distributed Power Under Legal & Constitutional Limits',
    shortDescription: 'The Constitution distributes public power among the legislature, executive and judiciary and places legal and constitutional limits on each. Parliamentary scrutiny, judicial review, independent institutions, federal arrangements and constitutional remedies provide checks against the misuse or concentration of power.',
    detailedRelevance: 'The purpose is not to prevent government from functioning, but to ensure that no person, government or institution becomes so powerful that it can act above the Constitution.',
    historicalContext: 'The Basic Structure Doctrine, laid down in Kesavananda Bharati (1973), stands as the ultimate judicial check ensuring that no organ of the State, including Parliament, can act beyond the Constitution’s limits.',
    landmarkJudgment: 'Kesavananda Bharati v. State of Kerala (1973)',
    iconName: 'Scale',
    category: 'governance'
  },
  {
    id: 'independent-constitutional-institutions',
    number: 6,
    articleRef: 'Articles 148, 315 & 324',
    name: 'Independent Constitutional Institutions',
    tamilName: 'சுதந்திரமான அரசியலமைப்பு நிறுவனங்கள்',
    englishTitle: 'Impartial Bodies Safeguarding Public Confidence',
    shortDescription: 'Institutions such as the Election Commission, Comptroller and Auditor General, Union Public Service Commission and other constitutional bodies perform important functions that must be carried out with independence, impartiality and integrity. They provide institutional safeguards against the misuse of public power and help maintain public confidence in governance.',
    detailedRelevance: 'Strong and independent institutions are essential to ensure that constitutional democracy does not depend solely on the goodwill of those in power.',
    historicalContext: 'Security of tenure and protected service conditions for the CAG, UPSC members and Election Commissioners were deliberately written into the Constitution so their independence would not depend on the government of the day.',
    landmarkJudgment: 'T.N. Seshan v. Union of India (1995)',
    iconName: 'ShieldCheck',
    category: 'governance'
  },
  {
    id: 'separation-of-powers',
    number: 7,
    articleRef: 'Articles 53, 122 & 245',
    name: 'Separation of Powers, Checks and Balances',
    tamilName: 'அதிகாரப் பிரிவினையும் கட்டுப்பாடுகளும்',
    englishTitle: 'Legislature, Executive & Judiciary Kept Accountable',
    shortDescription: 'The Constitution distributes public authority among the legislature, executive and judiciary, with each having its own constitutional responsibilities. Checks and balances ensure that no branch of government becomes so powerful that it can act without accountability.',
    detailedRelevance: 'Parliamentary scrutiny, judicial review and other constitutional safeguards help prevent the concentration and misuse of power. The purpose is not to obstruct governance, but to ensure that power is exercised responsibly and within constitutional limits.',
    historicalContext: 'In Ram Jawaya Kapur v. State of Punjab (1955), the Supreme Court held that India does not follow a rigid separation of powers, but that the Constitution still demarcates functions so that no organ assumes the core role of another.',
    landmarkJudgment: 'Ram Jawaya Kapur v. State of Punjab (1955)',
    iconName: 'Shield',
    category: 'governance'
  },
  {
    id: 'press-civil-society',
    number: 8,
    articleRef: 'Article 19(1)(a)',
    name: 'Freedom of the Press and Civil Society',
    tamilName: 'ஊடக சுதந்திரமும் சிவில் சமூகமும்',
    englishTitle: 'Space for Public Debate, Dissent & Scrutiny',
    shortDescription: 'A healthy democracy requires citizens to be able to question, criticise and scrutinise those who exercise public power. An independent and responsible press, together with civil society organisations, academics, professional groups and citizens, provides an important space for public debate and accountability.',
    detailedRelevance: 'Peaceful dissent and criticism are not threats to democracy; they are essential to keeping democracy alive and responsive.',
    historicalContext: 'Though the word "press" appears nowhere in the Constitution, the Supreme Court has read freedom of the press into Article 19(1)(a)’s guarantee of speech and expression since the earliest years of the Republic.',
    landmarkJudgment: 'Bennett Coleman & Co. v. Union of India (1972)',
    iconName: 'Newspaper',
    category: 'pluralism'
  },
  {
    id: 'local-self-government',
    number: 9,
    articleRef: 'Parts IX & IX-A (73rd & 74th Amendments)',
    name: 'Local Self-Government',
    tamilName: 'உள்ளாட்சி',
    englishTitle: "Panchayats & Municipalities Bringing Power to the People",
    shortDescription: 'Democracy becomes meaningful when people have a voice not only in national and State affairs but also in decisions affecting their own communities and everyday lives. Panchayats and Municipalities bring governance closer to the people and enable citizens to participate in local decision-making.',
    detailedRelevance: 'Constitutional recognition of local self-government through the 73rd and 74th Amendments strengthened grassroots democracy. Local democracy gives people an opportunity to participate, deliberate and hold those who govern them directly accountable.',
    historicalContext: 'The 73rd and 74th Constitutional Amendments of 1992 inserted Parts IX and IX-A, granting Panchayats and Municipalities constitutional status for the first time.',
    landmarkJudgment: 'Kishansing Tomar v. Municipal Corporation of the City of Ahmedabad (2006)',
    iconName: 'Building2',
    category: 'governance'
  },
  {
    id: 'transparency-accountability',
    number: 10,
    articleRef: 'Article 19(1)(a) & RTI Act, 2005',
    name: 'Transparency and Accountability',
    tamilName: 'வெளிப்படைத்தன்மையும் பொறுப்புக்கூறலும்',
    englishTitle: 'Open Government Answerable to the Citizen',
    shortDescription: 'Public power is held in trust for the people. Governments and public institutions must therefore function openly, provide access to information, explain their decisions and remain answerable for the use of public resources and authority. The Right to Information (RTI) Act, 2005 is an important instrument of this constitutional principle, enabling citizens to seek information and scrutinise decisions and actions of public authorities.',
    detailedRelevance: 'Transparency allows people to know how decisions are made and public resources are used, while accountability ensures that those exercising public power can be questioned and held responsible when they fail in their duties. A constitutional democracy requires not merely the exercise of power, but its responsible, transparent and accountable exercise.',
    historicalContext: 'The RTI Act, 2005 operationalised the right to know as an extension of the freedom of speech and expression under Article 19(1)(a), following decades of grassroots campaigning by movements such as the MKSS in Rajasthan.',
    landmarkJudgment: 'Central Public Information Officer, Supreme Court of India v. Subhash Chandra Agarwal (2019)',
    iconName: 'Eye',
    category: 'governance'
  },
  {
    id: 'participatory-democracy',
    number: 11,
    articleRef: 'Articles 19(1)(a), (b) & (c)',
    name: 'Participatory Democracy',
    tamilName: 'பங்கேற்பு ஜனநாயகம்',
    englishTitle: 'Continuing Citizen Participation Beyond the Ballot',
    shortDescription: 'Democracy is not merely the right to vote; it is the continuing participation of citizens in public life. It includes the freedom to speak, assemble peacefully, organise, question government and express disagreement with public policies and decisions.',
    detailedRelevance: 'Protected by Articles 19(1)(a), 19(1)(b) and 19(1)(c), these freedoms enable citizens to participate meaningfully in governance and hold power accountable. Peaceful dissent and civic participation are not threats to democracy; they are essential to keeping democracy open, responsive and accountable.',
    historicalContext: 'The freedoms to speak, assemble and form associations draw on the public-meeting and civil-disobedience traditions of the freedom movement, and were guaranteed as fundamental rights from the Constitution’s commencement in 1950.',
    landmarkJudgment: 'Himat Lal K. Shah v. Commissioner of Police, Ahmedabad (1973)',
    iconName: 'Megaphone',
    category: 'core'
  },
  {
    id: 'constitutional-morality',
    number: 12,
    articleRef: 'Preamble & Basic Structure Doctrine',
    name: 'Constitutional Morality',
    tamilName: 'அரசியலமைப்பு ஒழுக்கநெறி',
    englishTitle: 'Governance by Constitutional Values, Not Convenience',
    shortDescription: 'Constitutional morality means governance according to the values, principles and limitations of the Constitution, rather than according to political convenience, popular pressure or the preferences of those in power. It requires public authorities to uphold liberty, equality, dignity, justice, fraternity, secularism and the rule of law, even when doing so may be politically difficult.',
    detailedRelevance: 'Constitutional morality also means respecting the rights of individuals and minorities, recognising that constitutional democracy is not simply majority rule. It requires those who exercise public power to respect institutional boundaries, tolerate dissent, follow due process and remain accountable to the Constitution.',
    historicalContext: 'Dr. B.R. Ambedkar invoked George Grote’s idea of constitutional morality before the Constituent Assembly, describing it as a form of behaviour that does not come naturally and must be diffused among the people through education.',
    landmarkJudgment: 'Navtej Singh Johar v. Union of India (2018)',
    iconName: 'GraduationCap',
    category: 'governance'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'm-1895',
    year: '1895',
    dateStr: '1895',
    title: 'The Constitution of India Bill',
    category: 'struggle',
    description: 'The first articulate attempt by Indian freedom fighters to formulate a constitutional framework specifying freedom of expression, right to privacy, and equality before law.',
    quote: 'Every citizen has a right to express his thoughts by words or writings...',
    quoteAuthor: 'Drafted under the guidance of Lokmanya Bal Gangadhar Tilak',
    significance: 'Laid the ideological foundation for Indian constitutionalism 55 years before Republic Day.',
    keyFigures: ['Bal Gangadhar Tilak', 'Early Nationalist Leaders']
  },
  {
    id: 'm-1928',
    year: '1928',
    dateStr: 'August 1928',
    title: 'The Nehru Report',
    category: 'struggle',
    description: 'An all-parties committee drafted a proposed constitution for India featuring universal adult suffrage, fundamental rights, and secular governance.',
    quote: 'There shall be no state religion... all citizens are equal before the law.',
    quoteAuthor: 'Motilal Nehru Committee Report',
    significance: 'Direct precursor to Part III (Fundamental Rights) of the Constitution.',
    keyFigures: ['Motilal Nehru', 'Jawaharlal Nehru', 'Tej Bahadur Sapru']
  },
  {
    id: 'm-1931',
    year: '1931',
    dateStr: 'March 1931',
    title: 'Karachi Resolution on Fundamental Rights',
    category: 'struggle',
    description: 'The Indian National Congress adopted a historic resolution detailing economic rights, labor protection, prohibition of child labor, and state neutrality in religion.',
    quote: 'Swaraj must mean freedom for the starving millions of our people.',
    quoteAuthor: 'Karachi Session Declaration',
    significance: 'Informed the Directive Principles of State Policy (Part IV).',
    keyFigures: ['Sardar Vallabhbhai Patel', 'Mahatma Gandhi', 'Jawaharlal Nehru']
  },
  {
    id: 'm-1946',
    year: '1946',
    dateStr: 'December 9, 1946',
    title: 'Constituent Assembly Convenes',
    category: 'assembly',
    description: '299 men and women from every region, community, and political line met at Constitution Hall in New Delhi to draft the constitution for a free India.',
    quote: 'We are reaching the end of a long journey and looking forward to the inauguration of a sovereign republic.',
    quoteAuthor: 'Dr. Sachchidananda Sinha',
    significance: 'Inaugurated the world’s most ambitious democratic constitution-making process.',
    keyFigures: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'H.C. Mookerjee']
  },
  {
    id: 'm-1947',
    year: '1947',
    dateStr: 'August 29, 1947',
    title: 'Dr. B.R. Ambedkar Appointed Drafting Committee Chairman',
    category: 'assembly',
    description: 'The Constituent Assembly appointed Dr. Bhimrao Ramji Ambedkar to head the Drafting Committee to synthesize reports from various committees into a coherent constitution.',
    quote: 'On 26th January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality.',
    quoteAuthor: 'Dr. B.R. Ambedkar',
    significance: 'Gave leadership to the legal architect of modern India.',
    keyFigures: ['Dr. B.R. Ambedkar', 'Alladi Krishnaswamy Iyer', 'K.M. Munshi', 'N. Gopalaswami Ayyangar']
  },
  {
    id: 'm-1949',
    year: '1949',
    dateStr: 'November 26, 1949',
    title: 'Adoption of the Constitution (Samvidhan Diwas)',
    category: 'enactment',
    description: 'After 2 years, 11 months, and 18 days of rigorous debate, the Constituent Assembly adopted and gave to themselves the Constitution of India.',
    quote: 'WE, THE PEOPLE OF INDIA... do hereby Adopt, Enact and Give to Ourselves This Constitution.',
    quoteAuthor: 'Preamble to the Constitution',
    significance: 'Marked the formal completion of the constitutional text.',
    keyFigures: ['Members of the Constituent Assembly']
  },
  {
    id: 'm-1950',
    year: '1950',
    dateStr: 'January 26, 1950',
    title: 'Enactment & Inauguration of the Republic',
    category: 'enactment',
    description: 'The Constitution came into full effect across India, transforming the nation into a sovereign democratic republic.',
    quote: 'Today India stands transformed from a dominion into a fully independent sovereign republic.',
    quoteAuthor: 'Dr. Rajendra Prasad, First President of India',
    significance: 'Established the Supreme Court of India and universal suffrage elections.',
    keyFigures: ['Dr. Rajendra Prasad', 'Chief Justice H.J. Kania']
  },
  {
    id: 'm-1973',
    year: '1973',
    dateStr: 'April 24, 1973',
    title: 'Kesavananda Bharati Judgment',
    category: 'judgments',
    description: 'A historic 13-judge bench established the Basic Structure Doctrine: Parliament cannot destroy the fundamental framework of the Constitution.',
    quote: 'The power to amend under Article 368 does not include the power to abrogate the basic structure of the Constitution.',
    quoteAuthor: 'Chief Justice S.M. Sikri',
    significance: 'Saved Indian democracy from permanent constitutional distortion.',
    keyFigures: ['Nani Palkhivala', 'Kesavananda Bharati Swamiji', '13 Supreme Court Judges']
  },
  {
    id: 'm-1994',
    year: '1994',
    dateStr: 'March 11, 1994',
    title: 'S.R. Bommai v. Union of India',
    category: 'judgments',
    description: 'Supreme Court ruled that Secularism and Federalism are basic features of the Constitution, restricting arbitrary dismissal of state governments by the central government.',
    quote: 'Secularism is one of the basic features of the Constitution. Religion has no place in state matters.',
    quoteAuthor: 'Supreme Court Bench',
    significance: 'Reinforced state government stability and secular governance.',
    keyFigures: ['S.R. Bommai', '9-Judge Constitutional Bench']
  },
  {
    id: 'm-2017',
    year: '2017',
    dateStr: 'August 24, 2017',
    title: 'Puttaswamy Right to Privacy Judgment',
    category: 'judgments',
    description: 'A unanimous 9-judge bench recognized the Right to Privacy as a fundamental right intrinsically linked to dignity under Article 21.',
    quote: 'Privacy is the ultimate expression of individual dignity and autonomy in a constitutional democracy.',
    quoteAuthor: 'Justice J. Chelameswar & Justice D.Y. Chandrachud',
    significance: 'Expanded digital rights, bodily autonomy, and personal liberty for the 21st century.',
    keyFigures: ['Justice K.S. Puttaswamy', '9 Supreme Court Judges']
  },
  {
    id: 'm-2026',
    year: '2026',
    dateStr: 'Present',
    title: 'The People’s Movement for Samvidhan Raksha',
    category: 'amendments',
    description: 'Citizens across Indian states unite to build grassroots constitutional literacy centers, defend judicial independence, and protect the secular democratic republic.',
    quote: 'The Constitution will survive only as long as citizens are willing to defend it.',
    quoteAuthor: 'Constitution Protection Movement',
    significance: 'Reigniting civic vigilance and constitutional stewardship nationwide.',
    keyFigures: ['Indian Citizens', 'Civil Society', 'Youth Scholars']
  }
];

export const THREATS_RESEARCH: ThreatCategory[] = [
  {
    id: 'literacy-gap',
    title: 'Constitutional Literacy Deficit',
    subtitle: 'Widespread unawareness of fundamental rights and duties among citizens',
    description: 'Surveys reveal over 68% of citizens have never read the Preamble or understand how Article 32 protects their individual liberties from police or municipal abuse.',
    metrics: [
      { label: 'Unaware of Art. 21 Privacy Rights', value: '72%', subtext: 'In surveyed rural & semi-urban districts' },
      { label: 'Schools Without Civics Labs', value: '81%', subtext: 'Lacking practical constitutional education' },
      { label: 'Citizens Reached by Movement', value: '1.2M+', subtext: 'Through Samvidhan Pathshalas' }
    ],
    institutionalImpact: 'When citizens do not know their rights, authorities face zero resistance when violating legal procedure, conducting illegal detentions, or ignoring due process.',
    movementResponse: 'Deploying 10,000 Pocket Constitutions and conducting weekend Constitutional Awareness Clinics in every district.'
  },
  {
    id: 'institutional-check',
    title: 'Erosion of Institutional Autonomy',
    subtitle: 'Challenges facing independent oversight bodies and judicial delays',
    description: 'Weakening of regulatory checks, delayed judicial appointments, and executive dominance over independent institutions undermine the balance of power.',
    metrics: [
      { label: 'Pending Judicial Cases', value: '50M+', subtext: 'Highlighting need for legal reform & staffing' },
      { label: 'RTI Rejections Growth', value: '+34%', subtext: 'In key public interest categories' },
      { label: 'Legal Aid Clinics Needed', value: '5,000+', subtext: 'To ensure equal access to justice' }
    ],
    institutionalImpact: 'Delayed justice amounts to denied justice. Marginalized citizens lose faith in courts when trials take decades.',
    movementResponse: 'Forming a Pro-Bono Constitutional Lawyers Network to file public interest litigations and assist unrepresented citizens.'
  },
  {
    id: 'social-cohesion',
    title: 'Rising Social Polarization & Hate Speech',
    subtitle: 'Threats to Secularism, Fraternity, and Equal Dignity',
    description: 'Targeted polarising narratives degrade the constitutional promise of Fraternity (Article 51A) and threaten equal protection under Article 14.',
    metrics: [
      { label: 'Hate Speech Incidents Reported', value: 'High', subtext: 'Requiring immediate law enforcement action' },
      { label: 'Inter-Community Peace Committees', value: '450+', subtext: 'Organized by local Movement chapters' }
    ],
    institutionalImpact: 'Social harmony is essential for economic stability and national security. Division weakens the country from within.',
    movementResponse: 'Establishing "Fraternity Circles" in mixed neighborhoods to foster dialogue, conflict resolution, and joint civic projects.'
  },
  {
    id: 'federalism-strain',
    title: 'Strains on Federal Architecture',
    subtitle: 'Centralized decision-making vs State & Local Panchayat Autonomy',
    description: 'Fiscal delays in state GST transfers, over-centralization of policy, and interference in state administrative powers challenge cooperative federalism.',
    metrics: [
      { label: 'States Facing Fiscal Delays', value: '14 States', subtext: 'Impacting local development & welfare' },
      { label: 'Panchayat Autonomy Score', value: '3.2/5', subtext: 'Needing stronger financial decentralization' }
    ],
    institutionalImpact: 'India is a Union of States (Article 1). Strong states and empowered Panchayats make a resilient Union.',
    movementResponse: 'Publishing annual State of Federalism reports and holding regional assemblies with elected Panchayat leaders.'
  }
];

export const STATE_CHAPTERS: StateChapter[] = [
  {
    id: 'ch-delhi',
    stateName: 'Delhi NCR (National HQ)',
    code: 'DL',
    districtCount: 11,
    activeVolunteers: 12400,
    coordinatorName: 'Adv. Ananya Sharma',
    contactEmail: 'delhi@constitutionprotection.in',
    headquarters: 'Constitutional Knowledge Hub, Mandi House, New Delhi',
    activeCampaigns: ['Samvidhan Pathshala', 'Supreme Court Watch', 'Youth Fellowship'],
    coordinates: { x: 45, y: 32 }
  },
  {
    id: 'ch-maharashtra',
    stateName: 'Maharashtra',
    code: 'MH',
    districtCount: 36,
    activeVolunteers: 28500,
    coordinatorName: 'Dr. Rahul Kamble',
    contactEmail: 'maharashtra@constitutionprotection.in',
    headquarters: 'Dr. Ambedkar Samvidhan Bhavan, Dadar, Mumbai',
    activeCampaigns: ['Legal Aid Drive', 'Worker Rights Clinic', 'College Youth Clubs'],
    coordinates: { x: 38, y: 58 }
  },
  {
    id: 'ch-tamilnadu',
    stateName: 'Tamil Nadu',
    code: 'TN',
    districtCount: 38,
    activeVolunteers: 22100,
    coordinatorName: 'Prof. K. Sundaram',
    contactEmail: 'tamilnadu@constitutionprotection.in',
    headquarters: 'Justice Party Centenary Hall, Egmore, Chennai',
    activeCampaigns: ['State Autonomy Defense', 'Social Justice Seminars', 'Language Rights'],
    coordinates: { x: 44, y: 82 }
  },
  {
    id: 'ch-westbengal',
    stateName: 'West Bengal',
    code: 'WB',
    districtCount: 23,
    activeVolunteers: 18900,
    coordinatorName: 'Debarati Roy',
    contactEmail: 'westbengal@constitutionprotection.in',
    headquarters: 'College Street Academic Center, Kolkata',
    activeCampaigns: ['Secularism Protection', 'RTI Clinics', 'Cultural Resistance'],
    coordinates: { x: 72, y: 48 }
  },
  {
    id: 'ch-kerala',
    stateName: 'Kerala',
    code: 'KL',
    districtCount: 14,
    activeVolunteers: 19800,
    coordinatorName: 'Adv. Mathew Thomas',
    contactEmail: 'kerala@constitutionprotection.in',
    headquarters: 'Civic Rights Academy, Palayam, Thiruvananthapuram',
    activeCampaigns: ['100% Constitutional Literacy', 'Panchayat Empowerment'],
    coordinates: { x: 39, y: 86 }
  },
  {
    id: 'ch-uttarpradesh',
    stateName: 'Uttar Pradesh',
    code: 'UP',
    districtCount: 75,
    activeVolunteers: 34200,
    coordinatorName: 'Prof. Ramsevak Yadav',
    contactEmail: 'up@constitutionprotection.in',
    headquarters: 'Samvidhan Kendra, Hazratganj, Lucknow',
    activeCampaigns: ['Rural Legal Rights Camps', 'Anti-Bulldozer Due Process Defense'],
    coordinates: { x: 54, y: 38 }
  },
  {
    id: 'ch-karnataka',
    stateName: 'Karnataka',
    code: 'KA',
    districtCount: 31,
    activeVolunteers: 16700,
    coordinatorName: 'Vidya Gowda',
    contactEmail: 'karnataka@constitutionprotection.in',
    headquarters: 'Freedom Park Civic Center, Bengaluru',
    activeCampaigns: ['Tech & Privacy Rights', 'Preamble Reading in Schools'],
    coordinates: { x: 40, y: 72 }
  },
  {
    id: 'ch-punjab',
    stateName: 'Punjab & Haryana',
    code: 'PB',
    districtCount: 23,
    activeVolunteers: 14300,
    coordinatorName: 'Gurpreet Singh Dhillon',
    contactEmail: 'punjab@constitutionprotection.in',
    headquarters: 'Martyrs Memorial Hall, Sector 17, Chandigarh',
    activeCampaigns: ['Farmer Legal Protection', 'Federal Water Rights'],
    coordinates: { x: 38, y: 24 }
  },
  {
    id: 'ch-assam',
    stateName: 'Assam & North East',
    code: 'AS',
    districtCount: 35,
    activeVolunteers: 11200,
    coordinatorName: 'Dr. Biren Gogoi',
    contactEmail: 'northeast@constitutionprotection.in',
    headquarters: 'Guwahati Legal Aid Center, Panbazar, Guwahati',
    activeCampaigns: ['Indigenous Cultural Protection', 'Citizenship Rights Defense'],
    coordinates: { x: 86, y: 40 }
  },
  {
    id: 'ch-rajasthan',
    stateName: 'Rajasthan',
    code: 'RJ',
    districtCount: 50,
    activeVolunteers: 15400,
    coordinatorName: 'Shanti Meena',
    contactEmail: 'rajasthan@constitutionprotection.in',
    headquarters: 'RTI & Civic Rights Bhavan, Jaipur',
    activeCampaigns: ['Accountability & Accountability Act Drive', 'RTI Empowerment'],
    coordinates: { x: 32, y: 38 }
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'c-pathshala',
    title: 'Samvidhan Pathshalas',
    subtitle: '1,000 Constitutional Literacy Centers across rural and semi-urban India',
    objective: 'Establish weekly community learning hubs where citizens, students, and workers learn their fundamental rights, filing RTIs, and legal remedies.',
    targetMetric: '1,000 Pathshalas Opened',
    currentProgress: 68,
    citizenParticipationRole: 'Volunteer as a Teacher, Host a Pathshala in your neighborhood, or Donate Books.',
    impactMetrics: [
      { label: 'Pathshalas Active', value: '680 Centers' },
      { label: 'Students Reached', value: '185,000+' },
      { label: 'RTIs Filed for Public Works', value: '14,200+' }
    ],
    status: 'expanding',
    location: 'Pan-India (22 States)'
  },
  {
    id: 'c-legal-aid',
    title: 'Pro-Bono Legal Defense Network',
    subtitle: 'Emergency constitutional support for victims of illegal detention or rights violation',
    objective: 'Connect volunteer advocate panels with citizens facing arbitrary executive action, unlawful demolitions, or censorship.',
    targetMetric: '5,000 Advocates On-Call',
    currentProgress: 82,
    citizenParticipationRole: 'Lawyers can register for pro-bono duty. Citizens can report emergency violations via our helpline.',
    impactMetrics: [
      { label: 'Advocates Enrolled', value: '4,120 Advocates' },
      { label: 'Bail & Writ Petitions Filed', value: '2,890 Cases' },
      { label: 'Illegal Detentions Reversed', value: '1,140 Citizens' }
    ],
    status: 'active',
    location: 'High Courts & Supreme Court'
  },
  {
    id: 'c-youth-fellowship',
    title: 'Youth Samvidhan Fellowship 2026',
    subtitle: 'Empowering 500 young scholars to lead civic action in university campuses',
    objective: 'Train undergraduate and postgraduate students in constitutional law, investigative research, public speaking, and community organizing.',
    targetMetric: '500 Fellows Selected',
    currentProgress: 90,
    citizenParticipationRole: 'Students aged 18-28 can apply for the 6-month fellowship stipend and mentorship program.',
    impactMetrics: [
      { label: 'Applications Received', value: '12,400 Students' },
      { label: 'Fellows Graduated', value: '450 Fellows' },
      { label: 'Campus Constitutional Clubs', value: '210 Universities' }
    ],
    status: 'active',
    location: 'University Campuses Nationwide'
  },
  {
    id: 'c-federal-forum',
    title: 'Panchayat & Municipal Autonomy Drive',
    subtitle: 'Strengthening the 73rd and 74th Constitutional Amendments',
    objective: 'Ensure local village panchayats and urban municipalities receive their constitutional grants and decision-making powers directly.',
    targetMetric: '10,000 Panchayats Trained',
    currentProgress: 54,
    citizenParticipationRole: 'Participate in local Gram Sabhas, audit ward council funds, and demand transparent local budgets.',
    impactMetrics: [
      { label: 'Gram Sabhas Attended', value: '3,400 Villages' },
      { label: 'Social Audits Conducted', value: '1,250 Audits' }
    ],
    status: 'expanding',
    location: 'Rural Districts'
  }
];

export const INITIAL_PLEDGES: PledgeSignature[] = [
  {
    id: 'p-1',
    name: 'Justice (Retd.) B. N. Srikrishna',
    city: 'Mumbai',
    state: 'Maharashtra',
    occupation: 'Former Supreme Court Judge',
    pledgeDate: '2026-07-28',
    message: 'The Constitution is the bedrock of our democratic republic. Protecting its spirit is our highest patriotic duty.',
    isVerified: true
  },
  {
    id: 'p-2',
    name: 'Arundhati Sen',
    city: 'Kolkata',
    state: 'West Bengal',
    occupation: 'High School Civics Teacher',
    pledgeDate: '2026-07-29',
    message: 'I pledge to teach the Preamble to 500 students every month and inspire them to become vigilant guardians of liberty.',
    isVerified: true
  },
  {
    id: 'p-3',
    name: 'Dr. K. S. Rajasekharan',
    city: 'Kochi',
    state: 'Kerala',
    occupation: 'Constitutional Scholar & Author',
    pledgeDate: '2026-07-30',
    message: 'Secularism and Federalism are non-negotiable pillars of India. We shall never let them be diluted.',
    isVerified: true
  },
  {
    id: 'p-4',
    name: 'Pooja Verma',
    city: 'Jaipur',
    state: 'Rajasthan',
    occupation: 'Law Student & Volunteer',
    pledgeDate: '2026-07-30',
    message: 'Signed the pledge! Operating a legal awareness clinic for women workers in Jaipur.',
    isVerified: true
  },
  {
    id: 'p-5',
    name: 'Mohd. Imran Khan',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    occupation: 'RTI Activist',
    pledgeDate: '2026-07-31',
    message: 'Transparency in governance is guaranteed by Article 19(1)(a). We will continue using RTI to hold power accountable.',
    isVerified: true
  },
  {
    id: 'p-6',
    name: 'Lakshmi Narayanan',
    city: 'Chennai',
    state: 'Tamil Nadu',
    occupation: 'Software Engineer',
    pledgeDate: '2026-07-31',
    message: 'Defending digital privacy under Article 21. Proud to join the Constitution Protection Movement!',
    isVerified: true
  }
];

export const CONSTITUTION_ARTICLES: ConstitutionArticle[] = [
  {
    articleNumber: 'Article 14',
    title: 'Equality before law',
    part: 'Part III - Fundamental Rights',
    summary: 'The State shall not deny to any person equality before the law or the equal protection from the laws within the territory of India.',
    fullText: 'The State shall not deny to any person equality before the law or the equal protection from the laws within the territory of India, prohibiting arbitrary executive classification.',
    keyTakeaway: 'No government law or executive order can discriminate arbitrarily between citizens.'
  },
  {
    articleNumber: 'Article 19',
    title: 'Protection of certain rights regarding freedom of speech, etc.',
    part: 'Part III - Fundamental Rights',
    summary: 'Guarantees freedom of speech and expression, peaceful assembly, association, movement, residence, and trade.',
    fullText: 'All citizens shall have the right to (a) freedom of speech and expression; (b) assemble peaceably without arms; (c) form associations or unions; (d) move freely throughout India; (e) reside and settle in any part of India; (g) practice any profession.',
    keyTakeaway: 'Freedom of expression includes press freedom and peaceful democratic protest.'
  },
  {
    articleNumber: 'Article 21',
    title: 'Protection of life and personal liberty',
    part: 'Part III - Fundamental Rights',
    summary: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    fullText: 'No person shall be deprived of his life or personal liberty except according to fair, just, and reasonable procedure established by law.',
    keyTakeaway: 'The broadest right, encompassing right to privacy, clean environment, health, dignity, and free legal aid.'
  },
  {
    articleNumber: 'Article 25',
    title: 'Freedom of conscience and free profession, practice and propagation of religion',
    part: 'Part III - Fundamental Rights',
    summary: 'Subject to public order, morality and health, all persons are equally entitled to freedom of conscience and the right freely to profess, practice and propagate religion.',
    fullText: 'Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.',
    keyTakeaway: 'Guarantees religious freedom to all individuals while ensuring state neutrality.'
  },
  {
    articleNumber: 'Article 32',
    title: 'Remedies for enforcement of rights conferred by this Part',
    part: 'Part III - Fundamental Rights',
    summary: 'Right to move the Supreme Court directly for enforcement of Fundamental Rights by issuing writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari).',
    fullText: 'The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed.',
    keyTakeaway: 'Dr. B.R. Ambedkar called Article 32 "the heart and soul of the Constitution".'
  },
  {
    articleNumber: 'Article 51A',
    title: 'Fundamental Duties',
    part: 'Part IV-A - Fundamental Duties',
    summary: 'It shall be the duty of every citizen of India to abide by the Constitution, respect its ideals and institutions, the National Flag and National Anthem.',
    fullText: 'It shall be the duty of every citizen of India: (a) to abide by the Constitution; (b) to cherish and follow noble ideals of freedom struggle; (c) to uphold sovereignty and integrity of India; (h) to develop scientific temper, humanism and spirit of inquiry.',
    keyTakeaway: 'Mandates citizens to foster scientific temper, environmental conservation, and social harmony.'
  }
];

export const LANDMARK_CASES: LandmarkCase[] = [
  {
    caseName: 'Kesavananda Bharati v. State of Kerala',
    year: 1973,
    benchSize: '13-Judge Bench (7-6 decision)',
    coreIssue: 'Extent of Parliament’s power to amend the Constitution under Article 368.',
    rulingSummary: 'Parliament has wide powers to amend the Constitution, but CANNOT alter or abrogate its "Basic Structure".',
    constitutionalImpact: 'Created the ultimate judicial safeguard protecting democracy, secularism, federalism, and fundamental rights from parliamentary overreach.'
  },
  {
    caseName: 'Maneka Gandhi v. Union of India',
    year: 1978,
    benchSize: '7-Judge Bench',
    coreIssue: 'Arbitrary impounding of passport under Article 21.',
    rulingSummary: 'Procedure depriving a person of life or liberty must be "just, fair, and reasonable", not arbitrary, fanciful, or oppressive.',
    constitutionalImpact: 'Transformed Article 21 into an expansive umbrella for human dignity, right to livelihood, clean air, and fair trial.'
  },
  {
    caseName: 'S.R. Bommai v. Union of India',
    year: 1994,
    benchSize: '9-Judge Bench',
    coreIssue: 'Arbitrary imposition of President’s Rule in states under Article 356.',
    rulingSummary: 'Secularism and Federalism are basic features of the Constitution. Executive power to dismiss state governments is subject to judicial review.',
    constitutionalImpact: 'Restrained central overreach and protected elected state governments from unfair dissolution.'
  },
  {
    caseName: 'Justice K.S. Puttaswamy v. Union of India',
    year: 2017,
    benchSize: '9-Judge Bench (Unanimous)',
    coreIssue: 'Whether Right to Privacy is a Fundamental Right.',
    rulingSummary: 'Right to Privacy is an integral part of Right to Life and Personal Liberty under Article 21.',
    constitutionalImpact: 'Shielded citizens from state surveillance, protected personal data, bodily autonomy, and informational privacy.'
  }
];

export const CONSTITUTIONAL_QUIZ = [
  {
    id: 1,
    question: 'Which Article was described by Dr. B.R. Ambedkar as the "heart and soul of the Constitution"?',
    options: ['Article 14 (Equality)', 'Article 19 (Free Speech)', 'Article 21 (Right to Life)', 'Article 32 (Constitutional Remedies)'],
    correctAnswer: 3,
    explanation: 'Dr. Ambedkar explicitly stated that Article 32, which empowers citizens to move the Supreme Court directly for fundamental rights enforcement, is the most important article without which the Constitution would be a nullity.'
  },
  {
    id: 2,
    question: 'What is the "Basic Structure Doctrine" established in the Kesavananda Bharati case (1973)?',
    options: [
      'Parliament can change any part of the Constitution without limits.',
      'Parliament cannot amend the core features like democracy, secularism, and judicial review.',
      'The Prime Minister can veto Supreme Court decisions.',
      'The Constitution expires every 50 years and must be re-written.'
    ],
    correctAnswer: 1,
    explanation: 'The Supreme Court ruled that while Parliament can amend provisions, it cannot destroy the fundamental framework or basic structure of the Constitution.'
  },
  {
    id: 3,
    question: 'Which Amendment added the words "Socialist" and "Secular" to the Preamble of India?',
    options: ['1st Amendment (1951)', '42nd Amendment (1976)', '44th Amendment (1978)', '86th Amendment (2002)'],
    correctAnswer: 1,
    explanation: 'The 42nd Constitutional Amendment in 1976 formally added "Socialist" and "Secular" to the Preamble.'
  },
  {
    id: 4,
    question: 'Under which Article is the Fundamental Duty to develop a "scientific temper, humanism and spirit of inquiry" listed?',
    options: ['Article 15', 'Article 21A', 'Article 51A(h)', 'Article 370'],
    correctAnswer: 2,
    explanation: 'Article 51A(h) makes it a duty of every Indian citizen to foster scientific temper, humanism, and the spirit of inquiry and reform.'
  }
];

export const ORGANIZERS: Organizer[] = [
  {
    id: 'hari-parandhaman',
    name: 'Hari Parandhaman',
    designation: 'Ex-Judge (Former High Court Judge)',
    badge: 'CONSTITUTIONAL JURIST',
    badgeColor: 'bg-[#0A1F44] text-[#FFE082]',
    image: judgeImg,
    roleDescription: 'First-generation lawyer turned distinguished former judge, providing supreme judicial oversight, constitutional jurisprudence, and guidance on safeguarding fundamental rights.',
    extendedBio: 'Born on 17 March 1954 in Kondanchery village, Justice D. Hariparanthaman was the first in his family to attend school and the first graduate in his village. Enrolling as an advocate in 1980, he built a four-decade practice across the Madras High Court, Madurai Bench, labour courts, and tribunals, specializing in labour law, service law, human rights, and the rights of persons with disabilities and Scheduled Castes. As a primary convener of the Constitution Protection Movement, he views his judicial role as a continuation of a lifelong commitment to social, economic, and political justice enshrined in the Preamble.',
    keyFocusAreas: ['Judicial Independence', 'Labour & Disability Rights', 'Constitutional Literacy'],
    socials: [
    //   {
    //     platform: 'Twitter (X)',
    //     handle: '@HariParandhaman',
    //     url: 'https://twitter.com/HariParandhaman',
    //     color: 'hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2]'
    //   },
    //   {
    //     platform: 'Facebook',
    //     handle: 'Justice Hari Parandhaman',
    //     url: 'https://facebook.com/JusticeHariParandhaman',
    //     color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]'
    //   },
    //   {
    //     platform: 'Instagram',
    //     handle: '@justice_hariparandhaman',
    //     url: 'https://instagram.com/justice_hariparandhaman',
    //     color: 'hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-600'
    //   }
    ],
    iconName: 'Scale'
  },
  {
    id: 'mano-thangaraj',
    name: 'Mano Thangaraj',
    designation: 'Ex-Minister (Former State Minister)',
    badge: 'COMMUNITY CONVENER',
    badgeColor: 'bg-[#FF9933] text-white',
    image: ministerImg,
    roleDescription: 'From student union leader to two-term MLA and Minister, a lifelong grassroots organizer and environmental campaigner now spearheading statewide citizen mobilization for the Chennai Assembly.',
    extendedBio: "Thiru Mano Thangaraj began his journey in public life as a student leader, serving during 1986-87 as Chairman of the Students' Union at NMCC, Marthandam, and Chairman of the Inter-Collegiate Students' Association. A founding member of the Pechiparai Dam Water Conservation Movement and the Koodankulam Anuvulai Ethirppu Iyakkam, he has been associated with people's movements and environmental struggles since 1989, later becoming part of the People's Movement Against Nuclear Energy (PMANE). He served as Chairman of Kanyakumari District Panchayat for two terms (1996-2006) and was twice elected MLA from Padmanabhapuram (2016-2026), going on to serve as Minister for Information Technology and Milk & Dairy Development in the Tamil Nadu government led by Chief Minister M.K. Stalin. Through the Good Vision Charitable Trust, he has worked extensively in disaster relief, women and child development, livelihoods, healthcare, environment, and sanitation, including during the Tsunami, Cyclone Ockhi, and the Chennai floods. Beyond elected office, he continues to engage with people's movements and civil society initiatives at the state and national levels, a journey from student leadership to public service rooted in standing with people, protecting their rights, and strengthening democratic values.",
    keyFocusAreas: ['Grassroots Mobilization', 'Institutional Reforms', 'Volunteer Coalitions', 'Disaster Relief & Environmental Advocacy'],
    socials: [
      {
        platform: 'X',
        handle: '@ManoThangaraj',
        url: 'https://x.com/Manothangaraj',
        color: 'hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2]'
      },
      {
        platform: 'Facebook',
        handle: 'Mano Thangaraj Official',
        url: 'https://www.facebook.com/share/19PPegD8uc/',
        color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]'
      },
      {
        platform: 'Instagram',
        handle: '@manothangaraj.official',
        url: 'https://www.instagram.com/manothangaraj_t',
        color: 'hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-600'
      }
    ],
    iconName: 'Users'
  },
  {
    id: 'vanjinathan',
    name: 'Vanjinathan',
    designation: 'Advocate & Social Rights Activist',
    badge: 'LEGAL RIGHTS ADVOCATE',
    badgeColor: 'bg-[#138808] text-white',
    image: advocateImg,
    roleDescription: 'Advocate practising in Madurai since 2004, and a social activist engaged in human rights, environmental protection, and people\'s movements since 1998.',
    extendedBio: 'Advocate Vanjinathan has been active in student, human rights, and political movements since 1998, drawing inspiration from the ideologies of Marx, Periyar, and Ambedkar. Enrolled as an advocate in 2004, he has opposed the exploitation of natural resources such as granite, minerals, and sand, and has stood with major people\'s movements including Parambikulam, Kudankulam, Jallikattu, and Sterlite. He has faced arrest and imprisonment several times for his participation in these struggles, worked on election monitoring and democratic rights, and was recognised by Ananda Vikatan among its "Top Ten People" for his contribution to environmental protection.',
    keyFocusAreas: ['Human Rights & Social Justice', 'Environmental Protection', 'Democratic Rights & Legal Aid'],
    socials: [
    //   {
    //     platform: 'Twitter (X)',
    //     handle: '@AdvVanchinathan',
    //     url: 'https://twitter.com/AdvVanchinathan',
    //     color: 'hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] hover:text-[#1DA1F2]'
    //   },
    //   {
    //     platform: 'Facebook',
    //     handle: 'Advocate Vanchinathan',
    //     url: 'https://facebook.com/AdvocateVanchinathan',
    //     color: 'hover:bg-[#1877F2]/10 hover:border-[#1877F2] hover:text-[#1877F2]'
    //   },
    //   {
    //     platform: 'Instagram',
    //     handle: '@adv_vanchinathan',
    //     url: 'https://instagram.com/adv_vanchinathan',
    //     color: 'hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-600'
    //   }
    ],
    iconName: 'Shield'
  }
];
