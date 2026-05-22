// ================================================================
//  Interfaces e tipos compartilhados em todo o projeto.
//  Importe daqui — nunca redeclare inline nos componentes.
// ================================================================

// ── Projetos ─────────────────────────────────────────────────────
export type ProjectCategory = "web" | "mobile" | "api" | "design";
export type FilterCategory  = "all" | ProjectCategory;

export interface ProjectData {
  id:          number;
  title:       string;
  description: string;
  image:       string;
  tags:        string[];
  category:    ProjectCategory;
  liveUrl:     string;
  githubUrl:   string;
  featured:    boolean;
}

// ── Habilidades ──────────────────────────────────────────────────
export interface SkillData {
  icon:        string;
  name:        string;
  description: string;
  techs:       string[];
}

// ── Serviços ─────────────────────────────────────────────────────
export interface ServiceData {
  icon:        string;
  title:       string;
  description: string;
  features:    string[];
  highlight:   boolean;
}

// ── Estatísticas ─────────────────────────────────────────────────
export interface StatData {
  label: string;
  value: string;
}

// ── Config central ───────────────────────────────────────────────
export interface SocialLinks {
  github:    string;
  linkedin:  string;
  instagram: string;
  whatsapp:  string;
}

export interface EmailJSConfig {
  serviceId:  string;
  templateId: string;
  publicKey:  string;
}

export interface SeoConfig {
  title:       string;
  description: string;
  keywords:    string;
  url:         string;
  ogImage:     string;
}

// ── Formulário de contato ────────────────────────────────────────
export type FormState = "idle" | "loading" | "success" | "error";

export interface ContactFormData {
  name:    string;
  email:   string;
  message: string;
}

// ── Filtro de projetos ───────────────────────────────────────────
export interface FilterOption {
  id:    FilterCategory;
  label: string;
}
