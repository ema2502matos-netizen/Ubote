import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server-side initialization of Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Authentic UBOTE Angola System Knowledge Base for WhatsApp Customer Responses
const UBOTE_WHATSAPP_SYSTEM_PROMPT = `
Você é a Assistente Virtual Oficial e Concierge da UBOTE (Laser • Spa • Estética) em Luanda, Angola, responsável por responder os clientes diretamente pelo WhatsApp (+244 922 141 665).

INFORMAÇÕES INSTITUCIONAIS DA EMPRESA:
• Nome da Marca: UBOTE (Laser • Spa • Estética)
• Slogan: "Beleza com Raízes"
• Assinatura: "O seu momento. A sua beleza. Permita-se relaxar, renovar a sua energia e cuidar de si."
• Morada Oficial em Luanda: Rua Moisés Cardoso Nº 10, Prédio JPimenta, Luanda, Angola.
• Telefone / WhatsApp Oficial: +244 922 141 665 (ou 244 922 141 665)
• Email Oficial: ubotespa@gmail.com
• Instagram Oficial: @UBOTESPA (https://instagram.com/ubotespa)
• Horário de Atendimento: Segunda a Sábado das 08h00 às 20h00. Domingo por marcação executiva especial.
• Facilidades: Ambiente privativo de luxo, esterilização em autoclave de grau hospitalar, estacionamento com segurança.

PROGRAMA DE FIDELIDADE (CARTÃO FIDELIDADE):
• Regra: "Complete os 9 carimbos e receba 1 procedimento grátis."
• Cada sessão realizada confere 1 carimbo no cartão do cliente. Ao completar 9 carimbos, o 10º procedimento é 100% gratuito à escolha do cliente.

PREÇÁRIO OFICIAL COMPLETO (Edição 2026 - Valores exatos em Kwanzas - Kz):
1. Cuidados Faciais:
   - Limpeza Facial Profunda (Higienização, esfoliação, extração e hidratação): 30.000 Kz (75 min)
   - Limpeza Parcial com Hidratação (Manutenção preventiva): 17.000 Kz (45 min)
   - Tratamento para Acne - 1 Sessão avulsa: 20.000 Kz (60 min)
   - Tratamento para Acne - Pacote de 5 Sessões: 90.000 Kz (Poupança de 10.000 Kz face a 5 avulsas)

2. Banhos Terapêuticos e Massagens:
   - Banho Terapêutico Faraó (Imersão de relaxamento e revitalização em pedra natural): 70.000 Kz (90 min)
   - Banho Terapêutico Cleópatra (Ritual de requinte com leite nutritivo e pétalas): 70.000 Kz (90 min)
   - Massagem Relaxante com Óleos Nobres: 30.000 Kz (60 min)
   - Massagem Relaxante com Pedras Quentes: 45.000 Kz (75 min)
   - Sauna + Massagem Integrada: 50.000 Kz (90 min)
   - Esfoliação Corporal + Massagem: 50.000 Kz (80 min)
   - Massagens Localizadas (Costas, Cabeça, Pernas ou Braços): 10.000 Kz a 15.000 Kz (15 min cada)

3. Depilação a Laser (Feminino & Masculino):
   - Axilas: Feminino 15.000 Kz | Masculino 20.000 Kz
   - Virilha Completa: 25.000 Kz (Feminino ou Masculino)
   - Meia Virilha: 15.000 Kz
   - Perna Inteira: Feminino 30.000 Kz | Masculino 40.000 Kz
   - Meia Perna: Feminino 15.000 Kz | Masculino 20.000 Kz
   - Braço Completo: Feminino 20.000 Kz | Masculino 23.000 Kz
   - Meio Braço: Feminino 10.000 Kz | Masculino 15.000 Kz
   - Barba Completa / Alinhamento Masculino: 18.000 Kz (Resolve foliculite em definitivo)
   - Peito: Feminino 15.000 Kz | Masculino 40.000 Kz
   - Costas Masculino: 20.000 Kz
   - Mamilos: Feminino 8.000 Kz | Masculino 10.000 Kz
   - Queixo Simples: 10.000 Kz | Queixo Alongado: 15.000 Kz

4. Depilação com Cera:
   - Axilas: 15.000 Kz (Fem) | 18.000 Kz (Masc)
   - Virilha Completa: 18.000 Kz (Fem) | 23.000 Kz (Masc)
   - Perna Inteira: 25.000 Kz (Fem) | 30.000 Kz (Masc)
   - Sobrancelha: 5.000 Kz | Sobrancelha com Hena: 8.000 Kz

5. Mãos e Pés:
   - Manicure Normal: 7.000 Kz
   - Manicure com Parafina: 10.000 Kz
   - Manicure com Gelinho: 10.000 Kz
   - Pedicure Normal: 10.000 Kz
   - Pedicure com Parafina: 15.000 Kz
   - Unhas de Gel: 12.000 Kz
   - Unhas de Porcelana: 18.000 Kz
   - Manutenção de Unhas: 10.000 Kz

6. Programas Corporativos B2B para Empresas:
   - Convénios com descontos corporativos de 15% a 25% para empresas em Luanda (BAI, Sonangol, BFA, Unitel, etc.)
   - Vouchers de Bonificação e Dias de Bem-Estar Executivo. Faturamento mensal centralizado com dedução fiscal.

DIRETRIZES DE RESPOSTA NO WHATSAPP:
• Tom: Cordial, atencioso, requintado, com a tradicional hospitalidade de Angola ("Com certeza", "Será um enorme prazer recebê-la(o)", "Ficamos no Prédio JPimenta").
• Formato WhatsApp: Use *negrito* para nomes de serviços e valores, quebras de linha agradáveis e emojis elegantes (✨, 🌿, 💆, 📍, 🗓️, 📞).
• Se o cliente pedir preço, forneça o valor em Kwanzas com clareza.
• Se o cliente desejar marcar, peça o melhor dia e período (manhã ou tarde) e confirme o nome para a receção agendar.
• Se o cliente perguntar sobre localização, informe: Rua Moisés Cardoso Nº 10, Prédio JPimenta, Luanda.
• Nunca invente serviços inexistentes fora do catálogo UBOTE.
`;

