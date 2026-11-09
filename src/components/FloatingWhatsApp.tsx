import React, { useState } from 'react';
import { MessageCircle, Bot, Sparkles, ExternalLink } from 'lucide-react';
import { UBOTE_CONTACT } from '../data/uboteData';

interface FloatingWhatsAppProps {
  onOpenWhatsAppAi?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenWhatsAppAi }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      'Olá UBOTE Angola! Gostaria de agendar um atendimento ou obter informações sobre tratamentos.'
    );
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Atendimento rápido"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
    >
      {/* Quick Action Popover */}
      {isOpenMenu && (
        <div className="bg-[#0E1520] border border-[#232E3E] rounded-2xl p-3 shadow-2xl shadow-black/60 w-64 space-y-2 animate-fade-in text-left">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="font-headline font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Atendimento UBOTE
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Luanda</span>
          </div>

          {onOpenWhatsAppAi && (
            <button
              onClick={() => {
                setIsOpenMenu(false);
                onOpenWhatsAppAi();
              }}
              className="w-full p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/60 text-left transition-all flex items-center gap-2.5 text-xs text-emerald-200 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white group-hover:text-emerald-300">
                  Concierge IA 24/7
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Consulta de preços & regras
                </p>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
            </button>
          )}

          <button
            onClick={() => {
              setIsOpenMenu(false);
              handleDirectWhatsApp();
            }}
            className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white group-hover:text-[#25D366]">
                WhatsApp Oficial
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {UBOTE_CONTACT.phone}
              </p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      )}

      {/* Main floating bubble toggle */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
          aria-label="Abrir opções de WhatsApp da UBOTE"
          title={`WhatsApp Corporate UBOTE (${UBOTE_CONTACT.phone})`}
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A869] text-[#0B1118] font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-[#0B1118]">
            AI
          </span>
        </button>
      </div>
    </aside>
  );
};

