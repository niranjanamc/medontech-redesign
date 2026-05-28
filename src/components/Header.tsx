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

const megaMenuColumns: Record<string, { title: string; items: DropdownItem[] }[]> = {
  'Corporate': [
    {
      title: 'Profile',
      items: [
        { name: 'Our Company', path: '/company?sec=company' },
        { name: 'Excellence Standards', path: '/company?sec=excellence' },
        { name: 'Business Model', path: '/company?sec=business' }
      ]
    },
    {
      title: 'Careers & Partners',
      items: [
        { name: 'Being A Medonian', path: '/company?sec=careers' },
        { name: 'Our Customers', path: '/company?sec=customers' }
      ]
    }
  ],
  'Design Services': [
    {
      title: 'Electronic Design',
      items: [
        { name: 'PCB Design & Layout', path: '/services?tab=pcb' },
        { name: 'PCB Library Development', path: '/services?tab=library' },
        { name: 'PCB Data Migration', path: '/services?tab=migration' }
      ]
    },
    {
      title: 'Physical Modeling',
      items: [
        { name: 'Product Design', path: '/services?tab=product' },
        { name: 'Mechanical Design', path: '/services?tab=mechanical' }
      ]
    }
  ],
  'Analysis': [
    {
      title: 'High-Speed Simulations',
      items: [
        { name: 'SI Analysis', path: '/analysis?tab=si' },
        { name: 'Power Integrity', path: '/analysis?tab=pi' }
      ]
    },
    {
      title: 'Compliance & Thermal',
      items: [
        { name: 'EMI Analysis', path: '/analysis?tab=emi' },
        { name: 'Thermal Analysis', path: '/analysis?tab=thermal' }
      ]
    }
  ],
  'Manufacturing': [
    {
      title: 'Production Line',
      items: [
        { name: 'PCB Fabrication', path: '/manufacturing?tab=fabrication' },
        { name: 'PCB Assembly', path: '/manufacturing?tab=assembly' }
      ]
    },
    {
      title: 'Supply & Quality',
      items: [
        { name: 'Component Sourcing', path: '/manufacturing?tab=sourcing' },
        { name: 'DFx Analysis', path: '/manufacturing?tab=dfx' }
      ]
    }
  ]
};

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
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="images/logo1.png" 
            alt="Medontech Logo" 
            style={{ height: '28px', objectFit: 'contain' }}
            className="brand-logo-img"
          />
        </Link>

        {/* Center menu links - Tesla style minimalist */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {navSections.map((section) => (
            <div 
              key={section.title}
              onMouseEnter={() => setActiveDropdown(section.title)}
              onMouseLeave={() => setActiveDropdown(null)}
              style={{ display: 'inline-block' }}
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

      {/* Backdrop overlay for dark glass slide down */}
      {activeDropdown && (
        <div 
          style={{
            position: 'fixed',
            inset: '64px 0 0 0',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 998,
            animation: 'fadeIn 0.25s ease-out',
            pointerEvents: 'none'
          }} 
        />
      )}

      {/* Mega menu dropdown */}
      {activeDropdown && (
        <div 
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '100vw',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            padding: '40px 15vw',
            animation: 'slideDownMenu 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            gap: '80px',
            pointerEvents: 'auto'
          }}
          className="mega-menu-panel"
        >
          {megaMenuColumns[activeDropdown]?.map((col, cIdx) => (
            <div key={cIdx} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', minWidth: '200px' }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '8px',
                marginBottom: '4px'
              }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.items.map((item) => (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '14px',
                      fontWeight: 300,
                      transition: 'all 0.2s ease'
                    }}
                    className="mega-menu-link"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .nav-btn-hover:hover {
          background-color: var(--border-color) !important;
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
