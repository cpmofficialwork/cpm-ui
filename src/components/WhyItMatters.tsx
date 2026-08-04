import React, { useState } from 'react';
import { Scale, Feather, Equal, HeartHandshake, BookOpen, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import constituentHistoryImage from '../assets/images/constituent_assembly_history_1785566166948.jpg';
import ambedkarPortrait from '../assets/images/ambedkar_portrait.jpg';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { Scale, Feather, Equal, HeartHandshake };

interface Pillar {
  title: string;
  slogan: string;
  iconName: string;
  description: string;
  articles: string;
  quote: string;
}

export const WhyItMatters: React.FC = () => {
  const { t } = useTranslation('whyItMatters');
  const [activePillar, setActivePillar] = useState<number>(0);
  const pillars = t('pillars', { returnObjects: true }) as Pillar[];
  const duties = t('pillarsSection.duties', { returnObjects: true }) as string[];

  return (
    <section id="why-it-matters" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <BookOpen className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Quote Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto bg-[#EAE8E0] p-8 sm:p-12 border border-[#0A1F44]/15 shadow-sm relative text-center space-y-4"
        >
          <Quote className="w-10 h-10 text-[#0A1F44]/20 absolute top-6 left-6" />
          <div className="relative z-10 space-y-4">
            <div className="flex justify-center">
              <img
                src={ambedkarPortrait}
                alt="Dr. B. R. Ambedkar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-[#0A1F44]/15 shadow-md"
              />
            </div>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif-quote italic text-[#0A1F44] leading-relaxed">
              "{t('quoteCard.quote1')} <br />
              {t('quoteCard.quote2')}"
            </blockquote>
            <div className="pt-2 font-serif-display font-bold text-[#0A1F44] text-sm sm:text-base tracking-wider uppercase">
              {t('quoteCard.author')}
            </div>
            <div className="text-[10px] font-sans-body text-[#0A1F44]/60 uppercase tracking-[0.2em]">
              {t('quoteCard.authorTitle')}
            </div>
          </div>
        </motion.div>

        {/* Why Must We Protect the Constitution? - Full Essay Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white p-8 sm:p-12 border-2 border-[#0A1F44]/20 shadow-md space-y-6"
        >
          <div className="border-b border-[#0A1F44]/15 pb-4">
            <div className="text-[10px] font-mono text-[#FF9933] font-bold uppercase tracking-[0.25em] mb-1">
              {t('essay.label')}
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif-display font-bold text-[#0A1F44]">
              {t('essay.title')}
            </h3>
          </div>

          <div className="space-y-4 font-sans-body text-sm sm:text-base text-[#0A1F44]/90 leading-relaxed">
            <p className="font-semibold text-[#0A1F44] border-l-4 border-[#FF9933] pl-4 py-1 bg-[#F8F6F0]">
              {t('essay.para1')}
            </p>

            <p>
              {t('essay.para2')}
            </p>

            <p>
              {t('essay.para3')}
            </p>

            <p>
              {t('essay.para4')}
            </p>

            <p>
              {t('essay.para5')}
            </p>

            <p>
              {t('essay.para6')}
            </p>

            <div className="p-4 bg-[#0A1F44] text-[#F8F6F0] border border-[#0A1F44] font-serif-display text-base sm:text-lg italic leading-relaxed my-4">
              {t('essay.pullQuote')}
            </div>

            <p className="font-semibold text-[#138808]">
              {t('essay.closingLine')}
            </p>
          </div>
        </motion.div>

        {/* Four Monumental Pillars of the Preamble */}
        <div className="mt-16 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#0A1F44]">
              {t('pillarsSection.title')}
            </h3>
            <p className="text-xs font-sans-body text-[#0A1F44]/70 mt-1 uppercase tracking-wider">
              {t('pillarsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = ICON_MAP[pillar.iconName] || Scale;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.title}
                  onClick={() => setActivePillar(idx)}
                  className={`text-left p-6 transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#0A1F44] text-[#F8F6F0] shadow-xl border border-[#0A1F44]'
                      : 'bg-white text-[#0A1F44] border border-[#0A1F44]/15 hover:border-[#0A1F44]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 border ${isSelected ? 'border-white/20 bg-white/10' : 'border-[#0A1F44]/15 bg-[#F8F6F0]'}`}>
                      <IconComp className={`w-5 h-5 ${isSelected ? 'text-[#FF9933]' : 'text-[#0A1F44]'}`} />
                    </div>
                    <span className={`text-[10px] font-mono ${isSelected ? 'opacity-60' : 'text-[#0A1F44]/50'}`}>{t('pillarsSection.pillarLabel', { num: idx + 1 })}</span>
                  </div>

                  <h4 className="text-xl font-serif-display font-bold tracking-wider">
                    {pillar.title}
                  </h4>
                  <p className={`text-xs font-serif-quote italic mt-1 ${isSelected ? 'text-[#FF9933]' : 'text-[#0A1F44]/70'}`}>
                    {pillar.slogan}
                  </p>

                  <div className={`mt-4 pt-3 border-t text-xs font-sans-body line-clamp-3 leading-relaxed ${isSelected ? 'border-white/15 opacity-80' : 'border-[#0A1F44]/10 text-[#0A1F44]/75'}`}>
                    {pillar.description}
                  </div>

                  <div className={`mt-4 text-[11px] font-mono flex items-center justify-between ${isSelected ? 'text-[#FF9933]' : 'text-[#0A1F44] font-semibold'}`}>
                    <span>{pillar.articles}</span>
                    <span className="underline">{t('pillarsSection.explore')}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Expanded Detail Card */}
          <div className="bg-[#0A1F44] text-[#F8F6F0] p-6 sm:p-8 border border-[#0A1F44] shadow-xl mt-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/15 pb-4 mb-4">
              <div>
                <div className="text-[10px] font-mono text-[#FF9933] uppercase tracking-[0.2em]">
                  {t('pillarsSection.analysisLabel', { num: activePillar + 1 })}
                </div>
                <h4 className="text-2xl font-serif-display font-bold text-[#F8F6F0] mt-1">
                  {pillars[activePillar].title} — {pillars[activePillar].slogan}
                </h4>
              </div>
              <div className="px-3 py-1 bg-white/10 border border-white/20 text-xs font-mono text-[#F8F6F0]">
                {t('pillarsSection.articlesLabel', { articles: pillars[activePillar].articles })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans-body">
              <div className="space-y-3">
                <p className="opacity-90 leading-relaxed text-xs sm:text-sm">
                  {pillars[activePillar].description}
                </p>
                <div className="p-4 bg-white/5 border-l-2 border-[#FF9933] text-xs font-serif-quote italic text-[#F8F6F0]">
                  "{pillars[activePillar].quote}"
                </div>
              </div>

              <div className="bg-[#06152E] p-4 border border-white/10 space-y-3">
                <div className="text-xs font-bold font-serif-display text-[#FF9933] uppercase tracking-wider">
                  {t('pillarsSection.citizenDuty')}
                </div>
                <ul className="space-y-2 text-xs opacity-80">
                  {duties.map((duty) => (
                    <li key={duty} className="flex items-start gap-2">
                      <span className="text-[#138808] font-bold">✓</span>
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

