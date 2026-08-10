import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Vote, Sun, Landmark, Gavel, HeartHandshake, ScrollText } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { Vote, Sun, Landmark, Gavel, HeartHandshake };
const ACCENT_COLORS = ['#0A1F44', '#138808', '#FF9933', '#8B0000', '#D97706'];

interface Principle {
  title: string;
  tagline: string;
  iconName: string;
  description: string;
}

export const ConstitutionalPrinciples: React.FC = () => {
  const { t } = useTranslation('constitutionalPrinciples');
  const principles = t('principles', { returnObjects: true }) as Principle[];

  return (
    <section id="constitutional-principles" className="py-16 sm:py-24 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <ScrollText className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Vertical Spine — every principle visible at once, alternating sides on desktop */}
        <div className="mt-16">
          {principles.map((principle, idx) => {
            const IconComp = ICON_MAP[principle.iconName] || ScrollText;
            const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
            const isEven = idx % 2 === 0;
            const isFirst = idx === 0;
            const isLast = idx === principles.length - 1;

            const node = (
              <div className="flex flex-col items-center h-full">
                <div className={`w-px flex-1 bg-[#0A1F44]/15 ${isFirst ? 'opacity-0' : ''}`} />
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center border-2 bg-[#F8F6F0] my-1"
                  style={{ borderColor: accent, color: accent }}
                >
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className={`w-px flex-1 bg-[#0A1F44]/15 ${isLast ? 'opacity-0' : ''}`} />
              </div>
            );

            const card = (
              <div className="bg-white border border-[#0A1F44]/15 p-5 sm:p-6 space-y-2 shadow-sm">
                <span
                  className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold"
                  style={{ color: accent }}
                >
                  {t('principleLabel', { num: idx + 1 })}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#0A1F44] leading-snug">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif-quote italic leading-snug" style={{ color: accent }}>
                  {principle.tagline}
                </p>
                <p className="text-xs sm:text-sm font-sans-body text-[#0A1F44]/80 leading-relaxed pt-1">
                  {principle.description}
                </p>
              </div>
            );

            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
              >
                {/* Mobile: fixed left spine, card to the right */}
                <div className="sm:hidden flex gap-4">
                  <div className="w-12 shrink-0">{node}</div>
                  <div className="flex-1 min-w-0 py-4">{card}</div>
                </div>

                {/* Desktop: alternating sides around a centered spine */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_64px_1fr]">
                  <div className="py-4 pr-8">{isEven ? card : null}</div>
                  <div>{node}</div>
                  <div className="py-4 pl-8">{isEven ? null : card}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
