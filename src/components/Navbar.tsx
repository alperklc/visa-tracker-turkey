
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // When route changes, close the mobile menu
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('facts.title'), path: '/facts' },
    { name: t('discussions'), path: '/discussions' },
    { name: t('seeAllData'), path: '/review' },
    { name: t('actions.title'), path: '/what-can-we-do' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl tracking-tight">{t('appName')}</span>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative ${
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* Mobile Hamburger Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="md:hidden"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
            
            {/* Submit Button (only shown on desktop) */}
            <div className="hidden md:block">
              <Link to="/submit">
                <Button 
                  variant="default" 
                  size="sm"
                  className="shadow-sm hover:shadow transition-all"
                >
                  {t('submitApplication')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden mt-4 py-3 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-2 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Submit Application button in mobile menu */}
              <Link to="/submit" className="mt-2">
                <Button 
                  variant="default"
                  className="w-full shadow-sm hover:shadow transition-all"
                >
                  {t('submitApplication')}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
