import React, { useState } from 'react';
import { Shield, Users, Award, Menu, X, Scale, Ticket, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';

interface HeaderProps {
  onRegisterMember: () => void;
  isDisabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterMember }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation(['header', 'common']);
  const { isTamil } = useLanguage();

  const navLinks = [
    { name: t('common:nav.conference'), href: '#conference', badge: t('common:nav.badgeDate') },
    { name: t('common:nav.whoConducts'), href: '#who-conducts' },
    { name: t('common:nav.whyProtect'), href: '#why-it-matters' },
    { name: t('common:nav.demands'), href: '#conference-demands' },
    { name: t('common:nav.genzHub'), href: '#genz-hub' },
    { name: t('common:nav.coreValues'), href: '#constitutional-values' },
    { name: t('common:nav.responsibilities'), href: '#responsibilities' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#0A1F44]/10 text-[#0A1F44]">
      {/* Top Banner Notice */}
      <a href="#conference" className="bg-[#0A1F44] hover:bg-[#06152E] py-2 px-4 text-center text-[11px] font-sans-body border-b border-[#0A1F44]/20 flex items-center justify-center gap-2 text-[#F8F6F0] transition-colors group">
        <span className="inline-block w-2 h-2 rounded-full bg-[#FF9933] animate-ping"></span>
        <span className="uppercase tracking-[0.18em] font-semibold text-[10px] text-[#FF9933]">
         {t('header:topBanner')}
        </span>
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 py-2">
          
          {/* Institution Brand Seal */}
          <a href="#" className="flex items-center gap-3.5 group min-w-0">
            <div className="w-12 h-12 rounded-full border-2 border-[#0A1F44] p-0.5 bg-white overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={cpmLogoImage}
                alt={t('header:logoAlt')}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="font-serif-display font-bold text-sm sm:text-base lg:text-lg text-[#0A1F44] uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight">
                {isTamil ? t('header:orgNameTamil') : t('header:orgNameEnglish')}
              </div>
              <div className="text-[9px] sm:text-[10px] font-serif text-[#0A1F44]/75 tracking-wider font-semibold">
                {isTamil ? t('header:orgNameEnglish') : t('header:orgNameTamil')}
              </div>
            </div>
          </a>

          {/* Right CTA Button: Join the Movement */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <button
              onClick={onRegisterMember}
              className="px-5 py-2.5 bg-gradient-to-r from-[#FF9933] via-[#FFA000] to-[#E68900] text-[#0A1F44] font-black text-xs uppercase tracking-[0.18em] rounded-xl hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-[#FFE082] shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4 text-[#0A1F44]" />
              <span>{t('common:actions.joinMovement')}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0A1F44] hover:bg-[#0A1F44]/5 transition-colors border border-[#0A1F44]/20"
              aria-label={t('header:toggleMenu')}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center flex-wrap gap-x-8 gap-y-1 py-2.5 text-[11px] font-sans-body uppercase tracking-[0.18em] font-semibold text-[#0A1F44]/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="relative hover:text-[#0A1F44] hover:font-bold transition-all py-2 border-b-2 border-transparent hover:border-[#0A1F44] flex items-center whitespace-nowrap"
            >
              {link.badge && (
                <span className="absolute -top-2.5 left-0 bg-[#FF9933] text-[#0A1F44] text-[8px] font-mono font-black uppercase px-1.5 py-[1px] rounded shadow-sm tracking-wider whitespace-nowrap leading-none border border-[#0A1F44]/15 animate-pulse">
                  {link.badge}
                </span>
              )}
              <span className={link.badge ? "pt-1" : ""}>{link.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F6F0] border-b border-[#0A1F44]/20 px-4 pt-4 pb-6 space-y-4 font-sans-body text-xs animate-fadeIn">
          <div className="flex justify-center pb-3">
            <LanguageSwitcher />
          </div>
          <div className="pb-3 border-b border-[#0A1F44]/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onRegisterMember();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FF9933] to-[#E68900] text-[#0A1F44] font-black text-xs uppercase tracking-widest text-center rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('common:actions.joinMovement')}</span>
            </button>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative flex items-center justify-between px-3 py-3 border-b border-[#0A1F44]/5 text-[#0A1F44] hover:bg-[#0A1F44] hover:text-[#F8F6F0] transition-colors text-xs uppercase tracking-widest font-medium"
              >
                <div className="flex items-center gap-2">
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-1.5 py-0.5 bg-[#FF9933] text-[#0A1F44] text-[9px] font-mono font-extrabold uppercase rounded shadow-sm border border-[#0A1F44]/20 animate-pulse">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

