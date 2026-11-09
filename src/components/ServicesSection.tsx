import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Check,
  Plus,
  Trash2,
  Clock,
  ArrowRight,
  Shield,
  FileText,
  Building2,
  ExternalLink,
  Flame,
  Droplets
} from 'lucide-react';
import { UBOTE_SERVICES, CORPORATE_PROGRAMS, ServiceItem, UBOTE_CONTACT, UBOTE_IMAGES } from '../data/uboteData';

interface ServicesSectionProps {
  onOpenPdf: () => void;
  onOpenB2BModal: () => void;
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenPdf,
  onOpenB2BModal,
  onSelectServiceForBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [genderFilter, setGenderFilter] = useState<'todos' | 'feminino' | 'masculino'>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [activeModalItem, setActiveModalItem] = useState<ServiceItem | null>(null);

  // Filtered Services List
  const filteredServices = useMemo(() => {
    return UBOTE_SERVICES.filter((item) => {
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      if (genderFilter !== 'todos' && item.gender && item.gender !== 'unisex') {
        if (item.gender !== genderFilter) return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      return true;
    });
  }, [selectedCategory, genderFilter, searchQuery]);

  const toggleSelectService = (service: ServiceItem) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const isServiceSelected = (id: string) => selectedServices.some((s) => s.id === id);

  const totalEstimate = useMemo(() => {
    return selectedServices.reduce((sum, item) => sum + item.price, 0);
  }, [selectedServices]);

  const sendSelectionToWhatsApp = () => {
    if (selectedServices.length === 0) return;
    const itemsList = selectedServices
      .map((s) => `• ${s.name} (${s.formattedPrice})`)
      .join('%0A');
    const formattedTotal = totalEstimate.toLocaleString('pt-AO') + ' Kz';
    const message = `Olá UBOTE Angola! Estive a selecionar tratamentos no vosso Catálogo 2026:%0A%0A${itemsList}%0A%0A*Total Estimado:* ${formattedTotal}%0A%0AGostaria de confirmar a disponibilidade de marcação na vossa unidade em Luanda.`;
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="servicos" className="relative py-28 bg-[#080E16]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Elevated Modern Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Soluções & Preçário Oficial 2026</span>
            </div>
            <h2 className="font-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Portfólio de serviços com{' '}
              <span className="gold-text-gradient italic font-normal">
                transparência absoluta
              </span>.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Consulte a indicação clínica, benefícios e valor exato em Kwanzas (Kz) de cada protocolo.
              Simule o seu orçamento e reserve diretamente pelo WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-headline font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-[#C5A869]/50 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#C5A869]" />
              <span>Ver Revista Gráfica (PDF 2026)</span>
            </button>
            <button
              onClick={onOpenB2BModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-headline font-semibold text-[#0B1118] bg-gradient-to-r from-[#C5A869] to-[#D8BE7A] hover:brightness-110 rounded-xl transition-all cursor-pointer shadow-md shadow-[#C5A869]/20"
            >
              <Building2 className="w-4 h-4" />
              <span>Planos para Empresas</span>
            </button>
          </div>
        </div>

        {/* Dynamic Visual Spotlight Banner for Featured Treatments */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111A26] via-[#142334] to-[#111A26] border border-[#C5A869]/30 relative overflow-hidden glass-card-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Image Column */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl">
              <div className="img-zoom-container aspect-[4/3] w-full">
                <img
                  src={UBOTE_IMAGES.bath}
                  alt="Ritual de banho terapêutico Cleópatra e Faraó com pétalas douradas e aromaterapia na UBOTE Luanda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
                <Droplets className="w-4 h-4 text-[#C5A869]" />
                <span>Rituais de Assinatura Imperial</span>
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
                Banhos Terapêuticos Faraó & Cleópatra
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Imersão terapêutica concebida para a descompressão extrema do corpo e da mente,
                enriquecida com óleos essenciais nobres, leite nutritivo e botânica aromática.
                Um refúgio sensorial exclusivo de 90 minutos para o restabelecimento do equilíbrio.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Valor Tabelado 2026</div>
                  <div className="text-2xl font-bold font-mono text-[#C5A869]">70.000 Kz</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const bath = UBOTE_SERVICES.find((s) => s.id === 'banho-cleopatra');
                      if (bath) toggleSelectService(bath);
                    }}
                    className="px-5 py-2.5 bg-[#C5A869] hover:bg-[#D4BC82] text-[#0B1118] font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    {isServiceSelected('banho-cleopatra') ? '✓ Selecionado no Orçamento' : '+ Adicionar Banho Cleópatra'}
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking('Banho Terapêutico Faraó (70.000 Kz)')}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-headline font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Agendar Horário
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="pt-6 pb-10 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'todos', label: 'Todos os Tratamentos' },
              { id: 'faciais', label: 'Cuidados Faciais' },
              { id: 'laser', label: 'Depilação a Laser' },
              { id: 'cera', label: 'Depilação com Cera' },
              { id: 'massagens', label: 'Massagens & Banhos' },
              { id: 'unhas', label: 'Mãos e Pés' },
              { id: 'corporativo', label: 'Programas Corporativos' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-headline font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#C5A869] to-[#D8BE7A] text-[#0B1118] shadow-lg shadow-[#C5A869]/15'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Gender & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {(selectedCategory === 'laser' ||
              selectedCategory === 'cera' ||
              selectedCategory === 'todos') && (
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 w-fit">
                <span className="text-[11px] font-mono text-slate-400 px-2 uppercase">Público:</span>
                <button
                  onClick={() => setGenderFilter('todos')}
                  className={`px-3 py-1 text-xs font-headline rounded-lg transition-colors cursor-pointer ${
                    genderFilter === 'todos'
                      ? 'bg-slate-800 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Ambos
                </button>
                <button
                  onClick={() => setGenderFilter('feminino')}
                  className={`px-3 py-1 text-xs font-headline rounded-lg transition-colors cursor-pointer ${
                    genderFilter === 'feminino'
                      ? 'bg-[#C5A869] text-[#0B1118] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Feminino
                </button>
                <button
                  onClick={() => setGenderFilter('masculino')}
                  className={`px-3 py-1 text-xs font-headline rounded-lg transition-colors cursor-pointer ${
                    genderFilter === 'masculino'
                      ? 'bg-[#C5A869] text-[#0B1118] font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Masculino
                </button>
              </div>
            )}

            {/* Quick Search */}
            <div className="relative max-w-xs w-full sm:ml-auto">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Pesquisar serviço (ex: laser, acne, banho)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A869] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Corporate Programs View */}
        {selectedCategory === 'corporativo' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORPORATE_PROGRAMS.map((plan) => (
              <div
                key={plan.id}
                className="p-8 rounded-3xl bg-[#111A26] border border-slate-800 hover:border-[#C5A869]/50 transition-all duration-300 flex flex-col justify-between glass-card-glow"
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#C5A869] uppercase tracking-wider">
                    {plan.target}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{plan.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">{plan.description}</p>

                  <div className="pt-4 border-t border-slate-800 space-y-2.5">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Vantagens Incluídas:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-[#C5A869] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-3 font-light">
                    <span className="font-medium text-slate-300">Recomendado para:</span>{' '}
                    {plan.recommendedFor}
                  </div>
                  <button
                    onClick={onOpenB2BModal}
                    className="w-full py-3 bg-gradient-to-r from-[#C5A869] to-[#D8BE7A] text-[#0B1118] font-headline font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Solicitar Proposta B2B</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Dynamic Service Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const selected = isServiceSelected(service.id);
              return (
                <div
                  key={service.id}
                  className={`p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between relative glass-card-glow ${
                    selected
                      ? 'border-2 border-[#C5A869] shadow-xl shadow-[#C5A869]/10'
                      : 'border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[#C5A869] capitalize">{service.category}</span>
                        {service.gender && service.gender !== 'unisex' && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="capitalize">{service.gender}</span>
                          </>
                        )}
                      </div>
                      {service.duration && (
                        <div className="flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                          <Clock className="w-3 h-3 text-[#C5A869]" />
                          <span>{service.duration}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-white hover:text-[#C5A869] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 font-light">
                      {service.description}
                    </p>

                    {service.benefits && service.benefits.length > 0 && (
                      <div className="pt-2 space-y-1">
                        {service.benefits.slice(0, 2).map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Check className="w-3 h-3 text-[#C5A869] shrink-0" />
                            <span className="truncate">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Price & Quick Action */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Valor Tabelado
                      </div>
                      <div className="font-mono text-lg font-bold text-[#C5A869] tabular-nums">
                        {service.formattedPrice}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalItem(service)}
                        className="px-2.5 py-1.5 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-colors text-xs font-headline"
                        title="Ver detalhes do protocolo"
                      >
                        Detalhes
                      </button>
                      <button
                        onClick={() => toggleSelectService(service)}
                        className={`px-3.5 py-2 text-xs font-headline font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                          selected
                            ? 'bg-[#C5A869] text-[#0B1118]'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Escolhido</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {filteredServices.length === 0 && selectedCategory !== 'corporativo' && (
          <div className="py-16 text-center space-y-3 bg-[#111A26] rounded-3xl border border-slate-800">
            <p className="text-sm text-slate-400">
              Nenhum tratamento encontrado para o termo &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setGenderFilter('todos');
              }}
              className="px-4 py-2 text-xs text-[#C5A869] hover:underline cursor-pointer font-headline"
            >
              Restabelecer filtros do catálogo
            </button>
          </div>
        )}

        {/* Floating Interactive Budget Simulator Strip */}
        {selectedServices.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl p-4 sm:p-5 rounded-2xl bg-[#080E16]/95 backdrop-blur-2xl border-2 border-[#C5A869] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C5A869] to-[#997B3C] text-[#0B1118] flex items-center justify-center font-mono font-bold text-base shadow">
                {selectedServices.length}
              </div>
              <div>
                <div className="text-xs text-slate-300 font-mono">
                  {selectedServices.length === 1 ? '1 tratamento selecionado' : `${selectedServices.length} tratamentos selecionados`}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                  Total Estimado:{' '}
                  <span className="text-[#C5A869]">{totalEstimate.toLocaleString('pt-AO')} Kz</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setSelectedServices([])}
                className="p-2.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors"
                title="Limpar seleção"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={sendSelectionToWhatsApp}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-[#C5A869] via-[#D8BE7A] to-[#B8934A] hover:brightness-110 text-[#0B1118] font-headline font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C5A869]/25 whitespace-nowrap"
              >
                <span>Agendar no WhatsApp com Seleção</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Protocol Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111A26] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-[#C5A869] tracking-wider">
                  Protocolo Oficial · Edição 2026
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {activeModalItem.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-white text-lg p-1"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed font-light">{activeModalItem.description}</p>

              {activeModalItem.benefits && (
                <div className="p-4 rounded-xl bg-[#0B1118] border border-slate-800 space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Benefícios e Resultados:
                  </span>
                  <ul className="space-y-1.5 text-xs">
                    {activeModalItem.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-200">
                        <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Duração estimada:</span>
                <span className="font-mono text-white font-medium">{activeModalItem.duration || 'Consulte na avaliação'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Valor tabelado:</span>
                <span className="font-mono text-base font-bold text-[#C5A869]">{activeModalItem.formattedPrice}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  toggleSelectService(activeModalItem);
                  setActiveModalItem(null);
                }}
                className="flex-1 py-3 bg-[#C5A869] text-[#0B1118] font-headline font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-[#D4BC82] transition-colors"
              >
                {isServiceSelected(activeModalItem.id) ? 'Remover do Orçamento' : 'Adicionar ao Orçamento'}
              </button>
              <button
                onClick={() => {
                  onSelectServiceForBooking(activeModalItem.name);
                  setActiveModalItem(null);
                }}
                className="px-4 py-3 bg-slate-800 text-white font-headline font-semibold text-xs rounded-xl hover:bg-slate-700 transition-colors"
              >
                Marcar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
