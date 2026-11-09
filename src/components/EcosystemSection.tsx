import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  FileCheck2,
  Users,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Sparkles
} from 'lucide-react';
import { CORPORATE_PARTNERS, UBOTE_IMAGES } from '../data/uboteData';

interface EcosystemSectionProps {
  onOpenB2BModal: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ onOpenB2BModal }) => {
  const [employeeCount, setEmployeeCount] = useState<number>(30);
  const [selectedPlanTier, setSelectedPlanTier] = useState<'essencial' | 'executivo' | 'premium'>('executivo');

  const discountRate = selectedPlanTier === 'essencial' ? 0.15 : selectedPlanTier === 'executivo' ? 0.20 : 0.25;
  const averageSpendPerUser = selectedPlanTier === 'essencial' ? 35000 : selectedPlanTier === 'executivo' ? 65000 : 110000;
  const corporateSavings = Math.round(employeeCount * averageSpendPerUser * discountRate);

  return (
    <section id="ecossistema" className="relative py-28 bg-[#0B121C] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Corporativo & Convénios B2B</span>
          </div>

          <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            O padrão de saúde executiva que as{' '}
            <span className="gold-text-gradient italic font-normal">
              grandes empresas de Luanda
            </span>{' '}
            oferecem aos seus líderes.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            Conectamos a UBOTE às principais organizações de Angola. Desenhamos convénios
            institucionais flexíveis, vouchers de bonificação e programas de bem-estar que reduzem o burnout e elevam o foco estratégico.
          </p>
        </div>

        {/* Dynamic Visual Banner: Executive Wellness Lounge in Luanda */}
        <div className="my-16 rounded-3xl overflow-hidden border border-slate-800 glass-card-glow relative group">
          <div className="img-zoom-container aspect-[16/9] sm:aspect-[21/9] max-h-[460px] w-full">
            <img
              src={UBOTE_IMAGES.lounge}
              alt="Líderes e executivos corporativos em Luanda em ambiente de descompressão e networking no UBOTE Corporate Lounge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080E16] via-[#080E16]/50 to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A869]">
                Luanda Corporate Sanctuary
              </span>
              <h3 className="font-luxury text-xl sm:text-3xl font-bold text-white mt-1">
                Espaço privativo para delegações e quadros superiores
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light hidden sm:block">
                Salas privativas com vista panorâmica sobre a baía e a marginal, garantindo confidencialidade absoluta.
              </p>
            </div>

            <button
              onClick={onOpenB2BModal}
              className="px-6 py-3 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#C5A869]/20 whitespace-nowrap cursor-pointer"
            >
              Agendar Visita Institucional
            </button>
          </div>
        </div>

        {/* Corporate Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-8 rounded-3xl bg-[#111A26] border border-slate-800 glass-card-glow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Vouchers Nominais de Reconhecimento
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Premie metas atingidas, fechos de contas e marcos com vouchers personalizados de spa e estética para diretores e equipas de alta performance.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111A26] border border-slate-800 glass-card-glow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C85A32]/10 border border-[#C85A32]/30 flex items-center justify-center text-[#E07A5F]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Prevenção do Burnout Executivo
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Protocolos de massagens com pedras quentes e saunas terapêuticas reduzem a sobrecarga muscular e restauram o rendimento cognitivo.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111A26] border border-slate-800 glass-card-glow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center text-[#C5A869]">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Faturação Centralizada & Fiscalidade
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Relatório unificado de usufruto mensal, conformidade tributária em Angola e gestão simplificada para departamentos de RH.
            </p>
          </div>
        </div>

        {/* Interactive B2B Simulator Box */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111827] via-[#141F2E] to-[#080E16] border border-slate-800 glass-card-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
                <Calculator className="w-4 h-4" />
                <span>Simulador de Benefício Corporativo B2B</span>
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
                Calcule a vantagem para a sua organização
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Ajuste o número de colaboradores elegíveis da sua empresa e o nível do programa para visualizar a estimativa de poupança no pacote corporativo UBOTE 2026.
              </p>

              {/* Slider for Employees */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Volume de Colaboradores:</span>
                  <span className="text-[#C5A869] font-bold text-sm tabular-nums">
                    {employeeCount} profissionais
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="w-full accent-[#C5A869] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5 (Equipa Chave)</span>
                  <span>50 (Direção & Média Gestão)</span>
                  <span>150+ (Corporação)</span>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { id: 'essencial', label: 'Essencial (15% Desc)', desc: 'Manutenção & Massagens' },
                  { id: 'executivo', label: 'Executivo (20% Desc)', desc: 'Facial + Laser + Spa' },
                  { id: 'premium', label: 'C-Level VIP (25% Desc)', desc: 'Banhos & Rituais Completos' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedPlanTier(tier.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-headline font-semibold transition-all cursor-pointer ${
                      selectedPlanTier === tier.id
                        ? 'bg-[#C5A869] text-[#0B1118] font-bold shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <div>{tier.label}</div>
                    <div className="text-[10px] opacity-80">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#080E16]/90 border border-slate-800 space-y-5 text-left">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Estimativa de Vantagem Económica Anual
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-[#C5A869] tabular-nums">
                  ~ {corporateSavings.toLocaleString('pt-AO')} Kz
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Poupança anual estimada em benefício de saúde e bem-estar
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Atendimento com horário prioritário protegido</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Acesso às salas executivas privativas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>Gestor de conta corporativo dedicado em Luanda</span>
                </div>
              </div>

              <button
                onClick={onOpenB2BModal}
                className="w-full py-3.5 bg-gradient-to-r from-[#C5A869] to-[#D8BE7A] hover:brightness-110 text-[#0B1118] font-headline font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/15"
              >
                <span>Solicitar Minuta de Convénio B2B</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Corporate Network Brands Showcase */}
        <div className="mt-20 pt-12 border-t border-slate-800/80">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A869]">
              Rede de Confiança Corporativa
            </span>
            <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
              Organizações e lideranças integradas no ecossistema UBOTE
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CORPORATE_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="p-5 rounded-2xl bg-[#111A26]/80 border border-slate-800 hover:border-[#C5A869]/40 transition-all duration-200 flex flex-col justify-between group glass-card-glow"
              >
                <div className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors font-headline">
                  {partner.name}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{partner.sector}</span>
                  <span className="text-[#C5A869] font-medium">{partner.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
