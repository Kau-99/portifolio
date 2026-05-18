// ================================================================
//  ARQUIVO DE CONFIGURAÇÃO DO PORTFÓLIO
//  Edite este arquivo para personalizar todo o conteúdo do site.
//  Não é necessário mexer em nenhum outro arquivo para customizar!
// ================================================================

export const siteConfig = {
  // ── IDENTIDADE ──────────────────────────────────────────────
  name: "Seu Nome",                       // ← Seu nome completo
  initials: "SN",                         // ← Iniciais para o logo
  title: "Desenvolvedor Full Stack",      // ← Seu título profissional
  subtitle: "Transformo ideias em experiências digitais incríveis",
  bio: "Sou um desenvolvedor apaixonado por criar soluções digitais elegantes e funcionais. Com foco em performance, acessibilidade e design moderno, entrego produtos que realmente fazem a diferença para os meus clientes.",
  // ← Avatar: coloque sua foto em /public/avatar.jpg
  avatar: "/avatar.jpg",

  // ── CONTATO ─────────────────────────────────────────────────
  email: "seuemail@email.com",            // ← Seu e-mail
  phone: "+55 (11) 99999-9999",           // ← Seu telefone/WhatsApp
  location: "São Paulo, Brasil",          // ← Sua localização

  // ── REDES SOCIAIS ───────────────────────────────────────────
  social: {
    github: "https://github.com/seuusuario",
    linkedin: "https://linkedin.com/in/seuusuario",
    instagram: "https://instagram.com/seuusuario",
    whatsapp: "https://wa.me/5511999999999",  // ← Formato: 55 + DDD + número
  },

  // ── ESTATÍSTICAS (Seção Sobre) ───────────────────────────────
  stats: [
    { label: "Projetos Entregues", value: "50+" },
    { label: "Clientes Satisfeitos", value: "30+" },
    { label: "Anos de Experiência", value: "3+" },
    { label: "Tecnologias", value: "15+" },
  ],

  // ── HABILIDADES ─────────────────────────────────────────────
  // Ícones disponíveis: Monitor, Server, Smartphone, Palette,
  //   Database, Cloud, Code, Globe, Shield, Zap, Layout, Cpu
  skills: [
    {
      icon: "Monitor",
      name: "Frontend",
      description: "Interfaces modernas e responsivas",
      techs: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
      icon: "Server",
      name: "Backend",
      description: "APIs robustas e escaláveis",
      techs: ["Node.js", "Python", "REST", "GraphQL"],
    },
    {
      icon: "Smartphone",
      name: "Mobile",
      description: "Apps nativos e multiplataforma",
      techs: ["React Native", "Expo", "Flutter"],
    },
    {
      icon: "Database",
      name: "Banco de Dados",
      description: "Modelagem e otimização de dados",
      techs: ["PostgreSQL", "MongoDB", "Redis"],
    },
    {
      icon: "Cloud",
      name: "DevOps / Cloud",
      description: "Deploy e infraestrutura moderna",
      techs: ["Docker", "AWS", "Vercel", "CI/CD"],
    },
    {
      icon: "Palette",
      name: "UI/UX Design",
      description: "Design centrado no usuário",
      techs: ["Figma", "Framer", "Prototipagem"],
    },
  ],

  // ── TECNOLOGIAS (chips na seção Sobre) ──────────────────────
  technologies: [
    "React", "Next.js", "TypeScript", "Node.js", "TailwindCSS",
    "PostgreSQL", "MongoDB", "Docker", "AWS", "Git",
    "Figma", "Python", "Prisma", "Stripe", "Vercel",
  ],

  // ── PROJETOS ────────────────────────────────────────────────
  // category: "web" | "mobile" | "design" | "api"
  // Coloque as imagens em /public/projects/nome-do-projeto.png
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Plataforma de e-commerce completa com painel administrativo, pagamentos integrados via Stripe, gestão de estoque e relatórios em tempo real.",
      image: "/projects/ecommerce.png",   // ← Substitua pela imagem real
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      category: "web",
      liveUrl: "https://seusite.com",
      githubUrl: "https://github.com/seuusuario/ecommerce",
      featured: true,
    },
    {
      id: 2,
      title: "App de Finanças",
      description:
        "Aplicativo mobile para controle financeiro pessoal com gráficos interativos, categorização automática de despesas e metas de economia.",
      image: "/projects/finance-app.png",
      tags: ["React Native", "Expo", "Firebase"],
      category: "mobile",
      liveUrl: "https://apps.apple.com/app",
      githubUrl: "https://github.com/seuusuario/finance-app",
      featured: true,
    },
    {
      id: 3,
      title: "Dashboard SaaS",
      description:
        "Dashboard analítico para gestão de negócios com métricas em tempo real, relatórios exportáveis e integração com múltiplas fontes de dados.",
      image: "/projects/dashboard.png",
      tags: ["React", "TypeScript", "Chart.js", "API REST"],
      category: "web",
      liveUrl: "https://dashboard.seusite.com",
      githubUrl: "https://github.com/seuusuario/dashboard",
      featured: false,
    },
    {
      id: 4,
      title: "Landing Page Agency",
      description:
        "Landing page de alta conversão para agência de marketing digital com animações avançadas, formulário integrado e otimização SEO.",
      image: "/projects/landing.png",
      tags: ["Next.js", "Framer Motion", "TailwindCSS"],
      category: "web",
      liveUrl: "https://agency.seusite.com",
      githubUrl: "https://github.com/seuusuario/landing",
      featured: false,
    },
    {
      id: 5,
      title: "API de Pagamentos",
      description:
        "Microsserviço de pagamentos com suporte a múltiplos gateways, webhook handling, retry automático e dashboard de monitoramento.",
      image: "/projects/api.png",
      tags: ["Node.js", "Docker", "Redis", "PostgreSQL"],
      category: "api",
      liveUrl: "",
      githubUrl: "https://github.com/seuusuario/payment-api",
      featured: false,
    },
    {
      id: 6,
      title: "Design System",
      description:
        "Sistema de design completo com componentes reutilizáveis, tokens de design, documentação interativa e testes de acessibilidade.",
      image: "/projects/design-system.png",
      tags: ["Figma", "Storybook", "React", "TypeScript"],
      category: "design",
      liveUrl: "https://design.seusite.com",
      githubUrl: "https://github.com/seuusuario/design-system",
      featured: false,
    },
  ],

  // ── SERVIÇOS ────────────────────────────────────────────────
  services: [
    {
      icon: "Code2",
      title: "Desenvolvimento Web",
      description:
        "Sites e aplicações web modernas, performáticas e totalmente responsivas, do design ao deploy.",
      features: [
        "Landing Pages de Alta Conversão",
        "Sistemas Web Completos",
        "E-commerce e Lojas Virtuais",
        "APIs e Integrações",
      ],
      highlight: true,
    },
    {
      icon: "Smartphone",
      title: "Apps Mobile",
      description:
        "Aplicativos iOS e Android nativos ou multiplataforma com experiência de usuário excepcional.",
      features: [
        "React Native / Flutter",
        "Publicação nas Lojas",
        "Notificações Push",
        "Pagamentos In-App",
      ],
      highlight: false,
    },
    {
      icon: "BarChart3",
      title: "Consultoria & Mentoria",
      description:
        "Orientação técnica para equipes e projetos, revisão de código e boas práticas de engenharia.",
      features: [
        "Revisão de Arquitetura",
        "Code Review",
        "Mentoria 1:1",
        "Treinamentos e Workshops",
      ],
      highlight: false,
    },
  ],

  // ── EMAILJS (Formulário de Contato) ─────────────────────────
  // Credenciais lidas de variáveis de ambiente (seguro para git).
  // Crie um .env.local baseado no .env.local.example.
  // No Netlify: Site settings → Environment variables.
  emailjs: {
    serviceId:  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey:  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "",
  },

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    title: "Seu Nome | Desenvolvedor Full Stack",
    description:
      "Portfólio profissional — desenvolvedor Full Stack especializado em React, Next.js e Node.js. Transformo ideias em produtos digitais de alta qualidade.",
    keywords:
      "desenvolvedor full stack, react, next.js, node.js, freelancer, portfolio",
    // URL lida de env var para que o valor correto seja usado no Netlify.
    // Defina NEXT_PUBLIC_SITE_URL nas env vars do Netlify.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seusite.netlify.app",
    ogImage: "/og-image.png",         // ← Imagem para redes sociais (1200x630)
  },
};

// Tipagens exportadas
export type Project = (typeof siteConfig.projects)[number];
export type Service = (typeof siteConfig.services)[number];
export type Skill = (typeof siteConfig.skills)[number];
