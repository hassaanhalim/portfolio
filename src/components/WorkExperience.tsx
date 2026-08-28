import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronDown, ExternalLink } from 'lucide-react';

export const WorkExperience: React.FC = () => {
  const { data } = usePortfolio();
  const { experiences } = data;
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    // Expand the first one by default
    [experiences[0]?.id || '']: true
  });

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="work" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Work Experience</h2>
        <p className="section-subtitle">Companies and projects where I have led and contributed</p>
      </div>

      <div className="experience-list">
        {experiences.map(exp => {
          const isExpanded = !!expandedIds[exp.id];

          return (
            <div key={exp.id} className="experience-card">
              <div 
                className="experience-header"
                onClick={() => toggleExpand(exp.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(exp.id); }}
                aria-expanded={isExpanded}
              >
                <div className="experience-left">
                  {exp.logoUrl ? (
                    <img 
                      src={exp.logoUrl} 
                      alt={exp.company} 
                      className="company-logo"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="company-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      {exp.company.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="experience-meta">
                    <div className="company-name">
                      <span>{exp.company}</span>
                      {exp.websiteUrl && (
                        <a
                          href={exp.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{ color: 'var(--text-muted)', display: 'inline-flex' }}
                          title={`Visit ${exp.company}`}
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="role-title">{exp.role}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div className="experience-date">
                    {exp.startDate} - {exp.endDate}
                  </div>
                  <ChevronDown size={16} className={`experience-chevron ${isExpanded ? 'open' : ''}`} />
                </div>
              </div>

              {isExpanded && (
                <div className="experience-body animate-fade-in">
                  <p>{exp.description}</p>
                  
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="experience-bullets">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {exp.badges && exp.badges.length > 0 && (
                    <div className="experience-badges">
                      {exp.badges.map((badge, bIdx) => (
                        <span key={bIdx} className="tech-tag">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
