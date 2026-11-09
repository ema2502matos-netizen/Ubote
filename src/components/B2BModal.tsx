import React, { useState } from 'react';
import { X, Building2, Check, Send, MessageCircle, ExternalLink } from 'lucide-react';
import { UBOTE_CONTACT } from '../data/uboteData';

interface B2BModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BModal: React.FC<B2BModalProps> = ({ isOpen, onClose }) => {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState('10-50');
  const [programInterest, setProgramInterest] = useState('convenio');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenWhatsAppB2B = () => {
    const text = encodeURIComponent(
      `Olá Direção Corporativa UBOTE! O meu nome é ${contactName || 'Responsável RH'}, da empresa ${company || 'nossa organização'}. Gostaríamos de receber uma proposta institucional de convénio corporativo B2B para aproximadamente ${employees} colaboradores em Luanda.`
    );
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#111A26] border border-slate-700 rounded-2xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-[#C5A869] tracking-wider">
                Corporate Wellness Angola
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                Proposta de Convénio B2B
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#C5A869]/20 border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869] mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-white">
                Pedido Institucional Recebido
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                O nosso gestor de contas corporativas entrará em contacto com a{' '}
                <strong className="text-white">{company}</strong> nas próximas 2 horas úteis.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleOpenWhatsAppB2B}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Agilizar Atendimento via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Desenhamos pacotes sob medida para bancos, petrolíferas, consultorias e empresas
              em Luanda. Obtenha descontos corporativos dedutíveis e relatórios unificados.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nome da Organização / Empresa *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Banco ou Empresa S.A."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pessoa de Contacto (RH / Direção) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome do responsável"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Telefone / WhatsApp (+244) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+244 923 000 000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Colaboradores Estimados
                </label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="5-15">5 a 15 (Equipa de Liderança)</option>
                  <option value="15-50">15 a 50 Colaboradores</option>
                  <option value="50-150">50 a 150 Colaboradores</option>
                  <option value="150+">Mais de 150 Colaboradores</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Modalidade Pretendida
                </label>
                <select
                  value={programInterest}
                  onChange={(e) => setProgramInterest(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="convenio">Convénio B2B Permanente (Desconto em Folha / Cartão)</option>
                  <option value="vouchers">Vouchers de Bonificação e Prémios</option>
                  <option value="wellness-day">Wellness Day / Retiro de Direção</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Proposta B2B Oficial</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
