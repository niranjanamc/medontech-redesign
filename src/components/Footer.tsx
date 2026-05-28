import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (
    <footer className="glass-panel" style={{
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderRadius: 0,
      background: 'var(--bg-secondary)',
      paddingTop: '64px',
      paddingBottom: '32px',
      marginTop: 'auto',
      borderTop: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
          textAlign: 'left'
        }}>
          {/* Logo & Corporate Tagline */}
          <div style={{ gridColumn: 'span 2', minWidth: '260px' }} className="footer-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img 
                src="images/logo1.png" 
                alt="Medontech Logo" 
                style={{ height: '36px', objectFit: 'contain' }}
                className="brand-logo-img"
              />
            </Link>
            <p style={{ 
              fontSize: '14px', 
              color: 'var(--text-secondary)', 
              marginBottom: '24px', 
              maxWidth: '300px',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}>
              Specializing in premium Product Design, PCB Layout, SI / EMI / PI / Thermal Simulations, and end-to-end Manufacturing services globally.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://www.facebook.com/Medontech" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="https://twitter.com/Medontech" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="http://www.linkedin.com/company/medon-technologies" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="http://www.youtube.com/user/Medontech" target="_blank" rel="noopener noreferrer" style={socialIconStyle}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.53 12 3.53 12 3.53s-7.53 0-9.388.525a3.003 3.003 0 0 0-2.11 2.108C0 8.022 0 12 0 12s0 3.978.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.47 12 20.47 12 20.47s7.53 0 9.388-.525a3.003 3.003 0 0 0 2.11-2.108C24 15.978 24 12 24 12s0-3.978-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Corporate */}
          <div>
            <h4 style={footerHeaderStyle}>Corporate</h4>
            <ul style={footerListStyle}>
              <li><Link to="/company?sec=company" style={footerLinkStyle}>Our Company</Link></li>
              <li><Link to="/company?sec=customers" style={footerLinkStyle}>Our Customers</Link></li>
              <li><Link to="/company?sec=business" style={footerLinkStyle}>Business Model</Link></li>
              <li><Link to="/company?sec=excellence" style={footerLinkStyle}>Excellence Standards</Link></li>
              <li><Link to="/company?sec=careers" style={footerLinkStyle}>Being An Medonian</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 style={footerHeaderStyle}>Design Services</h4>
            <ul style={footerListStyle}>
              <li><Link to="/services?tab=product" style={footerLinkStyle}>Product Design</Link></li>
              <li><Link to="/services?tab=pcb" style={footerLinkStyle}>PCB Layout Design</Link></li>
              <li><Link to="/services?tab=library" style={footerLinkStyle}>PCB Library Dev</Link></li>
              <li><Link to="/services?tab=migration" style={footerLinkStyle}>Data Migration</Link></li>
              <li><Link to="/services?tab=mechanical" style={footerLinkStyle}>Mechanical Design</Link></li>
            </ul>
          </div>

          {/* Column 4: Simulation & Fab */}
          <div>
            <h4 style={footerHeaderStyle}>Analysis & Fab</h4>
            <ul style={footerListStyle}>
              <li><Link to="/analysis?tab=si" style={footerLinkStyle}>SI / PI Analysis</Link></li>
              <li><Link to="/analysis?tab=emi" style={footerLinkStyle}>EMI / EMC Compliance</Link></li>
              <li><Link to="/analysis?tab=thermal" style={footerLinkStyle}>Thermal Simulation</Link></li>
              <li><Link to="/manufacturing?tab=fabrication" style={footerLinkStyle}>PCB Fabrication</Link></li>
              <li><Link to="/manufacturing?tab=assembly" style={footerLinkStyle}>PCB Assembly</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '32px' }} />

        {/* Contact Strip and Copyright */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '24px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          justifyContent: 'space-between'
        }} className="footer-bottom">
          <div>
            <p>Copyright &copy; {new Date().getFullYear()} - All Rights Reserved - <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Medontech</span></p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} style={{ color: 'var(--accent-secondary)' }} />
              USA: (760) 466-7565 | IND: +91-44-4330 0349
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: 'var(--accent-secondary)' }} />
              services@medontech.com
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-brand {
            grid-column: span 1 !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};

// Styling
const footerHeaderStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '20px',
  color: 'var(--text-primary)'
};

const footerListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
};

const footerLinkStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--text-secondary)',
};

const socialIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-secondary)',
  transition: 'all 0.2s ease',
};
