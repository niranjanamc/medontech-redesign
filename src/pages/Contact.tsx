import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: 'PCB Layout Quote',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: 'PCB Layout Quote', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Reach out to our global engineering offices or request a detailed technical quotation.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="container" style={{ padding: '80px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px'
        }}>
          {/* Left Column: Office details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Global Headquarters
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
              We partner with silicon vendors, PCB assemblers, and certified testing laboratories globally to streamline your hardware pipeline.
            </p>

            {/* US Card */}
            <div className="premium-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={badgeStyle}><Globe size={18} /></div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Medontech - USA</h3>
              </div>
              <div style={detailsStyle}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <MapPin size={16} style={iconColor} />
                  <span>5661 Palmer Way, Carlsbad, CA 92010</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Phone size={16} style={iconColor} />
                  <a href="tel:+17604667565">(760) 466-7565</a>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={16} style={iconColor} />
                  <a href="mailto:services@medontech.com">services@medontech.com</a>
                </div>
              </div>
            </div>

            {/* India Card */}
            <div className="premium-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={badgeStyle}><Globe size={18} /></div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>Medontech - India</h3>
              </div>
              <div style={detailsStyle}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <MapPin size={16} style={iconColor} />
                  <span>No 10, Floor II, Thamirabharani Street, Valasaravakkam, Chennai - 600 087, India</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Phone size={16} style={iconColor} />
                  <a href="tel:+914443300349">+91-44-4330 0349 / +91-81442 35005</a>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={16} style={iconColor} />
                  <a href="mailto:services@medontech.com">services@medontech.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="glass-panel" style={{
            padding: '40px 32px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', textAlign: 'left' }}>
              Request a Consultation
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px', textAlign: 'left' }}>
              Please complete this form and our engineering team will get back to you with layout, simulation, or pricing details within 24 hours.
            </p>

            {submitted ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <CheckCircle2 size={48} style={{ color: '#10b981' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)' }}>Message Sent</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '300px' }}>
                  Thank you! Your enquiry has been received and routed to services@medontech.com.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <div style={formGroupStyle}>
                  <label htmlFor="name" style={labelStyle}>Your Name *</label>
                  <input required type="text" id="name" name="name" value={form.name} onChange={handleChange} style={inputStyle} />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="email" style={labelStyle}>Your Business Email *</label>
                  <input required type="email" id="email" name="email" value={form.email} onChange={handleChange} style={inputStyle} />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="phone" style={labelStyle}>Your Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} style={inputStyle} />
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="subject" style={labelStyle}>Engineering Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} style={selectStyle}>
                    <option value="PCB Layout Quote">PCB Layout & Design Quote</option>
                    <option value="Simulation Analysis">Signal / Power / Thermal Simulation</option>
                    <option value="Component Sourcing">Obsolete Sourcing / Bill-of-Materials</option>
                    <option value="General Engineering">General Inquiry</option>
                  </select>
                </div>

                <div style={formGroupStyle}>
                  <label htmlFor="message" style={labelStyle}>Message / Project Description *</label>
                  <textarea required id="message" name="message" rows={5} value={form.message} onChange={handleChange} style={textareaStyle} placeholder="Include board specs, layers, or targeted delivery timeline..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{
                  justifyContent: 'center',
                  padding: '14px',
                  marginTop: '10px'
                }}>
                  {isSubmitting ? 'Sending Request...' : (
                    <>
                      <Send size={16} />
                      Submit Consultation Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styling definitions
const bannerStyle: React.CSSProperties = {
  padding: '80px 0',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  textAlign: 'left',
  borderBottom: '1px solid var(--border-color)',
  position: 'relative'
};

const badgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'var(--accent-glow)',
  color: 'var(--accent-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const detailsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  fontSize: '14px',
  color: 'var(--text-secondary)'
};

const iconColor = { color: 'var(--accent-primary)', flexShrink: 0 };

const formGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-muted)'
};

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 'var(--border-radius-sm)',
  border: '1px solid var(--border-color)',
  background: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  outline: 'none',
  width: '100%'
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  backgroundSize: '14px'
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  fontFamily: 'var(--font-body)'
};
