import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Trash2, Edit2, Check, ArrowUp, ArrowDown, FolderGit2, Star, Globe, Video, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types/portfolio';

export const ProjectsEditor: React.FC = () => {
  const { data, addProject, updateProject, deleteProject, reorderProjects } = usePortfolio();
  const { projects } = data;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    dates: '',
    tags: [],
    imageUrl: '',
    videoUrl: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    previewType: 'image'
  });
  const [tagsText, setTagsText] = useState('');

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      dates: '',
      tags: [],
      imageUrl: '',
      videoUrl: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      previewType: 'image'
    });
    setTagsText('');
  };

  const startEdit = (proj: Project) => {
    setIsAdding(false);
    setEditingId(proj.id);
    setFormData({
      ...proj,
      previewType: proj.previewType || (proj.videoUrl ? 'video' : (!proj.imageUrl && proj.liveUrl ? 'iframe' : 'image'))
    });
    setTagsText((proj.tags || []).join(', '));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const tags = tagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const projectToSave: Omit<Project, 'id'> = {
      ...formData,
      tags
    };

    if (isAdding) {
      addProject(projectToSave);
      setIsAdding(false);
    } else if (editingId) {
      updateProject(editingId, projectToSave);
      setEditingId(null);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const newItems = [...projects];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    reorderProjects(newItems);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Projects Showcase</h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Manage portfolio projects with live website iframe previews, video demos, or snapshots
          </p>
        </div>
        {!isAdding && !editingId && (
          <button onClick={startAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="admin-content-card animate-fade-in" style={{ border: '2px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
            {isAdding ? 'Add New Project' : 'Edit Project'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Project Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dates / Timeline</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Jan 2024 - Present"
                  value={formData.dates}
                  onChange={e => setFormData({ ...formData, dates: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                className="form-textarea"
                rows={3}
                required
                placeholder="What does this project do and what impact did it create?"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Preview Type Selector */}
            <div className="form-group">
              <label className="form-label">Card Media Preview Mode</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, previewType: 'iframe' })}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: formData.previewType === 'iframe' ? 'var(--accent-primary)' : 'var(--border-color)',
                    background: formData.previewType === 'iframe' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    color: formData.previewType === 'iframe' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: formData.previewType === 'iframe' ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <Globe size={16} />
                  <div>
                    <div style={{ fontSize: '0.8125rem' }}>Live Website (Iframe)</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Direct interactive site</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, previewType: 'image' })}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: formData.previewType === 'image' ? 'var(--accent-primary)' : 'var(--border-color)',
                    background: formData.previewType === 'image' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    color: formData.previewType === 'image' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: formData.previewType === 'image' ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <ImageIcon size={16} />
                  <div>
                    <div style={{ fontSize: '0.8125rem' }}>Image Snapshot</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Image URL preview</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, previewType: 'video' })}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid',
                    borderColor: formData.previewType === 'video' ? 'var(--accent-primary)' : 'var(--border-color)',
                    background: formData.previewType === 'video' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                    color: formData.previewType === 'video' ? 'var(--text-primary)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: formData.previewType === 'video' ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <Video size={16} />
                  <div>
                    <div style={{ fontSize: '0.8125rem' }}>Video Demo (MP4)</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Auto-looping recording</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Inputs based on preview mode */}
            {formData.previewType === 'iframe' && (
              <div className="form-group animate-fade-in" style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <label className="form-label" style={{ color: 'var(--accent-primary)' }}>Live Website URL (used for the live iframe preview)</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="https://your-website.com or https://sweet-actors-worry.loca.lt"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  💡 The website will be displayed directly in a scaled 16:9 browser frame inside the card.
                </div>
              </div>
            )}

            {formData.previewType === 'image' && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Preview Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
            )}

            {formData.previewType === 'video' && (
              <div className="form-group animate-fade-in">
                <label className="form-label">Video Clip URL (MP4 / WebM)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://.../demo.mp4"
                  value={formData.videoUrl || formData.imageUrl}
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value, imageUrl: e.target.value })}
                />
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Live Project Link</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://example.com"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub Repository URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tech Stack Tags (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Next.js, TypeScript, OpenAI, TailwindCSS, Prisma"
                value={tagsText}
                onChange={e => setTagsText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  style={{ width: '1.1rem', height: '1.1rem' }}
                />
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Star size={14} fill={formData.featured ? '#fbbf24' : 'none'} color={formData.featured ? '#fbbf24' : 'currentColor'} />
                  Featured Project (Highlighted with badge)
                </span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" onClick={cancelEdit} className="admin-btn admin-btn-secondary">
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                <Check size={16} />
                <span>Save Project</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', minWidth: 0 }}>
        {projects.map((proj, index) => (
          <div
            key={proj.id}
            className="admin-item-row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              width: '100%',
              minWidth: 0,
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 0%', minWidth: 0, overflow: 'hidden' }}>
              {proj.imageUrl ? (
                <img src={proj.imageUrl} alt={proj.title} style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.375rem', objectFit: 'cover', flexShrink: 0 }} />
              ) : proj.liveUrl ? (
                <div style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.375rem', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>
                  <Globe size={18} />
                </div>
              ) : (
                <div style={{ width: '3.5rem', height: '2.5rem', borderRadius: '0.375rem', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FolderGit2 size={16} />
                </div>
              )}
              <div style={{ minWidth: 0, flex: '1 1 0%', overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => startEdit(proj)}
                    style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', textAlign: 'left', cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {proj.title}
                  </button>
                  {proj.featured && (
                    <span style={{ fontSize: '0.7rem', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                      Featured
                    </span>
                  )}
                  {proj.previewType === 'iframe' && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', background: 'rgba(2, 132, 199, 0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                      Live Iframe
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', display: 'block' }}>
                  {proj.tags?.join(', ')}
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
                disabled={index === projects.length - 1}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem', opacity: index === projects.length - 1 ? 0.4 : 1 }}
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>
              <button
                type="button"
                onClick={() => startEdit(proj)}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.45rem 0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                title="Edit Project"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete project "${proj.title}"?`)) {
                    deleteProject(proj.id);
                  }
                }}
                className="admin-btn admin-btn-danger"
                style={{ padding: '0.45rem 0.65rem' }}
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
