import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Edit2, Check, ArrowUp, ArrowDown, Briefcase } from 'lucide-react';
import { WorkExperience } from '../types/portfolio';

export const ExperienceEditor: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience, reorderExperiences } = usePortfolio();
  const { experiences } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<WorkExperience, 'id'>>({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    bullets: [],
    logoUrl: '',
    websiteUrl: '',
    badges: []
  });

  const [bulletsText, setBulletsText] = useState('');
  const [badgesText, setBadgesText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      bullets: [],
      logoUrl: '',
      websiteUrl: '',
      badges: []
    });
    setBulletsText('');
    setBadgesText('');
  };

  const startEdit = (exp: WorkExperience) => {
    setIsAdding(false);
    setEditingId(exp.id);
    setFormData({ ...exp });
    setBulletsText((exp.bullets || []).join('\n'));
    setBadgesText((exp.badges || []).join(', '));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company || !formData.role) return;

    const bullets = bulletsText
      .split('\n')
      .map(b => b.trim())
      .filter(Boolean);

    const badges = badgesText
      .split(',')
      .map(b => b.trim())
      .filter(Boolean);

    const dataToSave = {
      ...formData,
      bullets,
      badges
    };

    if (isAdding) {
      addExperience(dataToSave);
      setIsAdding(false);
    } else if (editingId) {
      updateExperience(editingId, dataToSave);
      setEditingId(null);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const newItems = [...experiences];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    reorderExperiences(newItems);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Work Experience</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Add, update, reorder or delete company roles and career milestones
          </p>
        </div>
        {!isAdding && !editingId && (
          <button onClick={startAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal/Card */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="admin-content-card animate-fade-in" style={{ border: '2px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            {isAdding ? 'Add New Position' : 'Edit Position'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role / Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. May 2021"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Present or Oct 2022"
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Company Logo Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://..."
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Website URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://company.com"
                  value={formData.websiteUrl}
                  onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Short Summary Description</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Key Achievements / Bullets (One per line)</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Architected high throughput pipelines...&#10;Reduced checkout latency by 18%..."
                value={bulletsText}
                onChange={e => setBulletsText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tech Stack Tags (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="React, TypeScript, GraphQL, Redis"
                value={badgesText}
                onChange={e => setBadgesText(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" onClick={cancelEdit} className="admin-btn admin-btn-secondary">
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>Save Experience</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* List of existing experiences */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {experiences.map((exp, index) => (
          <div key={exp.id} className="admin-item-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
              {exp.logoUrl ? (
                <img src={exp.logoUrl} alt={exp.company} className="company-logo" />
              ) : (
                <div className="company-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={16} />
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {exp.company}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {exp.role} • {exp.startDate} - {exp.endDate}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem', opacity: index === 0 ? 0.4 : 1 }}
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                onClick={() => moveItem(index, 'down')}
                disabled={index === experiences.length - 1}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem', opacity: index === experiences.length - 1 ? 0.4 : 1 }}
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => startEdit(exp)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.6rem' }}
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete ${exp.company}?`)) {
                    deleteExperience(exp.id);
                  }
                }}
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.4rem 0.6rem' }}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
