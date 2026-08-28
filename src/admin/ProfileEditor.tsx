import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { SocialLink } from '../types/portfolio';

export const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [profile, setProfile] = useState(data.profile);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (index: number, key: keyof SocialLink, value: string) => {
    const updatedSocials = [...profile.socials];
    updatedSocials[index] = { ...updatedSocials[index], [key]: value };
    setProfile(prev => ({ ...prev, socials: updatedSocials }));
  };

  const addSocial = () => {
    setProfile(prev => ({
      ...prev,
      socials: [
        ...prev.socials,
        { platform: 'website', label: 'Website', url: 'https://' }
      ]
    }));
  };

  const removeSocial = (index: number) => {
    setProfile(prev => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Profile & Hero Section</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage your headline, introduction, avatar, and social links
          </p>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary">
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span>{saved ? 'Saved Changes!' : 'Save Profile'}</span>
        </button>
      </div>

      <div className="admin-content-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.name}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Initials Fallback</label>
            <input
              type="text"
              className="form-input"
              value={profile.initials}
              maxLength={3}
              placeholder="e.g. DV"
              onChange={e => handleChange('initials', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Hero Title / Heading</label>
          <input
            type="text"
            className="form-input"
            value={profile.title}
            placeholder="e.g. Hi, I'm Dillion"
            onChange={e => handleChange('title', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tagline / Short Intro</label>
          <textarea
            className="form-textarea"
            rows={2}
            value={profile.tagline}
            onChange={e => handleChange('tagline', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Avatar Image URL</label>
            <input
              type="text"
              className="form-input"
              value={profile.avatarUrl}
              placeholder="https://images.unsplash.com/..."
              onChange={e => handleChange('avatarUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              value={profile.location}
              placeholder="e.g. San Francisco, CA"
              onChange={e => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status Badge Text</label>
            <input
              type="text"
              className="form-input"
              value={profile.statusText}
              placeholder="e.g. Available for interesting projects"
              onChange={e => handleChange('statusText', e.target.value)}
            />
          </div>

          <div className="form-group" style={{ justifyContent: 'center' }}>
            <label className="form-label">Availability Status</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.4rem', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={profile.statusAvailable}
                onChange={e => handleChange('statusAvailable', e.target.checked)}
                style={{ width: '1.1rem', height: '1.1rem' }}
              />
              <span>Active / Available for Work (Green glowing dot)</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Resume Download Link / URL</label>
          <input
            type="text"
            className="form-input"
            value={profile.resumeUrl}
            placeholder="https://... or #"
            onChange={e => handleChange('resumeUrl', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">About Bio (Use blank lines for paragraphs)</label>
          <textarea
            className="form-textarea"
            rows={5}
            value={profile.bio}
            onChange={e => handleChange('bio', e.target.value)}
          />
        </div>
      </div>

      {/* Social Links Manager */}
      <div className="admin-content-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Social Profiles & Links</h3>
          <button type="button" onClick={addSocial} className="admin-btn admin-btn-secondary">
            <Plus size={14} />
            <span>Add Social Link</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {profile.socials.map((social, index) => (
            <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: '0.5rem' }}>
              <select
                className="form-input"
                style={{ width: '130px' }}
                value={social.platform}
                onChange={e => handleSocialChange(index, 'platform', e.target.value as any)}
              >
                <option value="github">GitHub</option>
                <option value="twitter">X / Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="email">Email</option>
                <option value="youtube">YouTube</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Label (e.g. GitHub)"
                className="form-input"
                style={{ width: '130px' }}
                value={social.label}
                onChange={e => handleSocialChange(index, 'label', e.target.value)}
              />

              <input
                type="text"
                placeholder={
                  social.platform === 'email'
                    ? 'your.email@example.com'
                    : 'URL (https://...)'
                }
                className="form-input"
                style={{ flex: 1 }}
                value={social.url}
                onChange={e => handleSocialChange(index, 'url', e.target.value)}
              />

              <button
                type="button"
                onClick={() => removeSocial(index)}
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.5rem' }}
                title="Remove"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
