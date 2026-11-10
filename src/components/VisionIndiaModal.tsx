import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollLock } from '../hooks/useScrollLock';

// Session-scoped so it greets every new visit, but doesn't reappear on
// every refresh or in-app navigation within the same tab.
const VISION_SEEN_SESSION_KEY = 'cpm-vision-india-seen';

export function hasSeenVisionThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(VISION_SEEN_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

interface VisionIndiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PolicySection {
  heading?: string;
  items?: string[];
  paragraphs?: string[];
}

export function VisionIndiaModal({ isOpen, onClose }: VisionIndiaModalProps) {
  const { t } = useTranslation('visionIndia');
  const rawSections: unknown = t('sections', { returnObjects: true });
  const sections = Array.isArray(rawSections) ? (rawSections as PolicySection[]) : [];

  useScrollLock(isOpen);

  const handleClose = () => {
    try {
      window.sessionStorage.setItem(VISION_SEEN_SESSION_KEY, '1');
    } catch {
      // Storage blocked (private mode etc.) — closing still works.
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const contactRows = [
    { label: t('contact.joinLabel'), value: t('contact.website'), href: `https://${t('contact.website')}` },
    { label: t('contact.mailLabel'), value: t('contact.email'), href: `mailto:${t('contact.email')}` },
    { label: t('contact.mobileLabel'), value: t('contact.mobile'), href: `tel:${t('contact.mobile').replace(/\s/g, '')}` },
  ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-[#0A1F44]/75 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vision-india-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92dvh] flex flex-col bg-white overflow-hidden shadow-[0_25px_70px_rgba(10,31,68,0.4)]"
          >
            {/* Primary-colour top bar */}
            <div className="h-1 shrink-0 bg-[#0A1F44]" />

            {/* Header */}
            <div className="shrink-0 relative bg-[#0A1F44] px-6 pt-7 pb-6 sm:px-10 sm:pt-9 sm:pb-8">
              <button
                onClick={handleClose}
                aria-label={t('close')}
                title={t('close')}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <p className="pr-8 flex flex-wrap gap-x-3 gap-y-1 text-[11px] sm:text-xs font-sans-body font-semibold tracking-[0.2em] text-[#FF9933]">
                <span>{t('sloganTamil')}</span>
                <span>{t('sloganEnglish')}</span>
              </p>
              <h2
                id="vision-india-title"
                className="mt-3 pr-8 text-2xl sm:text-4xl font-serif-display font-bold text-white leading-tight"
              >
                {t('title')}
              </h2>
              <p className="mt-2 pr-8 text-sm sm:text-lg font-serif-heading font-semibold text-white/85">
                {t('subtitle')}
              </p>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="px-6 py-7 sm:px-10 sm:py-9 space-y-8">
                <p className="text-base sm:text-lg font-serif-heading font-bold text-[#0A1F44]">
                  {t('greeting')}
                </p>

                {sections.map((section, sectionIndex) => (
                  <section key={sectionIndex} className="space-y-4">
                    {section.heading && (
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-[#0A1F44]">
                          {section.heading}
                        </h3>
                        <div className="flex-1 h-px bg-[#0A1F44]/15" />
                      </div>
                    )}

                    {section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-baseline gap-3">
                            <span aria-hidden="true" className="shrink-0 w-1.5 h-1.5 translate-y-[-2px] rounded-full bg-[#FF9933]" />
                            <span className="text-[15px] sm:text-base font-sans-body text-[#0A1F44] leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-[15px] sm:text-base font-sans-body text-[#0A1F44]/80 leading-[1.8]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}

                {/* Contact details */}
                <div className="bg-[#0A1F44] px-5 py-6 sm:px-7 sm:py-7 space-y-2">
                  {contactRows.map((row) => (
                    <p key={row.label} className="text-sm sm:text-base font-sans-body text-white leading-relaxed">
                      <span className="font-semibold text-[#FF9933]">{row.label}: </span>
                      <a href={row.href} target={row.href.startsWith('https') ? '_blank' : undefined} rel="noreferrer" className="break-all hover:underline">
                        {row.value}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-end gap-4 px-6 py-4 sm:px-10 border-t border-[#0A1F44]/10 bg-[#F8F6F0]">
              <button
                onClick={handleClose}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1F44] hover:bg-[#132D5E] text-white text-sm font-sans-body font-semibold transition-colors cursor-pointer group"
              >
                {t('cta')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
