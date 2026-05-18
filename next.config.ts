import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // gera pasta /out com HTML/CSS/JS estático
  trailingSlash: true,       // Netlify precisa de barras finais
  images: {
    unoptimized: true,       // obrigatório em export estático
  },
};

export default nextConfig;
