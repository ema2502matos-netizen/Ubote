export interface ServiceItem {
  id: string;
  name: string;
  category: 'faciais' | 'laser' | 'cera' | 'massagens' | 'unhas' | 'corporativo';
  price: number; // in Kwanzas
  formattedPrice: string;
  duration?: string;
  description: string;
  gender?: 'unisex' | 'feminino' | 'masculino';
  isHighlight?: boolean;
  benefits?: string[];
  image?: string;
}

export const UBOTE_IMAGES = {
  hero: '/src/assets/images/hero_natural_spa_1794220604964.jpg',
  clinic: '/src/assets/images/clinic_real_treatment_1794220605769.jpg',
  bath: '/src/assets/images/spa_bath_natural_1794220606819.jpg',
  lounge: '/src/assets/images/executive_natural_luanda_1794220605779.jpg',
};

export interface CorporatePlan {
  id: string;
  title: string;
  target: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface Metric {
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  quote: string;
  treatment: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  sector: string;
  type: string;
}

export const UBOTE_SERVICES: ServiceItem[] = [
  // Cuidados Faciais
  {
    id: 'facial-profunda',
    name: 'Limpeza Facial Profunda',
    category: 'faciais',
    price: 30000,
    formattedPrice: '30.000 Kz',
    duration: '75 min',
    description: 'Higienização, esfoliação e extração de impurezas criteriosa, concluídas com hidratação. Indicada para renovar a textura e a luminosidade da pele.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Extração segura de impurezas', 'Renovação da luminosidade', 'Conforto cutâneo imediato']
  },
  {
    id: 'facial-parcial',
    name: 'Limpeza Parcial com Hidratação',
    category: 'faciais',
    price: 17000,
    formattedPrice: '17.000 Kz',
    duration: '45 min',
    description: 'Versão resumida, adequada à manutenção entre protocolos completos: remove as impurezas superficiais e restabelece o conforto cutâneo.',
    gender: 'unisex',
    benefits: ['Manutenção preventiva', 'Hidratação rápida', 'Ideal para pausas executivas']
  },
  {
    id: 'acne-avulso',
    name: 'Tratamento para Acne (1 Sessão)',
    category: 'faciais',
    price: 20000,
    formattedPrice: '20.000 Kz',
    duration: '60 min',
    description: 'Sessão orientada ao controlo da oleosidade e à redução das lesões inflamatórias com tecnologia antisséptica.',
    gender: 'unisex',
    benefits: ['Regulação sebácea', 'Ação anti-inflamatória', 'Acalma a vermelhidão']
  },
  {
    id: 'acne-pacote',
    name: 'Tratamento para Acne (Pacote 5 Sessões)',
    category: 'faciais',
    price: 90000,
    formattedPrice: '90.000 Kz',
    duration: '5 sessões',
    description: 'O tratamento da acne exige continuidade. O pacote de 5 sessões representa uma poupança de 10.000 Kz face a cinco sessões avulsas.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Poupança de 10.000 Kz', 'Acompanhamento progressivo', 'Resultados consistentes e duradouros']
  },

  // Depilação a Laser - Feminino
  {
    id: 'laser-fem-axilas',
    name: 'Laser Axilas',
    category: 'laser',
    price: 15000,
    formattedPrice: '15.000 Kz',
    duration: '20 min',
    description: 'Tecnologia laser de redução progressiva e duradoura sobre o folículo piloso com refrigeração cutânea.',
    gender: 'feminino',
    benefits: ['Menor irritação que lâmina/cera', 'Redução do folículo', 'Pele lisa duradoura']
  },
  {
    id: 'laser-fem-virilha-completa',
    name: 'Laser Virilha Completa',
    category: 'laser',
    price: 25000,
    formattedPrice: '25.000 Kz',
    duration: '35 min',
    description: 'Remoção com protocolo de alta precisão e máximo conforto térmico.',
    gender: 'feminino',
    isHighlight: true,
    benefits: ['Conforto e higiene', 'Precisão cirúrgica', 'Sem pelos encravados']
  },
  {
    id: 'laser-fem-meia-virilha',
    name: 'Laser Meia Virilha',
    category: 'laser',
    price: 15000,
    formattedPrice: '15.000 Kz',
    duration: '25 min',
    description: 'Delimitação suave da linha anatómica com disparo seguro.',
    gender: 'feminino',
    benefits: ['Rápido e discreto', 'Ideal para manutenção periódica']
  },
  {
    id: 'laser-fem-perna-inteira',
    name: 'Laser Perna Inteira',
    category: 'laser',
    price: 30000,
    formattedPrice: '30.000 Kz',
    duration: '50 min',
    description: 'Cobertura completa de ambas as pernas com tecnologia de pulso rápido.',
    gender: 'feminino',
    isHighlight: true,
    benefits: ['Eliminação de pelos encravados', 'Textura aveludada', 'Resultados graduais de excelência']
  },
  {
    id: 'laser-fem-meia-perna',
    name: 'Laser Meia Perna',
    category: 'laser',
    price: 15000,
    formattedPrice: '15.000 Kz',
    duration: '30 min',
    description: 'Tratamento focado na região inferior das pernas.',
    gender: 'feminino',
    benefits: ['Sessão prática', 'Máxima eficácia']
  },
  {
    id: 'laser-fem-braco-completo',
    name: 'Laser Braço Completo',
    category: 'laser',
    price: 20000,
    formattedPrice: '20.000 Kz',
    duration: '30 min',
    description: 'Aplicação contínua em toda a extensão dos braços.',
    gender: 'feminino'
  },
  {
    id: 'laser-fem-mamilos',
    name: 'Laser Mamilos',
    category: 'laser',
    price: 8000,
    formattedPrice: '8.000 Kz',
    duration: '15 min',
    description: 'Tratamento pontual em zona de menor extensão com ponteira de precisão.',
    gender: 'feminino'
  },
  {
    id: 'laser-fem-queixo',
    name: 'Laser Queixo (Simples)',
    category: 'laser',
    price: 10000,
    formattedPrice: '10.000 Kz',
    duration: '15 min',
    description: 'Controlo seguro e estético de pelos hormonais faciais.',
    gender: 'feminino'
  },

  // Depilação a Laser - Masculino
  {
    id: 'laser-masc-axilas',
    name: 'Laser Axilas Masculino',
    category: 'laser',
    price: 20000,
    formattedPrice: '20.000 Kz',
    duration: '20 min',
    description: 'Higiene e conforto térmico para o dia a dia e prática desportiva.',
    gender: 'masculino'
  },
  {
    id: 'laser-masc-barba',
    name: 'Laser Barba Completa / Contorno',
    category: 'laser',
    price: 18000,
    formattedPrice: '18.000 Kz',
    duration: '25 min',
    description: 'Alinhamento definitivo ou redução de foliculite e irritação causada por lâminas convencionais.',
    gender: 'masculino',
    isHighlight: true,
    benefits: ['Fim da foliculite diária', 'Desenho definido e polido', 'Aparência corporativa impecável']
  },
  {
    id: 'laser-masc-peito',
    name: 'Laser Peito Masculino',
    category: 'laser',
    price: 40000,
    formattedPrice: '40.000 Kz',
    duration: '45 min',
    description: 'Aplicação homogénea no tórax com densidade ajustada à espessura do pelo masculino.',
    gender: 'masculino'
  },
  {
    id: 'laser-masc-costas',
    name: 'Laser Costas Masculino',
    category: 'laser',
    price: 20000,
    formattedPrice: '20.000 Kz',
    duration: '35 min',
    description: 'Redução duradoura do volume piloso dorsal com total conforto.',
    gender: 'masculino',
    isHighlight: true
  },
  {
    id: 'laser-masc-perna-inteira',
    name: 'Laser Perna Inteira Masculino',
    category: 'laser',
    price: 40000,
    formattedPrice: '40.000 Kz',
    duration: '60 min',
    description: 'Tratamento integral para desportistas e executivos.',
    gender: 'masculino'
  },

  // Depilação com Cera
  {
    id: 'cera-fem-virilha-completa',
    name: 'Cera Virilha Completa',
    category: 'cera',
    price: 18000,
    formattedPrice: '18.000 Kz',
    duration: '30 min',
    description: 'Remoção do pelo pela raiz com cera de alta elasticidade e temperatura controlada.',
    gender: 'feminino',
    benefits: ['Resultado imediato', 'Pele lisa por semanas', 'Higiene rigorosa']
  },
  {
    id: 'cera-fem-perna-inteira',
    name: 'Cera Perna Inteira',
    category: 'cera',
    price: 25000,
    formattedPrice: '25.000 Kz',
    duration: '40 min',
    description: 'Executada com técnica e higiene rigorosas para acabamento aveludado.',
    gender: 'feminino'
  },
  {
    id: 'cera-fem-sobrancelha-hena',
    name: 'Sobrancelha com Hena',
    category: 'cera',
    price: 8000,
    formattedPrice: '8.000 Kz',
    duration: '30 min',
    description: 'Coloração natural e design geométrico que define e preenche o desenho da sobrancelha.',
    gender: 'feminino',
    isHighlight: true
  },
  {
    id: 'cera-masc-peito',
    name: 'Cera Peito Masculino',
    category: 'cera',
    price: 30000,
    formattedPrice: '30.000 Kz',
    duration: '35 min',
    description: 'Extração eficaz do folículo pela raiz para textura limpa imediata.',
    gender: 'masculino'
  },
  {
    id: 'cera-masc-costas',
    name: 'Cera Costas Masculino',
    category: 'cera',
    price: 15000,
    formattedPrice: '15.000 Kz',
    duration: '30 min',
    description: 'Remoção integral rápida com loção calmante pós-depilação.',
    gender: 'masculino'
  },

  // Massagens e Banhos Terapêuticos
  {
    id: 'massagem-oleos',
    name: 'Massagem Relaxante com Óleos',
    category: 'massagens',
    price: 30000,
    formattedPrice: '30.000 Kz',
    duration: '60 min',
    description: 'Manobras suaves e contínuas, com óleos selecionados de botânica nobre, que reduzem a tensão muscular e promovem bem-estar.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Alívio do stress corporativo', 'Circulação sanguínea equilibrada', 'Sono reparador']
  },
  {
    id: 'massagem-pedras',
    name: 'Relaxante com Pedras Quentes',
    category: 'massagens',
    price: 45000,
    formattedPrice: '45.000 Kz',
    duration: '75 min',
    description: 'O calor das pedras vulcânicas auxilia o relaxamento profundo da musculatura e potencia a serenidade mental.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Termoterapia profunda', 'Descompressão espinhal', 'Relaxamento duradouro']
  },
  {
    id: 'sauna-massagem',
    name: 'Sauna + Massagem Integrada',
    category: 'massagens',
    price: 50000,
    formattedPrice: '50.000 Kz',
    duration: '90 min',
    description: 'O calor da sauna prepara e desintoxica o corpo para a massagem, ampliando a sensação de descontração total.',
    gender: 'unisex',
    benefits: ['Desintoxicação corporal', 'Vasodilatação benéfica', 'Renovação integral de energia']
  },
  {
    id: 'esfoliacao-massagem',
    name: 'Esfoliação + Massagem',
    category: 'massagens',
    price: 50000,
    formattedPrice: '50.000 Kz',
    duration: '80 min',
    description: 'Remoção de células mortas com sais minerais, seguida de massagem: pele mais macia, uniforme e luminosa.',
    gender: 'unisex',
    benefits: ['Uniformidade cutânea', 'Toque sedoso', 'Revitalização física']
  },
  {
    id: 'banho-farao',
    name: 'Banho Terapêutico Faraó',
    category: 'massagens',
    price: 70000,
    formattedPrice: '70.000 Kz',
    duration: '90 min',
    description: 'Ritual de banho terapêutico concebido para promover o relaxamento profundo, revitalização da energia e o bem-estar da pele em ambiente reservado.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Ritual de prestígio imperial', 'Imersão em ervas e óleos aromáticos', 'Privacidade absoluta']
  },
  {
    id: 'banho-cleopatra',
    name: 'Banho Terapêutico Cleópatra',
    category: 'massagens',
    price: 70000,
    formattedPrice: '70.000 Kz',
    duration: '90 min',
    description: 'Ritual de banho terapêutico de carácter requintado, enriquecido com ativos nutritivos orientado para o conforto sublime e a extrema suavidade da pele.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Máxima nutrição dérmica', 'Pele de veludo', 'Experiência sensorial e luxo']
  },
  {
    id: 'massagens-localizadas',
    name: 'Massagem Localizada (Costas / Cabeça / Pernas)',
    category: 'massagens',
    price: 15000,
    formattedPrice: '10.000 – 15.000 Kz',
    duration: '15 min',
    description: 'Sessão focada de 15 minutos desenhada para desatar nós de tensão postural para quem tem agenda executiva intensa.',
    gender: 'unisex',
    benefits: ['Intervenção rápida e pontual', 'Alívio imediato no pescoço/lombar']
  },

  // Mãos e Pés
  {
    id: 'manicure-normal',
    name: 'Manicure Normal',
    category: 'unhas',
    price: 7000,
    formattedPrice: '7.000 Kz',
    duration: '35 min',
    description: 'Cuidado completo das unhas e cutículas com esterilização cirúrgica e acabamento limpo.',
    gender: 'unisex'
  },
  {
    id: 'manicure-parafina',
    name: 'Manicure com Parafina',
    category: 'unhas',
    price: 10000,
    formattedPrice: '10.000 Kz',
    duration: '50 min',
    description: 'A parafina proporciona hidratação intensiva e suavidade profunda às mãos expostas ao ar condicionado e trabalho de escritório.',
    gender: 'unisex',
    isHighlight: true,
    benefits: ['Hidratação térmica profunda', 'Combate o ressecamento', 'Textura macia']
  },
  {
    id: 'pedicure-parafina',
    name: 'Pedicure com Parafina',
    category: 'unhas',
    price: 15000,
    formattedPrice: '15.000 Kz',
    duration: '60 min',
    description: 'Hidratação intensiva e suavização da pele dos pés, prevenindo calosidades e aspereza.',
    gender: 'unisex',
    isHighlight: true
  },
  {
    id: 'unhas-gel',
    name: 'Aplicação de Unhas de Gel',
    category: 'unhas',
    price: 12000,
    formattedPrice: '12.000 Kz',
    duration: '90 min',
    description: 'Alongamento ou reforço com gel, leve e de aspeto natural de alta resistência.',
    gender: 'feminino'
  },
  {
    id: 'unhas-porcelana',
    name: 'Aplicação de Unhas de Porcelana',
    category: 'unhas',
    price: 18000,
    formattedPrice: '18.000 Kz',
    duration: '100 min',
    description: 'Acabamento resistente e refinado, de grande durabilidade e brilho sofisticado.',
    gender: 'feminino'
  }
];

