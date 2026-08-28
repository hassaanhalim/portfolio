import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ExternalLink, GraduationCap } from 'lucide-react';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const { education } = data;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
      </div>

      <div className="education-list">
        {education.map(edu => (
          <div key={edu.id} className="education-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, minWidth: 0 }}>
              {edu.logoUrl ? (
                <img
                  src={edu.logoUrl}
                  alt={edu.institution}
                  className="company-logo"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="company-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={18} />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div className="institution-name">
                  <span>{edu.institution}</span>
                  {edu.websiteUrl && (
                    <a
                      href={edu.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', display: 'inline-flex' }}
                      title={`Visit ${edu.institution}`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <div className="role-title">{edu.degree}</div>
                {edu.description && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {edu.description}
                  </div>
                )}
              </div>
            </div>

            <div className="experience-date">
              {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
