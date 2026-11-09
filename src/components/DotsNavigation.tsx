import React, { useEffect, useState } from 'react';

interface SectionDot {
  id: string;
  label: string;
  number: string;
}

const SECTIONS: SectionDot[] = [
  { id: 'hero', label: 'Início & Marca', number: '01' },
  { id: 'sobre', label: 'Sobre & Manifesto', number: '02' },
  { id: 'servicos', label: 'Soluções & Preçário', number: '03' },
  { id: 'ecossistema', label: 'Ecossistema B2B', number: '04' },
  { id: 'impacto', label: 'Prova Social', number: '05' },
  { id: 'contacto', label: 'Contacto & Conversão', number: '06' },
];

export const DotsNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navegação lateral da página"
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 items-end"
    >
      <div className="bg-[#0B1118]/80 backdrop-blur-md p-2.5 rounded-full border border-slate-800/80 shadow-2xl flex flex-col gap-3">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative flex items-center justify-end focus:outline-none"
              aria-label={`Navegar para ${section.label}`}
            >
              {/* Tooltip on hover */}
              <span className="absolute right-7 py-1 px-2.5 rounded bg-[#111827] border border-slate-700/80 text-[11px] font-medium text-slate-200 tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                <span className="text-[#C5A869] font-mono mr-1.5">{section.number}.</span>
                {section.label}
              </span>

              {/* Indicator Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-7 bg-[#C5A869] shadow-[0_0_12px_rgba(197,168,105,0.7)]'
                    : 'w-2 h-2 bg-slate-600 group-hover:bg-slate-400 group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
