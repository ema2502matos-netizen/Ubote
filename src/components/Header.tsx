import React, { useState, useEffect } from 'react';
import { FileText, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { UBOTE_CONTACT } from '../data/uboteData';
import { UboteLogo } from './UboteLogo';

interface HeaderProps {
  onOpenPdf: () => void;
  onOpenB2BModal: () => void;
  onOpenLoyaltyModal: () => void;
  onOpenWhatsAppAi?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPdf,
  onOpenB2BModal,
  onOpenLoyaltyModal,
  onOpenWhatsAppAi,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1118]/90 backdrop-blur-md border-b border-[#232E3E]/70 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Authentic UBOTE Logo (Emblem + Wordmark) */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group whitespace-nowrap shrink-0 cursor-pointer"
            title="UBOTE Laser • Spa • Estética"
          >
            <UboteLogo variant="horizontal" />
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-headline font-semibold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => scrollToSection('sobre')}
              className="hover:text-[#C5A869] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sobre Nós
            </button>
            <button
              onClick={() => scrollToSection('servicos')}
              className="hover:text-[#C5A869] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Soluções & Preçário
            </button>
            <button
              onClick={onOpenLoyaltyModal}
              className="hover:text-[#C5A869] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[#E0C78D]"
            >
              Cartão Fidelidade
            </button>
            <button
              onClick={() => scrollToSection('ecossistema')}
              className="hover:text-[#C5A869] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ecossistema B2B
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="hover:text-[#C5A869] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Zone 3: 1 primary action (plus quick guide and WhatsApp AI triggers) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {onOpenWhatsAppAi && (
              <button
                onClick={onOpenWhatsAppAi}
                className="inline-flex items-center gap-2 text-xs font-headline font-semibold text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-2 border border-emerald-800/80 bg-emerald-950/30 rounded-xl hover:border-emerald-500/50 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                title="Abrir o Atendente Inteligente e Documentação da API WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                <span>WhatsApp IA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            )}
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-2 text-xs font-headline font-medium text-slate-300 hover:text-[#C5A869] transition-colors px-3 py-2 border border-slate-700/80 rounded-xl hover:border-[#C5A869]/50 whitespace-nowrap shrink-0 cursor-pointer"
              title="Abrir o Guia de Tratamentos e Preços 2026 Oficial"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A869]" />
              <span>Guia 2026</span>
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-headline font-bold uppercase tracking-wider text-[#0B1118] bg-gradient-to-r from-[#C5A869] to-[#D8BE7A] hover:brightness-110 rounded-xl transition-all shadow-md shadow-[#C5A869]/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Avaliação Presencial</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenPdf}
              className="p-2 text-slate-300 hover:text-[#C5A869]"
              aria-label="Abrir Guia PDF"
            >
              <FileText className="w-4 h-4 text-[#C5A869]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white"
              aria-label="Alternar Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B1118]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 sm:hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <UboteLogo variant="horizontal" size="sm" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Luanda
              </span>
            </div>
            <nav className="flex flex-col space-y-4 text-lg font-medium text-slate-200">
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-left py-2 border-b border-slate-800 hover:text-[#C5A869]"
              >
                01. Sobre Nós & Manifesto
              </button>
              <button
                onClick={() => scrollToSection('servicos')}
                className="text-left py-2 border-b border-slate-800 hover:text-[#C5A869]"
              >
                02. Soluções & Preçário
              </button>
              <button
                onClick={() => scrollToSection('ecossistema')}
                className="text-left py-2 border-b border-slate-800 hover:text-[#C5A869]"
              >
                03. Ecossistema & Network B2B
              </button>
              <button
                onClick={() => scrollToSection('impacto')}
                className="text-left py-2 border-b border-slate-800 hover:text-[#C5A869]"
              >
                04. Prova Social & Resultados
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left py-2 border-b border-slate-800 hover:text-[#C5A869]"
              >
                05. Contacto & Marcações
              </button>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-800">
            {onOpenWhatsAppAi && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsAppAi();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 border border-emerald-700/80 bg-emerald-950/40 rounded-lg text-emerald-300 text-sm font-semibold cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span>Testar Atendente WhatsApp IA</span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPdf();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 border border-slate-700 rounded-lg text-slate-200 text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-[#C5A869]" />
              <span>Ver Guia Oficial 2026 (PDF)</span>
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="w-full py-3 bg-[#C5A869] text-[#0B1118] font-semibold text-sm rounded-lg"
            >
              Agendar Atendimento Executivo
            </button>
          </div>
        </div>
      )}
    </>
  );
};
