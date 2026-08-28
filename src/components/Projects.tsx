import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, Github, Globe, Star, Play, Sparkles } from 'lucide-react';
import { Project } from '../types/portfolio';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  if (!projects || projects.length === 0) return null;

  const displayProjects = filter === 'featured' 
    ? projects.filter(p => p.featured) 
    : projects;

  const renderProjectMedia = (proj: Project) => {
    const isVideo = proj.previewType === 'video' || 
      (proj.videoUrl && proj.videoUrl.trim() !== '') || 
      (proj.imageUrl && (proj.imageUrl.endsWith('.mp4') || proj.imageUrl.endsWith('.webm')));

    const isIframe = proj.previewType === 'iframe' || 
      (!isVideo && !proj.imageUrl && proj.liveUrl && proj.liveUrl.startsWith('http'));

    if (isIframe && proj.liveUrl) {
      return (
        <div className="project-iframe-container">
          {/* Mini Browser Bar */}
          <div className="project-browser-bar">
            <div className="browser-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="browser-url-bar">
              {proj.liveUrl.replace(/^https?:\/\//i, '').split('/')[0]}
            </div>
          </div>

          {/* Scaled Live Website Iframe */}
          <div className="iframe-wrapper">
            <iframe
              src={proj.liveUrl}
              title={proj.title}
              className="project-live-iframe"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
            {/* Click overlay leading to live site */}
            <a
              href={proj.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="iframe-click-overlay"
              title="Click to open live website"
            >
              <div className="live-preview-badge">
                <Globe size={13} />
                <span>Live Interactive Site</span>
              </div>
            </a>
          </div>
        </div>
      );
    }

    if (isVideo) {
      const videoSrc = proj.videoUrl || proj.imageUrl;
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="project-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      );
    }

    if (proj.imageUrl) {
      return (
        <img
          src={proj.imageUrl}
          alt={proj.title}
          className="project-img"
          loading="lazy"
          onError={e => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      );
    }

    // Fallback if no media provided
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-subtle)', background: 'var(--bg-secondary)' }}>
        <Globe size={36} />
      </div>
    );
  };

  return (
    <section id="projects" className="portfolio-section">
      <div className="section-header" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">A curated selection of products and tools I've built</p>
        </div>

        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => setFilter('all')}
            className="section-pill"
            style={{
              cursor: 'pointer',
              borderColor: filter === 'all' ? 'var(--text-primary)' : 'var(--border-color)',
              background: filter === 'all' ? 'var(--bg-tertiary)' : 'transparent',
              color: filter === 'all' ? 'var(--text-primary)' : 'var(--text-muted)'
            }}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className="section-pill"
            style={{
              cursor: 'pointer',
              borderColor: filter === 'featured' ? 'var(--text-primary)' : 'var(--border-color)',
              background: filter === 'featured' ? 'var(--bg-tertiary)' : 'transparent',
              color: filter === 'featured' ? 'var(--text-primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Star size={11} fill={filter === 'featured' ? 'currentColor' : 'none'} />
            Featured
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {displayProjects.map(proj => (
          <div key={proj.id} className="project-card animate-fade-in">
            <div className="project-media">
              {renderProjectMedia(proj)}

              {proj.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0.6rem',
                    right: '0.6rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#fbbf24',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '9999px',
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    zIndex: 10
                  }}
                >
                  <Star size={10} fill="currentColor" />
                  <span>Featured</span>
                </div>
              )}
            </div>

            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">{proj.title}</h3>
                {proj.dates && <span className="project-dates">{proj.dates}</span>}
              </div>

              <p className="project-desc">{proj.description}</p>

              {proj.tags && proj.tags.length > 0 && (
                <div className="project-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-links">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    <ExternalLink size={13} />
                    <span>Website</span>
                  </a>
                )}

                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    <Github size={13} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