export const CORPORATE_PROGRAMS: CorporatePlan[] = [
  {
    id: 'b2b-executive',
    title: 'Executive Recharge & Presence',
    target: 'C-Level, Diretores e Quadros Superiores',
    description: 'Protocolo de alta performance focado em descompressão muscular do stress corporativo e manutenção da imagem institucional.',
    features: [
      'Massagem de Pedras Quentes ou Relaxante com Óleos (60-75 min)',
      'Protocolo de Revitalização Facial pós-voos ou semanas de reuniões',
      'Agendamento prioritário e sala executiva privativa',
      'Atendimento confidencial e concierge de bem-estar'
    ],
    recommendedFor: 'Bancos, Petrolíferas, Sociedades de Advogados e Consultorias'
  },
  {
    id: 'b2b-corporate-vouchers',
    title: 'Convénio Corporativo B2B & Vouchers',
    target: 'Empresas com mais de 15 colaboradores em Luanda',
    description: 'Benefício estruturado de saúde e bem-estar para equipas corporativas, dedutível e com faturamento centralizado.',
    features: [
      'Tabela de preços com condições corporativas especiais (15% a 25% de benefício)',
      'Vouchers digitais nominais para bonificação e campanhas internas',
      'Relatório de usufruto mensal com faturação unificada',
      'Palestras de ergonomia e cuidados de pele no escritório parceiro'
    ],
    recommendedFor: 'Recursos Humanos, Planos de Saúde Corporativos e Gestão de Talento'
  },
  {
    id: 'b2b-events',
    title: 'VIP Corporate Wellness Day',
    target: 'Eventos institucionais e retiros de liderança',
    description: 'Imersão no espaço UBOTE para delegações executivas, embaixadas ou celebrações de metas alcançadas.',
    features: [
      'Exclusividade de alas do Spa e Sauna por períodos reservados',
      'Catering de boas-vindas com chás nobres e infusões calmantes',
      'Circuito integrado de massagens, banhos terapêuticos e cuidados faciais',
      'Kit presente de cuidados dermatológicos UBOTE'
    ],
    recommendedFor: 'Conselhos de Administração, Delegações Internacionais e Fecho de Ano'
  }
];

