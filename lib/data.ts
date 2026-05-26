// ================================================================
//  ARQUIVO DE CONFIGURAÇÃO DO PORTFÓLIO — Kauã Honorato
//  Edite este arquivo para personalizar todo o conteúdo do site.
// ================================================================

import type {
  SkillData,
  ProjectData,
  ServiceData,
  StatData,
  SocialLinks,
  EmailJSConfig,
  SeoConfig,
} from "./types";

// ── Helpers de ambiente (sem fallback inline duplicado) ──────────
const env = (key: string, fallback = "") => process.env[key] ?? fallback;

export const siteConfig = {
  // ── IDENTIDADE ──────────────────────────────────────────────
  name:     "Kauã Honorato",
  initials: "KH",
  title:    "Desenvolvedor Web",
  subtitle: "Transformo ideias em experiências digitais incríveis",
  bio:      "Sou desenvolvedor apaixonado por criar soluções digitais elegantes e funcionais. Com foco em performance, acessibilidade e design moderno, entrego produtos que fazem a diferença — de sites institucionais a aplicações 3D interativas.",
  avatar:   "/avatar.jpg",

  // ── CONTATO ─────────────────────────────────────────────────
  email:    "kaua.honorato10@gmail.com",
  phone:    "+55 (XX) XXXXX-XXXX",
  location: "Brasil",

  // ── REDES SOCIAIS ───────────────────────────────────────────
  social: {
    github:    "https://github.com/Kau-99",
    linkedin:  "https://linkedin.com/in/kaua-honorato",
    instagram: "https://instagram.com/kauahon",
    whatsapp:  "https://wa.me/55XX000000000",
  } satisfies SocialLinks,

  // ── ESTATÍSTICAS ────────────────────────────────────────────
  stats: [
    { label: "Projetos Entregues", value: "6+"  },
    { label: "Clientes Atendidos", value: "4+"  },
    { label: "Tecnologias",        value: "10+" },
    { label: "Commits este ano",   value: "50+" },
  ] satisfies StatData[],

  // ── HABILIDADES ─────────────────────────────────────────────
  skills: [
    {
      icon:        "Monitor",
      name:        "Frontend",
      description: "Interfaces modernas, responsivas e acessíveis",
      techs:       ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    },
    {
      icon:        "Code",
      name:        "JavaScript",
      description: "Interatividade e lógica no navegador",
      techs:       ["ES6+", "DOM API", "Fetch API", "Web Audio API"],
    },
    {
      icon:        "Globe",
      name:        "PWA & Performance",
      description: "Sites rápidos, instaláveis e offline-first",
      techs:       ["Service Workers", "Manifest", "Cache API", "SEO"],
    },
    {
      icon:        "Palette",
      name:        "UI / Design",
      description: "Design centrado no usuário e na experiência",
      techs:       ["Figma", "Responsivo", "Animações CSS", "UX"],
    },
    {
      icon:        "Zap",
      name:        "3D & WebGL",
      description: "Visualizações interativas no navegador",
      techs:       ["Three.js", "WebGL", "GLSL", "Post-processing"],
    },
    {
      icon:        "Server",
      name:        "Ferramentas & Deploy",
      description: "Fluxo de trabalho profissional e publicação",
      techs:       ["Git", "GitHub", "Netlify", "Vercel"],
    },
  ] satisfies SkillData[],

  // ── TECNOLOGIAS ─────────────────────────────────────────────
  technologies: [
    "HTML5", "CSS3", "JavaScript", "TypeScript",
    "Bootstrap 5", "Three.js", "PWA",
    "Git", "GitHub", "Netlify", "Figma",
    "Web Audio API", "JSON", "REST API",
  ] satisfies string[],

  // ── PROJETOS ────────────────────────────────────────────────
  projects: [
    {
      id: 1,
      title:       "NeuroAtlas — A Mente em 3D",
      description: "Visualização interativa 3D que mostra como ansiedade e depressão afetam o cérebro humano. Inclui áudio binaural terapêutico, monitoramento neuroquímico em tempo real e ferramentas de respiração guiada.",
      image:       "/projects/neuroatlas.svg",
      tags:        ["Three.js", "WebGL", "Web Audio API", "JavaScript"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/neuroatlas",
      featured:    true,
    },
    {
      id: 2,
      title:       "ADVIC — Site da Igreja",
      description: "Site institucional completo para a Assembleia de Deus com gestão de conteúdo via JSON, suporte a PWA (instalável no celular), funcionamento offline e área de eventos e sermões.",
      image:       "/projects/igreja.png",
      tags:        ["PWA", "JavaScript", "Bootstrap 5", "Service Workers"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/igreja.5",
      featured:    true,
    },
    {
      id: 3,
      title:       "Studio — Escola de Dança",
      description: "Site completo para escola de dança com páginas de aulas, professores, blog, agenda de shows e contato. Inclui sitemap, manifest e otimizações de SEO.",
      image:       "/projects/studio.svg",
      tags:        ["HTML5", "CSS3", "JavaScript", "SEO"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/Studio",
      featured:    false,
    },
    {
      id: 4,
      title:       "Casa de Ração",
      description: "Site para pet shop / loja de ração com catálogo de produtos, design responsivo e interface amigável para o setor pet.",
      image:       "/projects/casa-de-racao.png",
      tags:        ["HTML5", "CSS3", "JavaScript"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/casa-de-ra-ao",
      featured:    false,
    },
    {
      id: 5,
      title:       "Pet Shopping Keila",
      description: "Aplicativo profissional para o petshop Smile — interface moderna e intuitiva para gerenciamento de serviços, agendamentos e produtos pet, com foco em usabilidade e experiência do cliente.",
      image:       "/projects/petshopping.png",
      tags:        ["HTML5", "CSS3", "JavaScript"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/petshopping-keila",
      featured:    false,
    },
    {
      id: 6,
      title:       "App Mídia",
      description: "Aplicação web de mídia com interface moderna para gerenciar e exibir conteúdo digital.",
      image:       "/projects/app-midia.png",
      tags:        ["HTML5", "CSS3", "JavaScript"],
      category:    "web",
      liveUrl:     "",
      githubUrl:   "https://github.com/Kau-99/app-midia",
      featured:    false,
    },
  ] satisfies ProjectData[],

  // ── SERVIÇOS ────────────────────────────────────────────────
  services: [
    {
      icon:        "Code2",
      title:       "Desenvolvimento Web",
      description: "Sites e aplicações web modernas, performáticas e totalmente responsivas, do design ao deploy.",
      features:    [
        "Landing Pages de Alta Conversão",
        "Sites Institucionais e Corporativos",
        "E-commerce e Lojas Virtuais",
        "PWA — Instalável no Celular",
      ],
      highlight: true,
    },
    {
      icon:        "Zap",
      title:       "Experiências Interativas",
      description: "Visualizações 3D, animações e interfaces imersivas que impressionam e engajam o usuário.",
      features:    [
        "Visualizações 3D com Three.js",
        "Animações e Efeitos Especiais",
        "Dashboards Interativos",
        "Infográficos Dinâmicos",
      ],
      highlight: false,
    },
    {
      icon:        "Globe",
      title:       "SEO & Performance",
      description: "Otimização de sites para buscadores e máxima velocidade de carregamento.",
      features:    [
        "Otimização de SEO On-Page",
        "Performance e Core Web Vitals",
        "Sitemap e Robots.txt",
        "Análise e Relatório de Resultados",
      ],
      highlight: false,
    },
  ] satisfies ServiceData[],

  // ── EMAILJS ─────────────────────────────────────────────────
  emailjs: {
    serviceId:  env("NEXT_PUBLIC_EMAILJS_SERVICE_ID"),
    templateId: env("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"),
    publicKey:  env("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"),
  } satisfies EmailJSConfig,

  // ── SEO ─────────────────────────────────────────────────────
  seo: {
    title:       "Kauã Honorato | Desenvolvedor Web",
    description: "Portfólio de Kauã Honorato — desenvolvedor web especializado em HTML, CSS, JavaScript, Three.js e PWA. Criando experiências digitais únicas.",
    keywords:    "desenvolvedor web, kauã honorato, three.js, pwa, javascript, html css, freelancer, portfolio",
    url:         env("NEXT_PUBLIC_SITE_URL", "https://kaua-honorato.netlify.app"),
    ogImage:     "/og-image.png",
  } satisfies SeoConfig,
};

// ── Re-exports de tipos (compatibilidade com imports existentes) ──
export type { ProjectData as Project, ServiceData as Service, SkillData as Skill };
export type { ProjectCategory, FilterCategory, FormState, ContactFormData } from "./types";
