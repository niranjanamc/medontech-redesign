import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface SlideSection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCta: { text: string; path: string };
  secondaryCta?: { text: string; path: string };
}

export const Home: React.FC = () => {
  const slides: SlideSection[] = [
    {
      id: 'hero',
      title: 'MEDONTECH',
      subtitle: 'Accelerating Tomorrow\'s Hardware Innovation',
      image: 'images/pcb_hero.png',
      primaryCta: { text: 'Explore Services', path: '/services' },
      secondaryCta: { text: 'Get In Touch', path: '/contact' }
    },
    {
      id: 'design',
      title: 'DESIGN SERVICES',
      subtitle: 'High-speed, high-density multilayer layouts up to 38 layers',
      image: 'images/product_design.png',
      primaryCta: { text: 'Product Design', path: '/services?tab=product' },
      secondaryCta: { text: 'PCB Layout', path: '/services?tab=pcb' }
    },
    {
      id: 'analysis',
      title: 'SIMULATION & ANALYSIS',
      subtitle: 'Advanced SI / PI compliance and Thermal CFD cooling calculations',
      image: 'images/thermal_sim.png',
      primaryCta: { text: 'Signal Integrity', path: '/analysis?tab=si' },
      secondaryCta: { text: 'Thermal Analysis', path: '/analysis?tab=thermal' }
    },
    {
      id: 'manufacturing',
      title: 'MANUFACTURING SERVICES',
      subtitle: 'Prototype fabrication, automated PCBA, and global sourcing',
      image: 'images/robot_assembly.png',
      primaryCta: { text: 'Assembly & Sourcing', path: '/manufacturing?tab=assembly' },
      secondaryCta: { text: 'Bare-Board Fab', path: '/manufacturing?tab=fabrication' }
    },
    {
      id: 'careers',
      title: 'BEING A MEDONIAN',
      subtitle: 'Collaborate with first-class minds in a tech-driven lab workspace',
      image: 'images/careers_medonian.png',
      primaryCta: { text: 'Join Our Team', path: '/company?sec=careers' }
    }
  ];

  return (
    <div className="snap-container">
      {slides.map((slide, index) => (
        <section key={slide.id} className="snap-section">
          {/* Background image & custom dark overlay */}
          <img src={slide.image} alt={slide.title} className="full-bleed-bg" />
          <div className="tesla-overlay" />

          {/* Section Info (Top) */}
          <div className="section-content animate-slide-down" style={{ marginTop: '40px' }}>
            <h1 className="heading-wide" style={{
              fontSize: slide.id === 'hero' ? '3.5rem' : '2.5rem',
              fontWeight: 300,
              marginBottom: '10px',
              color: 'var(--text-primary)'
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              fontWeight: 400
            }}>
              {slide.subtitle}
            </p>
          </div>

          {/* CTA Buttons (Bottom) */}
          <div className="section-content animate-fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}>
              <Link to={slide.primaryCta.path} className="btn-tesla-dark">
                {slide.primaryCta.text}
              </Link>
              {slide.secondaryCta && (
                <Link to={slide.secondaryCta.path} className="btn-tesla-light">
                  {slide.secondaryCta.text}
                </Link>
              )}
            </div>

            {/* Down Chevron indicator (only visible on non-last sections) */}
            {index < slides.length - 1 && (
              <ChevronDown 
                size={28} 
                className="chevron-bounce" 
                style={{ 
                  color: 'white', 
                  cursor: 'pointer',
                  marginTop: '16px',
                  opacity: 0.65
                }} 
                onClick={() => {
                  const nextSec = document.querySelectorAll('.snap-section')[index + 1];
                  nextSec?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Minimalist Footer on last slide */}
            {index === slides.length - 1 && (
              <div className="tesla-home-footer" style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '32px',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.4)',
                fontFamily: 'var(--font-heading)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'var(--transition-tesla)'
              }}>
                <span>Medontech © {new Date().getFullYear()}</span>
                <a href="mailto:services@medontech.com" className="home-footer-link">services@medontech.com</a>
                <span>USA: (760) 466-7565</span>
                <span>IND: +91-44-4330 0349</span>
                <Link to="/contact" className="home-footer-link">Contact</Link>
                <Link to="/downloads" className="home-footer-link">Downloads</Link>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Style Animations injection */}
      <style>{`
        .chevron-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        .animate-slide-down {
          animation: slideDownFade 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeInOnly 1s ease-out forwards;
        }
        @keyframes slideDownFade {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInOnly {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .home-footer-link {
          transition: color 0.3s ease;
        }
        .home-footer-link:hover {
          color: #ffffff !important;
        }
        @media (max-width: 768px) {
          .tesla-home-footer {
            flex-direction: column !important;
            gap: 10px !important;
            margin-top: 16px !important;
            align-items: center !important;
          }
        }
      `}</style>
    </div>
  );
};
