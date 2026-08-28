import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  MapPin,
  ExternalLink,
  X,
  ImageOff,
  Images,
  Film,
  Play,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock3,
  UserPlus,
  BookOpen,
} from 'lucide-react';
import { EVENTS } from '../data/events';
import type { ConferenceEvent, EventVideo } from '../types';
import { ConferencePamphlet } from './ConferencePamphlet';
import { useScrollLock } from '../hooks/useScrollLock';
import { useLanguage } from '../hooks/useLanguage';

interface EventsSectionProps {
  onOpenJoinModal: () => void;
  isPamphletOpen: boolean;
  onOpenPamphlet: () => void;
  onClosePamphlet: () => void;
}

// How many gallery photos render at once before the "Load More" button —
// keeps the DOM light even when an event's gallery grows toward ~100 photos.
const GALLERY_PAGE_SIZE = 24;

// Banner background slider: at most 5 slides, auto-advancing.
const MAX_BANNER_SLIDES = 5;
const SLIDE_INTERVAL_MS = 5000;

const youtubeThumbnail = (youtubeId: string) => `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

interface EventBannerProps {
  event: ConferenceEvent;
  index: number;
  isTamil: boolean;
  t: (key: string) => string;
  onSelect: () => void;
  onOpenPamphlet: () => void;
}

// Self-contained so each event's slider runs its own independent timer/index.
const EventBanner: React.FC<EventBannerProps> = ({ event, index, isTamil, t, onSelect, onOpenPamphlet }) => {
  const slides = (event.bannerImages && event.bannerImages.length > 0 ? event.bannerImages : [event.coverImage]).slice(0, MAX_BANNER_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const mediaCount = event.gallery.length + event.videos.length;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <motion.div
      id={`event-${event.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="scroll-mt-24 group/banner relative w-full h-[520px] sm:h-[600px] lg:h-[680px] bg-[#040D1B] overflow-hidden cursor-pointer"
      onClick={onSelect}
    >
      {/* Background slide — crossfades between up to 5 images; caption content below stays fixed */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Layer 1: blurred, fully-covering backdrop fill so the section
              background is always fully covered by imagery */}
          <img
            src={slides[currentSlide]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover scale-125 blur-3xl opacity-40"
          />
          <div className="absolute inset-0 bg-[#020A16]/45" />

          {/* Layer 2: the actual photo/artwork, shown fully uncropped */}
          <img
            src={slides[currentSlide]}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain p-6 sm:p-10 lg:p-14 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover/banner:scale-[1.02]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020A16] via-[#020A16]/55 to-transparent pointer-events-none" />

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(i);
              }}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${i === currentSlide ? 'w-5 bg-[#FFB800]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}

      {/* Overlaid content, grid-aligned with the rest of the site — extra
          bottom padding keeps it from feeling glued to the banner's edge */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 lg:pb-20 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {event.status === 'concluded' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 backdrop-blur-sm rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('eventsSection:statusConcluded')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#FFB800] backdrop-blur-sm rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                <Clock3 className="w-3.5 h-3.5 animate-pulse" />
                {t('eventsSection:statusUpcoming')}
              </span>
            )}
            {mediaCount > 0 && (
              <span className="inline-flex items-center gap-2.5 px-2.5 py-1 bg-white/10 border border-white/25 text-white backdrop-blur-sm rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                {event.gallery.length > 0 && (
                  <span className="flex items-center gap-1"><Images className="w-3.5 h-3.5" />{event.gallery.length}</span>
                )}
                {event.videos.length > 0 && (
                  <span className="flex items-center gap-1"><Film className="w-3.5 h-3.5" />{event.videos.length}</span>
                )}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif-display font-black text-white leading-tight drop-shadow-lg">
              {event.title}
            </h3>
            <p className="text-sm sm:text-lg font-serif italic text-[#FFE082]/90 mt-1">
              {isTamil ? event.title : event.tamilTitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-white/80">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFB800]" />
              {event.dateLabel}
            </span>
            {event.mapUrl ? (
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                {event.venue}, {event.city}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
                {event.venue}, {event.city}
              </span>
            )}
          </div>

          <p className="hidden sm:block text-sm text-white/85 font-sans-body leading-relaxed max-w-2xl line-clamp-2">
            {event.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="w-fit inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8F00] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t('eventsSection:viewGalleryAndVideos')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {event.hasPamphlet && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPamphlet();
                }}
                className="w-fit inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono text-xs font-black uppercase tracking-widest rounded-lg backdrop-blur-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('eventsSection:modal.openPamphlet')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const EventsSection: React.FC<EventsSectionProps> = ({
  onOpenJoinModal,
  isPamphletOpen,
  onOpenPamphlet,
  onClosePamphlet,
}) => {
  const { t } = useTranslation(['eventsSection', 'common']);
  const { isTamil } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const selectedEvent = EVENTS.find((e) => e.id === selectedEventId) ?? null;

  const [visibleGalleryCount, setVisibleGalleryCount] = useState(GALLERY_PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoLightbox, setVideoLightbox] = useState<EventVideo | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  useScrollLock(!!selectedEvent);

  // Reset per-event viewer state whenever the open event changes
  useEffect(() => {
    setVisibleGalleryCount(GALLERY_PAGE_SIZE);
    setVideoLightbox(null);
    setLightboxIndex(null);
    setActiveTab('photos');
  }, [selectedEventId]);

  // Photo lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null || !selectedEvent) return;
    const total = selectedEvent.gallery.length;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? null : Math.min(i + 1, total - 1)));
      else if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, selectedEvent]);

  // Video lightbox: Escape closes
  useEffect(() => {
    if (!videoLightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoLightbox(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [videoLightbox]);

  return (
    <section id="events" className="bg-gradient-to-b from-[#020A16] via-[#081836] to-[#041026] py-10 lg:py-14 border-b-4 border-[#FFB800] relative overflow-hidden shadow-2xl">
      {/* Golden Metallic Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#FFB800] via-[#FFF5C0] to-[#138808] shadow-[0_0_15px_#FFB800] z-20" />

      {/* Events List — full-bleed photo banners, edge-to-edge, newest first, scalable to many future conferences */}
      <div className="relative space-y-3">
        {/* Join the Movement — floats over the top banner so the section opens straight into imagery */}
        <motion.button
          type="button"
          onClick={onOpenJoinModal}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, scale: [1, 1.05, 1] }}
          transition={{ opacity: { duration: 0.4 }, y: { duration: 0.4 }, scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8F00] text-[#0A1F44] font-mono text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] rounded-full shadow-[0_0_20px_rgba(255,184,0,0.5)] border border-[#FFE082] cursor-pointer hover:shadow-[0_0_28px_rgba(255,184,0,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t('common:actions.joinMovement')}</span>
        </motion.button>

        {EVENTS.map((event, index) => (
          <EventBanner
            key={event.id}
            event={event}
            index={index}
            isTamil={isTamil}
            t={t}
            onSelect={() => setSelectedEventId(event.id)}
            onOpenPamphlet={onOpenPamphlet}
          />
        ))}
      </div>

      <p className="text-center text-xs font-mono text-white/50 uppercase tracking-widest mt-6 px-4">
        {t('eventsSection:moreEventsNote')}
      </p>

      {/* Gallery & Video Detail Modal — light cream theme matching the rest
          of the site's card modals (WhoConducts, JoinMovementModal), rather
          than the dark banner behind it. Portaled to <body>. */}
      {createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventId(null)}
              className="fixed inset-0 z-50 bg-[#0A1F44]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F8F6F0] text-[#0A1F44] border-2 border-[#0A1F44] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
              >
                {/* Header strip */}
                <div className="sticky top-0 z-10 bg-[#0A1F44] border-b-2 border-[#0A1F44] p-5 sm:p-6 flex items-start justify-between gap-4 rounded-t-2xl">
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-lg sm:text-2xl font-serif-display font-bold text-white">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-xs font-serif italic text-[#FFE082]/90">
                      {isTamil ? selectedEvent.title : selectedEvent.tamilTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEventId(null)}
                    className="shrink-0 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    aria-label={t('eventsSection:modal.close')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Photos / Videos tab switcher */}
                <div className="sticky top-[73px] sm:top-[85px] z-10 bg-[#F8F6F0] border-b border-[#0A1F44]/15 px-5 sm:px-6 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('photos')}
                    className={`flex items-center gap-2 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${activeTab === 'photos' ? 'border-[#D97706] text-[#D97706]' : 'border-transparent text-[#0A1F44]/50 hover:text-[#0A1F44]'}`}
                  >
                    <Images className="w-4 h-4" />
                    {t('eventsSection:modal.galleryLabel')}
                    {selectedEvent.gallery.length > 0 && <span className="text-[10px] opacity-70">({selectedEvent.gallery.length})</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('videos')}
                    className={`flex items-center gap-2 py-3.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${activeTab === 'videos' ? 'border-[#D97706] text-[#D97706]' : 'border-transparent text-[#0A1F44]/50 hover:text-[#0A1F44]'}`}
                  >
                    <Film className="w-4 h-4" />
                    {t('eventsSection:modal.videosLabel')}
                    {selectedEvent.videos.length > 0 && <span className="text-[10px] opacity-70">({selectedEvent.videos.length})</span>}
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  {activeTab === 'photos' && (
                    selectedEvent.gallery.length > 0 ? (
                      <>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                          {selectedEvent.gallery.slice(0, visibleGalleryCount).map((img, idx) => (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => setLightboxIndex(idx)}
                              className="aspect-square rounded-lg overflow-hidden border border-[#0A1F44]/15 bg-[#0A1F44]/5 cursor-pointer group/thumb shadow-sm"
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                              />
                            </button>
                          ))}
                        </div>
                        {visibleGalleryCount < selectedEvent.gallery.length && (
                          <button
                            type="button"
                            onClick={() => setVisibleGalleryCount((c) => c + GALLERY_PAGE_SIZE)}
                            className="w-full mt-3 py-2.5 border border-[#0A1F44]/20 hover:border-[#D97706]/60 hover:bg-[#D97706]/5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-[#0A1F44]/70 hover:text-[#D97706] transition-colors cursor-pointer"
                          >
                            {t('eventsSection:modal.loadMore', { count: selectedEvent.gallery.length - visibleGalleryCount })}
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-14 px-4 border border-dashed border-[#0A1F44]/20 rounded-xl bg-[#0A1F44]/[0.03] text-center">
                        <ImageOff className="w-6 h-6 text-[#0A1F44]/35" />
                        <p className="text-sm font-semibold text-[#0A1F44]/70">{t('eventsSection:modal.galleryEmptyTitle')}</p>
                        <p className="text-xs text-[#0A1F44]/45 max-w-xs">{t('eventsSection:modal.galleryEmptyBody')}</p>
                      </div>
                    )
                  )}

                  {activeTab === 'videos' && (
                    selectedEvent.videos.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedEvent.videos.map((video) => (
                          <div key={video.id} className="space-y-1.5">
                            <button
                              type="button"
                              onClick={() => setVideoLightbox(video)}
                              className="w-full aspect-video rounded-lg overflow-hidden border border-[#0A1F44]/15 bg-[#0A1F44]/5 relative group/video cursor-pointer shadow-sm"
                            >
                              <img
                                src={youtubeThumbnail(video.youtubeId)}
                                alt={video.title}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/35 transition-colors flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-[#FFB800] flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                                  <Play className="w-5 h-5 text-[#0A1F44] fill-[#0A1F44] ml-0.5" />
                                </div>
                              </div>
                            </button>
                            <p className="text-xs text-[#0A1F44]/70 font-sans-body">{video.title}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-14 px-4 border border-dashed border-[#0A1F44]/20 rounded-xl bg-[#0A1F44]/[0.03] text-center">
                        <Film className="w-6 h-6 text-[#0A1F44]/35" />
                        <p className="text-sm font-semibold text-[#0A1F44]/70">{t('eventsSection:modal.videosEmptyTitle')}</p>
                        <p className="text-xs text-[#0A1F44]/45 max-w-xs">{t('eventsSection:modal.videosEmptyBody')}</p>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Photo Lightbox — full-screen viewer with prev/next, sits above the
          detail modal (z-[70] > modal's z-50). */}
      {createPortal(
        <AnimatePresence>
          {selectedEvent && lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label={t('eventsSection:modal.close')}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 rounded-full text-xs font-mono text-white/80">
                {lightboxIndex + 1} / {selectedEvent.gallery.length}
              </div>

              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : Math.max(i - 1, 0)));
                  }}
                  className="absolute left-2 sm:left-6 p-2.5 sm:p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {lightboxIndex < selectedEvent.gallery.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : Math.min(i + 1, selectedEvent.gallery.length - 1)));
                  }}
                  className="absolute right-2 sm:right-6 p-2.5 sm:p-3 text-white/80 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                src={selectedEvent.gallery[lightboxIndex].src}
                alt={selectedEvent.gallery[lightboxIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Video Lightbox — same full-screen pop treatment as the photo lightbox */}
      {createPortal(
        <AnimatePresence>
          {videoLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoLightbox(null)}
              className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4"
            >
              <button
                onClick={() => setVideoLightbox(null)}
                className="absolute top-4 right-4 p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label={t('eventsSection:modal.close')}
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl space-y-3"
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoLightbox.youtubeId}?autoplay=1`}
                    title={videoLightbox.title}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-white/80 font-sans-body text-center">{videoLightbox.title}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 4-Page Pamphlet Interactive Reader — self-contained overlay, portals
          itself to <body> so it renders correctly regardless of this
          section's own scroll-in animation. */}
      <ConferencePamphlet isOpen={isPamphletOpen} onClose={onClosePamphlet} hideBanner />
    </section>
  );
};
