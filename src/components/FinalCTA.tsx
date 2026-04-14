import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-[#050505] relative overflow-hidden flex items-center justify-center -mb-[1px]">
      <div className="absolute inset-0 top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,59,59,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
          Хватит планировать.<br className="hidden md:block"/> Начни отвечать.
        </h2>
        
        <p className="text-xl md:text-2xl text-text-muted mb-12 font-medium">
          Первые 30 дней — бесплатно. Без карты.
        </p>
        
        <button className="btn-primary text-xl px-12 py-5 shadow-[0_0_30px_rgba(255,59,59,0.2)] hover:shadow-[0_0_45px_rgba(255,59,59,0.4)]">
          Создать аккаунт
        </button>
        
        <p className="mt-8 text-sm font-bold text-text-muted uppercase tracking-widest flex items-center justify-center gap-3">
          <span className="w-8 h-[1px] bg-border-subtle inline-block"></span>
          Уже 2 400+ пользователей держат слово
          <span className="w-8 h-[1px] bg-border-subtle inline-block"></span>
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
