
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import ReviewEntries from './pages/ReviewEntries';
import SubmitApplication from './pages/SubmitApplication';
import NotFound from './pages/NotFound';
import { LanguageProvider } from './lib/LanguageContext';
import { Toaster } from './components/ui/sonner';
import Discussions from './pages/Discussions';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/review" element={<ReviewEntries />} />
          <Route path="/submit" element={<SubmitApplication />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </LanguageProvider>
  );
}

export default App;
