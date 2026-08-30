import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Home, 
  User, 
  Briefcase, 
  FolderGit2, 
  Code2, 
  Mail
} from 'lucide-react';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { theme, toggleTheme } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'work', 'education', 'skills', 'projects', 'hackathons', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'work', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky-navbar-wrapper">
      <header className="sticky-navbar animate-fade-in" role="navigation" aria-label="Main Navigation">
        {/* Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                title={item.label}
                aria-label={item.label}
              >
                <Icon size={16} className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div className="nav-divider" />
          <button
            onClick={toggleTheme}
            className="nav-icon-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} className="nav-icon" /> : <Moon size={17} className="nav-icon" />}
          </button>
        </div>
      </header>
    </div>
  );
};