export const CORPORATE_METRICS: Metric[] = [
  {
    value: '18.500+',
    numericTarget: 18500,
    suffix: '+',
    label: 'Atendimentos de Excelência',
    subtext: 'Clientes atendidos com rigor técnico e protocolos estritos em Luanda'
  },
  {
    value: '99.2%',
    numericTarget: 99.2,
    suffix: '%',
    label: 'Índice de Retenção e Satisfação',
    subtext: 'Avaliação auditada de satisfação dos nossos clientes executivos'
  },
  {
    value: '42+',
    numericTarget: 42,
    suffix: '+',
    label: 'Convénios & Parceiros B2B',
    subtext: 'Empresas de referência em Angola integradas no ecossistema UBOTE'
  },
  {
    value: '100%',
    numericTarget: 100,
    suffix: '%',
    label: 'Higiene & Rigor Certificado',
    subtext: 'Autoclave de grau hospitalar e profissionais graduados'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dra. Teresa de Carvalho',
    role: 'Diretora de Recursos Humanos & Pessoas',
    company: 'Setor Bancário & Financeiro · Luanda',
    avatarText: 'TC',
    quote: 'Implementámos os vouchers UBOTE como parte do nosso programa de bem-estar executivo. O feedback dos nossos diretores e gestores foi excecional: o ambiente é de extrema serenidade, a higiene é impecável e o rigor no atendimento reflete o padrão que exigimos nas nossas relações institucionais.',
    treatment: 'Convénio Corporativo B2B & Massagem com Pedras Quentes',
    rating: 5
  },
  {
    id: '2',
    name: 'Eng. Manuel Kiala',
    role: 'Diretor de Operações de Energia',
    company: 'Setor de Petróleo e Gás · Talatona',
    avatarText: 'MK',
    quote: 'A depilação a laser e o alinhamento da barba resolveram em definitivo as inflamações constantes da pele com a lâmina. O atendimento masculino é discreto, profissional e pontual, o que para a minha rotina em Luanda é inestimável.',
    treatment: 'Laser Barba e Protocolo Anti-foliculite Masculino',
    rating: 5
  },
  {
    id: '3',
    name: 'Paula Van-Dúnem',
    role: 'Managing Partner',
    company: 'Consultoria Estratégica Internacional · Luanda',
    avatarText: 'PV',
    quote: 'O Banho Cleópatra e a Limpeza Facial Profunda tornaram-se o meu ritual obrigatório antes de cimeiras e conferências de liderança. O cuidado ao detalhe e a transparência nos preços transmitem a seriedade que faltava no mercado nacional de spa.',
    treatment: 'Ritual Banho Cleópatra & Limpeza Facial Profunda',
    rating: 5
  },
  {
    id: '4',
    name: 'Carlos Morais',
    role: 'Empreendedor & Membro da Direção',
    company: 'Associação Empresarial de Angola',
    avatarText: 'CM',
    quote: 'A UBOTE consegue conjugar a hospitalidade calorosa do nosso país com a sofisticação e precisão técnica internacional. O tratamento da acne e as massagens relaxantes garantem um alívio real da pressão dos negócios.',
    treatment: 'Pacote 5 Sessões Acne & Sauna Integrada',
    rating: 5
  }
];

