
import React from 'react';
import Navbar from './Navbar';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn("flex-1 animate-fade-in", className)}>
        {children}
      </main>
      <footer className="py-6 px-4 border-t bg-background/80 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Visa Tracker Turkey. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
