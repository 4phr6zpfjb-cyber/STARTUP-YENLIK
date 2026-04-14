import React from 'react';

const ForWhom: React.FC = () => {
  const personas = [
    {
      emoji: "🎓",
      title: "Студентам",
      desc: "Сдать сессию без паники. ИИ строит план, штрафы держат в тонусе."
    },
    {
      emoji: "📱",
      title: "SMM-менеджерам",
      desc: "Контент-план без срывов. Каждый пост — задача с дедлайном и ценой провала."
    },
    {
      emoji: "💼",
      title: "Предпринимателям",
      desc: "Задачи по росту бизнеса с реальными последствиями за прокрастинацию."
    }
  ];

  return (
    <section id="for-whom" className="section-padding bg-surface-2 border-y border-border-subtle">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 mt-4">
          TALPYN создан для тех, кому нужны не напоминания, а <span className="text-brand-red">последствия</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((persona, idx) => (
          <div key={idx} className="bg-background border border-border-subtle flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-sm hover:-translate-y-1 transition-transform duration-300">
            <div className="text-5xl shrink-0 bg-surface w-16 h-16 flex items-center justify-center rounded-sm border border-border-subtle">
              {persona.emoji}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{persona.title}</h3>
              <p className="text-text-muted font-medium leading-relaxed">{persona.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForWhom;
