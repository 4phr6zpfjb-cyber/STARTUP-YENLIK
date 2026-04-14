import React from 'react';
import { Target, Users, Zap, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <a href="#" className="text-2xl font-black tracking-tight flex items-center hover:opacity-80 transition-opacity">
          TALPYN<span className="text-brand-red ml-0.5 text-3xl leading-none">.</span>
        </a>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-text-muted">
          <a href="#how-it-works" className="hover:text-white transition-colors">Как это работает</a>
          <a href="#features" className="hover:text-white transition-colors">Функции</a>
          <a href="#for-whom" className="hover:text-white transition-colors">Для кого</a>
          <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#register" className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5">
            Начать бесплатно
          </a>
          <button className="md:hidden text-white cursor-pointer">
            <Zap className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
