import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  if (!profile.bio) return null;

  return (
    <section id="about" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">About</h2>
      </div>

      <div className="about-text">
        {profile.bio.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};
