import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 7 });
  const [score, setScore] = useState(74);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    const scoreTimer = setInterval(() => {
      setScore(prev => (prev > 70 ? prev - 1 : 74));
    }, 4500);

    return () => {
      clearInterval(timer);
      clearInterval(scoreTimer);
    };
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 min-h-screen">
      <div className="flex-1 text-center lg:text-left z-10">
        <div className="inline-flex items-center border border-brand-red text-brand-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-red mr-2 animate-pulse"></span>
          AI-система дисциплины
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6">
          <span className="block text-text-primary">Хватит обещать себе.</span>
          <span className="block text-brand-red">Начни платить за срывы.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
          TALPYN — это ИИ, который разбивает твои цели на задачи, следит за выполнением и вводит реальные штрафы за провалы. Не напоминания. Последствия.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-10">
          <button className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
            Попробовать бесплатно
          </button>
          <button className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 group">
            Смотреть демо
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        
        <div className="flex items-center justify-center lg:justify-start space-x-3">
          <div className="flex -space-x-3 opacity-80">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center text-xs">
                👤
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-text-muted">
            Уже <strong className="text-text-primary">2 400+ человек</strong> перестали откладывать
          </p>
        </div>
      </div>

      {/* Mockup */}
      <div className="flex-1 w-full max-w-lg relative perspective-1000">
        <div className="absolute inset-0 bg-brand-red/10 blur-[100px] rounded-full"></div>
        <div className="relative bg-surface border border-border-subtle rounded-xl p-6 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red/50 to-brand-red"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Текущая задача</p>
              <h3 className="text-xl font-semibold">Дописать бизнес-план (MVP)</h3>
            </div>
            <div className="bg-surface-2 p-2 rounded-sm border border-border-subtle">
              <span className="font-mono text-brand-red font-bold animate-pulse">🔥 СРОЧНО</span>
            </div>
          </div>
          
          <div className="bg-background rounded-sm p-5 border border-brand-red/20 mb-6 flex flex-col items-center justify-center text-center">
            <p className="text-text-muted text-sm mb-2 font-medium">Штраф за невыполнение</p>
            <div className="font-mono text-3xl font-black text-brand-red mb-2 tracking-tight">
              −350 ₸ через {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </div>
            <div className="w-full bg-surface-2 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-brand-red transition-all duration-1000" 
                style={{ width: `${(timeLeft.minutes / 60) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Рейтинг дисциплины</span>
              <span className="font-mono text-text-primary">{score}/100</span>
            </div>
            <div className="w-full bg-surface-2 h-2 rounded-sm overflow-hidden border border-border-subtle">
              <div 
                className="h-full bg-brand-green transition-all duration-1000 ease-in-out" 
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-muted mt-2">Падает при каждом срыве. Виден публично.</p>
          </div>
          
          <button className="w-full mt-6 bg-surface-2 border border-border-subtle hover:bg-white hover:text-black transition-colors font-bold py-3 rounded-sm active:scale-[0.98]">
            Отметить завершенным
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
