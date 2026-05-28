import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Company } from './pages/Company';
import { DesignServices } from './pages/DesignServices';
import { Analysis } from './pages/Analysis';
import { Manufacturing } from './pages/Manufacturing';
import { Downloads } from './pages/Downloads';
import { Contact } from './pages/Contact';

// Scroll to top helper when route changes
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Only scroll to top if there are no sub-section scrolling parameters
    const params = new URLSearchParams(search);
    if (!params.has('sec') && !params.has('tab')) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Main layout container */}
        <Header />
        
        <main style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/services" element={<DesignServices />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