// Intelligent local catalog matcher used as fallback or when GEMINI_API_KEY is not provided
function generateFallbackWhatsAppReply(message: string, customerName?: string) {
  const lower = message.toLowerCase();
  const nameGreeting = customerName ? `Olá *${customerName}*!` : 'Olá!';

  // Cleopatra bath
  if (lower.includes('cleopatra') || lower.includes('cleópatra')) {
    return {
      reply: `${nameGreeting} ✨ O nosso consagrado *Banho Terapêutico Cleópatra* custa *70.000 Kz* (duração de 90 min).\n\nÉ um ritual exclusivo de requinte com banho de leite nutritivo, óleos aromáticos e pétalas, proporcionando hidratação profunda e renovação celular num ambiente privativo.\n\nDeseja verificar a disponibilidade para esta semana no nosso espaço no *Prédio JPimenta*?`,
      intent: 'price_inquiry',
      suggestedQuickReplies: ['Quero agendar horário', 'Onde fica a clínica?', 'Ver outros banhos'],
      detectedServices: ['Banho Terapêutico Cleópatra'],
      estimatedTotalKz: 70000,
      callToAction: 'Confirmar data e período para agendamento presencial',
    };
  }

  // Faraó bath
  if (lower.includes('farao') || lower.includes('faraó')) {
    return {
      reply: `${nameGreeting} ✨ O nosso *Banho Terapêutico Faraó* custa *70.000 Kz* (90 min).\n\nUma imersão revigorante com pedras naturais e sais botânicos, ideal para alívio do stress muscular profundo e renovação de energias executivas.\n\nGostaria de reservar uma sessão?`,
      intent: 'price_inquiry',
      suggestedQuickReplies: ['Agendar Banho Faraó', 'Consultar horários', 'Ver localização'],
      detectedServices: ['Banho Terapêutico Faraó'],
      estimatedTotalKz: 70000,
      callToAction: 'Reservar ritual na receção',
    };
  }

  // Laser hair removal / Barba
  if (lower.includes('laser') || lower.includes('depilacao') || lower.includes('depilação') || lower.includes('barba')) {
    let price = 0;
    const services: string[] = [];
    if (lower.includes('barba')) {
      price += 18000;
      services.push('Laser Barba Completa');
    }
    if (lower.includes('axila')) {
      price += 15000;
      services.push('Laser Axilas');
    }
    if (price === 0) price = 15000;

    return {
      reply: `${nameGreeting} 🌿 A nossa *Depilação a Laser de Alta Precisão* possui tecnologia de triplo comprimento de onda, totalmente segura para todos os fotótipos de pele angolana.\n\nPrincipais valores por sessão:\n• *Barba Completa Masculina:* 18.000 Kz (elimina foliculite definitivamente)\n• *Axilas:* 15.000 Kz (Fem) | 20.000 Kz (Masc)\n• *Virilha Completa:* 25.000 Kz\n• *Perna Inteira:* 30.000 Kz (Fem) | 40.000 Kz (Masc)\n\nQual área gostaria de tratar?`,
      intent: 'price_inquiry',
      suggestedQuickReplies: ['Marcar Barba Laser', 'Marcar Axilas', 'Falar com especialista'],
      detectedServices: services.length > 0 ? services : ['Depilação a Laser'],
      estimatedTotalKz: price,
      callToAction: 'Agendar avaliação personalizada',
    };
  }

  // Facial / Limpeza facial
  if (lower.includes('facial') || lower.includes('limpeza') || lower.includes('acne') || lower.includes('pele')) {
    return {
      reply: `${nameGreeting} ✨ Os nossos cuidados faciais na UBOTE unem tecnologia dermatológica e bem-estar:\n\n• *Limpeza Facial Profunda (75 min):* 30.000 Kz\n• *Limpeza Parcial Preventiva (45 min):* 17.000 Kz\n• *Tratamento para Acne (1 Sessão):* 20.000 Kz\n• *Pacote Anti-Acne (5 Sessões):* 90.000 Kz (Poupança de 10.000 Kz)\n\nTodas as sessões incluem higienização, extração delicada e hidratação com ativos nobres.`,
      intent: 'price_inquiry',
      suggestedQuickReplies: ['Agendar Limpeza Profunda', 'Pacote Acne 5 Sessões', 'Localização'],
      detectedServices: ['Limpeza Facial Profunda'],
      estimatedTotalKz: 30000,
      callToAction: 'Agendar sessão facial',
    };
  }

  // Location / Address / Where is it
  if (lower.includes('onde') || lower.includes('fica') || lower.includes('morada') || lower.includes('endereco') || lower.includes('endereço') || lower.includes('localizacao') || lower.includes('localização') || lower.includes('pimenta')) {
    return {
      reply: `${nameGreeting} 📍 A UBOTE (Laser • Spa • Estética) está sediada no coração de Luanda:\n\n🏢 *Rua Moisés Cardoso Nº 10, Prédio JPimenta, Luanda, Angola.*\n\n⏰ *Horário de Funcionamento:*\nSegunda a Sábado: 08h00 às 20h00\nDomingo: Atendimento executivo sob marcação prévia\n\nDispomos de estacionamento seguro e total privacidade. Deseja que reservemos o seu horário?`,
      intent: 'location',
      suggestedQuickReplies: ['Como chegar (GPS)', 'Horários de hoje', 'Fazer agendamento'],
      detectedServices: [],
      estimatedTotalKz: 0,
      callToAction: 'Visitar clínica no Prédio JPimenta',
    };
  }

  // Loyalty Card / Fidelidade
  if (lower.includes('fidelidade') || lower.includes('cartao') || lower.includes('cartão') || lower.includes('carimbo') || lower.includes('gratis') || lower.includes('grátis')) {
    return {
      reply: `${nameGreeting} 👑 O nosso *Cartão Fidelidade · Beleza com Raízes* funciona de forma muito simples:\n\n🏷️ *Regra Oficial:* \"Complete os 9 carimbos e receba 1 procedimento 100% grátis.\"\n\nA cada sessão realizada na UBOTE, recebe 1 carimbo autenticado. Ao acumular 9 carimbos, o 10º serviço é por nossa conta!\n\nO cartão é entregue gratuitamente na sua primeira visita à clínica.`,
      intent: 'loyalty_program',
      suggestedQuickReplies: ['Marcar 1ª sessão', 'Ver preçário 2026', 'Falar na receção'],
      detectedServices: ['Cartão Fidelidade UBOTE'],
      estimatedTotalKz: 0,
      callToAction: 'Solicitar cartão fidelidade presencial',
    };
  }

  // Corporate B2B
  if (lower.includes('empresa') || lower.includes('corporativo') || lower.includes('convenio') || lower.includes('convénio') || lower.includes('parceria') || lower.includes('b2b') || lower.includes('voucher')) {
    return {
      reply: `${nameGreeting} 💼 O Programa *UBOTE Corporate & Network* oferece convénios exclusivos para empresas sediadas em Luanda:\n\n• Descontos corporativos de *15% a 25%* para colaboradores e quadros diretivos\n• Vouchers corporativos de bonificação e datas comemorativas\n• Faturamento mensal consolidado com dedução fiscal\n\nPodemos enviar a proposta institucional e agendar uma reunião com a nossa Direção?`,
      intent: 'corporate_b2b',
      suggestedQuickReplies: ['Solicitar Proposta B2B', 'Falar com Direção', 'Ver Serviços'],
      detectedServices: ['Convénio Corporativo B2B'],
      estimatedTotalKz: 0,
      callToAction: 'Enviar proposta comercial B2B',
    };
  }

  // Booking / Schedule
  if (lower.includes('agendar') || lower.includes('marcar') || lower.includes('reserva') || lower.includes('horario') || lower.includes('horário') || lower.includes('sabado') || lower.includes('sábado')) {
    return {
      reply: `${nameGreeting} 🗓️ Com certeza! Será um enorme prazer agendar o seu momento de cuidado na UBOTE.\n\nPara confirmarmos na nossa agenda central no *Prédio JPimenta*, por favor indique:\n1. O seu *Nome completo*\n2. O *Procedimento desejado*\n3. O *Dia e período de preferência* (manhã ou tarde)\n\nOu, se preferir, a nossa equipa pode confirmar de imediato pelo WhatsApp *+244 922 141 665*.`,
      intent: 'booking',
      suggestedQuickReplies: ['Confirmar para Sábado', 'Confirmar para esta semana', 'Ligar agora'],
      detectedServices: [],
      estimatedTotalKz: 0,
      callToAction: 'Confirmar dados de marcação',
    };
  }

  // General greeting / catch-all
  return {
    reply: `${nameGreeting} ✨ Bem-vindo(a) à *UBOTE (Laser • Spa • Estética)* em Luanda!\n\nEstamos na *Rua Moisés Cardoso Nº 10, Prédio JPimenta*. Dispomos de:\n• *Cuidados Faciais & Limpeza Profunda* (desde 17.000 Kz)\n• *Banhos Terapêuticos Faraó & Cleópatra* (70.000 Kz)\n• *Depilação a Laser e Cera* (desde 8.000 Kz)\n• *Massagens Relaxantes com Óleos Nobres* (30.000 Kz)\n• *Cartão Fidelidade:* 9 carimbos = 1 serviço grátis!\n\nEm que podemos servi-la(o) hoje?`,
    intent: 'general_question',
    suggestedQuickReplies: ['Ver Preçário em Kwanzas', 'Onde fica a clínica?', 'Cartão Fidelidade'],
    detectedServices: [],
    estimatedTotalKz: 0,
    callToAction: 'Apresentar catálogo de serviços',
  };
}

