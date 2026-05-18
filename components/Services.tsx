"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Smartphone, BarChart3, CheckCircle2, ArrowRight,
  Globe, Zap, Shield,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Code2, Smartphone, BarChart3, Globe, Zap, Shield,
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function Services() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-[#0a0a1a]/50" aria-hidden="true" />
      <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-20" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 dark:bg-violet-500/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-16">
          <motion.p variants={fadeInUp} custom={0} className="text-violet-500 dark:text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3">
            O que ofereço
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Meus <span className="gradient-text">Serviços</span>
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Ofereço soluções completas de desenvolvimento digital, do conceito ao lançamento.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {siteConfig.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2;
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={i * 0.1}
                whileHover={{ y: -6, scale: 1.01 }}
                className={cn(
                  "relative glass-card rounded-2xl p-7 group cursor-default",
                  "hover:border-violet-400/50 dark:hover:border-violet-400/40",
                  "hover:shadow-xl hover:shadow-violet-500/10",
                  "transition-all duration-300",         // ← was duration-400 (invalid)
                  service.highlight && "border-violet-400/40 dark:border-violet-400/30 shadow-lg shadow-violet-500/10"
                )}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-violet-500/30">
                    ✦ Mais Popular
                  </div>
                )}

                <div className={cn(
                  "inline-flex p-3 rounded-xl mb-5 transition-all duration-300",
                  service.highlight
                    ? "bg-gradient-to-br from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50"
                    : "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 group-hover:bg-violet-200 dark:group-hover:bg-violet-500/25"
                )}>
                  <Icon size={22} />
                </div>

                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 size={14} className="text-violet-500 flex-shrink-0" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" aria-hidden="true">
                  Saiba mais <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0.4}
          className="glass-card rounded-2xl p-8 lg:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-transparent to-cyan-500/5" aria-hidden="true" />
          <div className="relative">
            <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-3">
              Tem um projeto em mente?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-7 max-w-xl mx-auto">
              Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
              Respondo em até 24h!
            </p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                         bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500
                         text-white font-bold text-base
                         shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40
                         transition-shadow duration-300"
            >
              Solicitar Orçamento <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
