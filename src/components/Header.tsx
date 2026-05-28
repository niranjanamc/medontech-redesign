import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown, Cpu, Activity, ShieldAlert, Settings, Download, Mail } from 'lucide-react';

interface DropdownItem {
  name: string;
  path: string;
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: DropdownItem[];
}

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Load and apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navSections: NavSection[] = [
    {
      title: 'Corporate',
      icon: <Settings size={16} />,
      items: [
        { name: 'Our Company', path: '/company?sec=company' },
        { name: 'Our Customers', path: '/company?sec=customers' },
        { name: 'Business Model', path: '/company?sec=business' },
        { name: 'Medontech Excellence', path: '/company?sec=excellence' },
        { name: 'Being A Medonian', path: '/company?sec=careers' }
      ]
    },
    {
      title: 'Design Services',
      icon: <Cpu size={16} />,
      items: [
        { name: 'Product Design', path: '/services?tab=product' },
        { name: 'PCB Design', path: '/services?tab=pcb' },
        { name: 'PCB Library Development', path: '/services?tab=library' },
        { name: 'PCB Data Migration', path: '/services?tab=migration' },
        { name: 'Mechanical Design', path: '/services?tab=mechanical' }
      ]
    },
    {
      title: 'Analysis',
      icon: <Activity size={16} />,
      items: [
        { name: 'SI Analysis', path: '/analysis?tab=si' },
        { name: 'EMI Analysis', path: '/analysis?tab=emi' },
        { name: 'Power Integrity Analysis', path: '/analysis?tab=pi' },
        { name: 'Thermal Analysis', path: '/analysis?tab=thermal' }
      ]
    },
    {
      title: 'Manufacturing',
      icon: <ShieldAlert size={16} />,
      items: [
        { name: 'PCB Fabrication', path: '/manufacturing?tab=fabrication' },
        { name: 'PCB Assembly', path: '/manufacturing?tab=assembly' },
        { name: 'Component Sourcing', path: '/manufacturing?tab=sourcing' },
        { name: 'DFx Analysis', path: '/manufacturing?tab=dfx' }
      ]
    }
  ];

  return (
    <header className="glass-panel" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      background: 'var(--bg-nav)',
      height: '72px'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="url(#logo-grad)" />
            <path d="M25 50H75M50 25V75M35 35L65 65M35 65L65 35" stroke="white" strokeWidth="10" strokeLinecap="round" opacity="0.15" />
            <path d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70C38.9543 70 30 61.0457 30 50Z" stroke="white" strokeWidth="8" />
            <circle cx="50" cy="50" r="10" fill="white" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--accent-secondary)" />
                <stop offset="1" stopColor="var(--accent-primary)" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}>MEDONTECH</span>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              fontWeight: 600
            }}>ENGINEERING SERVICES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/" className="nav-link" style={linkStyle(location.pathname === '/')}>Home</Link>
          
          {navSections.map((section) => (
            <div 
              key={section.title}
              className="nav-dropdown-wrapper"
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown(section.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="nav-link" 
                style={{
                  ...linkStyle(activeDropdown === section.title),
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {section.title}
                <ChevronDown size={14} style={{
                  transform: activeDropdown === section.title ? 'rotate(180deg)' : 'none',
                  transition: 'var(--transition-fast)'
                }} />
              </button>

              {activeDropdown === section.title && (
                <div className="glass-panel dropdown-menu" style={dropdownStyle}>
                  {section.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      className="dropdown-item"
                      style={dropdownItemStyle}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/downloads" className="nav-link" style={linkStyle(location.pathname === '/downloads')}>
            <Download size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Downloads
          </Link>
          <Link to="/contact" className="nav-link" style={linkStyle(location.pathname === '/contact')}>
            <Mail size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Contact
          </Link>
        </nav>

        {/* Utility Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={toggleTheme}
            className="glass-panel"
            aria-label="Toggle theme"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none',
              border: '1px solid var(--border-color)',
              background: 'transparent'
            }}
          >
            {theme === 'dark' ? <Sun size={18} className="gradient-text" /> : <Moon size={18} style={{ color: 'var(--accent-primary)' }} />}
          </button>

          {/* Contact Button CTA */}
          <Link to="/contact" className="btn-primary desktop-cta" style={{
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: 'var(--border-radius-sm)'
          }}>
            Get Quote
          </Link>

          {/* Hamburger Menu Icon */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            style={{
              display: 'none',
              padding: '6px',
              color: 'var(--text-primary)'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="glass-panel mobile-drawer" style={mobileDrawerStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
            <Link to="/" onClick={() => setIsOpen(false)} style={mobileLinkStyle(location.pathname === '/')}>Home</Link>
            
            {navSections.map((section) => (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ 
                  fontSize: '11px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  color: 'var(--text-muted)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {section.icon}
                  {section.title}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '22px' }}>
                  {section.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      style={{ fontSize: '15px', color: 'var(--text-secondary)' }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link to="/downloads" onClick={() => setIsOpen(false)} style={mobileLinkStyle(location.pathname === '/downloads')}>Downloads</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={mobileLinkStyle(location.pathname === '/contact')}>Contact</Link>
            
            <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '12px'
            }}>
              Get Quote
            </Link>
          </div>
        </div>
      )}

      {/* Inject Media Queries for Header */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-cta {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

// Styling definitions
const linkStyle = (active: boolean) => ({
  fontFamily: 'var(--font-heading)',
  fontSize: '15px',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: 'var(--border-radius-sm)',
  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
  backgroundColor: active ? 'var(--bg-tertiary)' : 'transparent',
});

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: '0',
  minWidth: '220px',
  padding: '8px',
  marginTop: '8px',
  animation: 'fadeIn 0.2s ease-out',
  border: '1px solid var(--border-color)',
  background: 'var(--bg-secondary)',
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'block',
  padding: '10px 16px',
  borderRadius: 'var(--border-radius-sm)',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textAlign: 'left',
};

const mobileDrawerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '72px',
  left: 0,
  width: '100%',
  maxHeight: 'calc(100svh - 72px)',
  overflowY: 'auto',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: 0,
  background: 'var(--bg-secondary)',
  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
};

const mobileLinkStyle = (active: boolean) => ({
  fontFamily: 'var(--font-heading)',
  fontSize: '16px',
  fontWeight: 600,
  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
});
