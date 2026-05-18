"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#inicio",   label: "Início" },
  { href: "#sobre",    label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#contato",  label: "Contato" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState("inicio");
  const [mounted,        setMounted]        = useState(false);
  const { setTheme, resolvedTheme }         = useTheme(); // `theme` removed — unused

  useEffect(() => setMounted(true), []);

  // ── Scroll tracking ──────────────────────────────────────────
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── Close menu on resize ─────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Escape key closes mobile menu ────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // ── Prevent body scroll while menu is open ───────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-[#07071a]/90 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-slate-200/50 dark:border-violet-500/10"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16" aria-label="Navegação principal">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick("#inicio")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 group"
              aria-label="Ir para o início"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                {siteConfig.initials}
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-lg hidden sm:block">
                {siteConfig.name.split(" ")[0]}
                <span className="gradient-text">.</span>
              </span>
            </motion.button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    role="listitem"
                    onClick={() => handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                      isActive
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-violet-100 dark:bg-violet-500/15"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle — only after mount to avoid FOUC */}
              {mounted && (
                <motion.button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                  aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Sun size={18} />
                      </motion.span>
                    ) : (
                      <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Moon size={18} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Desktop CTA */}
              <motion.button
                onClick={() => handleNavClick("#contato")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300"
              >
                Contato
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu backdrop — click outside to close */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-[#0d0d20] border-b border-slate-200 dark:border-violet-500/20 shadow-2xl md:hidden"
              role="navigation"
              aria-label="Menu móvel"
            >
              <div className="container-custom py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={activeSection === link.href.replace("#", "") ? "page" : undefined}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      activeSection === link.href.replace("#", "")
                        ? "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => handleNavClick("#contato")}
                  className="mt-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold text-center shadow-lg shadow-violet-500/20"
                >
                  Entre em Contato
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
