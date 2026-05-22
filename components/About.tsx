"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Monitor, Server, Smartphone, Palette, Database, Cloud,
  Code, Globe, Shield, Zap, Github, Linkedin,
} from "lucide-react";
import { siteConfig } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Server, Smartphone, Palette, Database, Cloud,
  Code, Globe, Shield, Zap,
};

// Real counting animation — counts from 0 to target with ease-out.
// Respects prefers-reduced-motion: shows final value immediately if set.
function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  const ref            = useRef<HTMLSpanElement>(null);
  const inView         = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion  = useReducedMotion();
  const numericTarget  = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix         = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || numericTarget === 0) return;
    // Skip animation for users who prefer reduced motion
    if (reducedMotion) { setCount(numericTarget); return; }
    let raf: number;
    const duration  = 1400;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * numericTarget));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => { raf = requestAnimationFrame(step); }, delay * 1000);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [inView, numericTarget, delay, reducedMotion]);

  return (
    <span
      ref={ref}
      className="text-3xl lg:text-4xl font-black gradient-text tabular-nums"
    >
      {count}{suffix}
    </span>
  );
}

const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function About() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-[#0a0a1a]/50" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" aria-hidden="true" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} custom={0} className="text-violet-500 dark:text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Conheça mais
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Desenvolvedor apaixonado por transformar ideias em produtos digitais que fazem a diferença.
          </motion.p>
        </motion.div>

        {/* ── Bio + Stats ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Bio */}
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeInUp} custom={0}>
            {/*
              Accent bar uses border-l (no absolute positioning) so it
              never overflows on small screens.
            */}
            <div className="relative pl-5 border-l-2 border-violet-500 mb-6">
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                {siteConfig.bio}
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Trabalho com uma abordagem centrada no usuário, garantindo que cada projeto não apenas
              funcione perfeitamente, mas ofereça uma experiência visual e interativa excepcional.
            </p>

            {/* Social buttons */}
            <div className="flex gap-3">
              {[
                { href: siteConfig.social.github,   icon: Github,   label: "GitHub"   },
                { href: siteConfig.social.linkedin,  icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
                >
                  <Icon size={16} /> {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Stats — with real counting animation */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {siteConfig.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                custom={i * 0.15}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 text-center hover:border-violet-400/50 dark:hover:border-violet-400/40 transition-all duration-300"
              >
                <AnimatedCounter value={stat.value} delay={0.5 + i * 0.15} />
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Skills ─────────────────────────────────────────────── */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-16">
          <motion.h3 variants={fadeInUp} custom={0} className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">
            O que eu <span className="gradient-text">faço</span>
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.skills.map((skill, i) => {
              const Icon = iconMap[skill.icon] ?? Code;
              return (
                <motion.div
                  key={skill.name}
                  variants={fadeInUp}
                  custom={i * 0.08}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card rounded-2xl p-6 group cursor-default transition-all duration-300 hover:border-violet-400/50 dark:hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/25 transition-colors flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{skill.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{skill.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skill.techs.map((tech) => (
                          <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Tech chips ──────────────────────────────────────────── */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center">
          <motion.h3 variants={fadeInUp} custom={0} className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Tecnologias que <span className="gradient-text">domino</span>
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="tech-chip cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
