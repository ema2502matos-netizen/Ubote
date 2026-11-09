import React from 'react';
import { ArrowUp, FileText } from 'lucide-react';
import { UBOTE_CONTACT } from '../data/uboteData';
import { UboteLogo } from './UboteLogo';

interface FooterProps {
  onOpenPdf: () => void;
  onOpenB2BModal: () => void;
  onOpenLoyaltyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPdf, onOpenB2BModal, onOpenLoyaltyModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060A10] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column with Official Logo */}
          <div className="md:col-span-5 space-y-4 text-left">
            <UboteLogo variant="horizontal" size="md" />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              <strong className="text-white">Beleza com Raízes.</strong> O seu momento. A sua beleza.
              Laser · Spa · Estética com rigor técnico no coração de Luanda.
            </p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <div className="text-white font-medium">{UBOTE_CONTACT.address}</div>
              <div>Linha & WhatsApp: <span className="text-[#C5A869] font-bold">{UBOTE_CONTACT.phone}</span></div>
              <div>Email: <a href={`mailto:${UBOTE_CONTACT.email}`} className="text-slate-300 hover:text-[#C5A869] underline">{UBOTE_CONTACT.email}</a></div>
              <div>Instagram: <a href={UBOTE_CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline">{UBOTE_CONTACT.instagram}</a></div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase text-white tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('sobre')}
                  className="hover:text-[#C5A869] transition-colors"
                >
                  Sobre Nós & Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="hover:text-[#C5A869] transition-colors"
                >
                  Soluções & Preçário Completo
                </button>
              </li>
              {onOpenLoyaltyModal && (
                <li>
                  <button
                    onClick={onOpenLoyaltyModal}
                    className="hover:text-[#C5A869] transition-colors text-[#E0C78D] font-medium"
                  >
                    Cartão Fidelidade (1 Grátis)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => scrollToSection('ecossistema')}
                  className="hover:text-[#C5A869] transition-colors"
                >
                  Ecossistema & Convénios B2B
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacto')}
                  className="hover:text-[#C5A869] transition-colors"
                >
                  Contacto & Localização
                </button>
              </li>
            </ul>
          </div>

          {/* Documents & Corporate Column */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-mono text-xs uppercase text-white tracking-wider">
              Recursos & Documentos
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenPdf}
                className="flex items-center gap-2 hover:text-[#C5A869] transition-colors text-left"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Guia de Tratamentos e Preçário 2026 (PDF Oficial)</span>
              </button>
              {onOpenLoyaltyModal && (
                <div>
                  <button
                    onClick={onOpenLoyaltyModal}
                    className="hover:text-[#C5A869] transition-colors text-left"
                  >
                    Ver Cartão de Visita e Cartão Fidelidade
                  </button>
                </div>
              )}
              <div>
                <button
                  onClick={onOpenB2BModal}
                  className="hover:text-[#C5A869] transition-colors text-left"
                >
                  Solicitar Minuta de Convénio B2B para Empresa
                </button>
              </div>
              <div className="text-slate-400 text-[11px] pt-2 font-mono">
                Atendimento: {UBOTE_CONTACT.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 UBOTE Laser · Spa · Estética. Beleza com Raízes. Todos os direitos reservados.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
