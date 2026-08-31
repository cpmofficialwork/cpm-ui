export interface ConstitutionalValue {
  id: string;
  number: number;
  articleRef: string;
  name: string;
  tamilName?: string;
  englishTitle: string;
  shortDescription: string;
  detailedRelevance: string;
  historicalContext: string;
  landmarkJudgment?: string;
  iconName: string;
  category: 'core' | 'rights' | 'governance' | 'pluralism';
}

export interface TimelineMilestone {
  id: string;
  year: string;
  dateStr?: string;
  title: string;
  category: 'struggle' | 'assembly' | 'enactment' | 'judgments' | 'amendments';
  description: string;
  quote?: string;
  quoteAuthor?: string;
  significance: string;
  keyFigures: string[];
}

export interface ThreatCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  institutionalImpact: string;
  movementResponse: string;
}

export interface StateChapter {
  id: string;
  stateName: string;
  code: string;
  districtCount: number;
  activeVolunteers: number;
  coordinatorName: string;
  contactEmail: string;
  headquarters: string;
  activeCampaigns: string[];
  coordinates: { x: number; y: number }; // Relative position on simplified SVG map
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  objective: string;
  targetMetric: string;
  currentProgress: number; // percentage
  citizenParticipationRole: string;
  impactMetrics: {
    label: string;
    value: string;
  }[];
  status: 'active' | 'expanding' | 'completed';
  location: string;
}

export interface PledgeSignature {
  id: string;
  name: string;
  city: string;
  state: string;
  occupation: string;
  pledgeDate: string;
  message?: string;
  isVerified?: boolean;
}

export interface ConstitutionArticle {
  articleNumber: string;
  title: string;
  part: string;
  summary: string;
  fullText: string;
  keyTakeaway: string;
}

export interface LandmarkCase {
  caseName: string;
  year: number;
  benchSize: string;
  coreIssue: string;
  rulingSummary: string;
  constitutionalImpact: string;
}

export interface SocialHandle {
  platform: string;
  handle: string;
  url: string;
  color: string;
}

export interface Organizer {
  id: string;
  name: string;
  designation: string;
  badge: string;
  badgeColor: string;
  image: string;
  roleDescription: string;
  extendedBio: string;
  keyFocusAreas: string[];
  socials: SocialHandle[];
  iconName: string;
}

export interface MemberData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  occupation: string;
  interests: string[];
  skills: string[];
  pledgedAt: string;
  membershipId: string;
}

export interface EventGalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface EventVideo {
  id: string;
  title: string;
  youtubeId: string;
}

export interface ConferenceEvent {
  id: string;
  title: string;
  tamilTitle: string;
  status: 'concluded' | 'upcoming';
  dateLabel: string;
  venue: string;
  city: string;
  mapUrl?: string;
  // Up to 5 photos that rotate as a slider in the section banner background.
  // Falls back to a single static `coverImage` slide when omitted.
  bannerImages?: string[];
  summary: string;
  coverImage: string;
  // Only the 2026 conference has an official pamphlet reader wired up (ConferencePamphlet).
  hasPamphlet?: boolean;
  // Fallback shown only if the live fetch from GET /api/events/public fails —
  // see EventsSection, which merges imageUrls/videoUrls from every
  // admin-managed Event into the "View Gallery & Videos" dialog.
  gallery: EventGalleryImage[];
  videos: EventVideo[];
}
