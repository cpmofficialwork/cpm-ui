import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Zap,
  ChevronDown,
  Lightbulb,
  AlertTriangle,
  HeartHandshake,
  BookOpen,
  Megaphone,
  Flag,
  Users,
  Scale,
  Gavel,
  Briefcase,
  Leaf,
  HeartPulse,
  ShieldCheck,
  Quote,
} from 'lucide-react';

interface Right {
  number: string;
  article: string;
  title: string;
  description: string;
  knowThisText: string;
  underPressureText: string;
}

const RIGHT_ICONS = [
  HeartHandshake,
  BookOpen,
  Megaphone,
  Flag,
  Users,
  Scale,
  Gavel,
  Briefcase,
  Leaf,
  HeartPulse,
  ShieldCheck,
];

const CARD_ACCENTS = ['#E63946', '#FF9933', '#00A86B', '#0A1F44'];

export const GenZYouthHub: React.FC = () => {
  const { t } = useTranslation('genZYouthHub');
  const [openIndex, setOpenIndex] = useState<number>(0);
  const rights = t('rights', { returnObjects: true }) as Right[];
  const actions = t('closing.actions', { returnObjects: true }) as string[];

  return (
    <section id="genz-hub" className="py-16 sm:py-24 bg-[#FFF9E6] text-[#0A1F44] border-t-4 border-b-4 border-[#0A1F44] relative overflow-hidden">
      {/* Cartoon Pop Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0A1F44 2.5px, transparent 2.5px)`,
          backgroundSize: '20px 20px'
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A1F44] text-[#FFD700] font-mono text-xs font-black uppercase tracking-widest border-[3px] border-[#0A1F44] shadow-[4px_4px_0px_0px_#FF9933] -rotate-1">
            <Zap className="w-4 h-4 fill-current text-[#FFD700]" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-display font-black text-[#0A1F44] uppercase tracking-tight">
            {t('heading')}
          </h2>

          <p className="text-base sm:text-lg font-sans-body font-bold text-[#0A1F44] max-w-2xl mx-auto leading-snug">
            {t('intro')}
          </p>

          <p className="text-sm sm:text-base font-sans-body font-bold text-[#0A1F44]/70 max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        {/* Rights Accordion */}
        <div className="space-y-4">
          {rights.map((right, idx) => {
            const Icon = RIGHT_ICONS[idx % RIGHT_ICONS.length];
            const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
            const isOpen = openIndex === idx;

            return (
              <div
                key={right.number}
                className="bg-white border-[3px] border-[#0A1F44] shadow-[6px_6px_0px_0px_#0A1F44] transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-mono font-black text-base sm:text-lg text-white border-2 border-[#0A1F44]"
                    style={{ backgroundColor: accent }}
                  >
                    {right.number}
                  </div>

                  <div
                    className="shrink-0 hidden sm:flex w-11 h-11 items-center justify-center border-2 border-[#0A1F44] text-[#0A1F44] bg-[#FFF9E6]"
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider" style={{ color: accent }}>
                      {right.article}
                    </span>
                    <h3 className="text-base sm:text-xl font-serif-display font-black text-[#0A1F44] leading-tight">
                      {right.title}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-[#0A1F44] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 sm:pb-6 pt-1 border-t-2 border-[#0A1F44]/10 space-y-4">
                        <p className="text-sm sm:text-base font-sans-body font-medium text-[#0A1F44]/90 leading-relaxed pt-4">
                          {right.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#FFF9E6] border-2 border-[#0A1F44] p-4 space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#FFD700] text-[#0A1F44] font-mono text-[10px] font-black uppercase tracking-wider border border-[#0A1F44]">
                              <Lightbulb className="w-3.5 h-3.5" />
                              <span>{t('knowThis')}</span>
                            </div>
                            <p className="text-sm font-sans-body font-bold text-[#0A1F44] leading-snug">
                              {right.knowThisText}
                            </p>
                          </div>

                          <div className="bg-[#FFF0F0] border-2 border-[#0A1F44] p-4 space-y-2">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#E63946] text-white font-mono text-[10px] font-black uppercase tracking-wider border border-[#0A1F44]">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>{t('underPressure')}</span>
                            </div>
                            <p className="text-sm font-sans-body font-medium text-[#0A1F44]/90 leading-snug">
                              {right.underPressureText}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Closing Call to Action Banner */}
        <div className="bg-[#0A1F44] border-[3px] border-[#0A1F44] shadow-[8px_8px_0px_0px_#FF9933] p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
          <Quote className="w-10 h-10 text-[#FFD700]/30 mx-auto" />

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD700] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-wider border-2 border-[#0A1F44]">
              {t('closing.eyebrow')}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-white max-w-2xl mx-auto leading-snug">
              {t('closing.title')}
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {actions.map((action, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-white/10 text-[#FFD700] font-mono text-xs font-bold uppercase tracking-wide border border-[#FFD700]/40"
              >
                {action}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/15 space-y-1.5 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base font-sans-body font-black text-white">
              {t('closing.footerLine1')}
            </p>
            <p className="text-sm sm:text-base font-sans-body font-black text-[#FFD700]">
              {t('closing.footerLine2')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
