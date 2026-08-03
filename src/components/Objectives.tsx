import React from 'react';
import { Target, Shield, BookOpen, Users, Scale, Landmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = { BookOpen, Shield, Scale, Users, Landmark };

interface ObjectiveItem {
  num: string;
  title: string;
  iconName: string;
  desc: string;
}

export const Objectives: React.FC = () => {
  const { t } = useTranslation('objectives');
  const objectives = t('items', { returnObjects: true }) as ObjectiveItem[];

  return (
    <section id="objectives" className="py-20 bg-[#F8F6F0] text-[#0A1F44] border-b border-[#0A1F44]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#0A1F44]/20 text-[10px] font-sans-body font-semibold text-[#0A1F44] uppercase tracking-[0.25em]">
            <Target className="w-3.5 h-3.5" />
            {t('badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-light text-[#0A1F44] tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-sm sm:text-base font-sans-body text-[#0A1F44]/80 leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Objectives List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj) => {
            const IconComp = ICON_MAP[obj.iconName] || Target;
            return (
              <div
                key={obj.num}
                className="bg-white p-6 border border-[#0A1F44]/15 hover:border-[#0A1F44] hover:shadow-lg transition-all space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#F8F6F0] border border-[#0A1F44]/15 text-[#0A1F44] group-hover:bg-[#0A1F44] group-hover:text-[#F8F6F0] transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-serif-display font-bold text-[#0A1F44]/20 group-hover:text-[#0A1F44]/40 transition-colors">
                    {obj.num}
                  </span>
                </div>

                <h3 className="text-xl font-serif-display font-bold text-[#0A1F44] group-hover:text-[#000080] transition-colors">
                  {obj.title}
                </h3>

                <p className="text-xs font-sans-body text-[#0A1F44]/80 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

