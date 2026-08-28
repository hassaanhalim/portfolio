import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { TechIcon } from './TechIcons';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!skills || skills.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category || 'General')))];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="portfolio-section">
      <div className="section-header">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with regularly</p>
      </div>

      {categories.length > 2 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="section-pill"
              style={{
                cursor: 'pointer',
                borderColor: activeCategory === cat ? 'var(--text-primary)' : 'var(--border-color)',
                background: activeCategory === cat ? 'var(--bg-tertiary)' : 'var(--badge-bg)',
                color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="skills-wrapper">
        {filteredSkills.map((skill, idx) => (
          <div key={idx} className="skill-pill">
            <TechIcon name={skill.name} iconUrl={skill.iconUrl} size={15} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