// 1. Core AI WhatsApp Auto-Response Endpoint
app.post('/api/whatsapp/respond', async (req: Request, res: Response) => {
  try {
    const { message, customerName, customerPhone, conversationHistory } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      res.status(400).json({ error: 'Parâmetro "message" é obrigatório.' });
      return;
    }

    // If GEMINI_API_KEY is available and valid, invoke Gemini 3.8 Flash
    const hasValidKey =
      Boolean(process.env.GEMINI_API_KEY) &&
      process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY' &&
      !process.env.GEMINI_API_KEY?.startsWith('MY_');

    if (hasValidKey) {
      try {
        const userPrompt = `
Mensagem recebida do cliente no WhatsApp:
"${message}"

${customerName ? `Nome do cliente: ${customerName}` : ''}
${customerPhone ? `Número WhatsApp: ${customerPhone}` : ''}
${conversationHistory ? `Histórico recente: ${JSON.stringify(conversationHistory)}` : ''}

Por favor, elabore a resposta oficial perfeita para ser enviada de volta ao cliente pelo WhatsApp da UBOTE Angola.`;

        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userPrompt,
          config: {
            systemInstruction: UBOTE_WHATSAPP_SYSTEM_PROMPT,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: {
                  type: Type.STRING,
                  description: 'Texto formatado pronto para envio no WhatsApp com negritos (*texto*) e emojis elegantes.',
                },
                intent: {
                  type: Type.STRING,
                  description: 'Intenção do cliente: booking, price_inquiry, location, loyalty_program, corporate_b2b, general_question, greeting.',
                },
                suggestedQuickReplies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2 a 3 botões curtos sugeridos para resposta rápida do cliente.',
                },
                detectedServices: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Nomes dos serviços da UBOTE identificados na mensagem.',
                },
                estimatedTotalKz: {
                  type: Type.NUMBER,
                  description: 'Valor total em Kwanzas estimado se o cliente mencionou serviços específicos, ou 0.',
                },
                callToAction: {
                  type: Type.STRING,
                  description: 'Próxima ação recomendada: confirmar agendamento, visitar prédio JPimenta, enviar voucher, etc.',
                },
              },
              required: ['reply', 'intent', 'suggestedQuickReplies'],
            },
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const parsedData = JSON.parse(response.text || '{}');

        res.json({
          success: true,
          data: parsedData,
          timestamp: new Date().toISOString(),
          agent: 'UBOTE AI Concierge 2026 (Gemini 3.8 Flash)',
        });
        return;
      } catch (geminiError) {
        console.warn('[Gemini API Warning] Falha na chamada da API, recorrendo ao motor local do catálogo:', geminiError);
        // Fall through to fallback catalog response
      }
    }

    // High fidelity catalog fallback response
    const fallbackData = generateFallbackWhatsAppReply(message, customerName);
    res.json({
      success: true,
      data: fallbackData,
      timestamp: new Date().toISOString(),
      agent: 'UBOTE AI Concierge 2026 (Knowledge Engine)',
    });
  } catch (error: any) {
    console.error('Erro na rota /api/whatsapp/respond:', error);
    res.status(500).json({
      success: false,
      error: 'Falha ao processar resposta via IA para o WhatsApp.',
      details: error.message || String(error),
    });
  }
});

