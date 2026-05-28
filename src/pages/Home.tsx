import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Activity, ShieldCheck, Hammer, Layers, Layout, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  const tools = [
    { name: 'Cadence Allegro', category: 'PCB & SI' },
    { name: 'Mentor Graphics', category: 'EDA & Analysis' },
    { name: 'Altium Designer', category: 'PCB Layout' },
    { name: 'Zuken CR-5000', category: 'System Design' },
    { name: 'SolidWorks', category: 'Mechanical' },
    { name: 'PTC Creo', category: 'Mechanical' },
    { name: 'CAM350', category: 'DFM/Fabrication' }
  ];

  const categories = [
    {
      title: 'Product Design',
      icon: <Layers size={24} />,
      desc: 'Complete board-level hardware design from conceptual design and schematics to board testing and transfer to mass production.',
      link: '/services?tab=product'
    },
    {
      title: 'PCB layout Design',
      icon: <Cpu size={24} />,
      desc: 'Expertise in high-speed, high-density, multi-layer rigid and flex PCBs (up to 38 layers, 10Gbps+ frequency, and fine-pitch BGAs).',
      link: '/services?tab=pcb'
    },
    {
      title: 'Simulation & Analysis',
      icon: <Activity size={24} />,
      desc: 'Advanced post-layout verification: Signal Integrity (SI), Power Integrity (PI), Thermal Analysis, and EMI/EMC compliance.',
      link: '/analysis?tab=si'
    },
    {
      title: 'Mechanical Design',
      icon: <Layout size={24} />,
      desc: 'Modular drafting and 3D modeling including tool engineering, reverse engineering, legacy conversion, and enclosure design.',
      link: '/services?tab=mechanical'
    },
    {
      title: 'Electronics Manufacturing',
      icon: <Hammer size={24} />,
      desc: 'Full-service prototyping, high-volume assembly support, global component sourcing, and RoHS compliance services.',
      link: '/manufacturing?tab=fabrication'
    },
    {
      title: 'DFx Quality Analysis',
      icon: <ShieldCheck size={24} />,
      desc: 'Design for Manufacturing (DFM), Design for Assembly (DFA), and Design for Testing (DFT) pre-engineering checklists.',
      link: '/manufacturing?tab=dfx'
    }
  ];

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        {/* Animated Background Spotlights */}
        <div style={gridBackgroundStyle} />
        <div style={spotlightStyle} />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'var(--accent-glow)',
            border: '1px solid var(--border-glow)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '24px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }} />
            Trusted Global Engineering Partner
          </div>

          <h1 style={{
            fontSize: '4rem',
            lineHeight: 1.15,
            fontWeight: 800,
            maxWidth: '900px',
            margin: '0 auto 24px',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)'
          }}>
            Accelerating Tomorrow&apos;s <span className="gradient-text">Hardware Innovation</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Medontech provides premium end-to-end engineering design, simulation, and manufacturing solutions for Networking, Telecom, Aerospace, and Automotive markets.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-primary">
              Explore Services
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Request Technical Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats or Highlights */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            <div>
              <div style={statNumberStyle}>10+</div>
              <div style={statLabelStyle}>Years Experience</div>
            </div>
            <div>
              <div style={statNumberStyle}>38</div>
              <div style={statLabelStyle}>Max Layers Supported</div>
            </div>
            <div>
              <div style={statNumberStyle}>24/7</div>
              <div style={statLabelStyle}>Project Support Support</div>
            </div>
            <div>
              <div style={statNumberStyle}>100%</div>
              <div style={statLabelStyle}>IPC Certified Layouts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Categories Grid */}
      <section style={{ padding: '100px 0', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Core Engineering Capabilities</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              We provide professional engineering talent and tools to help you design, simulate, verify, and fabricate next-generation electronic products.
            </p>
          </div>

          <div className="grid-responsive">
            {categories.map((cat, idx) => (
              <div key={idx} className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--accent-glow)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', flexGrow: 1 }}>
                  {cat.desc}
                </p>
                <Link to={cat.link} style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--accent-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: 'auto'
                }}>
                  Learn More
                  <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Scrolling Wrapper */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Tools & EDA Platform Focus</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {tools.map((tool, idx) => (
              <div key={idx} className="glass-panel" style={{
                padding: '16px 24px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '160px',
                background: 'var(--bg-primary)'
              }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{tool.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{tool.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section style={{ padding: '100px 0', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="container">
          <div className="glass-panel" style={{
            padding: '64px 32px',
            textAlign: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--card-shadow)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle decor gradient */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
              zIndex: 1
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to launch your next project?</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '16px' }}>
                Connect with our engineering experts to review your requirements, stack-ups, and receive a comprehensive manufacturing checklist & quote.
              </p>
              <Link to="/contact" className="btn-primary">
                Get an Estimate
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes rotate-bg {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// CSS styles
const heroSectionStyle: React.CSSProperties = {
  position: 'relative',
  padding: '160px 0 100px',
  background: 'var(--bg-primary)',
  overflow: 'hidden',
};

const gridBackgroundStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0.05,
  backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  zIndex: 1,
};

const spotlightStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80vw',
  height: '80vh',
  background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
  zIndex: 1,
  pointerEvents: 'none',
};

const statNumberStyle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '3rem',
  fontWeight: 800,
  lineHeight: 1,
  background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '8px'
};

const statLabelStyle: React.CSSProperties = {
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontWeight: 700,
  color: 'var(--text-muted)'
};
