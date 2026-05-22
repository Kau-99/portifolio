// ================================================================
//  Variáveis de ambiente com tipos e fallbacks explícitos.
//  Use este módulo em vez de process.env direto nos componentes.
// ================================================================

function get(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const env = {
  emailjs: {
    serviceId:  get("NEXT_PUBLIC_EMAILJS_SERVICE_ID"),
    templateId: get("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID"),
    publicKey:  get("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY"),
  },
  siteUrl: get("NEXT_PUBLIC_SITE_URL", "https://kaua-honorato.netlify.app"),
} as const;

// Indica se o EmailJS está configurado (todas as 3 vars preenchidas)
export const isEmailJSConfigured: boolean =
  !!env.emailjs.serviceId &&
  !!env.emailjs.templateId &&
  !!env.emailjs.publicKey;
