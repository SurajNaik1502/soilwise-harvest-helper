
import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-soil-light">
      <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-soil-darkest" />
          <div>
            <h1 className="text-xl font-bold text-soil-darkest">SoilWise</h1>
            <p className="text-xs text-soil-dark">Harvest Helper</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-soil-dark hover:text-soil-darkest transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-soil-dark hover:text-soil-darkest transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-medium text-soil-dark hover:text-soil-darkest transition-colors">
            Help
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
