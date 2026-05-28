import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Cpu, Check, Layers } from 'lucide-react';

export const Manufacturing: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'fabrication' | 'assembly' | 'sourcing' | 'dfx'>('fabrication');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'fabrication' || tab === 'assembly' || tab === 'sourcing' || tab === 'dfx') {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Manufacturing Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Delivering high-reliability PCB fabrication, precision assembly, and global component sourcing.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div className="glass-panel" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '8px',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-md)',
          background: 'var(--bg-secondary)',
          justifyContent: 'center'
        }}>
          {[
            { id: 'fabrication', label: 'PCB Fabrication', icon: <Layers size={16} /> },
            { id: 'assembly', label: 'PCB Assembly', icon: <Cpu size={16} /> },
            { id: 'sourcing', label: 'Component Sourcing', icon: <ShoppingBag size={16} /> },
            { id: 'dfx', label: 'DFx Quality Analysis', icon: <ShieldCheck size={16} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s',
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeTab === tab.id ? 'var(--bg-tertiary)' : 'transparent',
                border: activeTab === tab.id ? '1px solid var(--border-color)' : '1px solid transparent'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contents */}
      <div className="container" style={{ padding: '60px 24px' }}>
        {activeTab === 'fabrication' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>PCB Fabrication & Tech Capabilities</h2>
            <p style={tabLeadStyle}>
              Rigid-multilayer printed circuit board prototype and pilot volume manufacturing, focusing on technologically advanced high-speed stackups.
            </p>
            <p style={paragraphStyle}>
              We manufacture boards from 2 to 24 layers. Keeping your layouts within our standard capabilities yields the most competitive pricing, but our advanced engineering team routinely executes emerging technology stackups including blind/buried vias, via-in-pad, and controlled impedance.
            </p>

            {/* Spec grid */}
            <div className="glass-panel" style={{ marginTop: '40px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Manufacturing Parameters
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', fontSize: '14px' }}>
                {[
                  { label: 'Layer Count', val: '2 - 24 Layers' },
                  { label: 'Materials Supported', val: 'FR4 (Tg 135 to 170+), Rogers, Teflon, PTFE, Duroid' },
                  { label: 'Finishes Available', val: 'ENIG (Electroless Nickel/Gold), Immersion Silver, OSP' },
                  { label: 'Min Track / Spacing', val: '3 mil / 3 mil (with base copper of 1/3 oz)' },
                  { label: 'Board Thickness', val: '0.40 mm to 5.00 mm (16 mil to 197 mil)' },
                  { label: 'Min Drill Size', val: '0.15 mm (6 mil)' },
                  { label: 'Aspect Ratio', val: '12:1 (Thickness to Drill)' },
                  { label: 'Special Technologies', val: 'Blind & Buried Microvias, Press-Fit, Via-in-Pad, Edge Plating' },
                  { label: 'Impedance Control', val: 'Polar Instruments Stackup generation & test (+/- 10%)' },
                  { label: 'Quality Standards', val: 'IPC-6012A Class 2 / 3, UL-796 Flammability 94V-0' }
                ].map((spec, idx) => (
                  <div key={idx} style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border-color)',
                    borderRight: idx % 2 === 0 ? '1px solid var(--border-color)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left'
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{spec.label}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assembly' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Printed Circuit Board Assembly (PCBA)</h2>
            <p style={tabLeadStyle}>
              Trustworthy manufacturing partners for prototype and pilot production PCBA, leveraging advanced pick-and-place equipment.
            </p>
            <p style={paragraphStyle}>
              Our assembly process covers full Surface Mount Technology (SMT), conventional Thru-Hole, and mixed-technology boards. We support advanced packaging structures including fine-pitch BGAs, CSPs, and micro-BGAs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>PCBA Capabilities</h3>
                <ul style={listStyle}>
                  <li>SMT, Through-Hole, & mixed technology assembly</li>
                  <li>Single and double-sided components placement</li>
                  <li>Fine-pitch BGAs down to 0.4mm and 0.5mm</li>
                  <li>Chip Scale Packaging (CSP) and Flip-Chips</li>
                  <li>Press-fit connector insertion capabilities</li>
                  <li>LED and special lighting metal-core PCB assembly</li>
                  <li>Cable and complex wire harness assembly</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Quality Checks & Rework</h3>
                <ul style={listStyle}>
                  <li>Automated Optical Inspection (AOI) for placing checks</li>
                  <li>3D X-Ray BGA solder joint validation</li>
                  <li>Functional Test Jigs developed to customer requirements</li>
                  <li>RoHS compliant lead-free assembly lines</li>
                  <li>Advanced rework: BGA de-population and re-population</li>
                  <li>Cuts, jumps, piggybacks, and minor trace repair</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sourcing' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Global Component Sourcing</h2>
            <p style={tabLeadStyle}>
              Encompassing active, passive, and electromechanical component sourcing to secure your supply chain and accelerate prototyping.
            </p>
            <p style={paragraphStyle}>
              Medontech locates and tracks global inventory. We are specialists in acquiring hard-to-find, RoHS compliant, obsolete, and allocated active ICs, acting as your local procurement team to deliver cost savings.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Sourcing Services</h3>
                <ul style={listStyle}>
                  <li>Complete Bill-of-Materials (BOM) sourcing</li>
                  <li>Locating allocated, long lead-time active components</li>
                  <li>Acquiring obsolete and hard-to-find semiconductors</li>
                  <li>Obsolescence risk management & alternate sourcing</li>
                  <li>Lead-to-RoHS conversion evaluation programs</li>
                  <li>Sourcing directly from verified tier-1 global distributors</li>
                </ul>
              </div>

              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={cardTitleStyle}>The Medontech Advantage</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  Our sourcing buyers have over 10 years of experience, executing quick turnarounds and securing components at competitive pricing. This saves your internal engineering team from procurement logistics, allowing them to remain focused on design.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dfx' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>DFx Compliance Quality Analysis</h2>
            <p style={tabLeadStyle}>
              Applying design-for-excellence methodologies during layout stages to eliminate manufacturing glitches before physical fabrication.
            </p>
            <p style={paragraphStyle}>
              We run DFM, DFT, and DFA checkers to locate layouts risks early. This reduces design revisions, lowers component cost, and ensures a seamless transition to the volume production line.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>DFM (Design for Manufacturing)</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Verifying board drill-to-copper clearances, acid-traps, solder-mask dams, split plane gaps, and checking aspect ratios to ensure high-yield bare-board fabrication.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '13px', fontWeight: 600 }}>
                  <Check size={16} /> Fabrication Checklist Verified
                </div>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>DFA (Design for Assembly)</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Checking component clearances, pin-1 orientations, fiducials placement, footprint thermal relief pads, and wave soldering direction rules to ensure mistake-free pick-and-place.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '13px', fontWeight: 600 }}>
                  <Check size={16} /> Placement Clearances Verified
                </div>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>DFT (Design for Test)</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Auditing testpoints spacing, accessibility for flying-probe or bed-of-nails fixtures, boundary-scan chain access, and loop test capabilities to ensure high test coverage.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '13px', fontWeight: 600 }}>
                  <Check size={16} /> Testpoint Access Verified
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Styling
const bannerStyle: React.CSSProperties = {
  padding: '80px 0',
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  textAlign: 'left',
  borderBottom: '1px solid var(--border-color)',
  position: 'relative'
};

const tabContentStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  animation: 'fadeIn 0.3s ease-out'
};

const tabTitleStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '16px',
  fontFamily: 'var(--font-heading)'
};

const tabLeadStyle: React.CSSProperties = {
  fontSize: '18px',
  color: 'var(--text-primary)',
  marginBottom: '24px',
  lineHeight: 1.6
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '15px',
  color: 'var(--text-secondary)',
  lineHeight: 1.7,
  marginBottom: '20px'
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 700,
  color: 'var(--text-primary)',
  marginBottom: '20px',
  borderBottom: '1px solid var(--border-color)',
  paddingBottom: '10px'
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  fontSize: '14px',
  color: 'var(--text-secondary)'
};
