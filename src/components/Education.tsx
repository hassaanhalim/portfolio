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
            {/* Top Row: Logo + University/College Name */}
            <div className="education-header">
              <div className="education-logo-wrap">
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
              </div>

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
            </div>

            {/* Second Row: Degree Name + Duration Badge */}
            <div className="education-sub-row">
              <div className="role-title" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {edu.degree}
              </div>
              <div className="education-date-badge">
                {edu.startDate} – {edu.endDate}
              </div>
            </div>

            {/* Third Row: Description (if available) */}
            {edu.description && (
              <div className="education-desc">
                {edu.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
