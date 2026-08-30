import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, WorkExperience, Project, Education, SkillItem, Hackathon, ContactMessage, Profile } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  updateProfile: (profile: Partial<Profile>) => void;
  // Work Experience
  addExperience: (exp: Omit<WorkExperience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<WorkExperience>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (items: WorkExperience[]) => void;
  // Education
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  // Skills
  addSkill: (skill: SkillItem) => void;
  deleteSkill: (name: string) => void;
  updateSkills: (skills: SkillItem[]) => void;
  // Projects
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (items: Project[]) => void;
  // Hackathons
  addHackathon: (hack: Omit<Hackathon, 'id'>) => void;
  updateHackathon: (id: string, hack: Partial<Hackathon>) => void;
  deleteHackathon: (id: string) => void;
  // Messages
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => boolean;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  // Reset & Import/Export
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'magicui_portfolio_data_v3';
const THEME_KEY = 'magicui_portfolio_theme_v2';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultPortfolioData, ...parsed };
      } catch (e) {
        console.error('Error parsing stored portfolio data, using defaults', e);
      }
    }
    return defaultPortfolioData;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (e) {}
    return 'dark';
  });

  // Automatically listen and adapt to device/OS theme preference changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, []);

  // Sync theme class to document element and body
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage', e);
    }
  }, [data]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  const updateProfile = (profileUpdate: Partial<Profile>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  // Experiences
  const addExperience = (exp: Omit<WorkExperience, 'id'>) => {
    const newExp: WorkExperience = {
      ...exp,
      id: `exp-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, expUpdate: Partial<WorkExperience>) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === id ? { ...e, ...expUpdate } : e))
    }));
  };

  const deleteExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  const reorderExperiences = (items: WorkExperience[]) => {
    setData(prev => ({ ...prev, experiences: items }));
  };

  // Education
  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEdu: Education = {
      ...edu,
      id: `edu-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      education: [newEdu, ...prev.education]
    }));
  };

  const updateEducation = (id: string, eduUpdate: Partial<Education>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...eduUpdate } : e))
    }));
  };

  const deleteEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Skills
  const addSkill = (skill: SkillItem) => {
    setData(prev => {
      if (prev.skills.some(s => s.name.toLowerCase() === skill.name.toLowerCase())) {
        return prev;
      }
      return { ...prev, skills: [...prev.skills, skill] };
    });
  };

  const deleteSkill = (name: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name !== name)
    }));
  };

  const updateSkills = (skills: SkillItem[]) => {
    setData(prev => ({ ...prev, skills }));
  };

  // Projects
  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const updateProject = (id: string, projUpdate: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...projUpdate } : p))
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const reorderProjects = (items: Project[]) => {
    setData(prev => ({ ...prev, projects: items }));
  };

  // Hackathons
  const addHackathon = (hack: Omit<Hackathon, 'id'>) => {
    const newHack: Hackathon = {
      ...hack,
      id: `hack-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      hackathons: [newHack, ...prev.hackathons]
    }));
  };

  const updateHackathon = (id: string, hackUpdate: Partial<Hackathon>) => {
    setData(prev => ({
      ...prev,
      hackathons: prev.hackathons.map(h => (h.id === id ? { ...h, ...hackUpdate } : h))
    }));
  };

  const deleteHackathon = (id: string) => {
    setData(prev => ({
      ...prev,
      hackathons: prev.hackathons.filter(h => h.id !== id)
    }));
  };

  // Messages
  const sendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString(),
      read: false
    };
    setData(prev => ({
      ...prev,
      messages: [newMsg, ...(prev.messages || [])]
    }));
    return true;
  };

  const markMessageRead = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: (prev.messages || []).map(m => (m.id === id ? { ...m, read: true } : m))
    }));
  };

  const deleteMessage = (id: string) => {
    setData(prev => ({
      ...prev,
      messages: (prev.messages || []).filter(m => m.id !== id)
    }));
  };

  // Reset & Import/Export
  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
  };

  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.profile && parsed.experiences && parsed.projects) {
        setData({ ...defaultPortfolioData, ...parsed });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import JSON', e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        toggleTheme,
        updateProfile,
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        deleteSkill,
        updateSkills,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        addHackathon,
        updateHackathon,
        deleteHackathon,
        sendMessage,
        markMessageRead,
        deleteMessage,
        resetToDefaults,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
