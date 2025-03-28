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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review" element={<ReviewEntries />} />
          <Route path="/submit" element={<SubmitApplication />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/what-can-we-do" element={<WhatCanWeDo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </LanguageProvider>
  );
}

export default App;
