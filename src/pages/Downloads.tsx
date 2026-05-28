import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

interface Brochure {
  title: string;
  category: string;
  size: string;
  desc: string;
}

export const Downloads: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const brochures: Brochure[] = [
    { title: 'Medontech Corporate Brochure', category: 'Corporate', size: '3.2 MB', desc: 'Complete overview of our engineering services, corporate values, locations, and delivery workflows.' },
    { title: 'Product Design Brochure', category: 'Design Services', size: '2.4 MB', desc: 'Detailed look at schematic capture, embedded hardware capabilities, and design validation methodologies.' },
    { title: 'PCB Design Guidelines', category: 'Design Services', size: '1.8 MB', desc: 'Layer counts, BGA fanouts, blind/buried microvia spacing parameters, and general layout rules.' },
    { title: 'PCB Library Development Specs', category: 'Design Services', size: '1.2 MB', desc: 'Symbol creation rules, footprint pad stack calculations, and compliance with IPC-7351B standards.' },
    { title: 'PCB Data Migration Checklist', category: 'Design Services', size: '0.8 MB', desc: 'Data mapping translation guidelines and validation checks between major CAD platforms.' },
    { title: 'Mechanical Design Capabilities', category: 'Design Services', size: '1.6 MB', desc: 'Enclosure modeling, 3D drafting styles, reverse engineering tolerances, and sourcing support details.' },
    { title: 'Signal Integrity Analysis Brief', category: 'Analysis', size: '2.1 MB', desc: 'Waveform reflections, crosstalk mitigation rules, SerDes channel modeling, and stackup design simulations.' },
    { title: 'EMI/EMC Compliance Guide', category: 'Analysis', size: '1.9 MB', desc: 'Pre-compliance simulation setups, board-level emissions debugging, and shield filter designs.' },
    { title: 'Power Integrity Analysis Details', category: 'Analysis', size: '1.4 MB', desc: 'DC Drop simulations, decoupling capacitor network design, and PDN impedance optimizations.' },
    { title: 'Thermal Analysis Capabilities', category: 'Analysis', size: '1.5 MB', desc: 'Junction temperature estimates, air velocity profiling, and heatsink fin CFD simulations.' },
    { title: 'PCB Fabrication Specifications', category: 'Manufacturing', size: '2.7 MB', desc: 'Base copper limits, aspect ratios, stackup materials parameters, and final chemical finish options.' },
    { title: 'PCB Assembly Capabilities', category: 'Manufacturing', size: '2.2 MB', desc: 'SMT capabilities, BGA placement tolerances, X-ray checks, functional fixtures, and AOI details.' },
    { title: 'Component Sourcing Services', category: 'Manufacturing', size: '0.9 MB', desc: 'Obsolescence planning, allocated IC inventory tracking, and lead-to-RoHS converter program specs.' },
    { title: 'DFx Quality Checklist', category: 'Manufacturing', size: '1.1 MB', desc: 'Full pre-engineering checkpoints covering DFM (Fabrication), DFA (Assembly), and DFT (Testing).' }
  ];

  const handleDownload = (title: string) => {
    setDownloadingId(title);
    setTimeout(() => {
      setDownloadingId(null);
      setCompletedId(title);
      setTimeout(() => setCompletedId(null), 3000);
    }, 1500);
  };

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="tesla-overlay" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Downloads & Resources</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Access our corporate brochures, technical design guidelines, and manufacturing checklists.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="container" style={{ padding: '80px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {brochures.map((brochure) => (
            <div key={brochure.title} className="premium-card" style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'between',
              height: '100%',
              textAlign: 'left'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: 'var(--accent-glow)',
                    color: 'var(--accent-primary)',
                    border: '1px solid var(--border-color)'
                  }}>
                    {brochure.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    PDF | {brochure.size}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {brochure.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {brochure.desc}
                </p>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => handleDownload(brochure.title)}
                  disabled={downloadingId !== null}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--border-radius-pill)',
                    fontSize: '13px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'var(--transition-tesla)',
                    background: completedId === brochure.title ? '#10b981' : 'rgba(23, 23, 23, 0.8)',
                    color: '#ffffff',
                    border: '1px solid var(--border-color)',
                    backdropFilter: 'blur(4px)'
                  }}
                  className="download-btn"
                >
                  {downloadingId === brochure.title ? (
                    <>
                      <span className="spinner" />
                      Downloading...
                    </>
                  ) : completedId === brochure.title ? (
                    <>
                      <CheckCircle2 size={16} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .download-btn:hover {
          background-color: rgba(255, 255, 255, 0.95) !important;
          color: #171717 !important;
          transform: scale(1.02);
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid var(--text-muted);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Banner styling
const bannerStyle: React.CSSProperties = {
  padding: '120px 0 80px',
  background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(images/pcb_hero.png) center/cover no-repeat',
  textAlign: 'left',
  borderBottom: '1px solid var(--border-color)',
  position: 'relative'
};
