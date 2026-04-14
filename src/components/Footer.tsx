import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border-subtle pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start mb-12 border-b border-border-subtle pb-12">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <a href="#" className="text-2xl font-black tracking-tight flex items-center justify-center md:justify-start hover:opacity-80 transition-opacity mb-2">
            TALPYN<span className="text-brand-red ml-0.5 text-3xl leading-none">.</span>
          </a>
          <p className="text-text-muted text-sm font-medium">Мотивация заканчивается. Ответственность — нет.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-center md:text-left">
          <a href="#about" className="text-sm font-bold text-text-primary hover:text-brand-red transition-colors uppercase tracking-wider">О продукте</a>
          <a href="#privacy" className="text-sm font-bold text-text-primary hover:text-brand-red transition-colors uppercase tracking-wider">Политика конфиденциальности</a>
          <a href="#contact" className="text-sm font-bold text-text-primary hover:text-brand-red transition-colors uppercase tracking-wider">Связаться</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-text-muted font-medium">
        <p>© 2025 TALPYN.</p>
        <p className="mt-2 sm:mt-0">Сделано в Казахстане 🇰🇿</p>
      </div>
    </footer>
  );
};

export default Footer;
