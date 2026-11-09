import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  User,
  Calendar,
  Sparkles,
  ExternalLink,
  Instagram,
  Award
} from 'lucide-react';
import { UBOTE_CONTACT, UBOTE_SERVICES, LOYALTY_PROGRAM } from '../data/uboteData';

interface ContactSectionProps {
  preselectedService?: string;
  onClearPreselectedService?: () => void;
  onOpenLoyaltyModal?: () => void;
  onOpenWhatsAppAi?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  onClearPreselectedService,
  onOpenLoyaltyModal,
  onOpenWhatsAppAi,
}) => {
  const [formData, setFormData] = useState({
    requestType: 'particular', // particular | corporativo | voucher | info
    name: '',
    phone: '',
    email: '',
    company: '',
    service: preselectedService || '',
    preferredDate: '',
    preferredPeriod: 'manha',
    notes: '',
  });

  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        service: preselectedService,
        requestType: 'particular',
      }));
    }
  }, [preselectedService]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Por favor indique o seu nome completo.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor indique o seu número de telefone ou WhatsApp.';
    } else if (formData.phone.replace(/\D/g, '').length < 9) {
      newErrors.phone = 'Por favor insira um contacto telefónico válido.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Endereço de email inválido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate reference protocol ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `UBT-2026-${randomNum}`;
    setSubmittedProtocol(protocol);
  };

  const handleOpenWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Olá UBOTE Angola! Gostaria de obter informações sobre marcações e serviços corporativos para esta semana.`
    );
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  const handleOpenWhatsAppFromSubmission = () => {
    const requestTypeLabel =
      formData.requestType === 'corporativo'
        ? 'Convénio Corporativo B2B'
        : formData.requestType === 'voucher'
        ? 'Vouchers Corporativos'
        : 'Atendimento Particular';

    const msg =
      `*Solicitação UBOTE Angola (Protocolo: ${submittedProtocol})*%0A%0A` +
      `• *Nome:* ${encodeURIComponent(formData.name)}%0A` +
      `• *Tipo:* ${encodeURIComponent(requestTypeLabel)}%0A` +
      (formData.company ? `• *Empresa:* ${encodeURIComponent(formData.company)}%0A` : '') +
      (formData.service ? `• *Serviço de Interesse:* ${encodeURIComponent(formData.service)}%0A` : '') +
      (formData.preferredDate ? `• *Data Desejada:* ${encodeURIComponent(formData.preferredDate)}%0A` : '') +
      `• *Período Preferencial:* ${encodeURIComponent(formData.preferredPeriod)}%0A` +
      (formData.notes ? `• *Notas:* ${encodeURIComponent(formData.notes)}%0A` : '') +
      `%0APoderiam confirmar a disponibilidade para atendimento?`;

    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="contacto" className="relative py-28 bg-[#080E16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Elevated Typography */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capítulo 05 · Contacto & Conversão Imediata</span>
          </div>

          <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            Agende o seu atendimento ou{' '}
            <span className="gold-text-gradient italic font-normal">
              inicie um convénio
            </span>.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            A nossa equipa de receção executiva e concierge de bem-estar está disponível
            para aconselhar o melhor protocolo para si ou desenhar a proposta para a sua organização.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Form Column (Smart Lead Gen) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#111A26] border border-slate-800 shadow-2xl glass-card-glow">
            {submittedProtocol ? (
              /* Success Confirmation View */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#C5A869]/20 border border-[#C5A869]/40 flex items-center justify-center text-[#C5A869] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">
                    Registo Efetuado com Sucesso
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Protocolo: <span className="font-mono text-[#C5A869]">{submittedProtocol}</span>
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-white">{formData.name}</strong>. Os detalhes da
                    sua solicitação foram pré-registados na nossa receção em Luanda.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tipo de Solicitação:</span>
                    <span className="text-white font-medium capitalize">{formData.requestType}</span>
                  </div>
                  {formData.service && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Serviço:</span>
                      <span className="text-[#C5A869] font-medium">{formData.service}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contacto:</span>
                    <span className="text-white font-mono">{formData.phone}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleOpenWhatsAppFromSubmission}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Confirmar no WhatsApp Corporate</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </button>

                  <div>
                    <button
                      onClick={() => {
                        setSubmittedProtocol(null);
                        setFormData({
                          requestType: 'particular',
                          name: '',
                          phone: '',
                          email: '',
                          company: '',
                          service: '',
                          preferredDate: '',
                          preferredPeriod: 'manha',
                          notes: '',
                        });
                        if (onClearPreselectedService) onClearPreselectedService();
                      }}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer mt-2"
                    >
                      Nova solicitação
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Active Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                    Objetivo do Contacto
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'particular', label: 'Atendimento' },
                      { id: 'corporativo', label: 'Convénio B2B' },
                      { id: 'voucher', label: 'Vouchers' },
                      { id: 'info', label: 'Informações' },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setFormData({ ...formData, requestType: type.id })}
                        className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                          formData.requestType === type.id
                            ? 'bg-[#C5A869] text-[#0B1118] font-bold shadow-sm'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Ex: Dr. Armando Costa"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-[#C5A869]'
                        }`}
                      />
                    </div>
                    {errors.name && <span className="text-[11px] text-rose-400 mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Telefone / WhatsApp (Angola) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+244 923 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-[#C5A869]'
                        }`}
                      />
                    </div>
                    {errors.phone && <span className="text-[11px] text-rose-400 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Corporativo ou Pessoal
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="nome@empresa.ao"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-900 border rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-[#C5A869]'
                        }`}
                      />
                    </div>
                    {errors.email && <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Organização / Empresa (Opcional)
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Ex: Banco / Empresa em Luanda"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection / Preselection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Serviço ou Tratamento de Interesse
                    </label>
                    {formData.service && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, service: '' })}
                        className="text-[11px] text-[#C5A869] hover:underline"
                      >
                        Limpar seleção
                      </button>
                    )}
                  </div>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="">Selecione um serviço ou deixe em aberto para aconselhamento...</option>
                    <optgroup label="Cuidados Faciais">
                      <option value="Limpeza Facial Profunda (30.000 Kz)">Limpeza Facial Profunda — 30.000 Kz</option>
                      <option value="Limpeza Parcial com Hidratação (17.000 Kz)">Limpeza Parcial com Hidratação — 17.000 Kz</option>
                      <option value="Tratamento Acne (Pacote 5 sessões - 90.000 Kz)">Tratamento Acne (Pacote 5 sessões) — 90.000 Kz</option>
                    </optgroup>
                    <optgroup label="Depilação a Laser">
                      <option value="Laser Virilha Completa (25.000 Kz)">Laser Virilha Completa — 25.000 Kz</option>
                      <option value="Laser Perna Inteira (30.000 Kz)">Laser Perna Inteira — 30.000 Kz</option>
                      <option value="Laser Barba Masculino (18.000 Kz)">Laser Barba Masculino — 18.000 Kz</option>
                      <option value="Laser Costas Masculino (20.000 Kz)">Laser Costas Masculino — 20.000 Kz</option>
                    </optgroup>
                    <optgroup label="Massagens & Banhos Terapêuticos">
                      <option value="Banho Terapêutico Faraó (70.000 Kz)">Banho Terapêutico Faraó — 70.000 Kz</option>
                      <option value="Banho Terapêutico Cleópatra (70.000 Kz)">Banho Terapêutico Cleópatra — 70.000 Kz</option>
                      <option value="Relaxante com Pedras Quentes (45.000 Kz)">Relaxante com Pedras Quentes — 45.000 Kz</option>
                      <option value="Sauna + Massagem (50.000 Kz)">Sauna + Massagem — 50.000 Kz</option>
                    </optgroup>
                    <optgroup label="Mãos e Pés">
                      <option value="Manicure com Parafina (10.000 Kz)">Manicure com Parafina — 10.000 Kz</option>
                      <option value="Pedicure com Parafina (15.000 Kz)">Pedicure com Parafina — 15.000 Kz</option>
                      <option value="Unhas de Gel (12.000 Kz)">Unhas de Gel — 12.000 Kz</option>
                      <option value="Unhas de Porcelana (18.000 Kz)">Unhas de Porcelana — 18.000 Kz</option>
                    </optgroup>
                    <optgroup label="Corporativo B2B">
                      <option value="Convénio Corporativo B2B para Empresa">Convénio Corporativo B2B para Empresa</option>
                      <option value="Pacote Vouchers de Bonificação">Pacote Vouchers de Bonificação</option>
                      <option value="VIP Corporate Wellness Day">VIP Corporate Wellness Day</option>
                    </optgroup>
                  </select>
                </div>

                {/* Preferred Date & Period */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Data de Preferência
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Horário / Período
                    </label>
                    <select
                      value={formData.preferredPeriod}
                      onChange={(e) => setFormData({ ...formData, preferredPeriod: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white focus:outline-none transition-colors"
                    >
                      <option value="manha">Manhã (08h00 - 12h00)</option>
                      <option value="tarde">Tarde (12h00 - 17h00)</option>
                      <option value="noite">Fim de Tarde / Noite (17h00 - 20h00)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Notas ou Requisitos Específicos
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Indique detalhes como alergias, fototipo, ou número de colaboradores para convénio B2B..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-800 focus:border-[#C5A869] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-semibold text-xs tracking-wider uppercase rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#C5A869]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submeter Pedido & Gerar Protocolo</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct WhatsApp Corporate & Institutional Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Corporate Direct Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#122B1E] via-[#0E1E18] to-[#0B1118] border border-emerald-800/60 shadow-xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-6 h-6 fill-[#25D366]" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                    Canal Prioritário Angola
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    WhatsApp Corporate UBOTE
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                No mercado angolano, a rapidez e a discrição são fundamentais. Fale diretamente
                com a nossa receção central para agendamento instantâneo, esclarecimento de dúvidas
                ou envio de pedidos de convénio corporativo.
              </p>

              <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/60 flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono text-emerald-300">{UBOTE_CONTACT.phone}</span>
                <span className="text-[11px] text-slate-400">Tempo de resposta: &lt; 15 min</span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppDirect}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Conversar no WhatsApp Agora</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {onOpenWhatsAppAi && (
                  <button
                    type="button"
                    onClick={onOpenWhatsAppAi}
                    className="w-full py-2.5 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-600/70 text-emerald-300 hover:text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                    <span>Testar Atendente IA & Ver API</span>
                  </button>
                )}
              </div>
            </div>

            {/* Loyalty Card Callout */}
            {onOpenLoyaltyModal && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111A26] to-[#152335] border border-[#C5A869]/40 space-y-3 glass-card-glow text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869] font-bold">
                    Programa Fidelidade
                  </span>
                  <Award className="w-4 h-4 text-[#C5A869]" />
                </div>
                <h4 className="font-headline text-sm font-bold text-white">
                  Cartão Fidelidade · Beleza com Raízes
                </h4>
                <p className="text-xs text-slate-300 font-light">
                  {LOYALTY_PROGRAM.rule}
                </p>
                <button
                  type="button"
                  onClick={onOpenLoyaltyModal}
                  className="inline-flex items-center gap-1.5 text-xs font-headline font-semibold text-[#C5A869] hover:text-[#E0C78D] cursor-pointer"
                >
                  <span>Abrir Cartão Fidelidade Digital</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Institutional Information & Location */}
            <div className="p-8 rounded-3xl bg-[#111A26] border border-slate-800 space-y-6 glass-card-glow">
              <h4 className="font-display text-lg font-bold text-white border-b border-slate-800 pb-3">
                Localização & Atendimento
              </h4>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Endereço em Luanda:</strong>
                    <span>{UBOTE_CONTACT.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Linha de Marcação Direta:</strong>
                    <span className="font-mono text-[#C5A869] font-bold">{UBOTE_CONTACT.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Instagram Oficial:</strong>
                    <a
                      href={UBOTE_CONTACT.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-white hover:text-[#C5A869] flex items-center gap-1 underline underline-offset-2"
                    >
                      {UBOTE_CONTACT.instagram}
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Horário de Funcionamento:</strong>
                    <span>{UBOTE_CONTACT.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Email Oficial:</strong>
                    <a
                      href={`mailto:${UBOTE_CONTACT.email}`}
                      className="font-mono text-slate-300 hover:text-[#C5A869] underline transition-colors"
                    >
                      {UBOTE_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C5A869]" />
                  <span>Prédio JPimenta · Luanda</span>
                </span>
                <span className="text-[#C5A869] font-mono text-[11px]">Beleza com Raízes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
