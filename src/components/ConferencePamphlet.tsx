import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  BookOpen, 
  X, 
  Share2, 
  MapPin, 
  CheckCircle2, 
  Shield, 
  Sparkles, 
  Calendar, 
  Clock,
  ExternalLink,
  Navigation,
  FileText,
  PhoneCall,
  User,
  Check
} from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { useLanguage } from '../hooks/useLanguage';
import leaderImg from '../assets/images/leader_portrait_1785579952921.jpg';
import cpmLogoImage from '../assets/images/cpm_official_logo_1785581949419.jpg';
import pamphletCoverImg from '../assets/images/pamphlet_cover_page1.png';
import pamphletCoverImgTa from '../assets/images/pamphlet_cover_page1_ta.png';

interface ConferencePamphletProps {
  isOpen?: boolean;
  onClose?: () => void;
  hideBanner?: boolean;
}

export const ConferencePamphlet: React.FC<ConferencePamphletProps> = ({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose,
  hideBanner = false
}) => {
  const { t } = useTranslation('conferencePamphlet');
  const { isTamil } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasPledged, setHasPledged] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  // Control modal state from props or internal state
  const isModalOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // Auto scroll content viewport to top when switching pages
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    setInternalIsOpen(true);
    setCurrentPage(1);
  };

  // Keyboard arrow listener for page navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(prev + 1, 4));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  useScrollLock(isModalOpen);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('share.navigatorTitle'),
        text: t('share.navigatorText'),
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const mapUrl = "https://maps.app.goo.gl/fAhXKpBMDZ7FF6KL7";

  return (
    <>
      {/* 4-PAGE PAMPHLET BANNER & PREVIEW TRIGGER (Embedded Card in Page) */}
      {!hideBanner && (
        <div className="bg-gradient-to-br from-[#8B0000] via-[#C41E3A] to-[#600000] border-2 border-[#FFD700] rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(196,30,58,0.3)] relative overflow-hidden my-8 text-white">
          {/* Background Decorative Metallic Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Column: Title & Description */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD700] text-[#8B0000] font-mono text-[11px] font-black uppercase tracking-widest rounded-none border border-[#FFD700] shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('banner.badge')}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif-display font-bold text-white leading-tight">
                {t('banner.title')}
              </h3>

              <p className="text-xs sm:text-sm text-white/90 font-sans-body leading-relaxed">
                {t('banner.description')}
              </p>

              {/* Quick Page Content Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px] text-white">
                <div 
                  onClick={() => { setInternalIsOpen(true); setCurrentPage(1); }}
                  className="p-2 bg-white/10 hover:bg-[#FFD700] hover:text-[#8B0000] border border-white/30 transition-all rounded-none cursor-pointer text-center"
                >
                  <div className="font-bold uppercase text-[#FFD700] hover:text-[#8B0000]">{t('banner.pages.page1Label')}</div>
                  <div className="truncate">{t('banner.pages.page1Title')}</div>
                </div>
                <div
                  onClick={() => { setInternalIsOpen(true); setCurrentPage(2); }}
                  className="p-2 bg-white/10 hover:bg-[#FFD700] hover:text-[#8B0000] border border-white/30 transition-all rounded-none cursor-pointer text-center"
                >
                  <div className="font-bold uppercase text-[#FFD700] hover:text-[#8B0000]">{t('banner.pages.page2Label')}</div>
                  <div className="truncate">{t('banner.pages.page2Title')}</div>
                </div>
                <div
                  onClick={() => { setInternalIsOpen(true); setCurrentPage(3); }}
                  className="p-2 bg-white/10 hover:bg-[#FFD700] hover:text-[#8B0000] border border-white/30 transition-all rounded-none cursor-pointer text-center"
                >
                  <div className="font-bold uppercase text-[#FFD700] hover:text-[#8B0000]">{t('banner.pages.page3Label')}</div>
                  <div className="truncate">{t('banner.pages.page3Title')}</div>
                </div>
                <div
                  onClick={() => { setInternalIsOpen(true); setCurrentPage(4); }}
                  className="p-2 bg-white/10 hover:bg-[#FFD700] hover:text-[#8B0000] border border-white/30 transition-all rounded-none cursor-pointer text-center"
                >
                  <div className="font-bold uppercase text-[#FFD700] hover:text-[#8B0000]">{t('banner.pages.page4Label')}</div>
                  <div className="truncate">{t('banner.pages.page4Title')}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={handleOpen}
                  className="px-6 py-3 bg-[#FFD700] hover:bg-white text-[#8B0000] font-mono text-xs uppercase font-extrabold tracking-widest rounded-none border-2 border-[#FFD700] shadow-[4px_4px_0px_0px_rgba(255,215,0,0.3)] hover:shadow-none transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('banner.openButton')}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Exact Page 1 Preview Card */}
            <div
              onClick={handleOpen}
              className="shrink-0 relative cursor-pointer group w-full max-w-xs sm:max-w-sm"
              title={t('banner.previewClickToView')}
            >
              {/* Stack effect */}
              <div className="absolute inset-0 bg-[#C41E3A] translate-x-3 translate-y-3 border-2 border-[#0A1F44] opacity-80 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="absolute inset-0 bg-[#0A1F44] translate-x-1.5 translate-y-1.5 border-2 border-[#0A1F44] opacity-90 transition-transform group-hover:translate-x-2.5 group-hover:translate-y-2.5" />

              {/* Red-White Booklet Cover Card */}
              <div className="relative bg-white text-[#0A1F44] border-4 border-[#8B0000] rounded-none shadow-2xl overflow-hidden group-hover:-translate-y-1 transition-transform">
                
                {/* Red Top Curve Area */}
                <div className="bg-[#C41E3A] text-white p-5 text-center relative overflow-hidden space-y-3">
                  <div className="flex items-center justify-between border-b border-white/30 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span>{t('banner.officialPamphlet')}</span>
                    <span className="px-1.5 py-0.5 bg-white text-[#C41E3A] font-bold">{t('banner.fourPages')}</span>
                  </div>

                  {/* Emblem Raised Hand Illustration Styling */}
                  <div className="w-16 h-16 mx-auto bg-white rounded-full p-2 border-2 border-[#FFD700] shadow-md flex items-center justify-center">
                    <Shield className="w-10 h-10 text-[#C41E3A]" />
                  </div>

                  <h4 className="text-xl font-serif-display font-black text-white leading-tight">
                    {t('banner.coverTitle')}
                  </h4>

                  <div className="text-xs font-mono font-bold text-[#FFD700]">
                    {t('banner.coverDateTime')}
                  </div>
                </div>

                {/* White Bottom Section */}
                <div className="p-4 bg-white text-center space-y-3">
                  <div className="text-[11px] font-mono font-bold text-[#0A1F44] leading-snug">
                    {t('banner.coverVenue')}
                  </div>

                  <div className="pt-2 border-t border-[#0A1F44]/15 flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="text-[#C41E3A]">{t('banner.cpmTamilnadu')}</span>
                    <span className="underline text-[#0A1F44] group-hover:text-[#C41E3A]">{t('banner.clickToView')}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}


      {/* FULL-SCREEN INTERACTIVE 4-PAGE BOOKLET MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-[#020A16] overflow-hidden print:p-0 print:bg-white"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#FAF7F0] text-[#0A1F44] border-4 border-[#0A1F44] max-w-4xl w-full h-full max-h-[92vh] sm:max-h-[90vh] my-auto rounded-none shadow-[12px_12px_0px_0px_rgba(10,31,68,0.5)] relative flex flex-col overflow-hidden print:max-h-none print:shadow-none print:border-none"
            >
              
              {/* MODAL TOP TOOLBAR (Navigation, Page Jumps, Controls) */}
              <div className="bg-[#8B0000] text-white p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 sm:gap-3 border-b-4 border-[#FFD700] shrink-0 print:hidden z-20">
                
                {/* Left: Document Name */}
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#FFD700] text-[#8B0000] rounded-none">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white">
                      {t('modal.documentTitle')}
                    </h4>
                    <p className="text-[10px] font-mono text-[#FFD700]">
                      {t('modal.documentSubtitle')}
                    </p>
                  </div>
                </div>

                {/* Center: Page Navigation Buttons */}
                <div className="flex items-center gap-1 bg-black/20 p-1 border border-white/20">
                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#FFD700] text-[#8B0000] shadow'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {t('modal.pageButton', { num: page })}
                    </button>
                  ))}
                </div>

                {/* Right: Actions (Cancel/Close and Share) */}
                <div className="flex items-center gap-2">
                  {/*<button
                    onClick={handleClose}
                    className="px-3 py-1.5 bg-[#FFD700] hover:bg-white text-[#8B0000] transition-all border-2 border-[#8B0000] rounded-none cursor-pointer font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(10,31,68,1)] active:translate-x-0.5 active:translate-y-0.5"
                    title="Close / Cancel Pamphlet Reader"
                  >
                    <X className="w-4 h-4 text-[#8B0000]" />
                    <span>Cancel / Close</span>
                  </button>*/}

                  <button
                    onClick={handleShare}
                    title={t('modal.shareTooltip')}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors border border-white/30 rounded-none cursor-pointer flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4 text-[#FFD700]" />
                    <span className="hidden sm:inline">{t('modal.share')}</span>
                  </button>
                </div>
              </div>


              {/* MAIN BOOKLET CONTENT VIEWPORT */}
              <div 
                ref={viewportRef}
                className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 bg-[#EAE7DC] relative touch-pan-y"
              >
                
                {/* Animated Page Transition Container */}
                <AnimatePresence mode="wait">
                  
                  {/* ==================== PAGE 1: OFFICIAL COVER ==================== */}
                  {currentPage === 1 && (
                    <motion.div
                      key="page-1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-xl mx-auto bg-white border-4 border-[#0A1F44] shadow-2xl overflow-hidden relative rounded-none flex flex-col"
                    >
                      {/* Top Official Badge */}
                      <div className="bg-[#8B0000] text-white px-4 py-2 flex items-center justify-between border-b-2 border-[#FFD700] font-mono text-xs font-bold uppercase shrink-0">
                        <span>{t('page1.badge')}</span>
                        <span className="text-[#FFD700]">{t('page1.cpmTamilnadu')}</span>
                      </div>

                      {/* Full-width High Quality Image Container - Full image display without cutoff */}
                      <div className="relative bg-[#8B0000] p-2 sm:p-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={isTamil ? pamphletCoverImgTa : pamphletCoverImg}
                          alt={t('page1.coverAlt')}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto max-h-[50vh] sm:max-h-[55vh] block object-contain shadow-2xl border-2 border-[#0A1F44]"
                        />
                      </div>

                      {/* Footer Info Box */}
                      <div className="bg-white p-3 sm:p-4 border-t-2 border-[#0A1F44] text-center space-y-1 shrink-0">
                        <div className="font-mono text-xs font-bold text-[#0A1F44]">
                          {t('page1.footerDateTime')}
                        </div>
                        <div className="text-[10px] font-mono font-bold text-[#C41E3A] uppercase tracking-wider">
                          {t('page1.footerOrg')}
                        </div>
                      </div>
                    </motion.div>
                  )}


                  {/* ==================== PAGE 2: RULE OF LAW & BACKGROUND ==================== */}
                  {currentPage === 2 && (
                    <motion.div
                      key="page-2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-2xl mx-auto bg-[#FFFDF9] border-4 border-[#0A1F44] p-6 sm:p-10 shadow-2xl space-y-6 relative"
                    >
                      {/* Header Badge */}
                      <div className="flex items-center justify-between border-b-2 border-[#0A1F44] pb-3">
                        <span className="font-mono text-xs font-bold text-[#C41E3A] uppercase tracking-wider">
                          {t('page2.sectionLabel')}
                        </span>
                        <span className="px-3 py-1 bg-[#8B0000] text-white font-mono text-xs font-bold uppercase">
                          {t('page2.pageOf')}
                        </span>
                      </div>

                      {/* Header Banner Quotes */}
                      <div className="text-center space-y-1 py-2 border-b-2 border-[#0A1F44]/20">
                        <h2 className="text-2xl sm:text-3xl font-serif-display font-black text-[#C41E3A]">
                          {t('page2.headline1')}
                        </h2>
                        <h2 className="text-2xl sm:text-3xl font-serif-display font-black text-[#C41E3A]">
                          {t('page2.headline2')}
                        </h2>
                      </div>

                      {/* Main Verbatim Text */}
                      <div className="space-y-4 text-xs sm:text-sm font-sans-body leading-relaxed text-[#0A1F44]/95 text-justify">
                        <p>{t('page2.para1')}</p>

                        <p>{t('page2.para2')}</p>

                        <p>{t('page2.para3')}</p>

                        <p>{t('page2.para4')}</p>

                        <p>{t('page2.para5')}</p>

                        {/* Case Highlight Box */}
                        <div className="p-4 bg-[#FAF0E6] border-l-4 border-[#C41E3A] space-y-2 my-2">
                          <div className="font-mono text-xs font-bold text-[#8B0000] uppercase">
                            {t('page2.caseBoxLabel')}
                          </div>
                          <p
                            className="text-xs leading-relaxed text-[#0A1F44]"
                            dangerouslySetInnerHTML={{ __html: t('page2.caseBoxText') }}
                          />
                        </div>

                        <p>{t('page2.para6')}</p>
                      </div>

                      {/* Page Footer */}
                      <div className="pt-4 border-t-2 border-[#0A1F44] flex items-center justify-between text-[11px] font-mono font-bold text-[#0A1F44]">
                        <span>{t('page2.footerPage')}</span>
                        <span className="text-[#C41E3A]">{t('page2.footerNext')}</span>
                      </div>
                    </motion.div>
                  )}


                  {/* ==================== PAGE 3: OBSERVATIONS & CONVENING ==================== */}
                  {currentPage === 3 && (
                    <motion.div
                      key="page-3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-2xl mx-auto bg-[#FFFDF9] border-4 border-[#0A1F44] p-6 sm:p-10 shadow-2xl space-y-6 relative"
                    >
                      {/* Header Badge */}
                      <div className="flex items-center justify-between border-b-2 border-[#0A1F44] pb-3">
                        <span className="font-mono text-xs font-bold text-[#C41E3A] uppercase tracking-wider">
                          {t('page3.sectionLabel')}
                        </span>
                        <span className="px-3 py-1 bg-[#8B0000] text-white font-mono text-xs font-bold uppercase">
                          {t('page3.pageOf')}
                        </span>
                      </div>

                      {/* Main Verbatim Text */}
                      <div className="space-y-3.5 text-xs sm:text-sm font-sans-body leading-relaxed text-[#0A1F44]/95 text-justify">
                        <p>{t('page3.para1')}</p>

                        {/* Quoted Remarks Block */}
                        <div className="space-y-2 p-3 bg-[#FAF7F0] border-2 border-[#0A1F44]/20 font-serif italic text-xs text-[#0A1F44]">
                          {(t('page3.quotes', { returnObjects: true }) as string[]).map((q) => (
                            <p key={q}>{q}</p>
                          ))}
                        </div>

                        <p>{t('page3.para2')}</p>

                        <p>{t('page3.para3')}</p>

                        <p>{t('page3.para4')}</p>

                        <p>{t('page3.para5')}</p>

                        <p>{t('page3.para6')}</p>

                        {/* Convening Resolution Box */}
                        <div
                          className="p-3 bg-[#8B0000] text-white border-2 border-[#0A1F44] font-serif text-xs leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: t('page3.convening') }}
                        />
                      </div>

                      {/* Page Footer */}
                      <div className="pt-4 border-t-2 border-[#0A1F44] flex items-center justify-between text-[11px] font-mono font-bold text-[#0A1F44]">
                        <span>{t('page3.footerPage')}</span>
                        <span className="text-[#C41E3A]">{t('page3.footerNext')}</span>
                      </div>
                    </motion.div>
                  )}


                  {/* ==================== PAGE 4: CONFERENCE DEMANDS & SIGNATORIES ==================== */}
                  {currentPage === 4 && (
                    <motion.div
                      key="page-4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-2xl mx-auto bg-[#FFFDF9] border-4 border-[#0A1F44] p-6 sm:p-10 shadow-2xl space-y-6 relative"
                    >
                      {/* Header Badge */}
                      <div className="flex items-center justify-between border-b-2 border-[#0A1F44] pb-3">
                        <span className="font-mono text-xs font-bold text-[#C41E3A] uppercase tracking-wider">
                          {t('page4.sectionLabel')}
                        </span>
                        <span className="px-3 py-1 bg-[#8B0000] text-white font-mono text-xs font-bold uppercase">
                          {t('page4.pageOf')}
                        </span>
                      </div>

                      {/* Main Title */}
                      <div className="text-center pb-2 border-b-2 border-[#0A1F44]/20">
                        <h2 className="text-3xl sm:text-4xl font-serif-display font-black text-[#C41E3A]">
                          {t('page4.title')}
                        </h2>
                      </div>

                      {/* The 4 Demands List (Verbatim OCR) */}
                      <div className="space-y-4 text-xs sm:text-sm font-sans-body text-[#0A1F44]/95 text-justify">
                        <div className="flex items-start gap-2.5 p-3 bg-[#FAF7F0] border-l-4 border-[#8B0000]">
                          <span className="font-bold font-mono text-[#8B0000] text-base shrink-0">1.</span>
                          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t('page4.demand1') }} />
                        </div>

                        <div className="flex items-start gap-2.5 p-3 bg-[#FAF7F0] border-l-4 border-[#8B0000]">
                          <span className="font-bold font-mono text-[#8B0000] text-base shrink-0">2.</span>
                          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t('page4.demand2') }} />
                        </div>

                        <div className="flex items-start gap-2.5 p-3 bg-[#FAF7F0] border-l-4 border-[#8B0000]">
                          <span className="font-bold font-mono text-[#8B0000] text-base shrink-0">3.</span>
                          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t('page4.demand3') }} />
                        </div>

                        <div className="flex items-start gap-2.5 p-3 bg-[#FAF7F0] border-l-4 border-[#8B0000]">
                          <span className="font-bold font-mono text-[#8B0000] text-base shrink-0">4.</span>
                          <p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t('page4.demand4') }} />
                        </div>

                        {/* Call to Action Statement */}
                        <p
                          className="p-3 bg-[#FFF5F5] border border-[#8B0000]/30 text-[#0A1F44] font-medium leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: t('page4.callToAction') }}
                        />
                      </div>

                      {/* Signatories & Footer Box */}
                      <div className="pt-4 border-t-2 border-[#0A1F44] space-y-3 text-center">
                        <div className="text-xs font-mono font-bold text-[#0A1F44]/70 uppercase tracking-widest">
                          {t('page4.onBehalfOf')}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-mono font-black text-[#C41E3A] uppercase tracking-tight">
                          {t('page4.orgName')}
                        </h3>

                        <div
                          className="text-xs sm:text-sm font-mono font-bold text-[#0A1F44] leading-snug py-1 bg-[#FAF7F0] border border-[#0A1F44]/20 p-2"
                          dangerouslySetInnerHTML={{ __html: t('page4.signatories') }}
                        />

                        <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#8B0000]">
                          <PhoneCall className="w-4 h-4 text-[#8B0000]" />
                          <span>{t('page4.contact')}</span>
                        </div>
                      </div>

                      {/* Footer controls */}
                      <div className="pt-4 border-t-2 border-[#0A1F44] flex items-center justify-between text-[11px] font-mono font-bold text-[#0A1F44]">
                        <span>{t('page4.footerEnd')}</span>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="text-[#C41E3A] underline hover:text-[#0A1F44] cursor-pointer"
                        >
                          {t('page4.backToCover')}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>


              {/* MODAL FOOTER CONTROLS */}
              <div className="bg-[#FAF7F0] p-3 border-t-2 border-[#0A1F44] flex items-center justify-end gap-2 text-xs font-mono font-bold text-[#0A1F44] print:hidden">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="px-3 py-1.5 bg-[#8B0000] text-white hover:bg-[#FFD700] hover:text-[#8B0000] disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    {t('modal.previous')}
                  </button>

                  <button
                    disabled={currentPage === 4}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 4))}
                    className="px-3 py-1.5 bg-[#8B0000] text-white hover:bg-[#FFD700] hover:text-[#8B0000] disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    {t('modal.next')}
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-3.5 py-1.5 bg-[#C41E3A] hover:bg-[#8B0000] text-white font-mono text-xs font-black uppercase transition-colors cursor-pointer border border-[#0A1F44] flex items-center gap-1.5 shadow-sm"
                    title={t('modal.closeTooltip')}
                  >
                    <X className="w-4 h-4" />
                    <span>{t('modal.close')}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
