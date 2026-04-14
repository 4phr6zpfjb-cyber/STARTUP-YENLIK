import React from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="section-padding py-24 bg-surface-2 border-y border-border-subtle">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 mt-4">Простые тарифы</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-background border border-border-subtle p-10 rounded-sm flex flex-col">
          <div className="mb-8 border-b border-border-subtle pb-8">
            <h3 className="text-2xl font-black mb-2 text-text-primary">FREE</h3>
            <div className="text-5xl font-mono font-black mb-2">
              0 ₸<span className="text-xl text-text-muted font-sans font-medium">/мес</span>
            </div>
          </div>
          
          <ul className="space-y-5 mb-10 flex-1">
            {["До 3 активных целей", "AI-декомпозиция базовая", "Рейтинг дисциплины", "Штрафы в виртуальных очках"].map((feat, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-brand-green mr-3 shrink-0 mt-0.5" />
                <span className="text-text-primary font-medium">{feat}</span>
              </li>
            ))}
          </ul>
          
          <button className="w-full btn-secondary py-4 text-base mt-auto">
            Начать бесплатно
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-surface border border-brand-red relative p-10 rounded-sm shadow-[0_0_30px_rgba(255,59,59,0.1)] flex flex-col md:scale-105 z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_10px_rgba(255,59,59,0.5)]">
            Популярный
          </div>
          
          <div className="mb-8 border-b border-border-subtle pb-8">
            <h3 className="text-2xl font-black mb-2 text-white">PRO</h3>
            <div className="text-5xl font-mono font-black mb-2 text-brand-red">
              2 990 ₸<span className="text-xl text-text-muted font-sans font-medium">/мес</span>
            </div>
          </div>
          
          <ul className="space-y-5 mb-10 flex-1">
            {["Безлимитные цели", "Продвинутый AI-план", "Финансовые штрафы (реальные деньги)", "Публичные челленджи", "Приоритетная поддержка"].map((feat, i) => (
              <li key={i} className="flex items-start">
                <Check className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
                <span className="text-white font-bold">{feat}</span>
              </li>
            ))}
          </ul>
          
          <button className="w-full btn-primary py-4 text-base mt-auto shadow-[0_0_20px_rgba(255,59,59,0.3)]">
            Попробовать PRO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
