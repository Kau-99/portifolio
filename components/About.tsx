"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Smartphone, Palette, Database, Cloud, Code, Globe, Shield, Zap, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Monitor, Server, Smartphone, Palette, Database, Cloud,
  Code, Globe, Shield, Zap,
};

function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const numericPart = value.replace(/\D/g, "");
  const suffix = value.replace(/\d/g, "");

  return (
    <div ref={ref}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay }}
        className="text-3xl lg:text-4xl font-black gradient-text"
      >
        {inView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
          >
            {numericPart}{suffix}
          </motion.span>
        ) : (
          <span className="opacity-0">{value}</span>
        )}
      </motion.span>
    </div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-[#0a0a1a]/50" />
      <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — Bio */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={0}
          >
            <div className="relative">
              {/* Decorative block */}
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-full" />
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6 pl-4">
                {siteConfig.bio}
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Trabalho com uma abordagem centrada no usuário, garantindo que cada projeto não apenas funcione perfeitamente,
              mas também ofereça uma experiência visual e interativa excepcional.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <motion.a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
              >
                <Github size={16} /> GitHub
              </motion.a>
              <motion.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
              >
                <Linkedin size={16} /> LinkedIn
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Stats */}
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
                className="glass-card rounded-2xl p-6 text-center group hover:border-violet-400/50 dark:hover:border-violet-400/40 transition-all duration-300 hover:-translate-y-1"
              >
                <AnimatedCounter value={stat.value} delay={0.5 + i * 0.1} />
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h3
            variants={fadeInUp}
            custom={0}
            className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10"
          >
            O que eu <span className="gradient-text">faço</span>
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.skills.map((skill, i) => {
              const Icon = iconMap[skill.icon] || Code;
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
                          <span key={tech} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400">
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

        {/* Technologies */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3 variants={fadeInUp} custom={0} className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Tecnologias que <span className="gradient-text">domino</span>
          </motion.h3>
          <motion.div variants={fadeInUp} custom={1} className="flex flex-wrap justify-center gap-3">
            {siteConfig.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="tech-chip cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
