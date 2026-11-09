import React, { useState, useEffect } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { TESTIMONIALS, CORPORATE_METRICS } from '../data/uboteData';

export const SocialProofSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto rotate testimonials gently every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[currentIdx];

  return (
    <section id="impacto" className="relative py-28 bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Elevated Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capítulo 04 · Prova Social & Rigor Auditado</span>
          </div>

          <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            A escolha de quem exige{' '}
            <span className="gold-text-gradient italic font-normal">
              discrição e excelência
            </span>.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            De líderes institucionais e quadros superiores a personalidades em Luanda,
            o rigor com que cuidamos de cada pormenor reflete-se na confiança e retorno contínuo.
          </p>
        </div>

        {/* Quantified Metrics Grid with Tabular Numerals */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {CORPORATE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#111A26] border border-slate-800 text-left relative overflow-hidden group hover:border-[#C5A869]/40 transition-colors glass-card-glow"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-white group-hover:text-[#C5A869] transition-colors tabular-nums">
                {metric.value}
              </div>
              <div className="text-xs font-headline font-bold text-slate-200 mt-2">
                {metric.label}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal font-light">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Testimonials Carousel Card */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#111A26] to-[#0E1622] border border-slate-800 shadow-2xl relative glass-card-glow">
            <Quote className="w-12 h-12 text-[#C5A869]/15 absolute top-8 left-8 -z-0" />

            <div className="relative z-10 space-y-8">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A869] text-[#C5A869]" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="font-luxury text-xl sm:text-2xl lg:text-3xl text-white font-normal leading-relaxed italic">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author & Treatment attribution */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C5A869] to-[#997B3C] text-[#0B1118] flex items-center justify-center font-mono font-bold text-sm shadow">
                    {activeTestimonial.avatarText}
                  </div>
                  <div>
                    <h4 className="font-headline text-base font-bold text-white">
                      {activeTestimonial.name}
                    </h4>
                    <div className="text-xs text-slate-400 font-light">
                      {activeTestimonial.role} <span aria-hidden="true">·</span> {activeTestimonial.company}
                    </div>
                  </div>
                </div>

                {/* Specific treatment indicator */}
                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase text-[#C5A869] tracking-wider">
                    Protocolo Realizado
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">
                    {activeTestimonial.treatment}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows & pagination dots */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentIdx(dotIdx)}
                    className={`transition-all duration-200 rounded-full cursor-pointer ${
                      currentIdx === dotIdx
                        ? 'w-6 h-1.5 bg-[#C5A869]'
                        : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Ver depoimento ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#C5A869]/40 transition-colors cursor-pointer"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-[#C5A869]/40 transition-colors cursor-pointer"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Criteria Badges (Direct from page 2 of UBOTE 2026 PDF) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-800/80">
          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-white">Serviços Integrados</h5>
              <p className="text-xs text-slate-400 mt-1">
                Laser, cera, estética, spa e cuidados de mãos e pés reunidos num só endereço.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-white">Valores Transparentes</h5>
              <p className="text-xs text-slate-400 mt-1">
                Preço de cada serviço indicado e garantido antes da marcação.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-left">
            <CheckCircle className="w-5 h-5 text-[#C5A869] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-sm text-white">Feminino e Masculino</h5>
              <p className="text-xs text-slate-400 mt-1">
                Tabelas de preços, salas reservadas e protocolos adaptados para ambos os públicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
