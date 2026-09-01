import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Youtube, 
  Globe, 
  MapPin, 
  FileText,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;
  const [imgError, setImgError] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={14} />;
      case 'twitter':
      case 'x':
        return <Twitter size={14} />;
      case 'linkedin':
        return <Linkedin size={14} />;
      case 'email':
      case 'mail':
        return <Mail size={14} />;
      case 'youtube':
        return <Youtube size={14} />;
      default:
        return <Globe size={14} />;
    }
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>, rawUrl: string) => {
    e.preventDefault();
    const cleanEmail = rawUrl.replace(/^mailto:/i, '').trim();
    if (!cleanEmail) return;

    // Direct mailto trigger
    window.location.href = `mailto:${cleanEmail}`;
  };

  return (
    <section id="hero" className="portfolio-section animate-fade-in">
      <div className="hero-container">
        <div className="hero-text-content">
          <h1 className="hero-name">
            {profile.title || `Hi, I'm ${profile.name}`}
          </h1>

          <p className="hero-tagline">
            {profile.tagline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
            <MapPin size={14} />
            <span>{profile.location}</span>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            {profile.socials?.map((social, idx) => {
              const isEmail = social.platform === 'email' || social.label.toLowerCase() === 'email';
              const cleanEmail = social.url.replace(/^mailto:/i, '').trim();
              const href = isEmail ? (cleanEmail ? `mailto:${cleanEmail}` : '#') : social.url;

              return (
                <a
                  key={idx}
                  href={href}
                  onClick={isEmail ? (e) => handleEmailClick(e, social.url) : undefined}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  className="social-pill"
                  title={isEmail ? `Send email to ${cleanEmail}` : social.label}
                >
                  {getSocialIcon(social.platform)}
                  <span>{social.label}</span>
                </a>
              );
            })}

            {profile.resumeUrl && profile.resumeUrl !== '#' && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
              >
                <FileText size={14} />
                <span>Resume</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Avatar / Profile Picture */}
        <div className="hero-avatar-wrapper">
          {profile.avatarUrl && !imgError ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="hero-avatar"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="hero-initials-fallback">
              {profile.initials || profile.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
