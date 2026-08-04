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
    id: 'justice',
    number: 1,
    articleRef: 'Preamble & Article 38',
    name: 'Justice',
    tamilName: 'நீதி',
    englishTitle: 'Social, Economic and Political Justice',
    shortDescription: 'The Constitution seeks to secure social, economic, and political justice so that every person can live with fairness, dignity, and equal opportunity, irrespective of caste, religion, gender, or economic status.',
    detailedRelevance: 'Social justice eliminates caste discrimination; Economic justice reduces wealth disparity; Political justice guarantees equal right to vote and hold public office.',
    historicalContext: 'Dr. B.R. Ambedkar stressed social and economic democracy as the vital foundation without which political democracy cannot survive.',
    landmarkJudgment: 'Maneka Gandhi v. Union of India (1978)',
    iconName: 'Scale',
    category: 'core'
  },
  {
    id: 'liberty',
    number: 2,
    articleRef: 'Articles 19 & 21',
    name: 'Liberty',
    tamilName: 'சுதந்திரம்',
    englishTitle: 'Thought, Expression, Belief, Faith & Worship',
    shortDescription: 'Every individual has the freedom of thought, expression, belief, faith, worship, association, and movement, subject only to reasonable restrictions prescribed by law.',
    detailedRelevance: 'Guarantees that citizens, press, artists, and scholars can question authority, voice dissent, and practice their faith without fear of retribution.',
    historicalContext: 'Inspired by the freedom struggle where colonial anti-sedition laws were used to suppress Indian leaders and journalists.',
    landmarkJudgment: 'Shreya Singhal v. Union of India (2015)',
    iconName: 'Feather',
    category: 'rights'
  },
  {
    id: 'equality',
    number: 3,
    articleRef: 'Articles 14 to 18',
    name: 'Equality',
    tamilName: 'சமத்துவம்',
    englishTitle: 'Equality Before Law & Equal Opportunity',
    shortDescription: 'All persons are equal before the law and entitled to equal protection of the laws. The Constitution prohibits discrimination and promotes equal opportunities.',
    detailedRelevance: 'Ensures the state treats all citizens equally. Provides affirmative action (reservations) to level the playing field for historically disadvantaged communities.',
    historicalContext: 'Article 17 explicitly abolished Untouchability, making its practice a punishable criminal offence under constitutional mandate.',
    landmarkJudgment: 'Indra Sawhney v. Union of India (1992)',
    iconName: 'Equal',
    category: 'rights'
  },
  {
    id: 'fraternity',
    number: 4,
    articleRef: 'Preamble & Article 51A(e)',
    name: 'Fraternity',
    tamilName: 'சகோதரத்துவம்',
    englishTitle: 'Brotherhood & National Unity',
    shortDescription: 'Fraternity promotes mutual respect, harmony, and solidarity among all citizens while protecting the dignity of every individual and preserving the unity and integrity of India.',
    detailedRelevance: 'Fraternity ensures that liberty and equality do not result in social division. It reinforces that every Indian citizen shares a single national identity.',
    historicalContext: 'Dr. Ambedkar introduced "Fraternity" to the Preamble, stating that without fraternity, equality and liberty will be no deeper than coats of paint.',
    landmarkJudgment: 'Nandini Sundar v. State of Chhattisgarh (2011)',
    iconName: 'HeartHandshake',
    category: 'pluralism'
  },
  {
    id: 'secularism',
    number: 5,
    articleRef: 'Articles 25-28 & Preamble',
    name: 'Secularism',
    tamilName: 'மதச்சார்பின்மை',
    englishTitle: 'State Neutrality & Freedom of Religion',
    shortDescription: 'The State has no official religion and must treat all religions equally. Every citizen has the freedom to profess, practise, and propagate their religion without discrimination.',
    detailedRelevance: 'Crucial for maintaining peace and harmony in a multi-religious nation. Prevents majority religion dominance over public institutions.',
    historicalContext: 'Adopted to assure all minority communities that India belongs equally to every citizen regardless of faith.',
    landmarkJudgment: 'S.R. Bommai v. Union of India (1994)',
    iconName: 'Sun',
    category: 'pluralism'
  },
  {
    id: 'democracy',
    number: 6,
    articleRef: 'Preamble & Article 326',
    name: 'Democracy',
    tamilName: 'ஜனநாயகம்',
    englishTitle: 'Sovereignty of the People & Free Elections',
    shortDescription: 'Sovereign power belongs to the people. Governments derive their authority through free and fair elections and remain accountable to the people under the Constitution.',
    detailedRelevance: 'Empowers millions of citizens with equal political weight through periodic free and fair elections.',
    historicalContext: 'A radical democratic leap in 1950 establishing universal adult suffrage for all citizens.',
    landmarkJudgment: 'T.N. Seshan v. Union of India (1995)',
    iconName: 'Vote',
    category: 'core'
  },
  {
    id: 'republicanism',
    number: 7,
    articleRef: 'Preamble & Article 52',
    name: 'Republicanism',
    tamilName: 'குடியரசு',
    englishTitle: 'Elected Head of State & Public Office',
    shortDescription: 'India is a Republic where the Head of State is elected, not hereditary. Public offices derive their legitimacy from the will of the people.',
    detailedRelevance: 'Ensures public authority belongs to citizens, rejecting monarchical or hereditary privileges.',
    historicalContext: 'Declared on January 26, 1950, when India enacted its Constitution and became a Sovereign Democratic Republic.',
    landmarkJudgment: 'Synthetics & Chemicals Ltd. v. State of U.P. (1990)',
    iconName: 'Crown',
    category: 'core'
  },
  {
    id: 'rule-of-law',
    number: 8,
    articleRef: 'Article 14 & Basic Structure',
    name: 'Rule of Law',
    tamilName: 'சட்டத்தின் ஆட்சி',
    englishTitle: 'Supremacy of Law over Arbitrary Power',
    shortDescription: 'No one is above the law—not even the government. Every action of the State must conform to the Constitution and the law.',
    detailedRelevance: 'Protects citizens from autocratic police action, arbitrary arrests, unlawful demolitions, or extra-judicial government overreach.',
    historicalContext: 'Contrasted with colonial rule where the British Crown wielded arbitrary power without judicial accountability.',
    landmarkJudgment: 'Indira Nehru Gandhi v. Raj Narain (1975)',
    iconName: 'FileText',
    category: 'governance'
  },
  {
    id: 'human-dignity',
    number: 9,
    articleRef: 'Article 21 & Preamble',
    name: 'Human Dignity',
    tamilName: 'மனித கண்ணியம்',
    englishTitle: 'Inherent Dignity & Right to Self-Worth',
    shortDescription: 'Every individual possesses inherent dignity. The Constitution protects life, liberty, privacy, and the right to live with respect and self-worth.',
    detailedRelevance: 'Central to Article 21, ensuring living with dignity, privacy, health, and clean environment.',
    historicalContext: 'Emphasized in the Preamble as the foundation assuring the dignity of the individual.',
    landmarkJudgment: 'Justice K.S. Puttaswamy v. Union of India (2017)',
    iconName: 'ShieldCheck',
    category: 'rights'
  },
  {
    id: 'fundamental-rights',
    number: 10,
    articleRef: 'Part III (Articles 12-35)',
    name: 'Fundamental Rights',
    tamilName: 'அடிப்படை உரிமைகள்',
    englishTitle: 'Guaranteed Liberties & Remedies',
    shortDescription: 'These rights protect individuals from arbitrary State action and guarantee freedoms such as equality, speech, religion, education, and constitutional remedies.',
    detailedRelevance: 'Article 32 enables direct petitioning to the Supreme Court when fundamental rights are violated.',
    historicalContext: 'Derived from the 1928 Nehru Report and Karachi Resolution to guarantee basic liberties.',
    landmarkJudgment: 'Romesh Thappar v. State of Madras (1950)',
    iconName: 'BookOpenCheck',
    category: 'rights'
  },
  {
    id: 'social-justice',
    number: 11,
    articleRef: 'Articles 15, 16, 38 & 46',
    name: 'Social Justice',
    tamilName: 'சமூக நீதி',
    englishTitle: 'Upliftment & Affirmative Action',
    shortDescription: 'The Constitution seeks to reduce historical inequalities by ensuring opportunities and protections for socially and economically disadvantaged communities.',
    detailedRelevance: 'Empowers historically marginalized groups through reservations, legal protection, and social welfare policies.',
    historicalContext: 'Core vision championed by Dr. B.R. Ambedkar to create a casteless and equitable social order.',
    landmarkJudgment: 'Indra Sawhney v. Union of India (1992)',
    iconName: 'Compass',
    category: 'rights'
  },
  {
    id: 'federalism',
    number: 12,
    articleRef: 'Article 1 & Schedule VII',
    name: 'Federalism',
    tamilName: 'கூட்டாட்சித் தத்துவம்',
    englishTitle: 'Division of Powers between Union & States',
    shortDescription: 'India follows a federal system in which powers are distributed between the Union and the States, ensuring balanced governance while preserving national unity.',
    detailedRelevance: 'Prevents central overreach, respects regional linguistic and cultural identities, and ensures state autonomy.',
    historicalContext: 'Designed by the Constituent Assembly to accommodate India’s immense regional diversity through a union of states.',
    landmarkJudgment: 'S.R. Bommai v. Union of India (1994)',
    iconName: 'Landmark',
    category: 'governance'
  },
  {
    id: 'judicial-independence',
    number: 13,
    articleRef: 'Articles 50, 124 & 226',
    name: 'Judicial Independence',
    tamilName: 'நீதித்துறையின் சுதந்திரம்',
    englishTitle: 'Impartial Judiciary & Guardian of Rights',
    shortDescription: 'Courts must function independently, free from political or external influence, so they can uphold the Constitution and protect citizens’ rights impartially.',
    detailedRelevance: 'Allows citizens to challenge unconstitutional executive actions, invalid laws, or rights violations before independent courts.',
    historicalContext: 'Separation of executive from judiciary (Article 50) was a key demand of the Indian National Movement.',
    landmarkJudgment: 'Supreme Court Advocates-on-Record Association (2015)',
    iconName: 'Shield',
    category: 'governance'
  },
  {
    id: 'constitutional-morality',
    number: 14,
    articleRef: 'Preamble & Basic Structure',
    name: 'Constitutional Morality',
    tamilName: 'அரசியலமைப்புச் சட்ட ஒழுக்கநெறி',
    englishTitle: 'Adherence to Constitutional Spirit',
    shortDescription: 'Public authorities must act according to the values and spirit of the Constitution—respecting liberty, equality, dignity, and the rule of law—even when public opinion or political pressure points in another direction.',
    detailedRelevance: 'Prevents majoritarian tyranny and ensures officials uphold constitutional values above political expediency.',
    historicalContext: 'Dr. Ambedkar famously highlighted George Grote’s concept of constitutional morality as essential for democracy.',
    landmarkJudgment: 'Manoj Narula v. Union of India (2014)',
    iconName: 'GraduationCap',
    category: 'governance'
  },
  {
    id: 'minority-rights',
    number: 15,
    articleRef: 'Articles 29 & 30',
    name: 'Protection of Minority Rights',
    tamilName: 'சிறுபான்மையினர் உரிமைகள்',
    englishTitle: 'Cultural, Linguistic & Educational Safeguards',
    shortDescription: 'The Constitution safeguards the religious, linguistic, and cultural rights of minorities, enabling them to preserve their identity and establish educational institutions without discrimination.',
    detailedRelevance: 'Prevents cultural assimilation or erasure of minority languages and traditions under democratic majority rule.',
    historicalContext: 'Crafted with unanimous consensus in the Constituent Assembly to instill confidence among all communities in post-partition India.',
    landmarkJudgment: 'T.M.A. Pai Foundation v. State of Karnataka (2002)',
    iconName: 'Users',
    category: 'pluralism'
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
    summary: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    fullText: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India, prohibiting arbitrary executive classification.',
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
    roleDescription: 'Distinguished former judge providing supreme judicial oversight, constitutional jurisprudence, and guidance on safeguarding fundamental rights.',
    extendedBio: 'Justice Hari Parandhaman served as a distinguished judge with an exemplary record of protecting democratic freedoms, labor rights, and equal opportunity. As a primary convener of the Constitution Protection Movement, he ensures all initiatives strictly uphold the spirit of the Preamble and the Rule of Law.',
    keyFocusAreas: ['Judicial Independence', 'Fundamental Rights Protection', 'Constitutional Literacy'],
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
    roleDescription: 'Veteran public leader and former minister spearheading statewide citizen mobilization and institutional outreach for the Chennai Assembly.',
    extendedBio: 'Thiru Mano Thangaraj has decades of public service experience advocating for democratic governance, rural empowerment, and technology for social justice. He brings together diverse civil society groups, youth delegations, and community volunteers to conduct this grand national convention.',
    keyFocusAreas: ['Grassroots Mobilization', 'Institutional Reforms', 'Volunteer Coalitions'],
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
    id: 'vanchinathan',
    name: 'Vanchinathan',
    designation: 'Senior Advocate & Legal Rights Defender',
    badge: 'LEGAL RIGHTS ADVOCATE',
    badgeColor: 'bg-[#138808] text-white',
    image: advocateImg,
    roleDescription: 'Prominent High Court advocate leading legal defense networks and constitutional awareness campaigns across Tamil Nadu and India.',
    extendedBio: 'Advocate Vanchinathan is a relentless legal defender known for representing marginalized communities, human rights activists, and environmental causes. As key organizer, he leads the movement’s legal aid cells, policy research, and public rights workshops.',
    keyFocusAreas: ['Legal Aid & Defense', 'Freedom of Speech Protection', 'Human Rights Advocacy'],
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