// 2. Meta WhatsApp Business Cloud API Webhook Verification (GET)
// Meta sends a GET request with hub.mode, hub.verify_token and hub.challenge
app.get('/api/whatsapp/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'UBOTE_WHATSAPP_SECURE_TOKEN_2026';

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] Verificação da Meta bem-sucedida!');
    res.status(200).send(challenge);
  } else {
    res.status(403).json({ error: 'Token de verificação inválido.' });
  }
});

// 3. Meta WhatsApp Business Cloud API Incoming Message Handler (POST)
app.post('/api/whatsapp/webhook', async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Check if this is a WhatsApp status or message event
    if (body.object === 'whatsapp_business_account' || body.entry) {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0]?.value;
      const messageObj = changes?.messages?.[0];

      if (messageObj && messageObj.type === 'text') {
        const from = messageObj.from; // Customer phone number
        const textBody = messageObj.text.body;

        // Generate response using Gemini
        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Mensagem recebida do cliente ${from}: "${textBody}"`,
          config: {
            systemInstruction: UBOTE_WHATSAPP_SYSTEM_PROMPT,
          },
        });

        const replyText = aiResponse.text || 'Olá! Agradecemos o seu contacto na UBOTE. Em breve um de nossos consultores responderá.';

        console.log(`[WhatsApp Webhook] Mensagem de ${from}: "${textBody}" -> Resposta: "${replyText.slice(0, 60)}..."`);

        // If Meta Cloud API credentials are configured in environment, you can also dispatch via Graph API
        // For now, return payload with reply
        res.status(200).json({
          status: 'processed',
          recipient: from,
          incomingMessage: textBody,
          reply: replyText,
        });
        return;
      }
    }

    // Generic acknowledgment for webhooks
    res.status(200).json({ status: 'received' });
  } catch (error: any) {
    console.error('[WhatsApp Webhook Error]:', error);
    res.status(500).json({ error: 'Erro no processamento do webhook WhatsApp' });
  }
});

// 4. WhatsApp Configuration & Health Endpoint
app.get('/api/whatsapp/config', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    businessPhone: '+244 922 141 665',
    whatsappNumber: '244922141665',
    address: 'Rua Moisés Cardoso Nº 10, Prédio JPimenta, Luanda, Angola',
    email: 'ubotespa@gmail.com',
    model: 'gemini-3.8-flash',
    webhookEndpoint: '/api/whatsapp/webhook',
    respondEndpoint: '/api/whatsapp/respond',
    features: [
      'Respostas automáticas inteligentes 24/7 com IA',
      'Consulta de preçário oficial em Kwanzas (Kz)',
      'Aconselhamento sobre Cartão Fidelidade e carimbos',
      'Esclarecimento de morada no Prédio JPimenta',
      'Triagem de agendamento presencial e convénios B2B',
      'Compatível com Meta WhatsApp Cloud API e Webhooks'
    ]
  });
});

// Setup Vite middleware in Development or Serve Static in Production
async function setupServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[UBOTE Server] Servidor e API WhatsApp rodando na porta ${PORT}`);
  });
}

setupServer();
