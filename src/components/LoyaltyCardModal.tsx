import React, { useState } from 'react';
import { X, Award, CheckCircle2, MessageCircle, ExternalLink, QrCode, Instagram, MapPin, Phone, Sparkles } from 'lucide-react';
import { UBOTE_CONTACT, LOYALTY_PROGRAM } from '../data/uboteData';

interface LoyaltyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'fidelidade' | 'visita';
}

export const LoyaltyCardModal: React.FC<LoyaltyCardModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'fidelidade',
}) => {
  const [activeTab, setActiveTab] = useState<'fidelidade' | 'visita'>(initialTab);
  const [clientName, setClientName] = useState('');
  const [stampedCount, setStampedCount] = useState<number>(3); // simulated starting progress

  if (!isOpen) return null;

  const toggleStamp = (index: number) => {
    if (stampedCount === index + 1) {
      setStampedCount(index);
    } else {
      setStampedCount(index + 1);
    }
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá UBOTE Angola! Sou ${clientName || 'cliente'} e gostaria de agendar uma sessão e atualizar o meu Cartão Fidelidade (${stampedCount} de 9 carimbos preenchidos). Endereço: Rua Moisés Cardoso Nº 10, Prédio JPimenta.`
    );
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0B1118] border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#111A26] border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A869]/20 border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#C5A869] tracking-widest block">
                Beleza com Raízes
              </span>
              <h3 className="font-luxury text-xl font-bold text-white">
                Cartão Fidelidade & Cartão de Visita UBOTE
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch */}
            <div className="p-1 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setActiveTab('fidelidade')}
                className={`px-3 py-1.5 text-xs font-headline font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'fidelidade'
                    ? 'bg-[#C5A869] text-[#0B1118]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cartão Fidelidade
              </button>
              <button
                onClick={() => setActiveTab('visita')}
                className={`px-3 py-1.5 text-xs font-headline font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'visita'
                    ? 'bg-[#C5A869] text-[#0B1118]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cartão de Visita
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {activeTab === 'fidelidade' ? (
            /* Tab: Cartão Fidelidade */
            <div className="space-y-8">
              {/* Interactive Digital Loyalty Card Preview */}
              <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-[#FBF9F5] text-[#1E293B] shadow-2xl border-2 border-[#C5A869] relative overflow-hidden">
                {/* Header Lockup */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-300 pb-5 gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#C5A869]/50 p-1 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src="/assets/ubote_emblem.png"
                        alt="UBOTE"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-luxury text-2xl font-bold tracking-widest text-[#0B1118]">
                          UBOTE
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B38B3F] font-bold">
                          LASER · SPA · ESTÉTICA
                        </span>
                      </div>
                      <div className="font-headline text-lg font-bold text-[#0B1118] mt-0.5">
                        CARTÃO FIDELIDADE
                      </div>
                      <div className="text-xs italic font-serif text-[#C85A32] font-semibold">
                        Beleza com raízes
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                      O SEU MOMENTO. A SUA BELEZA.
                    </span>
                    <span className="text-xs font-semibold text-emerald-800">
                      {stampedCount === 9 ? '🎉 Parabéns! Procedimento Grátis desbloqueado!' : `${stampedCount} de 9 carimbos`}
                    </span>
                  </div>
                </div>

                {/* Rule text */}
                <div className="pt-4 text-xs font-medium text-slate-600">
                  {LOYALTY_PROGRAM.rule} Clique nos círculos abaixo para registrar o seu atendimento:
                </div>

                {/* 9 Stamp Circles + Free Procedure */}
                <div className="grid grid-cols-5 gap-3 sm:gap-4 my-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, i) => {
                    const isStamped = i < stampedCount;
                    return (
                      <button
                        key={num}
                        onClick={() => toggleStamp(i)}
                        className={`aspect-square rounded-full border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isStamped
                            ? 'bg-[#C5A869] border-[#997B3C] text-[#0B1118] shadow-md scale-105'
                            : 'border-[#C5A869]/60 hover:border-[#C5A869] bg-white text-slate-500'
                        }`}
                        title={`Carimbo ${num}`}
                      >
                        {isStamped ? (
                          <div className="flex flex-col items-center justify-center p-0.5">
                            <img
                              src="/assets/ubote_emblem.png"
                              alt="Carimbo Oficial"
                              className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow"
                            />
                            <span className="text-[8px] font-mono font-bold leading-none mt-0.5 text-[#0B1118]">
                              OK
                            </span>
                          </div>
                        ) : (
                          <span className="font-mono text-sm sm:text-base font-bold text-slate-700">
                            0{num}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* 10th Slot: Procedimento Grátis */}
                  <div
                    className={`aspect-square rounded-full border-2 flex flex-col items-center justify-center text-center p-1 transition-all ${
                      stampedCount >= 9
                        ? 'bg-[#0B1118] border-[#C5A869] text-[#F3DEAB] shadow-xl animate-pulse scale-105'
                        : 'bg-[#152233] border-slate-400 text-slate-300 opacity-80'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A869] mb-0.5" />
                    <span className="text-[9px] font-mono uppercase font-bold leading-tight">
                      PROCED. GRÁTIS
                    </span>
                  </div>
                </div>

                {/* Client Name Input */}
                <div className="pt-2 border-t border-slate-300 flex items-center gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nome:
                  </label>
                  <input
                    type="text"
                    placeholder="Digite o seu nome aqui..."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="flex-1 border-b border-slate-400 bg-transparent px-2 py-1 text-xs text-slate-900 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                {/* Card Footer Bar */}
                <div className="mt-5 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-600 gap-2 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span className="font-bold text-slate-900">{UBOTE_CONTACT.phone}</span>
                    <span aria-hidden="true">·</span>
                    <span>{UBOTE_CONTACT.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-[#C85A32]">
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{UBOTE_CONTACT.instagram}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Validar Carimbo no WhatsApp Oficial ({UBOTE_CONTACT.phone})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <a
                  href={UBOTE_CONTACT.loyaltyCardPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-headline font-semibold text-center transition-colors"
                >
                  Ver Ficheiro Gráfico Original (PNG)
                </a>
              </div>
            </div>
          ) : (
            /* Tab: Cartão de Visita */
            <div className="space-y-8">
              <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border border-slate-700 shadow-2xl glass-card-glow">
                <img
                  src={UBOTE_CONTACT.businessCardPath}
                  alt="Cartão de Visita Oficial UBOTE Angola - Rua Moisés Cardoso Nº 10, Prédio JPimenta"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Detailed Verified Location & Contacts */}
              <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#111A26] border border-slate-800 space-y-4 text-left">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#C5A869]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Informações Oficiais de Contacto & Visita</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-mono">Endereço Oficial:</span>
                    <strong className="text-white block text-sm">{UBOTE_CONTACT.address}</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-mono">Linha & WhatsApp:</span>
                    <strong className="text-[#C5A869] block text-sm font-mono">{UBOTE_CONTACT.phone}</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-mono">Instagram Oficial:</span>
                    <a
                      href={UBOTE_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#C5A869] font-medium flex items-center gap-1"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>{UBOTE_CONTACT.instagram}</span>
                    </a>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 block font-mono">Marcação Recomendada:</span>
                    <strong className="text-white block text-sm">Marque já a sua avaliação</strong>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      const contactEl = document.getElementById('contacto');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center cursor-pointer shadow-md"
                  >
                    Marcar Avaliação Presencial
                  </button>
                  <a
                    href={`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${encodeURIComponent('Olá UBOTE Angola! Gostaria de agendar a minha avaliação na Rua Moisés Cardoso Nº 10, Prédio JPimenta.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Direto</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
