import React from 'react';
import { X, Download, FileText, ExternalLink, ShieldCheck } from 'lucide-react';
import { UBOTE_CONTACT } from '../data/uboteData';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, onSelectService }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0D1520] border border-slate-700 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#111A26] border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A869] uppercase tracking-wider">
                <span>Edição Oficial 2026</span>
                <span aria-hidden="true">·</span>
                <span>Revista Gráfica CMYK</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                UBOTE · Guia de Tratamentos e Preçário 2026
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={UBOTE_CONTACT.pdfCatalogPath}
              download="UBOTE_Guia_Tratamentos_e_Precos_2026.pdf"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-semibold text-xs rounded-lg transition-colors shadow-sm"
              title="Descarregar ficheiro PDF completo"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descarregar PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar Guia"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Chapter Selector Toolbar */}
        <div className="px-6 py-2.5 bg-[#0B1118] border-b border-slate-800/80 flex items-center justify-between text-xs overflow-x-auto gap-4">
          <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
            Índice da Revista:
          </span>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              onClick={() => onSelectService('Limpeza Facial Profunda (30.000 Kz)')}
              className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-[#C5A869] border border-slate-800 hover:border-[#C5A869]/50 transition-colors"
            >
              03 Cuidados Faciais
            </button>
            <button
              onClick={() => onSelectService('Laser Virilha Completa (25.000 Kz)')}
              className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-[#C5A869] border border-slate-800 hover:border-[#C5A869]/50 transition-colors"
            >
              04 Depilação a Laser
            </button>
            <button
              onClick={() => onSelectService('Cera Virilha Completa (18.000 Kz)')}
              className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-[#C5A869] border border-slate-800 hover:border-[#C5A869]/50 transition-colors"
            >
              05 Depilação com Cera
            </button>
            <button
              onClick={() => onSelectService('Banho Terapêutico Cleópatra (70.000 Kz)')}
              className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-[#C5A869] border border-slate-800 hover:border-[#C5A869]/50 transition-colors"
            >
              06 Massagens e Banhos
            </button>
            <button
              onClick={() => onSelectService('Manicure com Parafina (10.000 Kz)')}
              className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 hover:text-[#C5A869] border border-slate-800 hover:border-[#C5A869]/50 transition-colors"
            >
              07 Mãos e Pés
            </button>
          </div>
        </div>

        {/* Embedded PDF Frame with Fallback */}
        <div className="flex-1 bg-[#090D13] relative overflow-hidden">
          <iframe
            src={`${UBOTE_CONTACT.pdfCatalogPath}#toolbar=1&navpanes=1&scrollbar=1`}
            title="UBOTE Guia Oficial de Tratamentos 2026"
            className="w-full h-full border-0"
          />
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3 bg-[#111A26] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A869]" />
            <span>Documento oficial UBOTE Angola · Edição 2026 · Preços em Kwanzas (Kz)</span>
          </div>
          <button
            onClick={() => {
              onClose();
              const contactEl = document.getElementById('contacto');
              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white hover:text-[#C5A869] font-medium transition-colors"
          >
            Ir para Marcações & Contacto →
          </button>
        </div>
      </div>
    </div>
  );
};
