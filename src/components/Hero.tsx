import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onWhyProtectClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onWhyProtectClick }) => {
  const { t } = useTranslation('hero');
  return (
    <section className="bg-[#F8F6F0] text-[#0A1F44] font-serif-heading border-b border-[#0A1F44]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Editorial Headline & Copy (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 z-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#0A1F44]/20 bg-[#F8F6F0] text-[10px] uppercase tracking-[0.25em] font-sans-body font-semibold text-[#0A1F44]"
            >
              <span className="w-1.5 h-1.5 bg-[#FF9933]"></span>
              {t('badge')}
            </motion.div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] leading-[1.05] font-light tracking-tight font-serif-display text-[#0A1F44]">
              {t('headlinePart1')} <span className="italic font-normal text-[#0A1F44]">{t('headlineEmphasis')}</span>. <br />
              {t('headlinePart2')}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-sans-body text-[#0A1F44]/80 leading-relaxed max-w-2xl">
              {t('subheading')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreClick}
                className="px-10 py-4 bg-[#0A1F44] text-[#F8F6F0] text-xs font-sans-body uppercase tracking-[0.2em] font-semibold hover:bg-[#000080] transition-colors cursor-pointer text-center shadow-md"
              >
                {t('exploreValues')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onWhyProtectClick}
                className="px-10 py-4 border border-[#0A1F44] text-[#0A1F44] text-xs font-sans-body uppercase tracking-[0.2em] font-semibold hover:bg-[#0A1F44]/5 transition-colors cursor-pointer text-center"
              >
                {t('whyProtect')}
              </motion.button>
            </div>

            {/* Indicator Metrics */}
            <div className="pt-8 border-t border-[#0A1F44]/10 grid grid-cols-2 sm:grid-cols-3 gap-6 font-sans-body">
              <motion.div whileHover={{ y: -2 }}>
                <span className="block text-2xl font-bold font-serif-display text-[#0A1F44]">{t('metrics.values')}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#0A1F44]/60">{t('metrics.corePrinciples')}</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <span className="block text-2xl font-bold font-serif-display text-[#138808]">{t('metrics.equalRights')}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#0A1F44]/60">{t('metrics.citizenEqualRights')}</span>
              </motion.div>
              <motion.div whileHover={{ y: -2 }}>
                <span className="block text-2xl font-bold font-serif-display text-[#FF9933]">{t('metrics.partIII')}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#0A1F44]/60">{t('metrics.fundamentalRights')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Prestige Document Card Widget (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[400px] bg-[#EAE8E0] border border-[#0A1F44]/15 shadow-2xl p-8 flex flex-col justify-between min-h-[500px]">
              
              <div className="border-b border-[#0A1F44]/20 pb-4 flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-widest text-[#0A1F44]/60 font-sans-body font-semibold">
                  {t('card.documentRef')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#0A1F44]/60 font-sans-body italic">
                  {t('card.prestigeEdition')}
                </span>
              </div>

              <div className="my-auto py-8 flex flex-col items-center text-center px-4 space-y-4">
                {/* Official Movement Seal Emblem */}
                <div className="w-24 h-24 rounded-full border-2 border-[#0A1F44] p-1 bg-white shadow-lg overflow-hidden mb-1">
                  <img
                    src={cpmLogoImage}
                    alt={t('card.logoAlt')}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h3 className="text-2xl font-normal font-serif-display italic text-[#0A1F44]">
                  {t('card.wePeople')}
                </h3>

                <p className="text-xs leading-relaxed font-sans-body text-[#0A1F44]/75 italic max-w-xs">
                  {t('card.description')}
                </p>
              </div>

              <div className="pt-6 border-t border-[#0A1F44]/15 flex justify-between items-center font-sans-body">
                <div className="flex flex-col">
                  <span className="text-xl font-bold font-serif-display text-[#0A1F44] tracking-tight">
                    {t('card.citizensCount')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#0A1F44]/60">
                    {t('card.citizensPledged')}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#0A1F44]/30 flex items-center justify-center opacity-60">
                  <div className="w-6 h-6 rounded-full border border-[#0A1F44]/30"></div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Core Pillars Bar */}
      <section className="bg-[#0A1F44] text-[#F8F6F0] py-8 px-4 sm:px-8 border-t border-[#0A1F44]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-16 w-full md:w-auto">
            <motion.div whileHover={{ y: -2 }} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans-body">{t('pillars.pillar1')}</span>
              <span className="text-lg sm:text-xl tracking-wider font-serif-display font-medium">{t('pillars.justice')}</span>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans-body">{t('pillars.pillar2')}</span>
              <span className="text-lg sm:text-xl tracking-wider font-serif-display font-medium">{t('pillars.liberty')}</span>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans-body">{t('pillars.pillar3')}</span>
              <span className="text-lg sm:text-xl tracking-wider font-serif-display font-medium">{t('pillars.equality')}</span>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-sans-body">{t('pillars.pillar4')}</span>
              <span className="text-lg sm:text-xl tracking-wider font-serif-display font-medium">{t('pillars.fraternity')}</span>
            </motion.div>
          </div>

          <div className="text-left md:text-right md:border-l border-white/20 md:pl-12 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
            <span className="block text-[9px] uppercase tracking-widest opacity-60 font-sans-body mb-0.5">{t('headquarters')}</span>
            <span className="block text-xs uppercase tracking-wider font-medium">{t('headquartersName')}</span>
          </div>
        </div>
      </section>
    </section>
  );
};

