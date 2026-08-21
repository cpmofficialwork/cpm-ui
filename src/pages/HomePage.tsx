import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { ConferenceSection } from '../components/ConferenceSection';
import { ConferenceDemands } from '../components/ConferenceDemands';
import { FourPillars } from '../components/FourPillars';
import { ConstitutionalPrinciples } from '../components/ConstitutionalPrinciples';
import { GenZYouthHub } from '../components/GenZYouthHub';
import { WhoConducts } from '../components/WhoConducts';
import { Hero } from '../components/Hero';
import { WhyItMatters } from '../components/WhyItMatters';
import { ConstitutionalValues } from '../components/ConstitutionalValues';
import { CitizenResponsibilities } from '../components/CitizenResponsibilities';
import { Footer } from '../components/Footer';
import { AnimatedSection } from '../components/AnimatedSection';
import { WelcomeVideoModal } from '../components/WelcomeVideoModal';
import { ROUTES } from '../routes';

export default function HomePage() {
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isPamphletModalOpen, setIsPamphletModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // /join and / render this same page — navigating to /join is what opens
  // the pass modal, so "Join the Movement" is a real, shareable URL instead
  // of just local state. Closing it goes back to /.
  useEffect(() => {
    if (location.pathname !== ROUTES.JOIN) return;
    scrollToSection('conference');
    setIsPassModalOpen(true);
  }, [location.pathname]);

  const openPassModal = () => navigate(ROUTES.JOIN);

  const closePassModal = () => {
    setIsPassModalOpen(false);
    if (location.pathname === ROUTES.JOIN) navigate(ROUTES.HOME, { replace: true });
  };

  const isModalOpen = isPamphletModalOpen || isPassModalOpen;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0A1F44] flex flex-col font-sans-body selection:bg-[#0A1F44] selection:text-white relative">
      {/* First-visit welcome video - not shown on /join */}
      {location.pathname !== ROUTES.JOIN && <WelcomeVideoModal />}

      {/* Scrollable content wrapper */}
      <div className="flex-1 flex flex-col">
      {/* Header Bar - stays mounted so its internal state (mobile drawer,
          measured height, scroll-lock) survives modal open/close cycles;
          only visually hidden while a pamphlet or pass modal is open.
          Previously this unmounted/remounted via AnimatePresence, which on
          real mobile devices raced with layout and could leave the drawer
          stuck closed or a stale section visible behind it. */}
      <motion.div
        animate={{ opacity: isModalOpen ? 0 : 1, y: isModalOpen ? -25 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="sticky top-0 z-50"
        style={{ pointerEvents: isModalOpen ? 'none' : 'auto' }}
        aria-hidden={isModalOpen}
      >
        <Header onRegisterMember={openPassModal} isDisabled={isModalOpen} />
      </motion.div>

      {/* Scrollable content wrapper — the target useScrollLock pins while a
          modal/mobile-menu is open. Kept separate from <body> so the sticky
          header (a sibling, above) never gets dragged along with it. */}
      <div id="scroll-lock-target" className="flex-1 flex flex-col">
        {/* Main Flow */}
        <main className="flex-1 space-y-0">
          {/* Top Highlighted Conference Section */}
          <AnimatedSection direction="none">
            <ConferenceSection
              isPassModalOpen={isPassModalOpen}
              onOpenPassModal={openPassModal}
              onClosePassModal={closePassModal}
              isPamphletModalOpen={isPamphletModalOpen}
              onOpenPamphletModal={() => setIsPamphletModalOpen(true)}
              onClosePamphletModal={() => setIsPamphletModalOpen(false)}
            />
          </AnimatedSection>

          {/* Bottom Sections - Collapsed/Hidden when Pamphlet reader is open */}
          {!isPamphletModalOpen && (
            <>
              {/* 1. Hero */}
              <AnimatedSection direction="up">
                <Hero
                  onExploreClick={() => scrollToSection('constitutional-values')}
                  onWhyProtectClick={() => scrollToSection('why-it-matters')}
                />
              </AnimatedSection>

              {/* Why the Constitution Matters & Why Must We Protect the Constitution */}
              <AnimatedSection direction="up">
                <WhyItMatters />
              </AnimatedSection>

              {/* 2. Conference Demands Section */}
              <AnimatedSection direction="up" delay={0.05}>
                <ConferenceDemands />
              </AnimatedSection>

              {/* The Four Pillars of Constitutional Democracy */}
              <AnimatedSection direction="up">
                <FourPillars />
              </AnimatedSection>

              {/* Constitutional Principles */}
              <AnimatedSection direction="up">
                <ConstitutionalPrinciples />
              </AnimatedSection>

              {/* 3. 15 Core Constitutional Values */}
              <AnimatedSection direction="up">
                <ConstitutionalValues />
              </AnimatedSection>

              {/* 4. Citizen Responsibilities */}
              <AnimatedSection direction="up">
                <CitizenResponsibilities />
              </AnimatedSection>

              {/* Gen-Z & Youth Activism Hub */}
              <AnimatedSection direction="up" delay={0.05}>
                <GenZYouthHub />
              </AnimatedSection>

              {/* Who Conducts Section */}
              <AnimatedSection direction="up" delay={0.1}>
                <WhoConducts />
              </AnimatedSection>
            </>
          )}
        </main>

        {/* Footer - Hidden when Pamphlet reader is open */}
        {!isPamphletModalOpen && <Footer />}
      </div>
      </div>
    </div>
  );
}
