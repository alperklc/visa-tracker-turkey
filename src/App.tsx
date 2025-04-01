
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import ReviewEntries from './pages/ReviewEntries';
import SubmitApplication from './pages/SubmitApplication';
import Facts from './pages/Facts';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './lib/LanguageContext';
import { Toaster } from './components/ui/sonner';
import Discussions from './pages/Discussions';
import WhatCanWeDo from './pages/WhatCanWeDo';
import { useState, useEffect } from 'react';
import GoogleAnalytics from './components/GoogleAnalytics';
import CookieBanner from './components/CookieBanner';

// Google Analytics Measurement ID (örnek ID, gerçek ID ile değiştirilmeli)
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

function App() {
  const [cookieConsent, setCookieConsent] = useState({
    analytics: false,
    necessary: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent was already given
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      setCookieConsent(JSON.parse(savedPreferences));
    }
  }, []);

  const handleCookieAccept = (preferences: any) => {
    setCookieConsent(preferences);
  };

  const handleCookieDecline = () => {
    setCookieConsent({
      analytics: false,
      necessary: true,
      marketing: false,
    });
  };

  return (
    <LanguageProvider>
      <Router>
        {/* Google Analytics sadece kullanıcının izni varsa yükle */}
        {cookieConsent.analytics && <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />}
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review" element={<ReviewEntries />} />
          <Route path="/submit" element={<SubmitApplication />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/what-can-we-do" element={<WhatCanWeDo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Cookie banner */}
        <CookieBanner 
          onAccept={handleCookieAccept}
          onDecline={handleCookieDecline}
        />
      </Router>
      <Toaster />
    </LanguageProvider>
  );
}

export default App;
