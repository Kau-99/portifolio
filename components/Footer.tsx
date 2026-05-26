"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Instagram, MessageSquare, ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { scrollToSection, scrollToTop } from "@/lib/utils";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: MessageSquare, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export default function Footer() {

  return (
    <footer className="relative bg-slate-50 dark:bg-[#050510] border-t border-slate-200 dark:border-violet-500/10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="container-custom py-12 lg:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/20">
                {siteConfig.initials}
              </div>
              <span className="font-black text-lg text-slate-900 dark:text-white">
                {siteConfig.name.split(" ")[0]}
                <span className="gradient-text">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis que geram resultados reais.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-5">
              Redes Sociais
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-slate-600 dark:text-slate-400 text-sm hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
                >
                  <Icon size={15} />
                  <span>{label}</span>
                </motion.a>
              ))}
            </div>
            <div className="mt-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 break-all"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800/60">
          <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} {siteConfig.name}. Feito com
            <Heart size={13} className="text-rose-500 fill-rose-500 animate-pulse-slow" />
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl glass-card text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
