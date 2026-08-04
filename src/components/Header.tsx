import React, { useState } from 'react';
import { Shield, Users, Award, Menu, X, Scale, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollLock } from '../hooks/useScrollLock';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation(['header', 'common']);
  const { isTamil } = useLanguage();

  useScrollLock(isMobileMenuOpen);

  const navLinks: { name: string; href: string; badge?: string }[] = [
    { name: t('common:nav.conference'), href: '#conference', badge: t('common:nav.badgeDate') },
    { name: t('common:nav.demands'), href: '#conference-demands' },
    { name: t('common:nav.whyProtect'), href: '#why-it-matters' },
    { name: t('common:nav.genzHub'), href: '#genz-hub' },
    { name: t('common:nav.coreValues'), href: '#constitutional-values' },
    { name: t('common:nav.responsibilities'), href: '#responsibilities' },
    { name: t('common:nav.whoConducts'), href: '#who-conducts' },
  ];

  const handleNavClick = (href: string) => {
    const wasMobileMenuOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);

    const scrollToTarget = () => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (wasMobileMenuOpen) {
      // Closing the drawer releases the scroll lock, which resets window
      // scroll on its cleanup. Wait a tick so that reset runs first, or it
      // clobbers the scrollIntoView below.
      setTimeout(scrollToTarget, 50);
    } else {
      scrollToTarget();
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
        <div className="flex items-center justify-between min-h-28 sm:min-h-32 md:min-h-32 lg:min-h-36 py-3">

          {/* Institution Brand Seal */}
          <a href="#" className="flex items-center gap-3.5 group min-w-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-[3px] border-[#0A1F44] p-1 bg-white overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={cpmLogoImage}
                alt={t('header:logoAlt')}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="font-serif-display font-bold text-lg sm:text-xl lg:text-2xl text-[#0A1F44] uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight">
                {isTamil ? t('header:orgNameTamil') : t('header:orgNameEnglish')}
              </div>
              <div className="text-xs sm:text-sm font-serif text-[#0A1F44]/75 tracking-wider font-semibold">
                {isTamil ? t('header:orgNameEnglish') : t('header:orgNameTamil')}
              </div>
            </div>
          </a>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
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
          <div className="flex justify-center pb-3 border-b border-[#0A1F44]/10">
            <LanguageSwitcher />
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

