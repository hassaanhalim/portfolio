import React, { useState, useEffect } from 'react';
import { usePortfolio } from './context/PortfolioContext';
import { DotBackground } from './components/DotBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WorkExperience } from './components/WorkExperience';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Hackathons } from './components/Hackathons';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLogin } from './admin/AdminLogin';

export const App: React.FC = () => {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#/admin') ||
      window.location.hash.startsWith('#admin')
    );
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const isCurrentAdmin =
        window.location.pathname.startsWith('/admin') ||
        window.location.hash.startsWith('#/admin') ||
        window.location.hash.startsWith('#admin');
      setIsAdminRoute(isCurrentAdmin);
      if (!isCurrentAdmin) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState({}, '', '/');
    }
    setIsAdminRoute(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
    navigateToHome();
  };

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onSuccess={() => setIsAuthenticated(true)}
          onBackToSite={navigateToHome}
        />
      );
    }
    return (
      <AdminDashboard
        onBackToSite={navigateToHome}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Animated Matrix Dot Background */}
      <DotBackground />

      {/* Sticky Floating Navbar */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="portfolio-main-layout">
        <Hero />
        <About />
        <WorkExperience />
        <Education />
        <Skills />
        <Projects />
        <Hackathons />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
