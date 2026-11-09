import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import { UBOTE_IMAGES } from '../data/uboteData';

interface HeroSectionProps {
  onOpenPdf: () => void;
  onOpenB2BModal: () => void;
  onOpenLoyaltyModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPdf, onOpenB2BModal, onOpenLoyaltyModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth ambient particles & constellation lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodesCount = Math.min(32, Math.floor(width / 40));
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#C5A869', '#E5CE93', '#C85A32', '#B38B3F'];

    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.35 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(197, 168, 105, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#080E16]"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.85 }}
      />

      {/* Atmospheric multi-layer illumination */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-[#C5A869]/15 via-[#C85A32]/8 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-0 w-[600px] h-[600px] bg-[#C5A869]/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Striking Modern Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Authentic Brand Logo & Kicker Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-gradient-to-r from-[#141E2B] to-[#0E1520] border border-[#C5A869]/60 shadow-xl shadow-black/40 w-fit">
                <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] p-1 flex items-center justify-center shrink-0 shadow-md">
                  <img
                    src="/assets/ubote_emblem.png"
                    alt="UBOTE Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-luxury text-2xl font-bold tracking-widest text-white leading-none">
                      UBOTE
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C5A869]"></span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869] font-bold">
                      Luanda
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#E0C78D] mt-0.5">
                    Laser · Spa · Estética
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-mono text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#E0C78D] font-serif italic text-sm">Beleza com Raízes</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 text-[11px]">Prédio JPimenta</span>
              </div>
            </div>

            {/* High-Impact Modern Display Headline */}
            <h1 className="font-luxury text-4xl sm:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-white leading-[1.08]">
              O seu momento.{' '}
              <span className="gold-text-gradient italic font-normal tracking-normal">
                A sua beleza.
              </span>
            </h1>

            {/* Sub-headline with Authentic Card Copy */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              Permita-se relaxar, renovar a sua energia e cuidar de si com rigor técnico.
              Depilação a laser, tratamentos faciais, massagens terapêuticas e manicure/pedicure
              no coração de Luanda.
            </p>

            {/* Modern Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Action Button with Dynamic Glow */}
              <button
                onClick={() => scrollToSection('contacto')}
                className="px-7 py-4 bg-gradient-to-r from-[#C5A869] via-[#D8BE7A] to-[#B8934A] hover:from-[#D8BE7A] hover:to-[#C5A869] text-[#0B1118] font-headline font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl shadow-[#C5A869]/25 hover:shadow-2xl hover:shadow-[#C5A869]/40 flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Marque Já a Sua Avaliação</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {/* Secondary Action: Cartão Fidelidade */}
              <button
                onClick={onOpenLoyaltyModal}
                className="px-6 py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-[#C5A869]/50 hover:border-[#C5A869] font-headline font-semibold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Cartão Fidelidade (1 Grátis)</span>
              </button>
            </div>

            {/* Interactive Links to Official Catalog & B2B */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C5A869]" />
                <button
                  onClick={onOpenPdf}
                  className="text-[#C5A869] hover:text-[#F3DEAB] font-medium underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Consultar Guia & Preçário Oficial 2026 (PDF)
                </button>
              </div>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <button
                onClick={onOpenB2BModal}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Convénios B2B para Empresas →
              </button>
            </div>

            {/* Quantified Strip Below Hero */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                  18.500+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-headline">Atendimentos Luanda</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-[#C5A869] tabular-nums">
                  99.2%
                </div>
                <div className="text-xs text-slate-400 mt-1 font-headline">Satisfação Executiva</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                  42+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-headline">Empresas Parceiras</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Cinematic Editorial Visual & Floating Glass Card */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame Container */}
            <div className="relative rounded-3xl overflow-hidden border border-[#C5A869]/30 shadow-2xl glass-card-glow group">
              {/* Dynamic Image with Smooth Zoom */}
              <div className="img-zoom-container aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full">
                <img
                  src={UBOTE_IMAGES.hero}
                  alt="Atendimento facial e cuidados estéticos reais na UBOTE Luanda com luz natural e produtos botânicos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Contrast Gradient Scrim for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E16] via-[#080E16]/30 to-transparent" />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#0B1118]/85 backdrop-blur-md border border-[#C5A869]/50 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                <span className="text-[11px] font-mono tracking-wider text-slate-200 uppercase font-semibold">
                  Atendimento Real · Luanda
                </span>
              </div>

              {/* Dynamic Glassmorphic Overlay Card at Bottom */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-5 rounded-2xl bg-[#0B1118]/85 backdrop-blur-xl border border-slate-700/80 space-y-3 shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                    Protocolos Exclusivos
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    Laser · Spa · Estética
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-left">
                  <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">Tratamento Acne</div>
                    <div className="text-xs font-bold text-[#C5A869] font-mono">90.000 Kz (5 sessões)</div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono">Banhos Terapêuticos</div>
                    <div className="text-xs font-bold text-white font-mono">Faraó & Cleópatra 70k</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                  <span className="flex items-center gap-1 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                    Biossegurança Médica
                  </span>
                  <button
                    onClick={() => scrollToSection('servicos')}
                    className="text-[#C5A869] hover:underline font-semibold"
                  >
                    Explorar serviços →
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle decorative glow orb */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C5A869]/20 rounded-full blur-2xl -z-10 pointer-events-none" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 text-center">
          <button
            onClick={() => scrollToSection('sobre')}
            className="inline-flex flex-col items-center text-xs text-slate-500 hover:text-[#C5A869] transition-colors focus:outline-none cursor-pointer"
            aria-label="Rolar para Sobre Nós"
          >
            <span className="tracking-widest uppercase mb-1 font-mono text-[10px]">Descubra o Manifesto</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#C5A869]" />
          </button>
        </div>
      </div>
    </section>
  );
};
