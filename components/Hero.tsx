"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Instagram, ExternalLink, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const typingWords = [
  "Desenvolvedor Full Stack",
  "Criador de Interfaces",
  "Solucionador de Problemas",
  "Apaixonado por Código",
];

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
];

const floatingOrbs = [
  { size: 400, x: "10%", y: "20%", color: "from-violet-600/20 to-transparent", delay: 0 },
  { size: 300, x: "70%", y: "60%", color: "from-cyan-500/15 to-transparent", delay: 2 },
  { size: 250, x: "50%", y: "10%", color: "from-purple-500/10 to-transparent", delay: 4 },
];

// Posições determinísticas para evitar hydration mismatch (Math.random() difere entre server e client)
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${((i * 17 + 31) % 100).toFixed(1)}%`,
  top: `${((i * 23 + 7) % 100).toFixed(1)}%`,
  duration: 4 + (i % 5),
  delay: parseFloat(((i * 0.3) % 6).toFixed(2)),
}));

export default function Hero() {
  const { displayText, isTyping } = useTypingEffect({
    words: typingWords,
    typingSpeed: 75,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const x = ((clientX - left) / width - 0.5) * 20;
      const y = ((clientY - top) / height - 0.5) * 20;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — dark */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="animated-gradient-bg absolute inset-0" />
        <div className="grid-pattern absolute inset-0" />
      </div>
      {/* Background — light */}
      <div className="absolute inset-0 dark:hidden block">
        <div className="animated-gradient-bg-light absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-50" />
      </div>

      {/* Floating orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl pointer-events-none`}
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6 + orb.delay, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}

      {/* Particles — posições determinísticas para evitar hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-violet-400/40 dark:bg-violet-400/30"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container-custom relative z-10 pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
        >
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-300/40 dark:border-violet-500/30">
                <Sparkles size={14} className="animate-pulse-slow" />
                Disponível para projetos
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4"
            >
              <span className="text-slate-900 dark:text-white">Olá, sou </span>
              <span className="gradient-text">{siteConfig.name}</span>
            </motion.h1>

            {/* Typing subtitle */}
            <motion.div variants={itemVariants} className="h-10 mb-6 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-300">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-6 ml-1 bg-violet-500 align-middle ${isTyping ? "animate-pulse" : "opacity-0"}`}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {siteConfig.subtitle}. Especializado em criar produtos digitais que combinam
              design sofisticado com código limpo e performático.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                           bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500
                           text-white font-semibold text-base
                           shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40
                           transition-all duration-300"
              >
                Ver Projetos
                <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
                           glass-card text-slate-700 dark:text-slate-200 font-semibold text-base
                           hover:border-violet-400/50 dark:hover:border-violet-400/50
                           transition-all duration-300"
              >
                Entre em Contato
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 justify-center lg:justify-start">
              <span className="text-sm text-slate-500 dark:text-slate-500">Redes:</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl glass text-slate-600 dark:text-slate-400
                             hover:text-violet-600 dark:hover:text-violet-400
                             hover:border-violet-400/40 dark:hover:border-violet-400/40
                             transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Avatar / Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/20 blur-2xl scale-110 animate-pulse-slow" />

              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/30 animate-spin-slow" />

              {/* Avatar container */}
              <div className="relative w-full h-full rounded-full overflow-hidden
                              border-2 border-violet-500/40 dark:border-violet-400/30
                              bg-gradient-to-br from-violet-900/50 to-slate-900/80
                              shadow-2xl shadow-violet-500/20">
                {/* Placeholder avatar — replace /avatar.jpg with your real photo */}
                <div className="w-full h-full flex items-center justify-center
                                bg-gradient-to-br from-violet-600/20 via-slate-800/50 to-cyan-600/10">
                  <span className="text-7xl sm:text-8xl font-black gradient-text select-none">
                    {siteConfig.initials}
                  </span>
                </div>
                {/*
                  When you add your photo, replace the div above with:
                  <Image src="/avatar.jpg" alt={siteConfig.name} fill className="object-cover" priority />
                */}
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-4 glass-card px-3 py-1.5 rounded-xl text-xs font-semibold text-violet-600 dark:text-violet-400 shadow-lg"
              >
                ✦ Full Stack Dev
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-4 glass-card px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-lg"
              >
                ✦ Open to Work
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs text-slate-500 dark:text-slate-500 tracking-widest uppercase group-hover:text-violet-500 transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-1.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-600 group-hover:border-violet-500/50 group-hover:text-violet-500 transition-all"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
