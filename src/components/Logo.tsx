
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
          <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center">
            <span className="text-blue-600 text-xl font-bold">V</span>
          </div>
        </div>
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-2">
          vizeTakip<span className="text-sm">.org</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
