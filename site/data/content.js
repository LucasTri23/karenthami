/*
  ============================================================
  CONTEÚDO PERSONALIZADO DO SITE
  ============================================================
  Edite os textos abaixo livremente — esse arquivo é só um
  objeto JavaScript com os textos que aparecem no site.
  Não precisa tocar em mais nenhum arquivo pra mudar o texto.

  Dicas:
  - Datas usam o formato "AAAA-MM-DD".
  - Pode adicionar quantos itens quiser em "milestones".
  - "icon" aceita qualquer emoji.
  ============================================================
*/

const CONTENT = {

  // Nomes usados no site
  names: {
    a: "Lucas",
    b: "Karen"
  },

  // Data/hora de início do contador do Hero
  startDate: "2024-04-07T00:00:00",

  // ----------------------------------------------------------
  // LINHA DO TEMPO — "Nossos marcos"
  // ----------------------------------------------------------
  milestones: [
    {
      date: "2024-04-07",
      icon: "💬",
      title: "A primeira mensagem",
      text: "01h31 da manhã. Uma conversa qualquer que virou a conversa mais longa da nossa vida. Dali pra frente, foram mais de 106 mil mensagens."
    },
    {
      date: "2024-05-18",
      icon: "🤍",
      title: "O primeiro \"te amo\"",
      text: "Lucas mandou primeiro, num sábado de manhã: \"te amo com a alma 🤍\". Karen respondeu na mesma hora. De lá pra cá, já são mais de 1.000 \"te amo\" trocados."
    },
    {
      date: "2024-12-23",
      icon: "⏸️",
      title: "Aquele \"restart\" de 6 meses",
      text: "Plot twist: a gente terminou. \"Mas continua sendo amigos\", né? Então claro que rolou receita de mousse de maracujá, resgate de número de tio perdido e até plano de viagem pro Chile \"só como amigos\". Demorou 6 meses pra alguém admitir que isso não tava colando — e voltamos pra valer em junho de 2025. Bem a tempo do nosso dia histórico aqui embaixo 👇"
    },
    {
      date: "2025-06-28",
      icon: "👀",
      title: "O dia histórico: 1.028 mensagens",
      text: "O nosso recorde absoluto de mensagens em um único dia. Quer saber o que rolou? Tem uma seção inteira contando essa história aqui embaixo."
    },
    {
      date: "",
      icon: "✏️",
      title: "Nosso primeiro encontro",
      text: "Espaço reservado pra vocês! Edite este card em data/content.js e contem como foi a primeira vez que se viram pessoalmente."
    },
    {
      date: "",
      icon: "💍",
      title: "Outro marco de vocês",
      text: "Aniversário de namoro, primeira viagem, pedido de namoro... adicione quantos marcos especiais quiser, é só copiar este bloco no array \"milestones\"."
    },
    {
      date: "today",
      icon: "♾️",
      title: "E a história continua...",
      text: "Esse contador aqui do site nunca para. A cada segundo, mais um pedacinho da nossa história é escrito — e ainda tem muita página em branco pra preencher juntos."
    }
  ],

  // ----------------------------------------------------------
  // DIA HISTÓRICO — 28/06/2025
  // ----------------------------------------------------------
  historicDay: {
    dateLabel: "28 de junho de 2025",
    messages: 1028,
    title: "O dia em que o WhatsApp quase travou",
    text: "Nesse sábado, Lucas estava em um compromisso o dia inteiro (e olha, até apareceu de terno!), bem longe da Karen. Resultado: o \"bom dia\" às 6h30 virou uma maratona de mensagens que só terminou perto da meia-noite, com um \"Te amo. Te amo.\" antes de dormir. No total, 1.028 mensagens em 24 horas — nosso recorde de todos os tempos. Ou seja: distância física é fácil quando a vontade de falar um com o outro é maior. 👀💌",
    photo: "2025-06-28-0050.jpg"
  },

  // ----------------------------------------------------------
  // CARTA
  // ----------------------------------------------------------
  letter: {
    title: "Uma carta pra você",
    signature: "Lucas",
    paragraphs: [
      "Karen,",
      "Se alguém tivesse me falado, em abril de 2024, que uma conversa de madrugada ia virar mais de 106 mil mensagens, eu ia rir. Mas aqui estamos — e cada número desse site é só uma forma (bem nerd, eu sei) de tentar medir uma coisa que não cabe em gráfico nenhum.",
      "Você virou a primeira pessoa que eu quero contar as coisas boas e a última que eu quero dar boa noite. Virou risada às 23h, \"Te amo\" do nada, foto boba, áudio enorme contando o dia. Virou rotina — a melhor rotina que eu já tive.",
      "Esse site é um presente pequeno pra uma coisa gigante. Cada dia, cada mensagem, cada \"te amo\" aqui contado é também uma promessa: de que tem muito mais história pra gente escrever ainda.",
      "Te amo, hoje e sempre."
    ]
  }
};
