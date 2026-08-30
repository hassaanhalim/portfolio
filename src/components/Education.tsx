import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const { education } = data;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
      </div>

      <div className="education-list-minimal">
        {education.map(edu => {
          const content = (
            <div className="education-row-content">
              {/* Circular Avatar Logo */}
              <div className="education-circle-avatar">
                {edu.logoUrl ? (
                  <img
                    src={edu.logoUrl}
                    alt={edu.institution}
                    className="education-avatar-img"
                    onError={e => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="education-avatar-fallback">
                    <GraduationCap size={16} />
                  </div>
                )}
              </div>

              {/* Institution & Degree */}
              <div className="education-text-block">
                <div className="education-inst-title">
                  {edu.institution}
                </div>
                <div className="education-degree-subtitle">
                  {edu.degree}
                </div>
                {edu.description && (
                  <div className="education-desc-text">
                    {edu.description}
                  </div>
                )}
              </div>

              {/* Right-aligned Date */}
              <div className="education-date-text">
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
          );

          if (edu.websiteUrl && edu.websiteUrl.trim() !== '' && edu.websiteUrl !== '#') {
            return (
              <a
                key={edu.id}
                href={edu.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="education-item-link"
                title={`Visit ${edu.institution}`}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={edu.id} className="education-item-link static">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};
