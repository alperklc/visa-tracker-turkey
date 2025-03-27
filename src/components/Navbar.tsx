
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Submit Application', path: '/submit' },
    { name: 'Review Entries', path: '/review' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-semibold text-xl tracking-tight">Visa Tracker</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
              Turkey
            </span>
          </Link>

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
            <Link to="/submit">
              <Button 
                variant="default" 
                size="sm"
                className="shadow-sm hover:shadow transition-all"
              >
                Submit Application
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
