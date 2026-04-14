import React from 'react';
import { XCircle, BellOff, BatteryMedium } from 'lucide-react';

const Problem: React.FC = () => {
  const problems = [
    {
      icon: <XCircle className="w-8 h-8 text-brand-red mb-4" />,
      title: "Нет последствий",
      desc: "Обычные To-Do листы позволяют переносить задачи бесконечно. Ничего не произойдет, если ты не сделаешь это сегодня."
    },
    {
      icon: <BellOff className="w-8 h-8 text-brand-red mb-4" />,
      title: "Пустые напоминания",
      desc: "Уведомления легко смахиваются и игнорируются. Они не создают давления, а только раздражают."
    },
    {
      icon: <BatteryMedium className="w-8 h-8 text-brand-red mb-4" />,
      title: "Мотивация нестабильна",
      desc: "Она приходит и уходит сама по себе. Строить планы на одном энтузиазме — значит провалиться в 90% случаев."
    }
  ];

  return (
    <section className="section-padding border-y border-border-subtle bg-surface-2">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 mt-4">
          Почему обычные планировщики <span className="text-text-muted line-through">не работают</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map((prob, idx) => (
          <div key={idx} className="bg-background border border-border-subtle rounded-sm p-8 hover:border-brand-red/30 transition-colors group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              {prob.icon}
              <h3 className="text-xl font-bold mb-3">{prob.title}</h3>
              <p className="text-text-muted font-medium leading-relaxed">{prob.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center relative flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-border-subtle"></div>
        <div className="bg-surface-2 px-6 relative z-10 text-xl font-bold uppercase tracking-widest text-text-muted">
          <span className="text-brand-red inline-block mr-2 text-2xl">•</span> TALPYN меняет правила игры
        </div>
      </div>
    </section>
  );
};

export default Problem;
