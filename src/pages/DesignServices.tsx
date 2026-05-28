import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Cpu, Layers, HardDrive, Compass, RefreshCw } from 'lucide-react';

export const DesignServices: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'product' | 'pcb' | 'library' | 'migration' | 'mechanical'>('product');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'product' || tab === 'pcb' || tab === 'library' || tab === 'migration' || tab === 'mechanical') {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Design Services</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Transforming conceptual ideas into high-yield, robust production-ready hardware.
          </p>
        </div>
      </section>

      {/* Tabs Navigator */}
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
            { id: 'product', label: 'Product Design', icon: <Layers size={16} /> },
            { id: 'pcb', label: 'PCB Design & Layout', icon: <Cpu size={16} /> },
            { id: 'library', label: 'Library Dev', icon: <HardDrive size={16} /> },
            { id: 'migration', label: 'Data Migration', icon: <RefreshCw size={16} /> },
            { id: 'mechanical', label: 'Mechanical Design', icon: <Compass size={16} /> }
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

      {/* Tab Contents */}
      <div className="container" style={{ padding: '60px 24px' }}>
        {activeTab === 'product' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Product Design & Development</h2>
            <p style={tabLeadStyle}>
              Medontech is uniquely placed to offer services in Electronic design & development - from requirements capture, design, prototyping, design validation, and support during deployment.
            </p>
            <p style={paragraphStyle}>
              We help in developing new, futuristic, next-generation intelligent devices that enhance the quality of life and user experience for product users. We expand our portfolio across domains, industries, and leading silicon vendors. We leverage our expertise and experience to provide end-to-end services. Our engineers will work with you throughout the design and development process to ensure the final product is economical to produce and robust in operation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Hardware Design Expertise</h3>
                <ul style={listStyle}>
                  <li>Electrical Design & Schematic Entry</li>
                  <li>PCB Design & Layout Integration</li>
                  <li>Signal Integrity, Power & Thermal Analysis</li>
                  <li>EMI/EMC Simulation & Diagnostics</li>
                  <li>DFM, DFT, DFF, DFA Quality checks</li>
                  <li>Prototype building, bring-up, and board debugging</li>
                  <li>Transformation & Hand-off to production</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Advanced Design Capabilities</h3>
                <ul style={listStyle}>
                  <li>Medium to high complexity system designs</li>
                  <li>High-speed Digital, Analog & Mixed-signal designs</li>
                  <li>Embedded Processor based Architectures</li>
                  <li>FPGA & CPLD Logic Design</li>
                  <li>Low-power battery-optimized layouts</li>
                  <li>Power supply & regulatory stage design</li>
                  <li>High-speed bus interfaces & networking interfaces</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pcb' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>PCB Design & Layout</h2>
            <p style={tabLeadStyle}>
              Medontech offers the most powerful PCB design services with experienced engineering talents, utilizing state-of-the-art tools and technologies to deliver high-quality, cost-effective layouts.
            </p>
            <p style={paragraphStyle}>
              Our PCB designers are IPC certified with a broad spectrum of expertise. Leveraging our experience from complex, high-layer count, high-speed digital designs, power designs, RF design, and analog/mixed layouts, we serve a wide variety of markets like Telecom, Wireless, Medical, Automotive, Consumer, Military, and Aerospace.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Layout Technologies</h3>
                <ul style={listStyle}>
                  <li>High component density designs (&gt; 6000 components)</li>
                  <li>High layer count PCBs (up to 38 layers)</li>
                  <li>Dense layout pin count (10,000+ pins)</li>
                  <li>Fine pitch BGAs of 0.4mm & 0.5mm</li>
                  <li>Trace widths & spacing down to 3mils/3mils</li>
                  <li>HDI designs with via-in-pad, blind, buried & microvias</li>
                  <li>Flex, Rigid, and Rigid-Flex multi-board stackups</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Interfaces on Board</h3>
                <ul style={listStyle}>
                  <li>Memories: DDR4, DDR3, DDR2, QDR, LPDDR, Flash</li>
                  <li>Networking: GMII, XGMII, XAUI, SFI, GbE, 10GbE, POE</li>
                  <li>High-Speed Buses: PCIe Gen3, RocketIO, SATA, SAS</li>
                  <li>Video: HDMI, DVI, Composite, S-Video, VGA</li>
                  <li>Wireless: 4G/LTE, WiMax, 802.11, Bluetooth, GPS, GPRS</li>
                  <li>Peripherals: USB 3.0, UART, I2C, I2S</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>PCB Library Development</h2>
            <p style={tabLeadStyle}>
              As we understand the library is the foundation of any design and requires ZERO DEFECTS, Medontech has a dedicated team of librarians to meet your library requirements.
            </p>
            <p style={paragraphStyle}>
              Our library processes are equipped with effective creation and verification procedures and checks which help us create symbols and footprints effortlessly with high quality and quick turnaround, matching all international specifications.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Library Standards</h3>
                <ul style={listStyle}>
                  <li>Schematic symbols created as per IEEE standards</li>
                  <li>PCB Footprints built to IPC-7351B standards</li>
                  <li>Padstack creation as per IPC-2221/2222 standards</li>
                  <li>Drill tolerances set as per IPC-2615 specifications</li>
                  <li>Low, moderate, and high-density landing patterns</li>
                  <li>Fully custom, client-defined styling guidelines</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Supported CAD Tools</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  We create symbol and footprint libraries natively in all leading CAD formats:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {['Cadence Allegro', 'OrCAD', 'Mentor PADS', 'Mentor Expedition', 'DxDesigner', 'Altium Designer', 'Zuken CR-5000', 'Zuken CADSTAR'].map(tool => (
                    <span key={tool} style={tagStyle}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'migration' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>PCB Data Migration & Conversions</h2>
            <p style={tabLeadStyle}>
              True translation and migration of design data across various EDA platforms, keeping constraints, properties, and design integrity fully intact.
            </p>
            <p style={paragraphStyle}>
              We provide clean, fully validated translations of schematics, footprint libraries, and complex layout files. Converted designs are checked against the original files at every stage to ensure zero translation loss.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Migration Advantages</h3>
                <ul style={listStyle}>
                  <li>Fast & 100% accurate conversion algorithms</li>
                  <li>Schematics and layouts are migrated concurrently</li>
                  <li>Fully reusable and editable CAD files returned</li>
                  <li>Custom mapping for user-defined net properties</li>
                  <li>Verification of translated data using high-end checking tools</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Supported Platforms</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Seamless migration pathways between:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div><strong>Layouts:</strong> Allegro, PADS, Expedition, Altium, Zuken CR-5000, CADSTAR</div>
                  <div><strong>Schematics:</strong> OrCAD, Concept HDL, DxDesigner, PADS Logic, Altium</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mechanical' && (
          <div style={tabContentStyle}>
            <h2 style={tabTitleStyle}>Mechanical Design Services</h2>
            <p style={tabLeadStyle}>
              One-stop solution for mechanical design, drafting, tooling design, enclosure modeling, prototyping, and component sourcing.
            </p>
            <p style={paragraphStyle}>
              Our highly skilled team of engineers and drafters combines innovative thinking with mechanical engineering background to build unique designs, improve existing designs, and design sheet-metal/plastic enclosures that perfectly fit your electronic PCBs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '40px' }}>
              <div className="premium-card">
                <h3 style={cardTitleStyle}>Mechanical Services</h3>
                <ul style={listStyle}>
                  <li>Product Concept and Enclosure Design</li>
                  <li>2D / 3D Drafting and Manufacturing Drawings</li>
                  <li>3D Solid Modeling & assemblies</li>
                  <li>Reverse Engineering and 3D scanning conversions</li>
                  <li>Design of Jigs & Fixtures for assembly and testing</li>
                  <li>Legacy drawing digitization and conversion</li>
                  <li>Rapid Prototyping support & sourcing assistance</li>
                </ul>
              </div>

              <div className="premium-card">
                <h3 style={cardTitleStyle}>Industry Standard Tools</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Our team executes drawings natively in:
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={tagStyle}>SolidWorks</span>
                  <span style={tagStyle}>Pro/Engineer (Creo)</span>
                  <span style={tagStyle}>AutoCAD</span>
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
  padding: '120px 0 80px',
  background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(images/product_design.png) center/cover no-repeat',
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

const tagStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-color)',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--text-secondary)'
};
