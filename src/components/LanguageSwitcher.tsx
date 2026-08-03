import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { t } = useTranslation('common');
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('language.switchTo')}
      className={`inline-flex items-center rounded-full border border-[#0A1F44]/20 bg-white/60 p-0.5 text-[11px] font-bold uppercase tracking-wider ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('ta')}
        aria-pressed={language === 'ta'}
        className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
          language === 'ta' ? 'bg-[#0A1F44] text-[#F8F6F0]' : 'text-[#0A1F44]/70 hover:text-[#0A1F44]'
        }`}
      >
        {t('language.tamil')}
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
          language === 'en' ? 'bg-[#0A1F44] text-[#F8F6F0]' : 'text-[#0A1F44]/70 hover:text-[#0A1F44]'
        }`}
      >
        {t('language.english')}
      </button>
    </div>
  );
};
