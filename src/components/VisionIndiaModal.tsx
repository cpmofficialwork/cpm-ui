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

export function VisionIndiaModal({ isOpen, onClose }: VisionIndiaModalProps) {
  const { t } = useTranslation('visionIndia');
  const asList = (value: unknown) => (Array.isArray(value) ? (value as string[]) : []);
  const intro = asList(t('intro', { returnObjects: true }));
  const questions = asList(t('questions', { returnObjects: true }));
  const finalQuestion = questions[questions.length - 1];
  const listQuestions = questions.slice(0, -1);

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

              <p className="text-[11px] sm:text-xs font-sans-body font-semibold uppercase tracking-[0.2em] text-[#FF9933]">
                {t('badge')}
              </p>
              <h2
                id="vision-india-title"
                className="mt-3 pr-8 text-2xl sm:text-4xl font-serif-display font-bold text-white leading-tight"
              >
                {t('title')}
              </h2>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
              <div className="px-6 py-7 sm:px-10 sm:py-9 space-y-8">
                {/* Intro */}
                <div className="space-y-4">
                  {intro.map((para, i) => (
                    <p
                      key={i}
                      className="text-[15px] sm:text-base font-sans-body text-[#0A1F44]/80 leading-[1.8]"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Pull quote: the shift in politics */}
                <div className="border-l-2 border-[#FF9933] bg-[#F8F6F0] px-5 py-4">
                  <p className="text-base sm:text-lg font-serif-quote text-[#0A1F44] leading-relaxed">
                    <span className="text-[#138808] font-semibold">{t('shift.from')}</span>
                    <span className="mx-2 text-[#0A1F44]/40">→</span>
                    <span className="text-[#8B0000] font-semibold">{t('shift.to')}</span>
                  </p>
                </div>

                {/* Questions */}
                <section>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl font-serif-heading font-bold text-[#0A1F44]">
                      {t('questionsHeading')}
                    </h3>
                    <div className="flex-1 h-px bg-[#0A1F44]/15" />
                  </div>

                  <ol className="divide-y divide-[#0A1F44]/10">
                    {listQuestions.map((q, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                        className="flex items-baseline gap-4 sm:gap-5 py-4"
                      >
                        <span className="shrink-0 w-7 text-right font-serif-display text-xl sm:text-2xl font-bold text-[#FF9933] tabular-nums">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[15px] sm:text-base font-sans-body text-[#0A1F44] leading-relaxed">
                          {q}
                        </span>
                      </motion.li>
                    ))}
                  </ol>

                  {/* Final question — the call to collective responsibility */}
                  {finalQuestion && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + listQuestions.length * 0.04 }}
                      className="mt-4 bg-[#0A1F44] px-5 py-6 sm:px-7 sm:py-7"
                    >
                      <p className="text-[11px] font-sans-body font-semibold uppercase tracking-[0.2em] text-[#FF9933]">
                        {String(questions.length).padStart(2, '0')} · {t('finalLabel')}
                      </p>
                      <p className="mt-3 text-base sm:text-lg font-serif-heading text-white leading-relaxed">
                        {finalQuestion}
                      </p>
                    </motion.div>
                  )}
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-4 sm:px-10 border-t border-[#0A1F44]/10 bg-[#F8F6F0]">
              <p className="text-sm font-serif-quote italic text-[#0A1F44]/70">
                {t('footerNote')}
              </p>
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
