import pamphletCoverImg from '../assets/images/pamphlet_cover_page1.png';
import pamphletCoverAltImg from '../assets/images/pamphlet_cover_page1_1785666053368.jpg';
import pamphletCoverTaImg from '../assets/images/pamphlet_cover_page1_ta.png';
import introCardImg from '../assets/images/intro_card_image.jpeg';
import type { ConferenceEvent } from '../types';

// Ordered newest-first — this drives the Events section list, the navbar
// "Events" hover dropdown, and the per-event anchor links (#event-{id}).
// To add a future conference, push a new entry to the top of this array.
//
// `gallery` and `videos` below are ONLY a fallback for when the live fetch
// fails — the "View Gallery & Videos" dialog normally fetches every event
// from GET /api/events/public (see EventsSection) and merges all of their
// imageUrls/videoUrls into one combined gallery/video list. To add real
// photos/videos, upload them to an event in the admin app's Events tab —
// no rebuild needed, they show up on next page load.
//
// To populate the static fallback instead:
//   1. Drop images in src/assets/images/ and import them at the top of this
//      file, then add entries: { id: 'photo-1', src: importedImage, alt: '...' }
//   2. For videos, add: { id: 'video-1', title: '...', youtubeId: '<the 11-char YouTube video ID>' }
//   3. For the banner slider, import up to 5 photos and set
//      `bannerImages: [imgA, imgB, imgC]` — omit it to show `coverImage` alone.
export const EVENTS: ConferenceEvent[] = [
  {
    id: 'constitution-protection-conference-2026',
    title: 'Constitution Protection Conference 2026',
    tamilTitle: 'அரசமைப்புச் சட்டப் பாதுகாப்பு மாநாடு',
    status: 'concluded',
    dateLabel: '21 August 2026',
    venue: 'YMCA Ground, Nanthanam',
    city: 'Chennai, Tamil Nadu',
    mapUrl: 'https://maps.app.goo.gl/fAhXKpBMDZ7FF6KL7',
    summary:
      'Our first statewide gathering brought together citizens, retired judges, advocates, student leaders and civil society representatives from all 38 districts of Tamil Nadu in a shared pledge to protect the Constitution of India.',
    coverImage: pamphletCoverImg,
    // Placeholder banner slides using the site's existing official promo
    // graphics, just so the slider visibly moves before real event photos
    // are ready. Replace this array with real photos whenever you have them.
    bannerImages: [pamphletCoverImg, introCardImg, pamphletCoverAltImg, pamphletCoverTaImg],
    hasPamphlet: true,
    gallery: [],
    videos: [],
  },
];
