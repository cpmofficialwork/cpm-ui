import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Scale, Users, Landmark, Megaphone, CheckCircle2, Share2, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { Scale, Landmark, ShieldAlert, Users };

interface Demand {
  id: number;
  tag: string;
  sticker: string;
  title: string;
  iconName: string;
  tldr: string;
  legalText: string;
}

export const ConferenceDemands: React.FC = () => {
  const { t } = useTranslation('conferenceDemands');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const demands = t('demands', { returnObjects: true }) as Demand[];
  const BADGE_COLORS = ['bg-[#0A1F44] text-[#FFD700]', 'bg-[#D97706] text-white'];

  const handleCopyStory = (id: number, title: string, summary: string) => {
    const textToCopy = t('shareTemplate', { id, title, summary });
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="conference-demands" className="py-16 sm:py-24 bg-[#FFFDF5] text-[#0A1F44] border-t-4 border-[#0A1F44] relative overflow-hidden">
      {/* Cartoon Pop Dot Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0A1F44 2px, transparent 2px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Comic Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 max-w-3xl mx-auto relative"
        >
          {/* Comic Action Sticker Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-widest border-[3px] border-[#0A1F44] shadow-[4px_4px_0px_0px_#0A1F44] -rotate-1 hover:rotate-0 transition-transform">
            <Megaphone className="w-4 h-4 text-[#8B0000]" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif-display font-black text-[#0A1F44] tracking-tight uppercase">
            {t('heading')}
          </h2>

          <p className="text-sm sm:text-base font-sans-body font-bold text-[#0A1F44]/90 max-w-2xl mx-auto">
            {t('subheadingPre')}{' '}
            <span className="underline decoration-[#FF9933] decoration-4">{t('conferenceName')}</span>{' '}
            {t('subheadingPost')}
          </p>
        </motion.div>

        {/* 4 Demands Comic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {demands.map((demand, index) => {
            const Icon = ICON_MAP[demand.iconName] || Scale;
            const badgeColor = BADGE_COLORS[index % 2];
            const isCopied = copiedId === demand.id;

            return (
              <motion.div
                key={demand.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white border-[3px] border-[#0A1F44] p-6 sm:p-8 shadow-[6px_6px_0px_0px_#0A1F44] hover:shadow-[10px_10px_0px_0px_#FF9933] hover:-translate-y-1 transition-all flex flex-col justify-between space-y-5 relative group"
              >
                {/* Comic Sticker Banner */}
                <div className="absolute -top-3.5 left-6 px-3 py-0.5 bg-[#FF9933] text-[#0A1F44] font-mono text-[10px] font-black uppercase tracking-widest border-2 border-[#0A1F44] shadow-[2px_2px_0px_0px_#0A1F44]">
                  {demand.sticker}
                </div>

                <div className="space-y-4 pt-1">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 border-b-2 border-[#0A1F44]/15 pb-3">
                    <span className={`px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider border border-[#0A1F44] ${badgeColor}`}>
                      {demand.tag}
                    </span>
                    <span className="font-mono text-xs font-black text-[#D97706] bg-[#FFD700]/30 px-2 py-0.5 border border-[#0A1F44]">
                      {t('demandNumber', { id: demand.id })}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#FFD700] border-2 border-[#0A1F44] text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-[#FFD700] transition-colors shrink-0 mt-0.5 shadow-[2px_2px_0px_0px_#0A1F44]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif-display font-black text-[#0A1F44] leading-snug">
                      {demand.title}
                    </h3>
                  </div>

                  {/* Official Resolution Text */}
                  <div className="pt-1 min-h-[110px] flex items-center">
                    <div className="text-xs sm:text-sm font-sans-body text-[#0A1F44] leading-relaxed text-justify pt-1 font-medium">
                      {demand.legalText}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t-2 border-[#0A1F44]/15 flex items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-[#0A1F44]/70 font-bold flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0A1F44]" />
                    <span>{t('footerLabel')}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyStory(demand.id, demand.title, demand.tldr)}
                    className="px-3 py-1.5 bg-[#0A1F44] hover:bg-[#D97706] text-[#FFD700] hover:text-white font-mono text-[11px] font-black uppercase tracking-wider border-2 border-[#0A1F44] shadow-[2px_2px_0px_0px_#FFD700] transition-all flex items-center gap-1.5 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                    title={t('shareTooltip')}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FFD700]" />
                        <span>{t('copied')}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{t('shareStory')}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cartoon Speech-Bubble Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A1F44] text-[#F8F6F0] border-[4px] border-[#0A1F44] p-6 sm:p-10 shadow-[8px_8px_0px_0px_#FFD700] relative space-y-6 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-white/20 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FFD700] text-[#0A1F44] border-2 border-[#0A1F44] font-black shadow-[3px_3px_0px_0px_#0A1F44] rotate-3 shrink-0">
                <Sparkles className="w-6 h-6 text-[#0A1F44]" />
              </div>
              <div>
                <div className="text-xs font-mono font-black text-[#FFD700] uppercase tracking-widest flex items-center gap-2">
                  <span>{t('cta.badge')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-black text-white uppercase tracking-tight">
                  {t('cta.title')}
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 bg-[#FF9933] text-[#0A1F44] font-mono text-xs font-black uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_0px_#0A1F44]">
              {t('cta.venue')}
            </div>
          </div>

          <p
            className="text-sm sm:text-base font-sans-body text-white/95 leading-relaxed font-semibold"
            dangerouslySetInnerHTML={{ __html: t('cta.body') }}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs font-black text-[#FFD700] border-t-2 border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#FF9933] border border-white rounded-full animate-ping" />
              <span>{t('cta.dateTime')}</span>
            </div>
            <div className="uppercase">{t('cta.hashtags')}</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

