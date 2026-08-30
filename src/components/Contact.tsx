import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, CheckCircle2, Mail, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, sendMessage } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      sendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message
      });
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 400);
  };

  return (
    <section id="contact" className="portfolio-section">
      <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
        <span className="section-pill">Get In Touch</span>
        <h2 className="section-title" style={{ fontSize: '1.85rem' }}>Let's Build Something Together</h2>
        <p className="section-subtitle" style={{ maxWidth: '480px' }}>
          Have an idea, want to collaborate on a product, or just want to chat? Drop a message below!
        </p>
      </div>

      <div className="contact-card animate-fade-in">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={42} style={{ color: '#22c55e' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Message Sent Successfully!</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '400px' }}>
              Thank you for reaching out. Your message has been sent to the admin dashboard and I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  className="form-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Your Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                placeholder="What's this regarding?"
                className="form-input"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-msg">Message *</label>
              <textarea
                id="contact-msg"
                required
                rows={4}
                placeholder="Tell me about your project, idea, or question..."
                className="form-textarea"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '0.75rem' }}>
              <button
                type="submit"
                disabled={submitting}
                className="form-submit-btn"
                style={{ width: '100%', maxWidth: '280px' }}
              >
                <Send size={15} />
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
