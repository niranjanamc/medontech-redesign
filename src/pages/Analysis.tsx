import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, ShieldAlert, Cpu, Thermometer } from 'lucide-react';

export const Analysis: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'si' | 'emi' | 'pi' | 'thermal'>('si');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'si' || tab === 'emi' || tab === 'pi' || tab === 'thermal') {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Simulation & Analysis</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Reducing PCB revisions and ensuring first-time-right engineering with advanced simulations.
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
            { id: 'si', label: 'Signal Integrity', icon: <Cpu size={16} /> },
            { id: 'emi', label: 'EMI / EMC Analysis', icon: <ShieldAlert size={16} /> },
            { id: 'pi', label: 'Power Integrity', icon: <Activity size={16} /> },
            { id: 'thermal', label: 'Thermal Analysis', icon: <Thermometer size={16} /> }
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
        {activeTab === 'si' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Signal Integrity (SI) Analysis</h2>
            <p style={tabLeadStyle}>
              Faced with sub-nanosecond rise and fall times, modern high-speed designs require rigorous signal integrity analysis to guarantee stable, noise-free board operations.
            </p>
            <p style={paragraphStyle}>
              Medontech provides a broad range of signal integrity services, covering model creation/validation, pre-layout guidelines, routing constraint generation, and post-layout verification. Whether optimizing an existing faulty layout or assisting during schematic definition, we have the expertise.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>SI Analysis Services</h3>
                <ul style={listStyle}>
                  <li>Pre-route & Post-route transmission line simulations</li>
                  <li>Reflection & Ringing waveform analysis</li>
                  <li>Crosstalk analysis (single-ended & differential) & mitigation</li>
                  <li>SerDes channel evaluation & eye-diagram generation</li>
                  <li>IBIS model creation & silicon validation</li>
                  <li>Dielectric, skin-effect, and conductor loss evaluation</li>
                  <li>Controlled impedance stack-up & via optimization</li>
                  <li>Topology definitions & termination matching</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Interface & Toolset Focus</h3>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={subHeaderStyle}>Interfaces Checked</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['DDR4', 'DDR3', 'DDR2', 'LPDDR', 'PCIe Gen3', 'USB 3.0', 'SATA', 'SAS', 'XAUI', 'Gigabit Ethernet', 'HDMI', 'SERDES'].map(inf => (
                      <span key={inf} style={tagStyle}>{inf}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={subHeaderStyle}>Simulation Software</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={tagStyle}>Cadence Allegro PCB SI</span>
                    <span style={tagStyle}>Mentor HyperLynx</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emi' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>EMI & EMC Compliance Engineering</h2>
            <p style={tabLeadStyle}>
              Proactively addressing electromagnetic interference (EMI) is critical to pass FCC, CE, and military regulatory emissions tests before commercial launch.
            </p>
            <p style={paragraphStyle}>
              Medontech is a leading provider of EMI/EMC simulation and engineering diagnostics. Our experts work closely with your hardware developers, conducting layout audits and simulated tests to identify emission hazards and implement compliance early in the design cycle, saving thousands in testing center fees.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>EMC Simulation Capabilities</h3>
                <ul style={listStyle}>
                  <li>Radiated Emissions (RE) full-board simulation</li>
                  <li>Near-field magnetic emission loop analysis</li>
                  <li>Far-field electrical emission modeling</li>
                  <li>Multi-board system-level EMI interaction studies</li>
                  <li>Net-level radiated emissions for quick-turn layout check</li>
                  <li>HIRF (High Intensity Radiated Field) defense consulting</li>
                  <li>Design of shielding, filtering, and component grounding</li>
                </ul>
              </div>

              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
                <h3 style={cardTitleStyle}>Compliance Support</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Our services extend beyond layout simulation. We actively assist clients with regulatory preparation (FCC Part 15, CE CISPR, MIL-STD-461) and help guide hardware setups during actual physical compliance testing at certified chambers.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pi' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Power Integrity (PI) Analysis</h2>
            <p style={tabLeadStyle}>
              Designing clean power distribution networks (PDN) is crucial to feed modern low-voltage, high-current processors without noise or core malfunctions.
            </p>
            <p style={paragraphStyle}>
              Medontech analyzes and optimizes board PDNs. We calculate power plane DC drops, impedance profiles in the frequency domain, and determine the optimal placement, body sizes, and dielectric types for decoupling capacitors.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>PI Analysis Workflows</h3>
                <ul style={listStyle}>
                  <li>IR Drop / DC Drop voltage analysis</li>
                  <li>DC Current Density hot-spot checks</li>
                  <li>PDN Impedance profile calculations</li>
                  <li>Decoupling Capacitor select & placement optimization</li>
                  <li>Via landing pad and split-plane loop inductance checks</li>
                  <li>Power island / split-plane boundary optimization</li>
                  <li>Ferrite bead selection and simulation filters</li>
                </ul>
              </div>

              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={cardTitleStyle}>Value Delivered</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Our PI optimizations save component costs and precious layout area. We prevent over-conservative, excessive bypass capacitor placement while guaranteeing that core voltages meet strict ripple limits under transient loads.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thermal' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Thermal Analysis & Cooling Design</h2>
            <p style={tabLeadStyle}>
              Smaller, denser enclosures and higher wattage chips require early thermal simulations to prevent component failure and ensure product longevity.
            </p>
            <p style={paragraphStyle}>
              Medontech offers thermal analysis for electronic cooling. We combine heat transfer and thermodynamic math with sophisticated CFD software tools to analyze temperature rises, airflow, and heat sink efficiency.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>CFD Thermal Simulations</h3>
                <ul style={listStyle}>
                  <li>Component junction temperature estimates</li>
                  <li>Identifying board hot-spots & cooling vulnerabilities</li>
                  <li>Detecting stagnant airflow zones inside product enclosures</li>
                  <li>Evaluating thermal vias and copper layer dissipation paths</li>
                  <li>Heat sink dimension, fin, and fan optimizations</li>
                  <li>Thermal stress analysis inputs for mechanical packaging</li>
                </ul>
              </div>

              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={cardTitleStyle}>Simulation Outcomes</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Our thermal findings serve as key parameters to optimize heatsink volumes, case ventilation grills, and layout component locations, ensuring devices operate safely in their target environment.
                </p>
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
  padding: '120px 0 80px',
  background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(images/thermal_sim.png) center/cover no-repeat',
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

const subHeaderStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-muted)',
  marginBottom: '10px'
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  fontSize: '14px',
  color: 'var(--text-secondary)'
};

const tagStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-color)',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--text-secondary)'
};
