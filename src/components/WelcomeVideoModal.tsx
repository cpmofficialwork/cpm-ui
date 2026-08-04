import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollLock } from '../hooks/useScrollLock';

// TODO: replace with the real promo video before launch.
// mute=1 is required for autoplay to work in any browser (unmuted autoplay is blocked
// without a prior user gesture) — enablejsapi=1 lets the "tap for sound" button unmute
// the already-playing video via postMessage instead of reloading it.
const DEMO_YOUTUBE_EMBED_URL =
  'https://www.youtube.com/embed/J1QgHDKfE_E?autoplay=1&mute=1&rel=0&enablejsapi=1';

const SEEN_STORAGE_KEY = 'cpm-welcome-video-seen';

export function WelcomeVideoModal() {
  const { t } = useTranslation('welcomeVideo');
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SEEN_STORAGE_KEY) !== '1';
  });
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useScrollLock(isOpen);

  const handleClose = () => {
    window.localStorage.setItem(SEEN_STORAGE_KEY, '1');
    setIsOpen(false);
  };

  const handleUnmute = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
      '*',
    );
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
      '*',
    );
    setIsMuted(false);
  };

  // Browsers refuse unmuted autoplay outright — there's no on-load workaround.
  // The closest thing to "audio just works": unmute the instant the visitor makes
  // their very first click/tap/keypress anywhere on the page, not just on a
  // dedicated button, so normal interaction (clicking play, scrolling, closing
  // the modal) turns sound on without them having to find a control for it.
  useEffect(() => {
    if (!isOpen || !isMuted) return;

    const unmuteOnFirstInteraction = () => handleUnmute();
    window.addEventListener('pointerdown', unmuteOnFirstInteraction, { once: true });
    window.addEventListener('keydown', unmuteOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unmuteOnFirstInteraction);
      window.removeEventListener('keydown', unmuteOnFirstInteraction);
    };
  }, [isOpen, isMuted]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-[#020A16]/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl bg-[#0A1F44] border-4 border-[#FF9933] shadow-[10px_10px_0px_0px_rgba(255,153,51,0.35)]"
          >
            {/* Close button on the cover, top-right */}
            <button
              onClick={handleClose}
              title={t('close')}
              aria-label={t('close')}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#FF9933] to-[#E68900] hover:brightness-110 text-[#0A1F44] border-2 border-[#0A1F44] rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            {/* Header strip */}
            <div className="flex items-center gap-2 px-4 py-3 border-b-4 border-[#FF9933] bg-[#0A1F44]">
              <div className="p-1.5 bg-[#FF9933] text-[#0A1F44]">
                <Play className="w-4 h-4" fill="currentColor" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                  {t('title')}
                </h3>
                <p className="text-[10px] font-mono text-[#FF9933]">{t('subtitle')}</p>
              </div>
            </div>

            {/* Video */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 w-full h-full"
                src={DEMO_YOUTUBE_EMBED_URL}
                title={t('title')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Browsers block unmuted autoplay, so the video starts muted — this button
                  turns the sound on via a real user click. */}
              {isMuted && (
                <button
                  onClick={handleUnmute}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#FF9933] to-[#E68900] text-[#0A1F44] text-xs font-mono font-bold uppercase tracking-wider border-2 border-[#0A1F44] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer transition-all hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5 animate-pulse"
                >
                  <Volume2 className="w-4 h-4" />
                  {t('unmute')}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
