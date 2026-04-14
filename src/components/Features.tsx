import React from 'react';
import { Target, DollarSign, Activity, Bell, Trophy, Folder } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI-декомпозиция целей",
      desc: "Введи любую цель — ИИ разобьёт её на задачи с чёткими сроками и приоритетами."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Финансовые штрафы",
      desc: "Привязанный кошелёк. Не выполнил — деньги списываются. Реальные потери = реальная мотивация."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Рейтинг дисциплины",
      desc: "Твой публичный счёт от 0 до 100. Виден друзьям. Падает мгновенно, растёт медленно."
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Умные push-уведомления",
      desc: "Не «не забудь». А «осталось 47 минут, потом −200 ₸». Разница ощущается."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Публичные челленджи",
      desc: "Брось вызов другу или коллеге. Проигравший платит победителю напрямую."
    },
    {
      icon: <Folder className="w-6 h-6" />,
      title: "Сферы: учёба, SMM, бизнес",
      desc: "Готовые шаблоны целей для студентов, контент-мейкеров и предпринимателей."
    }
  ];

  return (
    <section id="features" className="section-padding py-24 bg-[#050505]">
      <div className="text-center mb-16">
        <div className="inline-block border border-border-subtle bg-surface px-4 py-1.5 rounded-full text-xs font-bold text-text-muted uppercase tracking-wider mb-6">
          Жесткие инструменты
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
          Всё для тех, кто <span className="text-brand-red">серьёзно настроен</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div key={idx} className="card p-8 group hover:border-brand-red/30 relative">
            <div className="w-12 h-12 bg-surface text-text-primary border border-border-subtle rounded-sm flex items-center justify-center mb-6 group-hover:text-brand-red group-hover:border-brand-red/50 transition-colors">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{feat.title}</h3>
            <p className="text-text-muted font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
