import React, { useState } from 'react';
import { BookOpen, Users, HeartHandshake, GraduationCap, ShieldCheck, CheckSquare, Square, MousePointerClick } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { BookOpen, Users, HeartHandshake, GraduationCap, ShieldCheck };

interface ResponsibilityItem {
  id: string;
  title: string;
  action: string;
  iconName: string;
  description: string;
  commitment: string;
}

export const CitizenResponsibilities: React.FC = () => {
  const { t } = useTranslation('citizenResponsibilities');
  const [completedActions, setCompletedActions] = useState<string[]>(['learn-preamble']);
  const responsibilities = t('items', { returnObjects: true }) as ResponsibilityItem[];

  const toggleAction = (id: string) => {
    setCompletedActions((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <section id="responsibilities" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#138808]" />
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </motion.div>

        {/* 5 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
          {responsibilities.map((resp, idx) => {
            const IconComp = ICON_MAP[resp.iconName] || ShieldCheck;
            const isCompleted = completedActions.includes(resp.id);
            return (
              <motion.div
                key={resp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => toggleAction(resp.id)}
                className={`p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                  isCompleted
                    ? 'bg-[#0A1F44] text-[#F8F6F0] border-[#0A1F44] shadow-xl'
                    : 'bg-white text-[#0A1F44] border-[#0A1F44]/15 hover:border-[#0A1F44] hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 border ${isCompleted ? 'border-white/20 bg-white/10 text-[#FF9933]' : 'border-[#0A1F44]/15 bg-[#F8F6F0] text-[#0A1F44]'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <button className={isCompleted ? 'text-[#FF9933]' : 'text-[#0A1F44]/30'}>
                      {isCompleted ? (
                        <CheckSquare className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5 group-hover:text-[#0A1F44]" />
                      )}
                    </button>
                  </div>

                  <span className={`text-[10px] font-mono ${isCompleted ? 'opacity-60' : 'text-[#0A1F44]/50'}`}>
                    {t('dutyLabel', { num: idx + 1 })}
                  </span>
                  <h3 className="text-lg font-serif-display font-bold mt-1">
                    {resp.title}
                  </h3>
                  <p className={`text-xs font-serif-quote italic mt-1 ${isCompleted ? 'text-[#FF9933]' : 'text-[#0A1F44]/70'}`}>
                    {resp.action}
                  </p>

                  <p className={`mt-3 text-xs font-sans-body leading-relaxed ${isCompleted ? 'opacity-85' : 'text-[#0A1F44]/80'}`}>
                    {resp.description}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-[11px] font-sans-body flex items-center gap-1.5 ${isCompleted ? 'border-white/15 text-[#FF9933]' : 'border-[#0A1F44]/10 text-[#0A1F44] font-semibold'}`}>
                  {isCompleted ? (
                    <CheckSquare className="w-3 h-3" />
                  ) : (
                    <MousePointerClick className="w-3 h-3" />
                  )}
                  <span>{isCompleted ? t('pledgedActive') : t('clickToCommit')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commitment Summary Tracker */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white p-6 border border-[#0A1F44]/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-[10px] font-mono text-[#0A1F44]/60 uppercase font-semibold">{t('progressLabel')}</div>
            <div className="text-base font-serif-display font-bold text-[#0A1F44]">
              {t('progressText', { count: completedActions.length })}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-48 bg-[#F8F6F0] h-3 border border-[#0A1F44]/15 overflow-hidden">
              <div
                className="bg-[#0A1F44] h-full transition-all duration-500"
                style={{ width: `${(completedActions.length / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono text-[#0A1F44] font-bold">
              {Math.round((completedActions.length / 5) * 100)}%
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
