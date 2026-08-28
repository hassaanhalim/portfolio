import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2 } from 'lucide-react';
import { TechIcon } from '../components/TechIcons';

export const SkillsEditor: React.FC = () => {
  const { data, addSkill, deleteSkill } = usePortfolio();
  const { skills } = data;

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newSkillIcon, setNewSkillIcon] = useState('');

  const commonCategories = ['Frontend', 'Backend', 'Languages', 'Database', 'DevOps', 'Tools', 'AI/ML', 'Design'];

  const quickPresets = [
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Languages' },
    { name: 'Go', category: 'Languages' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'TailwindCSS', category: 'Frontend' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'Redis', category: 'Database' },
    { name: 'AWS', category: 'DevOps' },
    { name: 'Git', category: 'Tools' },
    { name: 'Vite', category: 'Tools' },
    { name: 'Framer Motion', category: 'Frontend' }
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      category: newSkillCategory.trim() || 'General',
      iconUrl: newSkillIcon.trim() || undefined
    });

    setNewSkillName('');
    setNewSkillIcon('');
  };

  const handleAddPreset = (preset: { name: string; category: string }) => {
    addSkill({
      name: preset.name,
      category: preset.category
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Skills & Technologies</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Manage your tech stack with crisp SVG logos and custom image icons
        </p>
      </div>

      {/* Add New Skill Form */}
      <form onSubmit={handleAdd} className="admin-content-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Add Custom Skill</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            required
            placeholder="Skill name (e.g. Supabase, Rust)"
            className="form-input"
            style={{ flex: 1, minWidth: '160px' }}
            value={newSkillName}
            onChange={e => setNewSkillName(e.target.value)}
          />

          <select
            className="form-input"
            style={{ width: '140px' }}
            value={newSkillCategory}
            onChange={e => setNewSkillCategory(e.target.value)}
          >
            {commonCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Custom Image/SVG URL (optional)"
            className="form-input"
            style={{ width: '220px' }}
            value={newSkillIcon}
            onChange={e => setNewSkillIcon(e.target.value)}
          />

          {newSkillName && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.6rem', background: 'var(--bg-secondary)', borderRadius: '0.375rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preview:</span>
              <TechIcon name={newSkillName} iconUrl={newSkillIcon} size={16} />
            </div>
          )}

          <button type="submit" className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
            Quickly add popular tech logos:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {quickPresets.map((preset, pIdx) => {
              const alreadyExists = skills.some(s => s.name.toLowerCase() === preset.name.toLowerCase());
              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => !alreadyExists && handleAddPreset(preset)}
                  disabled={alreadyExists}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.55rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: alreadyExists ? 'var(--text-muted)' : 'var(--text-primary)',
                    cursor: alreadyExists ? 'default' : 'pointer',
                    opacity: alreadyExists ? 0.5 : 1
                  }}
                >
                  <TechIcon name={preset.name} size={13} />
                  <span>{preset.name}</span>
                  {!alreadyExists && <Plus size={10} />}
                </button>
              );
            })}
          </div>
        </div>
      </form>

      {/* Current Skills */}
      <div className="admin-content-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
          Active Skills ({skills.length})
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {skills.map((skill, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.75rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '9999px',
                fontSize: '0.8125rem'
              }}
            >
              <TechIcon name={skill.name} iconUrl={skill.iconUrl} size={15} />
              <span style={{ fontWeight: 500 }}>{skill.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>({skill.category})</span>
              <button
                type="button"
                onClick={() => deleteSkill(skill.name)}
                style={{
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.2rem'
                }}
                title="Remove"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
