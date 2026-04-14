import React, { useEffect, useRef, useState } from 'react';

const DisciplineScore: React.FC = () => {
  const [score, setScore] = useState(42);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.5 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const target = 78;
      const start = 42;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = (target - start) / steps;
      
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          setScore(target);
        } else {
          setScore(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const users = [
    { name: "Алихан Р.", score: 94, isCurrentUser: false },
    { name: "Ты", score: score, isCurrentUser: true },
    { name: "Дана М.", score: 53, isCurrentUser: false },
  ];

  return (
    <section className="section-padding py-24 bg-background overflow-hidden" ref={containerRef}>
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 lg:pr-10 w-full text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Твой рейтинг виден всем</h2>
          <p className="text-lg md:text-xl text-text-muted mb-10 font-medium leading-relaxed">
            Дисциплина — это репутация. TALPYN делает её измеримой и публичной.
          </p>
          
          <div className="inline-flex self-center lg:self-start border border-border-subtle bg-surface-2 p-6 rounded-sm min-w-[200px] justify-center items-center flex-col shadow-2xl">
            <span className="text-text-muted font-bold tracking-wider uppercase text-xs mb-2">твой рейтинг</span>
            <div className="text-7xl font-mono font-black text-brand-green flex items-baseline">
              {score}<span className="text-3xl text-text-muted ml-1">/100</span>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-brand-green/5 blur-[80px] rounded-full"></div>
          
          <div className="relative bg-surface border border-border-subtle rounded-xl p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2 border-b border-border-subtle pb-4">Лидерборд: Твои друзья</h3>
            
            {users.map((user, idx) => (
              <div key={idx} className={`flex items-center gap-4 p-4 rounded-sm border ${user.isCurrentUser ? 'bg-surface-2 border-border-subtle/80' : 'bg-transparent border-transparent'}`}>
                <div className="w-10 h-10 rounded-full bg-background border border-border-subtle flex shrink-0 items-center justify-center font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-2">
                    <span className={`font-bold ${user.isCurrentUser ? 'text-white' : 'text-text-primary'} truncate block`}>{user.name}</span>
                    <span className="font-mono text-sm font-bold text-brand-green">{user.score}</span>
                  </div>
                  <div className="w-full bg-background h-1.5 rounded-full overflow-hidden border border-border-subtle/50">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${user.score < 60 ? 'bg-brand-red' : 'bg-brand-green'}`} 
                      style={{ width: `${user.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisciplineScore;
