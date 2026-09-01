export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'youtube' | 'website' | 'other';
  label: string;
  url: string;
  icon?: string;
}

export interface Profile {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  statusText?: string;
  statusAvailable?: boolean;
  resumeUrl: string;
  socials: SocialLink[];
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  bullets?: string[];
  logoUrl: string;
  websiteUrl?: string;
  badges?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
}

export interface SkillItem {
  name: string;
  iconUrl?: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  dates: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  previewType?: 'image' | 'iframe' | 'video';
}

export interface Hackathon {
  id: string;
  title: string;
  dates: string;
  location: string;
  description: string;
  logoUrl?: string;
  award?: string;
  links?: { title: string; url: string }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date: string;
  read?: boolean;
}

export interface PortfolioData {
  profile: Profile;
  experiences: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  projects: Project[];
  hackathons: Hackathon[];
  messages: ContactMessage[];
}
