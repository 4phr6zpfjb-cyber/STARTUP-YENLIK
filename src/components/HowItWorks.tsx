import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Поставь цель",
      desc: "ИИ разбивает любую цель на конкретные задачи с дедлайнами. Учёба, контент, бизнес — любая сфера."
    },
    {
      num: "02",
      title: "Выполняй или плати",
      desc: "Каждая задача имеет дедлайн и штраф. Пропустил — ₸ списывается автоматически. Никаких «завтра»."
    },
    {
      num: "03",
      title: "Рост через давление",
      desc: "Рейтинг дисциплины растёт с каждым выполнением. Публичный позор или лидерборд — твой выбор."
    }
  ];

  return (
    <section id="how-it-works" className="section-padding mb-10 overflow-hidden">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">Как работает TALPYN</h2>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-border-subtle -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group bg-background md:bg-transparent">
              <div className="absolute -top-12 -left-4 text-7xl font-black text-surface-2 opacity-30 select-none group-hover:text-brand-red/10 transition-colors pointer-events-none">
                {step.num}
              </div>
              
              <div className="card p-8 relative h-full">
                <div className="w-12 h-12 bg-surface text-brand-red border border-brand-red/30 rounded-sm flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_15px_rgba(255,59,59,0.15)] group-hover:shadow-[0_0_25px_rgba(255,59,59,0.3)] transition-shadow">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-text-muted font-medium leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
