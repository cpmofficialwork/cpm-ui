import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Users, Award, Menu, X, Scale, Ticket, UserPlus, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
// import { LanguageSwitcher } from './LanguageSwitcher'; // Tamil temporarily disabled — English is primary
import { useLanguage } from '../hooks/useLanguage';
import { useScrollLock } from '../hooks/useScrollLock';
import { ROUTES } from '../routes';
import { EVENTS } from '../data/events';

interface HeaderProps {
  onRegisterMember: () => void;
  isDisabled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRegisterMember, isDisabled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);
  const { t } = useTranslation(['header', 'common']);
  const { isTamil } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  // /join renders the same page as Home (with the pass modal on top), so
  // the in-page anchor links below work there too.
  const isHome = location.pathname === ROUTES.HOME || location.pathname === ROUTES.JOIN;

  useScrollLock(isMobileMenuOpen);

  // A pass/pamphlet modal now covers the header instead of unmounting it
  // (see App.tsx), so force the drawer closed whenever that happens —
  // otherwise it could stay open underneath, covered but still locking
  // scroll, once the modal closes.
  useEffect(() => {
    if (isDisabled) setIsMobileMenuOpen(false);
  }, [isDisabled]);

  // Collapse any expanded accordion item once the drawer itself closes, so
  // it doesn't reopen already-expanded next time.
  useEffect(() => {
    if (!isMobileMenuOpen) setExpandedMobileItem(null);
  }, [isMobileMenuOpen]);

  // Header height varies with viewport width, language (Tamil script wraps
  // differently), and text reflow, so it's measured live rather than
  // hardcoded — a fixed offset would clip or gap the drawer beneath it.
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;
    const updateHeight = () => setHeaderHeight(headerEl.getBoundingClientRect().height);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(headerEl);
    return () => observer.disconnect();
  }, [isTamil]);

  // Runs after useScrollLock's cleanup has cleared `overflow: hidden` from
  // <html>/<body> — scrollIntoView on a still-locked document can't move
  // the page, so this has to wait until the lock from closing the drawer
  // has actually lifted.
  useEffect(() => {
    if (isMobileMenuOpen || !pendingScrollTarget) return;
    const element = document.querySelector(pendingScrollTarget);
    element?.scrollIntoView({ behavior: 'smooth' });
    setPendingScrollTarget(null);
  }, [isMobileMenuOpen, pendingScrollTarget]);

  // "Events" grows a hover dropdown listing every conference — built from
  // src/data/events.ts so adding a future conference there automatically
  // adds it here too, without touching this component.
  const navLinks: {
    name: string;
    href: string;
    badge?: string;
    dropdown?: { name: string; href: string; status: 'concluded' | 'upcoming' }[];
  }[] = [
    {
      name: t('common:nav.events'),
      href: '#events',
      dropdown: EVENTS.map((event) => ({ name: event.title, href: `#event-${event.id}`, status: event.status })),
    },
    { name: t('common:nav.whyProtect'), href: '#why-it-matters' },
    { name: t('common:nav.demands'), href: '#conference-demands' },
    { name: t('common:nav.fourPillars'), href: '#four-pillars' },
    { name: t('common:nav.constitutionalPrinciples'), href: '#constitutional-principles' },
    { name: t('common:nav.coreValues'), href: '#constitutional-values' },
    { name: t('common:nav.responsibilities'), href: '#responsibilities' },
    { name: t('common:nav.genzHub'), href: '#genz-hub' },
    { name: t('common:nav.whoConducts'), href: '#who-conducts' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // The anchor targets only exist on Home/JOIN — from elsewhere (the 404
    // page), just navigate home rather than trying to deep-link a scroll.
    if (!isHome) {
      navigate(ROUTES.HOME);
      return;
    }
    setPendingScrollTarget(href);
  };

  return (
    <>
    <header ref={headerRef} className="w-full bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#0A1F44]/10 text-[#0A1F44]">
      {/* Top Banner Notice — relative z-50 so it stays above page content scrolling underneath the sticky header */}
      <a
        href="#events"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick('#events');
        }}
        className="relative z-50 bg-[#0A1F44] hover:bg-[#06152E] py-2 px-4 text-center text-[11px] font-sans-body border-b border-[#0A1F44]/20 flex items-center justify-center gap-2 text-[#F8F6F0] transition-colors group"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-[#FF9933] animate-ping"></span>
        <span className="uppercase tracking-[0.18em] font-semibold text-[10px] text-[#FF9933]">
         {t('header:topBanner')}
        </span>
      </a>

      {/* relative z-50 so the logo/hamburger row stays above page content scrolling underneath the sticky header */}
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-20 py-2">
          
          {/* Institution Brand Seal */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3.5 group min-w-0">
            <div className="w-12 h-12 rounded-full border-2 border-[#0A1F44] p-0.5 bg-white overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={cpmLogoImage}
                alt={t('header:logoAlt')}
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <div className="font-serif-display font-bold text-base sm:text-lg lg:text-xl text-[#0A1F44] uppercase tracking-[0.08em] sm:tracking-[0.12em] leading-tight">
                {isTamil ? t('header:orgNameTamil') : t('header:orgNameEnglish')}
              </div>
              <div className="text-[10px] sm:text-xs font-serif text-[#0A1F44]/75 tracking-wider font-semibold">
                {isTamil ? t('header:orgNameEnglish') : t('header:orgNameTamil')}
              </div>
            </div>
          </Link>

          {/* Language Switcher — Tamil temporarily disabled, English is primary for now */}
          {/* <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
          </div> */}

          {/* Desktop Join Movement button */}
          <div className="hidden lg:flex items-center shrink-0">
            <motion.button
              onClick={onRegisterMember}
              disabled={isDisabled}
              animate={isDisabled ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="py-2.5 px-5 bg-gradient-to-r from-[#FF9933] to-[#E68900] text-[#0A1F44] font-black text-[11px] uppercase tracking-widest text-center rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t('common:actions.joinMovement')}</span>
            </motion.button>
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
            <div key={link.name} className={link.dropdown ? "relative group/nav" : undefined}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative hover:text-[#0A1F44] hover:font-bold transition-all py-2 border-b-2 border-transparent hover:border-[#0A1F44] flex items-center gap-1 whitespace-nowrap"
              >
                {link.badge && (
                  <span className="absolute -top-2.5 left-0 bg-[#FF9933] text-[#0A1F44] text-[8px] font-mono font-black uppercase px-1.5 py-[1px] rounded shadow-sm tracking-wider whitespace-nowrap leading-none border border-[#0A1F44]/15 animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className={link.badge ? "pt-1" : ""}>{link.name}</span>
                {link.dropdown && <ChevronDown className="w-3 h-3 transition-transform group-hover/nav:rotate-180" />}
              </a>

              {/* Hover dropdown — lists every conference by name; hidden until
                  hovered/focused, built to grow as more events are added. */}
              {link.dropdown && link.dropdown.length > 0 && (
                <div className="invisible opacity-0 translate-y-1 group-hover/nav:visible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-focus-within/nav:translate-y-0 transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[260px]">
                  <div className="bg-white border-2 border-[#0A1F44] rounded-none shadow-[5px_5px_0px_0px_rgba(10,31,68,0.15)] py-2 normal-case tracking-normal">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="group/item flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-sans-body font-semibold text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white transition-colors"
                      >
                        <span className="truncate">{item.name}</span>
                        {item.status === 'concluded' ? (
                          <span className="shrink-0 px-1.5 py-0.5 bg-emerald-50 group-hover/item:bg-emerald-400/20 border border-emerald-300 text-emerald-700 group-hover/item:text-emerald-300 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                            {t('common:nav.eventCompleted')}
                          </span>
                        ) : (
                          <span className="shrink-0 px-1.5 py-0.5 bg-[#FFB800]/10 group-hover/item:bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#B8860B] group-hover/item:text-[#FFD966] rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                            {t('common:nav.eventUpcoming')}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

    </header>

    {/* Mobile Drawer Menu — portaled straight into <body> so its "fixed inset-0"
        sizes against the real viewport. Left inside the header's own DOM subtree,
        it would size against the App-level Framer Motion wrapper instead (any
        ancestor with a `transform` — which motion.div applies — becomes the
        containing block for fixed descendants), squashing it down to just the
        header's own height instead of covering the screen. Scrolls internally so
        the page behind it stays put (locked via useScrollLock) while every link
        stays reachable regardless of how tall the list is.
        z-[55] — above every card-detail modal's z-50 (ConstitutionalValues,
        WhoConducts, the join-movement modal, etc. all portal to <body> too and
        take ~300ms to actually unmount after closing, via their exit animation)
        so a still-fading modal can never render on top of the drawer if the
        menu is opened during that window. This doesn't fight the header bar's
        own z-50, which sits above it spatially (the drawer's `top` starts
        right where the header ends) rather than stacked on it. */}
    {isMobileMenuOpen && createPortal(
      <div
        style={{ top: headerHeight || undefined }}
        className="lg:hidden fixed inset-x-0 bottom-0 top-36 z-[55] bg-[#F8F6F0] overflow-y-auto overscroll-contain px-4 pt-6 pb-6 space-y-4 font-sans-body text-xs animate-fadeIn"
      >
        {/* <div className="flex justify-center pb-3">
          <LanguageSwitcher />
        </div> */}
        <div className="pb-3 border-b border-[#0A1F44]/10">
          <motion.button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onRegisterMember();
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#FF9933] to-[#E68900] text-[#0A1F44] font-black text-xs uppercase tracking-widest text-center rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t('common:actions.joinMovement')}</span>
          </motion.button>
        </div>
        <div className="space-y-1">
          {navLinks.map((link) => {
            const isExpanded = expandedMobileItem === link.name;
            return (
              <div key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.dropdown && link.dropdown.length > 0) {
                      setExpandedMobileItem(isExpanded ? null : link.name);
                    } else {
                      handleNavClick(link.href);
                    }
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
                  {link.dropdown && link.dropdown.length > 0 && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  )}
                </a>

                {/* Expandable conference list — same status badges as the desktop hover dropdown */}
                {link.dropdown && link.dropdown.length > 0 && isExpanded && (
                  <div className="bg-[#0A1F44]/5 space-y-0.5 py-1">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className="flex items-center justify-between gap-3 pl-6 pr-3 py-2.5 text-[#0A1F44]/85 hover:bg-[#0A1F44] hover:text-white transition-colors text-[11px] normal-case tracking-normal font-semibold"
                      >
                        <span className="truncate">{item.name}</span>
                        {item.status === 'concluded' ? (
                          <span className="shrink-0 px-1.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                            {t('common:nav.eventCompleted')}
                          </span>
                        ) : (
                          <span className="shrink-0 px-1.5 py-0.5 bg-[#FFB800]/10 border border-[#FFB800]/40 text-[#B8860B] rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                            {t('common:nav.eventUpcoming')}
                          </span>
                        )}
                      </a>
                    ))}
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="block pl-6 pr-3 py-2.5 text-[#0A1F44]/60 hover:text-[#0A1F44] transition-colors text-[10px] normal-case tracking-normal font-semibold underline"
                    >
                      {t('common:nav.events')} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>,
      document.body
    )}
  </>
  );
};

