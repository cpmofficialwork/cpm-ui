import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnimatedSection } from './AnimatedSection';
import { ROUTES } from '../routes';

interface PageLayoutProps {
  children: React.ReactNode;
}

// Shared chrome for every routed page other than Home (currently just the
// 404 page). "Join the Movement" lives on Home/JOIN — from here it just
// navigates to the /join URL, which opens the pass modal there.
export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0A1F44] flex flex-col font-sans-body selection:bg-[#0A1F44] selection:text-white">
      <div className="sticky top-0 z-50">
        <Header onRegisterMember={() => navigate(ROUTES.JOIN)} />
      </div>
      <main className="flex-1">
        <AnimatedSection direction="none">{children}</AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};
