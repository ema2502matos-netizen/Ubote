import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  Bot,
  BadgeCheck,
  ExternalLink,
  Copy,
  Check,
  Code,
  Terminal,
  Smartphone,
  RefreshCw,
  Clock,
  MapPin,
  Tag,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { UBOTE_CONTACT, LOYALTY_PROGRAM } from '../data/uboteData';

interface WhatsAppAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  intent?: string;
  detectedServices?: string[];
  estimatedTotalKz?: number;
  suggestedQuickReplies?: string[];
}

export const WhatsAppAiModal: React.FC<WhatsAppAiModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'api-docs'>('simulator');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompts tailored for UBOTE Luanda
  const presetQueries = [
    'Quanto custa o banho Cleópatra e o que inclui?',
    'Onde fica a clínica em Luanda e qual o horário?',
    'Como funciona o Cartão Fidelidade de 9 carimbos?',
    'Qual o preço da depilação a laser para barba e axilas?',
    'Gostaria de agendar para sábado de manhã',
    'Têm descontos para convénios corporativos de empresas?',
  ];

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: `Olá! Bem-vindo(a) à *UBOTE (Laser • Spa • Estética)* em Luanda. ✨\n\nEu sou a *Concierge Virtual Inteligente* da clínica. Posso responder imediatamente sobre o nosso *preçário 2026 em Kwanzas*, agendamentos, o *Cartão Fidelidade* (9 carimbos = 1 grátis) ou a nossa morada no *Prédio JPimenta*.\n\nComo posso cuidar de si hoje?`,
          time: timeStr,
          intent: 'greeting',
          suggestedQuickReplies: [
            'Ver Preçário em Kwanzas',
            'Onde fica a clínica?',
            'Como funciona a Fidelidade?',
          ],
        },
      ]);
    }
  }, [isOpen]);

  // Handle initial prompt if provided
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Auto scroll to bottom
  useEffect(() => {
    if (activeTab === 'simulator') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, activeTab]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history payload
      const history = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/whatsapp/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          customerName: 'Cliente Luanda',
          customerPhone: UBOTE_CONTACT.phone,
          conversationHistory: history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Servidor respondeu com status ${res.status}`);
      }

      const json = await res.json();
      const botData = json.data || {};

      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text:
          botData.reply ||
          'Agradecemos o seu contacto na UBOTE. Será um prazer recebê-la(o) no Prédio JPimenta.',
        time: `${String(new Date().getHours()).padStart(2, '0')}:${String(
          new Date().getMinutes()
        ).padStart(2, '0')}`,
        intent: botData.intent,
        detectedServices: botData.detectedServices,
        estimatedTotalKz: botData.estimatedTotalKz,
        suggestedQuickReplies: botData.suggestedQuickReplies,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Erro ao chamar API WhatsApp:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: `*UBOTE Luanda:* Obrigado pela mensagem. O nosso preçário oficial está disponível e o agendamento pode ser feito diretamente pelo nosso WhatsApp oficial *${UBOTE_CONTACT.phone}* na *Rua Moisés Cardoso Nº 10, Prédio JPimenta*.`,
        time: `${String(new Date().getHours()).padStart(2, '0')}:${String(
          new Date().getMinutes()
        ).padStart(2, '0')}`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDirectWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText ||
        'Olá UBOTE Luanda! Estava a testar o vosso atendimento inteligente e gostaria de agendar um serviço.'
    );
    window.open(`https://wa.me/${UBOTE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const curlExample = `curl -X POST https://ubote.app/api/whatsapp/respond \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Quanto custa o banho Cleópatra e onde fica a clínica?",
    "customerName": "Dra. Isabel Ferreira",
    "customerPhone": "+244922141665"
  }'`;

  const nodeExample = `// Exemplo de integração em Node.js / Express / Baileys / Evolution API
const response = await fetch('https://ubote.app/api/whatsapp/respond', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: clientIncomingMessage,
    customerName: senderName,
    customerPhone: senderNumber
  })
});

const data = await response.json();
// data.data.reply -> Texto pronto com *negritos* e formatação para enviar via WhatsApp
await sendWhatsAppMessage(senderNumber, data.data.reply);`;

  const webhookVerifyDoc = `// Webhook oficial Meta Cloud API:
GET  /api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=UBOTE_WHATSAPP_SECURE_TOKEN_2026&hub.challenge=1158201444
POST /api/whatsapp/webhook (Processa mensagens recebidas em tempo real)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E1520] border border-[#232E3E] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#121B27] border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#128C7E] to-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20">
              <MessageCircle className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-base font-bold text-white">
                  API & Concierge WhatsApp UBOTE
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini 3.8 Flash Ativa
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Atendimento automático inteligente para clientes em Luanda (+244 922 141 665)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switchers */}
            <div className="hidden sm:flex bg-black/40 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-[#C5A869] text-[#0B1118] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulador WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveTab('api-docs')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'api-docs'
                    ? 'bg-[#C5A869] text-[#0B1118] font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Documentação API</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex sm:hidden border-b border-slate-800 bg-[#121B27] px-4 py-2">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-1.5 text-xs text-center font-medium rounded-lg ${
              activeTab === 'simulator'
                ? 'bg-[#C5A869] text-[#0B1118] font-bold'
                : 'text-slate-400'
            }`}
          >
            Simulador Chat
          </button>
          <button
            onClick={() => setActiveTab('api-docs')}
            className={`flex-1 py-1.5 text-xs text-center font-medium rounded-lg ${
              activeTab === 'api-docs'
                ? 'bg-[#C5A869] text-[#0B1118] font-bold'
                : 'text-slate-400'
            }`}
          >
            Endpoints & API
          </button>
        </div>

        {/* Tab 1: Interactive Chat Simulator */}
        {activeTab === 'simulator' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0A0F16]">
            {/* Left Column: Quick Prompts & Knowledge Info */}
            <div className="w-full md:w-72 bg-[#0E1520] border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex overflow-y-auto">
              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#C5A869] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cenários de Teste Rápidos</span>
                </div>
                <p className="text-xs text-slate-400">
                  Clique numa pergunta frequente para ver a IA responder com preços oficiais em Kwanzas e informações exatas:
                </p>

                <div className="space-y-2">
                  {presetQueries.map((query, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(query)}
                      disabled={isLoading}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-[#1A2636] border border-slate-800 hover:border-[#C5A869]/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group leading-relaxed"
                    >
                      <span className="text-[#C5A869] mr-1.5 font-bold">›</span>
                      {query}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bot facts callout */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Preçário 2026 oficial embutido</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A869] shrink-0" />
                  <span>Rua Moisés Cardoso Nº 10, Prédio JPimenta</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <Tag className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                  <span>Regra Cartão: 9 carimbos = 1 grátis</span>
                </div>
              </div>
            </div>

            {/* Right Column: WhatsApp Phone Interface */}
            <div className="flex-1 flex flex-col h-[560px] sm:h-[620px] bg-[#0B141B] relative">
              {/* WhatsApp Header bar */}
              <div className="px-4 py-3 bg-[#1F2C34] flex items-center justify-between border-b border-black/30 shadow-md z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C5A869]/80 flex items-center justify-center overflow-hidden p-1 shadow-inner">
                      <img
                        src="/assets/ubote_emblem.png"
                        alt="UBOTE"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1F2C34]"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline font-semibold text-sm text-white">
                        UBOTE Laser · Spa · Estética
                      </span>
                      <BadgeCheck className="w-4 h-4 text-[#00A884] fill-[#00A884]" />
                    </div>
                    <p className="text-[11px] text-emerald-400 font-medium">
                      Atendimento Virtual Oficial · Luanda
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDirectWhatsApp()}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00A884] hover:bg-[#02906f] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow"
                    title="Abrir no WhatsApp real do telemóvel"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Real</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body with WhatsApp pattern background */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
                {/* Notice banner */}
                <div className="flex justify-center my-2">
                  <div className="px-3 py-1 rounded-lg bg-[#182229]/90 border border-white/5 text-[11px] text-slate-400 text-center max-w-md shadow-sm">
                    🔒 As respostas são processadas pela IA oficial com o preçário em Kwanzas e regras clínicas da UBOTE.
                  </div>
                </div>

                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 shadow-md relative ${
                          isBot
                            ? 'bg-[#202C33] text-slate-100 rounded-tl-none border border-slate-700/50'
                            : 'bg-[#005C4B] text-white rounded-tr-none'
                        }`}
                      >
                        {/* Message content */}
                        <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                          {msg.text.split('\n').map((line, i) => (
                            <p key={i} className={line === '' ? 'h-2' : ''}>
                              {line.split(/(\*[^*]+\*)/g).map((chunk, j) => {
                                if (chunk.startsWith('*') && chunk.endsWith('*')) {
                                  return (
                                    <strong key={j} className="font-bold text-amber-200">
                                      {chunk.slice(1, -1)}
                                    </strong>
                                  );
                                }
                                return chunk;
                              })}
                            </p>
                          ))}
                        </div>

                        {/* Bot Detected Services & Pricing metadata badges */}
                        {isBot && (msg.detectedServices?.length || msg.estimatedTotalKz) ? (
                          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
                            {msg.detectedServices && msg.detectedServices.length > 0 && (
                              <div className="flex items-center gap-1 text-[10px] bg-slate-900/80 px-2 py-0.5 rounded-md text-slate-300">
                                <Tag className="w-3 h-3 text-[#C5A869]" />
                                <span>{msg.detectedServices.join(', ')}</span>
                              </div>
                            )}
                            {msg.estimatedTotalKz && msg.estimatedTotalKz > 0 ? (
                              <div className="flex items-center gap-1 text-[10px] bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-md text-emerald-300 font-mono font-bold">
                                <span>Total Est.: {msg.estimatedTotalKz.toLocaleString()} Kz</span>
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {/* Timestamp & double checkmark */}
                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                          <span>{msg.time}</span>
                          {!isBot && <span className="text-[#53BDEB] font-bold">✓✓</span>}
                        </div>
                      </div>

                      {/* Quick reply suggestion buttons from bot */}
                      {isBot && msg.suggestedQuickReplies && msg.suggestedQuickReplies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                          {msg.suggestedQuickReplies.map((reply, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleSendMessage(reply)}
                              disabled={isLoading}
                              className="px-2.5 py-1 rounded-full bg-[#182229] hover:bg-[#2A3942] border border-[#00A884]/40 text-[11px] text-[#25D366] hover:text-white transition-all cursor-pointer shadow-sm"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Loading state indicator */}
                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-[#202C33] rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/50 shadow-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-bounce"></span>
                      <span
                        className="w-2 h-2 rounded-full bg-[#25D366] animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-[#25D366] animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></span>
                      <span className="text-xs text-slate-300 ml-2">UBOTE está a escrever...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#202C33] border-t border-black/30">
                {/* Mobile presets pill carousel */}
                <div className="flex md:hidden gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {presetQueries.slice(0, 3).map((query, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSendMessage(query)}
                      disabled={isLoading}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-300 hover:text-white"
                    >
                      {query}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escreva uma mensagem como se fosse um cliente (ex: preço, localização)..."
                    className="flex-1 bg-[#2A3942] text-slate-100 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-[#00A884] focus:outline-none"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-[#00A884] hover:bg-[#02906f] disabled:opacity-40 disabled:hover:bg-[#00A884] text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
                    aria-label="Enviar mensagem"
                  >
                    <Send className="w-4 h-4 fill-white" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full API & Webhook Documentation */}
        {activeTab === 'api-docs' && (
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-[#0B1118]">
            {/* Header intro */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A869]">
                <Terminal className="w-3.5 h-3.5" />
                <span>Integração WhatsApp Business Cloud & Gateway REST</span>
              </div>
              <h4 className="font-luxury text-2xl font-bold text-white">
                Como Conectar o WhatsApp da UBOTE (+244 922 141 665)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Esta aplicação possui uma API robusta alimentada pelo modelo{' '}
                <strong className="text-white">Gemini 3.8 Flash</strong> da Google no backend,
                configurada com todo o preçário em Kwanzas da UBOTE, morada no Prédio JPimenta e regras do Cartão Fidelidade.
              </p>
            </div>

            {/* Architecture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#111A26] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    1. Meta WhatsApp Cloud API (Oficial)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Webhook Ativo
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conecte diretamente no portal <em>Meta for Developers</em> na configuração de Webhooks do número comercial da UBOTE.
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-500">Callback URL: </span>
                    <span className="text-[#C5A869]">/api/whatsapp/webhook</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Verify Token: </span>
                    <span className="text-emerald-400">UBOTE_WHATSAPP_SECURE_TOKEN_2026</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111A26] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-headline text-sm font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A869]"></span>
                    2. REST API para Chatbots & Gateways
                  </span>
                  <span className="text-[10px] font-mono text-[#C5A869] bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    JSON Response
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compatível com <strong>Evolution API, Z-API, Baileys, Chatwoot, Make, n8n</strong> ou qualquer script que receba mensagens do WhatsApp em Angola.
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-500">Endpoint: </span>
                    <span className="text-[#C5A869]">POST /api/whatsapp/respond</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Formato: </span>
                    <span className="text-emerald-400">JSON com *negritos* de WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Snippets with Copy button */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="font-headline text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#C5A869]" />
                  Exemplo de Chamada cURL
                </h5>
                <button
                  onClick={() => copyToClipboard(curlExample, 'curl')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {copiedCode === 'curl' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar cURL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-black/70 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                {curlExample}
              </pre>

              <div className="flex items-center justify-between pt-2">
                <h5 className="font-headline text-sm font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#C5A869]" />
                  Integração Node.js / Baileys / Evolution API
                </h5>
                <button
                  onClick={() => copyToClipboard(nodeExample, 'node')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {copiedCode === 'node' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Código</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-black/70 border border-slate-800 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
                {nodeExample}
              </pre>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-[#0F1C28] border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 className="font-headline text-sm font-bold text-white">
                  Quer falar diretamente com a receção humana da UBOTE?
                </h5>
                <p className="text-xs text-slate-300">
                  O contacto oficial é <strong className="text-emerald-400 font-mono">{UBOTE_CONTACT.phone}</strong> na Rua Moisés Cardoso Nº 10, Prédio JPimenta.
                </p>
              </div>
              <button
                onClick={() => handleOpenDirectWhatsApp()}
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#25D366]/20 cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Abrir WhatsApp Luanda</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
