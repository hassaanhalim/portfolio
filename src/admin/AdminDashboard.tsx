import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  Code2, 
  GraduationCap, 
  Trophy, 
  Mail, 
  ArrowLeft, 
  Sun, 
  Moon, 
  Download, 
  Upload, 
  RotateCcw, 
  Database,
  CheckCircle2,
  AlertCircle,
  LogOut
} from 'lucide-react';

import { ProfileEditor } from './ProfileEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { SkillsEditor } from './SkillsEditor';
import { EducationEditor } from './EducationEditor';
import { HackathonsEditor } from './HackathonsEditor';
import { MessagesViewer } from './MessagesViewer';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite, onLogout }) => {
  const { data, theme, toggleTheme, resetToDefaults, exportDataJson, importDataJson } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'projects' | 'skills' | 'education' | 'hackathons' | 'messages' | 'data'>('profile');
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio data exported successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJson(content);
        if (success) {
          showToast('Portfolio data imported successfully!');
        } else {
          showToast('Failed to parse JSON file', 'error');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to default template? Any custom edits will be replaced.')) {
      resetToDefaults();
      showToast('Reset portfolio to default Magic UI data');
    }
  };

  const unreadMessagesCount = (data.messages || []).filter(m => !m.read).length;

  const tabs = [
    { id: 'profile', label: 'Profile & Hero', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, count: data.experiences?.length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: data.projects?.length },
    { id: 'skills', label: 'Skills', icon: Code2, count: data.skills?.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: data.education?.length },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy, count: data.hackathons?.length },
    { id: 'messages', label: 'Messages Inbox', icon: Mail, unread: unreadMessagesCount },
    { id: 'data', label: 'Backup & JSON Sync', icon: Database },
  ];

  return (
    <div className="admin-container">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 100,
            background: toastMsg.type === 'success' ? '#15803d' : '#b91c1c',
            color: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
          className="animate-fade-in"
        >
          {toastMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="admin-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBackToSite}
            className="admin-btn admin-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} />
            <span>View Live Site</span>
          </button>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Portfolio Admin
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={toggleTheme}
            className="nav-icon-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={handleExport}
            className="admin-btn admin-btn-secondary"
            title="Download JSON backup"
          >
            <Download size={14} />
            <span style={{ display: 'none', minWidth: '60px' }}>Export</span>
          </button>

          <button
            onClick={onLogout}
            className="admin-btn admin-btn-danger"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
            title="Log out of Admin"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Admin Main Layout */}
      <div className="admin-layout">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`admin-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span style={{ flex: 1 }}>{tab.label}</span>
                {tab.unread !== undefined && tab.unread > 0 && (
                  <span
                    style={{
                      background: 'var(--accent-primary)',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px'
                    }}
                  >
                    {tab.unread}
                  </span>
                )}
                {tab.count !== undefined && !tab.unread && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Tab Content Area */}
        <main className="admin-main">
          {activeTab === 'profile' && <ProfileEditor />}
          {activeTab === 'experience' && <ExperienceEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'skills' && <SkillsEditor />}
          {activeTab === 'education' && <EducationEditor />}
          {activeTab === 'hackathons' && <HackathonsEditor />}
          {activeTab === 'messages' && <MessagesViewer />}

          {activeTab === 'data' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Data Backup & Restore</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Export your entire portfolio state as JSON, restore backups, or reset to original sample template
                </p>
              </div>

              <div className="admin-content-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Export Portfolio Data</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Download a full JSON file containing all your experiences, projects, skills, education, and bio.
                  </p>
                  <button onClick={handleExport} className="admin-btn admin-btn-primary">
                    <Download size={16} />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <hr style={{ borderColor: 'var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Import Portfolio Data</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Upload a previously exported JSON backup to replace active data.
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={handleImportFile}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="admin-btn admin-btn-secondary"
                  >
                    <Upload size={16} />
                    <span>Upload JSON File</span>
                  </button>
                </div>

                <hr style={{ borderColor: 'var(--border-color)' }} />

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444' }}>Reset to Magic UI Default Data</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    Reset all custom content back to the default Magic UI template.
                  </p>
                  <button onClick={handleReset} className="admin-btn admin-btn-danger">
                    <RotateCcw size={16} />
                    <span>Reset Portfolio Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
