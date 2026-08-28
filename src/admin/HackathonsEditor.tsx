import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Edit2, Check, Trophy } from 'lucide-react';
import { Hackathon } from '../types/portfolio';

export const HackathonsEditor: React.FC = () => {
  const { data, addHackathon, updateHackathon, deleteHackathon } = usePortfolio();
  const { hackathons } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Hackathon, 'id'>>({
    title: '',
    dates: '',
    location: '',
    description: '',
    award: '',
    links: []
  });

  const [linksText, setLinksText] = useState('');

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      dates: '',
      location: '',
      description: '',
      award: '',
      links: []
    });
    setLinksText('');
  };

  const startEdit = (hack: Hackathon) => {
    setIsAdding(false);
    setEditingId(hack.id);
    setFormData({ ...hack });
    setLinksText(
      (hack.links || []).map(l => `${l.title}: ${l.url}`).join('\n')
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const links = linksText
      .split('\n')
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const title = parts[0].trim();
          const url = parts.slice(1).join(':').trim();
          return { title, url };
        }
        return null;
      })
      .filter((l): l is { title: string; url: string } => l !== null);

    const hackToSave = {
      ...formData,
      links
    };

    if (isAdding) {
      addHackathon(hackToSave);
      setIsAdding(false);
    } else if (editingId) {
      updateHackathon(editingId, hackToSave);
      setEditingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Hackathons & Awards</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Showcase hackathons participated, prizes won, and project demos
          </p>
        </div>
        {!isAdding && !editingId && (
          <button onClick={startAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Hackathon</span>
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="admin-content-card animate-fade-in" style={{ border: '2px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            {isAdding ? 'Add Hackathon Event' : 'Edit Hackathon Event'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Event Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dates / Month Year</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. November 2022"
                  value={formData.dates}
                  onChange={e => setFormData({ ...formData, dates: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Waterloo, ON or Virtual"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Award / Prize Won</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 1st Place - Best Security Protocol"
                  value={formData.award || ''}
                  onChange={e => setFormData({ ...formData, award: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="What did you build and how does it work?"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Links (Format: Title: URL, one per line)</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Devpost: https://devpost.com/software/..."
                value={linksText}
                onChange={e => setLinksText(e.target.value)}
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
        {hackathons.map(hack => (
          <div key={hack.id} className="admin-item-row" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
              <div className="company-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                <Trophy size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{hack.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  {hack.award || 'Participant'} • {hack.dates} ({hack.location})
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => startEdit(hack)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.6rem' }}
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete ${hack.title}?`)) {
                    deleteHackathon(hack.id);
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
