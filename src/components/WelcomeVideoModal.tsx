import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import pamphletCoverImg from '../assets/images/pamphlet_cover_page1.png';
import { useScrollLock } from '../hooks/useScrollLock';

const SEEN_STORAGE_KEY = 'cpm-welcome-video-seen';

export function WelcomeVideoModal() {
  const { t } = useTranslation('welcomeVideo');
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(SEEN_STORAGE_KEY) !== '1';
  });

  useScrollLock(isOpen);

  const handleClose = () => {
    window.localStorage.setItem(SEEN_STORAGE_KEY, '1');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-[#020A16]/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-[#0A1F44] border-4 border-[#FF9933] shadow-[10px_10px_0px_0px_rgba(255,153,51,0.35)]"
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
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                  {t('title')}
                </h3>
                <p className="text-[10px] font-mono text-[#FF9933]">{t('subtitle')}</p>
              </div>
            </div>

            {/* Pamphlet Cover */}
            <div className="w-full bg-black flex items-center justify-center">
              <img
                src={pamphletCoverImg}
                alt={t('title')}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
