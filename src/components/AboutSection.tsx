import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { UBOTE_IMAGES } from '../data/uboteData';

export const AboutSection: React.FC = () => {
  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="sobre" className="relative py-28 bg-[#0B121C] border-t border-slate-800/80 overflow-hidden">
      {/* Subtle geometric Angolan pattern backdrop */}
      <div className="absolute inset-0 bg-angola-pattern opacity-40 pointer-events-none" />

      {/* Atmospheric ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#C5A869]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Modern Bento Split: Content Left & Dynamic Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Manifesto & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Manifesto & Posicionamento de Marca</span>
            </div>

            <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12]">
              A convergência entre{' '}
              <span className="gold-text-gradient italic font-normal">
                ciência dermatológica
              </span>{' '}
              e a hospitalidade de Angola.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
              No vibrante e exigente mercado corporativo de Luanda, o autocuidado consciente
              é um ativo estratégico. A UBOTE reúne, num único endereço de prestígio,
              tecnologia laser de topo, protocolos estéticos de grau hospitalar e rituais de descompressão profunda.
            </p>

            {/* Quality Statement Box */}
            <div className="p-6 rounded-2xl bg-[#111A26]/90 border border-slate-800 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A869]">
                Nota Introdutória Oficial · Edição 2026
              </span>
              <p className="text-sm text-slate-200 italic font-light leading-relaxed">
                &ldquo;Cada serviço é executado com técnica, higiene e atenção extrema ao detalhe.
                Descrevemos cada tratamento de forma objetiva: em que consiste, que benefícios reais
                proporciona e qual o respetivo valor garantido antes da marcação.&rdquo;
              </p>
            </div>

            {/* Quick CTAs / Link */}
            <div className="pt-2">
              <button
                onClick={scrollToServices}
                className="inline-flex items-center gap-2 text-xs font-headline font-semibold uppercase tracking-wider text-[#C5A869] hover:text-[#E0C78D] transition-colors group cursor-pointer"
              >
                <span>Conhecer todos os protocolos e preçário</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase of the Luanda Sanctuary */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-800 glass-card-glow group relative">
              <div className="img-zoom-container aspect-[4/3] w-full">
                <img
                  src={UBOTE_IMAGES.clinic}
                  alt="Especialista em estética preparando tratamentos e equipamentos na UBOTE Luanda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B121C] via-[#0B121C]/20 to-transparent" />
              </div>

              {/* Floating Badge Inside Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1118]/85 backdrop-blur-md border border-slate-700/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-headline">
                    Ambiente Clínico & Privativo
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Rua Moisés Cardoso Nº 10 · Luanda
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-[#C5A869]/20 border border-[#C5A869]/40 text-[#C5A869] font-mono text-[10px] font-bold">
                  Grau Hospitalar
                </div>
              </div>
            </div>

            {/* Official UBOTE Brand Hallmark Card */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#C5A869]/60 shadow-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 shrink-0 p-1 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                  <img
                    src="/assets/ubote_emblem.png"
                    alt="UBOTE Logo Oficial"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-luxury text-xl font-bold tracking-widest text-[#0B1118]">
                      UBOTE
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#B38B3F] font-bold">
                      · ANGOLA
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#8B6E32]">
                    Laser · Spa · Estética
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">
                  Identidade Oficial
                </span>
                <span className="text-xs font-serif italic font-bold text-[#C85A32]">
                  Beleza com Raízes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars with Refined Modern Typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-[#111A26]/80 backdrop-blur-md border border-slate-800 hover:border-[#C5A869]/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869] mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-[#C5A869] tracking-wider uppercase mb-2">
              01. Rigor Sanitário
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Biossegurança & Autoclave
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Esterilização hospitalar e descartáveis de uso único. Cada tratamento segue protocolos padronizados de higiene e avaliação prévia individualizada.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-[#111A26]/80 backdrop-blur-md border border-slate-800 hover:border-[#C85A32]/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#C85A32]/10 border border-[#C85A32]/30 flex items-center justify-center text-[#E07A5F] mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-[#E07A5F] tracking-wider uppercase mb-2">
              02. Tecnologia Específica
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Calibração para Fototipos
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Laser de pulso suave e comprimentos de onda adaptados à pele negra e morena, garantindo eficácia na redução de pelos e eliminação definitiva de foliculite.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-[#111A26]/80 backdrop-blur-md border border-slate-800 hover:border-[#C5A869]/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869] mb-6 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-[#C5A869] tracking-wider uppercase mb-2">
              03. Rede Corporativa
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Produtividade & Longevidade
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              Convénios corporativos B2B desenhados para mitigar a exaustão das equipas e oferecer benefícios dedutíveis de alta perceção de valor em Luanda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
