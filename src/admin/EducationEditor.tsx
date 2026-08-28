import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Edit2, Check, GraduationCap } from 'lucide-react';
import { Education } from '../types/portfolio';

export const EducationEditor: React.FC = () => {
  const { data, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const { education } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    logoUrl: '',
    websiteUrl: '',
    description: ''
  });

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      logoUrl: '',
      websiteUrl: '',
      description: ''
    });
  };

  const startEdit = (edu: Education) => {
    setIsAdding(false);
    setEditingId(edu.id);
    setFormData({ ...edu });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institution || !formData.degree) return;

    if (isAdding) {
      addEducation(formData);
      setIsAdding(false);
    } else if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Education & Qualifications</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage your degrees, schools, cohorts, and academic achievements
          </p>
        </div>
        {!isAdding && !editingId && (
          <button onClick={startAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="admin-content-card animate-fade-in" style={{ border: '2px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            {isAdding ? 'Add New Education' : 'Edit Education'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Institution / School *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Degree / Program *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2016"
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 2021"
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Institution Logo Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://..."
                  value={formData.logoUrl}
                  onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Website URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://uwaterloo.ca"
                  value={formData.websiteUrl}
                  onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description / Field of Specialization</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Focus on Distributed Systems and Computer Graphics"
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); }} className="admin-btn admin-btn-secondary">
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {education.map(edu => (
          <div key={edu.id} className="admin-item-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
              {edu.logoUrl ? (
                <img src={edu.logoUrl} alt={edu.institution} className="company-logo" />
              ) : (
                <div className="company-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GraduationCap size={16} />
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{edu.institution}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {edu.degree} • {edu.startDate} - {edu.endDate}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => startEdit(edu)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.6rem' }}
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete ${edu.institution}?`)) {
                    deleteEducation(edu.id);
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
