import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';

interface DropdownItem {
  name: string;
  path: string;
}

interface NavSection {
  title: string;
  items: DropdownItem[];
}

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Monitor scroll height inside the snap-container (for Home page) or window (for detail pages)
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (location.pathname === '/') {
      setIsScrolled(false); // Reset on home load
      const container = document.querySelector('.snap-container');
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    } else {
      setIsScrolled(true); // Always glassmorphic on detail pages
    }
  }, [location]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navSections: NavSection[] = [
    {
      title: 'Corporate',
      items: [
        { name: 'Our Company', path: '/company?sec=company' },
        { name: 'Our Customers', path: '/company?sec=customers' },
        { name: 'Business Model', path: '/company?sec=business' },
        { name: 'Excellence Standards', path: '/company?sec=excellence' },
        { name: 'Being A Medonian', path: '/company?sec=careers' }
      ]
    },
    {
      title: 'Design Services',
      items: [
        { name: 'Product Design', path: '/services?tab=product' },
        { name: 'PCB Design & Layout', path: '/services?tab=pcb' },
        { name: 'PCB Library Development', path: '/services?tab=library' },
        { name: 'PCB Data Migration', path: '/services?tab=migration' },
        { name: 'Mechanical Design', path: '/services?tab=mechanical' }
      ]
    },
    {
      title: 'Analysis',
      items: [
        { name: 'SI Analysis', path: '/analysis?tab=si' },
        { name: 'EMI Analysis', path: '/analysis?tab=emi' },
        { name: 'Power Integrity', path: '/analysis?tab=pi' },
        { name: 'Thermal Analysis', path: '/analysis?tab=thermal' }
      ]
    },
    {
      title: 'Manufacturing',
      items: [
        { name: 'PCB Fabrication', path: '/manufacturing?tab=fabrication' },
        { name: 'PCB Assembly', path: '/manufacturing?tab=assembly' },
        { name: 'Component Sourcing', path: '/manufacturing?tab=sourcing' },
        { name: 'DFx Analysis', path: '/manufacturing?tab=dfx' }
      ]
    }
  ];

  return (
    <header 
      className={isScrolled ? "tesla-header-active" : ""}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'var(--transition-tesla)',
        background: 'transparent',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid transparent'
      }}
    >
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="logo-font" style={{
            fontSize: '15px',
            color: 'var(--text-primary)',
            lineHeight: 1.1
          }}>
            MEDONTECH
          </div>
        </Link>

        {/* Center menu links - Tesla style minimalist */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navSections.map((section) => (
            <div 
              key={section.title}
              onMouseEnter={() => setActiveDropdown(section.title)}
              onMouseLeave={() => setActiveDropdown(null)}
              style={{ position: 'relative' }}
            >
              <button 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  padding: '6px 16px',
                  borderRadius: '12px',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'var(--transition-fast)'
                }}
                className="nav-btn-hover"
              >
                {section.title}
                <ChevronDown size={12} />
              </button>

              {activeDropdown === section.title && (
                <div className="glass-card" style={dropdownStyle}>
                  {section.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      style={dropdownItemStyle}
                      className="dropdown-item-hover"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/downloads" className="nav-btn-hover" style={simpleLinkStyle}>Downloads</Link>
          <Link to="/contact" className="nav-btn-hover" style={simpleLinkStyle}>Contact</Link>
        </nav>

        {/* Right tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '6px',
              color: 'var(--text-primary)',
              opacity: 0.85
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to="/contact" className="btn-tesla-dark desktop-cta" style={{
            padding: '8px 20px',
            fontSize: '11px',
            borderRadius: '12px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-primary)'
          }}>
            Get Quote
          </Link>

          {/* Mobile hamburger */}
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
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="glass-card mobile-drawer" style={mobileDrawerStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px' }}>
            <Link to="/" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Home</Link>
            
            {navSections.map((section) => (
              <div key={section.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <span style={{ 
                  fontSize: '10px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.12em', 
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  {section.title}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
                  {section.items.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      onClick={() => setIsOpen(false)}
                      style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <Link to="/downloads" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Downloads</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Contact</Link>
            
            <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-tesla-dark" style={{
              textAlign: 'center',
              fontSize: '12px',
              padding: '10px'
            }}>
              Get Quote
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .nav-btn-hover:hover {
          background-color: var(--border-color) !important;
        }
        .dropdown-item-hover:hover {
          background-color: var(--border-color) !important;
          color: var(--text-primary) !important;
          padding-left: 20px !important;
        }
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

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  minWidth: '240px',
  padding: '6px',
  marginTop: '8px',
  animation: 'fadeIn 0.2s ease-out',
  background: 'var(--bg-secondary)',
  boxShadow: 'var(--card-shadow)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px'
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'block',
  padding: '8px 12px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  textAlign: 'left',
  transition: 'var(--transition-fast)'
};

const simpleLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.05em',
  padding: '6px 16px',
  borderRadius: '12px',
  color: 'var(--text-primary)',
};

const mobileDrawerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '64px',
  left: 0,
  width: '100vw',
  maxHeight: 'calc(100vh - 64px)',
  overflowY: 'auto',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: 0,
  padding: '16px 24px',
  background: 'var(--bg-secondary)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
};

const mobileLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '15px',
  fontWeight: 600,
  color: 'var(--text-primary)',
  textAlign: 'left'
};
