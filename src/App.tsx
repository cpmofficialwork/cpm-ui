import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ConferenceSection } from './components/ConferenceSection';
import { ConferenceDemands } from './components/ConferenceDemands';
import { GenZYouthHub } from './components/GenZYouthHub';
import { WhoConducts } from './components/WhoConducts';
import { Hero } from './components/Hero';
import { WhyItMatters } from './components/WhyItMatters';
import { ConstitutionalValues } from './components/ConstitutionalValues';
import { CitizenResponsibilities } from './components/CitizenResponsibilities';
import { Footer } from './components/Footer';
import { AnimatedSection } from './components/AnimatedSection';
import { WelcomeVideoModal } from './components/WelcomeVideoModal';

export default function App() {
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isPamphletModalOpen, setIsPamphletModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isModalOpen = isPamphletModalOpen || isPassModalOpen;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0A1F44] flex flex-col font-sans-body selection:bg-[#0A1F44] selection:text-white relative">
      {/* First-visit welcome video */}
      <WelcomeVideoModal />

      {/* Header Bar - disappears when pamphlet or pass modal is open */}
      <AnimatePresence>
        {!isModalOpen && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="sticky top-0 z-50"
          >
            <Header />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Flow */}
      <main className="flex-1 space-y-0">
        {/* Top Highlighted Conference Section */}
        <AnimatedSection direction="none">
          <ConferenceSection
            isPassModalOpen={isPassModalOpen}
            onOpenPassModal={() => setIsPassModalOpen(true)}
            onClosePassModal={() => setIsPassModalOpen(false)}
            isPamphletModalOpen={isPamphletModalOpen}
            onOpenPamphletModal={() => setIsPamphletModalOpen(true)}
            onClosePamphletModal={() => setIsPamphletModalOpen(false)}
          />
        </AnimatedSection>

        {/* Bottom Sections - Collapsed/Hidden when Pamphlet reader is open */}
        {!isPamphletModalOpen && (
          <>
            {/* Hero (intro, no nav link) */}
            <AnimatedSection direction="up">
              <Hero
                onExploreClick={() => scrollToSection('constitutional-values')}
                onWhyProtectClick={() => scrollToSection('why-it-matters')}
              />
            </AnimatedSection>

            {/* Nav order below matches the navbar link order exactly */}

            {/* Demands */}
            <AnimatedSection direction="up" delay={0.05}>
              <ConferenceDemands />
            </AnimatedSection>

            {/* Why Protect */}
            <AnimatedSection direction="up">
              <WhyItMatters />
            </AnimatedSection>

            {/* Gen-Z Hub */}
            <AnimatedSection direction="up" delay={0.05}>
              <GenZYouthHub />
            </AnimatedSection>

            {/* 15 Core Values */}
            <AnimatedSection direction="up">
              <ConstitutionalValues />
            </AnimatedSection>

            {/* Citizen Responsibilities */}
            <AnimatedSection direction="up">
              <CitizenResponsibilities />
            </AnimatedSection>

            {/* Who Conducts */}
            <AnimatedSection direction="up" delay={0.1}>
              <WhoConducts />
            </AnimatedSection>
          </>
        )}
      </main>

      {/* Footer - Hidden when Pamphlet reader is open */}
      {!isPamphletModalOpen && <Footer />}
    </div>
  );
}



