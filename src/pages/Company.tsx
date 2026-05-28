import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Target, Compass, Award, Briefcase, Eye, Send, ShieldCheck, Mail } from 'lucide-react';

export const Company: React.FC = () => {
  const location = useLocation();
  const companyRef = useRef<HTMLDivElement>(null);
  const customersRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const excellenceRef = useRef<HTMLDivElement>(null);
  const careersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sec = params.get('sec');
    
    // Smooth scroll to targeted subsection based on header/footer path params
    if (sec === 'company') companyRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (sec === 'customers') customersRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (sec === 'business') businessRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (sec === 'excellence') excellenceRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (sec === 'careers') careersRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [location]);

  return (
    <div style={{ paddingTop: '72px', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Banner */}
      <section style={bannerStyle}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '12px' }}>Corporate Overview</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px' }}>
            Learn about our vision, mission, partners, business models, and commitment to excellence.
          </p>
        </div>
      </section>

      {/* Sections Container */}
      <div className="container" style={{ padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Section 1: Our Company */}
        <div ref={companyRef} style={sectionContainerStyle}>
          <div style={sectionContentStyle}>
            <div style={iconBadgeStyle}><Compass size={24} /></div>
            <h2 style={sectionTitleStyle}>Our Company</h2>
            <p style={paragraphStyle}>
              <strong>Medontech</strong> is an Engineering Service Company specializes in Product design, PCB design, Analysis and Manufacturing services. We offer end-to-end solutions for all the design and development of products and serves wide range of markets.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '32px' }}>
              <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  <Eye size={18} style={{ color: 'var(--accent-primary)' }} /> Vision
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  To be the trusted global engineering partner to our customers.
                </p>
              </div>
              <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                  <Target size={18} style={{ color: 'var(--accent-primary)' }} /> Mission
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  To be a world class Engineering Service Company by building strategic partnership with product development companies & designers to enable them to develop innovative products across the globe, leveraging our world-class expertise, processes and technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr style={dividerStyle} />

        {/* Section 2: Our Customers */}
        <div ref={customersRef} style={sectionContainerStyle}>
          <div style={sectionContentStyle}>
            <div style={iconBadgeStyle}><Target size={24} /></div>
            <h2 style={sectionTitleStyle}>Our Customers</h2>
            <p style={paragraphStyle}>
              Medontech has a diverse customer profile. We serve all the innovative entities from start-ups, mid-size companies and Fortune 100 companies spread across all around the world.
            </p>
            <p style={paragraphStyle}>
              Our customers expect a lot from us – they are the innovators of the future and they should. We have structured our organization in such a way that we can serve our customers everywhere in the world at all times in a spirit of partnership.
            </p>
            <p style={paragraphStyle}>
              Sustainable customer relationships are the basis for all our business. At Medontech, our success is the success of our partners. Whether you’re a global entity innovating for the future or a manufacturer providing products and services in regions across the world, our focus is helping you grow your company.
            </p>
          </div>
        </div>

        <hr style={dividerStyle} />

        {/* Section 3: Business Model */}
        <div ref={businessRef} style={sectionContainerStyle}>
          <div style={sectionContentStyle}>
            <div style={iconBadgeStyle}><Briefcase size={24} /></div>
            <h2 style={sectionTitleStyle}>Business Model</h2>
            <p style={paragraphStyle}>
              Engaging business with Medontech is not based on rules and conditions; we have a flexible business model and it’s our strength. We believe that business is a partnership between two parties, and that it should be a win-win situation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '32px' }}>
              {[
                { title: 'End-to-End Design', desc: 'Complete ownership from requirements gathering to full-scale fabrication validation.' },
                { title: 'Onsite Deployment', desc: 'Providing skilled engineering resources directly integrated with your internal design teams.' },
                { title: 'Offsite Design Hub', desc: 'Project-based deliverables or flat hourly design rates executing at our offices.' },
                { title: 'Resource Allocation', desc: 'Dedicated full-time equivalent (FTE) resource support for continuous engineering.' }
              ].map((model, idx) => (
                <div key={idx} className="premium-card" style={{ padding: '24px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>{model.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{model.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr style={dividerStyle} />

        {/* Section 4: Excellence */}
        <div ref={excellenceRef} style={sectionContainerStyle}>
          <div style={sectionContentStyle}>
            <div style={iconBadgeStyle}><Award size={24} /></div>
            <h2 style={sectionTitleStyle}>Medontech Excellence</h2>
            <p style={paragraphStyle}>
              Medontech is singularly focused on delivering high quality Electronic Design Services to the satisfaction of its customers and has several field proven and market-proven designs and appreciated ethical values.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>Cornerstones of Excellence</h3>
                {[
                  'Quality of customer support and communication channels',
                  'Timely delivery of cost-effective, high-yield quality designs',
                  'Adopting latest technology through committed research and innovation',
                  'Confidentiality & intellectual property protection guarantees'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '16px' }}>Our Commitment</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  We provide Experience, Professionalism, Reputation, Accuracy, Flexibility, Quality, Value, Timeliness, Customer Service & Confidentiality. Our repeat design wins are the greatest testament to our delivery record.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr style={dividerStyle} />

        {/* Section 5: Careers (Being A Medonian) */}
        <div ref={careersRef} style={sectionContainerStyle}>
          <div style={sectionContentStyle}>
            <div style={iconBadgeStyle}><Send size={24} /></div>
            <h2 style={sectionTitleStyle}>Being A Medonian</h2>
            <p style={paragraphStyle}>
              Enjoy opportunities to learn, grow and influence. Collaborate with first-class minds. Be accountable for your own decisions and career progress.
            </p>
            <p style={paragraphStyle}>
              Should you want to make a career in technology, then Medontech is the place to be. Every Medonian is a connecting dot in the system. You get to interact with talented engineers in a truly collaborative office environment. There is implicit trust with people be it Medonian or partners; fresher or experienced.
            </p>
            <p style={paragraphStyle}>
              We believe people are inherently responsible and know their deliverables. So while policies act as guidelines, the practice is what makes the difference. Also, being in a small company gives you the opportunity to walk up to anyone and put across your thoughts. You get to take on more responsibility for which you might have not tested yourself.
            </p>
            
            <div className="glass-panel" style={{
              marginTop: '40px',
              padding: '32px',
              background: 'var(--accent-glow)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--border-radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>Join Our Journey</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '24px' }}>
                If you have what it takes to be part of our engineering team, drop in your resume to careers@medontech.com.
              </p>
              <a href="mailto:careers@medontech.com" className="btn-primary">
                <Mail size={16} />
                Send Resume to Careers
              </a>
            </div>
          </div>
        </div>

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

const sectionContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
};

const sectionContentStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '900px',
  textAlign: 'left'
};

const iconBadgeStyle: React.CSSProperties = {
  width: '56px',
  height: '56px',
  borderRadius: '50%',
  background: 'var(--accent-glow)',
  color: 'var(--accent-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px'
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '20px',
  fontFamily: 'var(--font-heading)'
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '15px',
  color: 'var(--text-secondary)',
  lineHeight: 1.7,
  marginBottom: '20px'
};

const dividerStyle: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid var(--border-color)',
  width: '100%'
};
