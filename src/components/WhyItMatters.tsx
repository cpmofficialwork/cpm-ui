import React from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import constituentHistoryImage from '../assets/images/constituent_assembly_history_1785566166948.jpg';

export const WhyItMatters: React.FC = () => {
  const { t } = useTranslation('whyItMatters');

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

        {/* Intro Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto bg-[#EAE8E0] p-8 sm:p-12 border border-[#0A1F44]/15 shadow-sm relative space-y-4"
        >
          <p className="text-base sm:text-lg font-serif-quote text-[#0A1F44] leading-relaxed">
            {t('intro.para1')}
          </p>
          <p className="text-base sm:text-lg font-serif-quote text-[#0A1F44] leading-relaxed">
            {t('intro.para2')}
          </p>
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
          </div>
        </motion.div>

      </div>
    </section>
  );
};