export const CORPORATE_PARTNERS: Partner[] = [
  { id: '1', name: 'BAI - Banco Angolano de Investimentos', sector: 'Banca & Finanças', type: 'Convénio Corporativo' },
  { id: '2', name: 'Sonangol E.P.', sector: 'Energia & Petróleo', type: 'Vouchers Executivos' },
  { id: '3', name: 'BFA - Banco de Fomento Angola', sector: 'Banca Corporativa', type: 'Convénio Executivo' },
  { id: '4', name: 'Unitel Angola', sector: 'Telecomunicações', type: 'Programa de Saúde & Bem-estar' },
  { id: '5', name: 'ENSA Seguros', sector: 'Seguros & Benefícios', type: 'Rede Credenciada de Saúde' },
  { id: '6', name: 'Standard Bank Angola', sector: 'Banca de Investimento', type: 'Parceria de Liderança' },
  { id: '7', name: 'Chevron / CABGOC Luanda', sector: 'Oil & Gas', type: 'Convénio Expat & C-Level' },
  { id: '8', name: 'PwC Angola', sector: 'Auditoria & Consultoria', type: 'Bem-estar Corporativo' }
];

export const UBOTE_CONTACT = {
  address: 'Rua Moisés Cardoso Nº 10, Prédio JPimenta, Luanda, Angola',
  phone: '+244 922 141 665',
  whatsappNumber: '244922141665',
  instagram: '@UBOTESPA',
  instagramUrl: 'https://instagram.com/ubotespa',
  email: 'ubotespa@gmail.com',
  corporateEmail: 'ubotespa@gmail.com',
  slogan: 'Beleza com Raízes',
  tagline: 'O seu momento. A sua beleza.',
  subTagline: 'Permita-se relaxar, renovar a sua energia e cuidar de si.',
  hours: 'Segunda a Sábado: 08h00 às 20h00 · Domingo: Por marcação executiva',
  pdfCatalogPath: '/assets/aistudio/UBOTE_Guia_Tratamentos_e_Precos_2026_Revista_Grafica_CMYK_2c86393e.pdf',
  businessCardPath: '/assets/aistudio/Ubote_Cartao_de_Visita_fdf0a2dd.png',
  loyaltyCardPath: '/assets/aistudio/Ubote_Cartao_Fidelidade_dd04c412.png',
};

export const LOYALTY_PROGRAM = {
  title: 'Cartão Fidelidade · Beleza com Raízes',
  rule: 'Complete os 9 carimbos e receba 1 procedimento grátis.',
  totalStamps: 9,
  reward: '1 Procedimento Grátis à sua escolha',
  instruction: 'Apresente o seu cartão digital ou físico a cada sessão para carimbar o seu progresso.'
};
