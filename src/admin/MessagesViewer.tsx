import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';

export const MessagesViewer: React.FC = () => {
  const { data, markMessageRead, deleteMessage } = usePortfolio();
  const messages = data.messages || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Contact Messages Inbox</h2>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          Inquiries submitted through your portfolio contact form
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="admin-content-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
          <Mail size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
          <p>No messages received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className="admin-content-card"
              style={{
                borderLeft: msg.read ? '1px solid var(--border-color)' : '4px solid var(--accent-primary)',
                background: msg.read ? 'var(--bg-card)' : 'var(--bg-secondary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {msg.name} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>({msg.email})</span>
                  </div>
                  {msg.subject && (
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--accent-primary)', marginTop: '0.15rem' }}>
                      Subject: {msg.subject}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} />
                    {msg.date}
                  </span>

                  {!msg.read && (
                    <button
                      onClick={() => markMessageRead(msg.id)}
                      className="admin-btn admin-btn-secondary"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      title="Mark as Read"
                    >
                      <CheckCircle size={13} />
                      <span>Mark Read</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Delete this message?')) {
                        deleteMessage(msg.id);
                      }
                    }}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.3rem 0.5rem' }}
                    title="Delete Message"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                {msg.message}
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <a
                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                  className="admin-btn admin-btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                >
                  <Mail size={13} />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
