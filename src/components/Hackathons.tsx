import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, ExternalLink } from 'lucide-react';

export const Hackathons: React.FC = () => {
  const { data } = usePortfolio();
  const { hackathons } = data;

  if (!hackathons || hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Hackathons & Competitions</h2>
        <p className="section-subtitle">Building prototypes rapidly and solving challenges under 48 hours</p>
      </div>

      <div className="hackathon-timeline">
        {hackathons.map(hack => (
          <div key={hack.id} className="hackathon-item">
            <div className="hackathon-dot" />

            <div className="hackathon-title-row">
              <span className="hackathon-title">{hack.title}</span>
              <span className="experience-date">{hack.dates}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{hack.location}</span>
              {hack.award && (
                <div className="hackathon-award">
                  <Trophy size={11} />
                  <span>{hack.award}</span>
                </div>
              )}
            </div>

            <p className="hackathon-desc">{hack.description}</p>

            {hack.links && hack.links.length > 0 && (
              <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.2rem' }}>
                {hack.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  >
                    <span>{link.title}</span>
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
