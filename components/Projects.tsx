"use client";

import { memo, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";
import { siteConfig, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "api", label: "API" },
  { id: "design", label: "Design" },
];

const ProjectCard = memo(function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered,  setHovered]  = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass-card rounded-2xl overflow-hidden
                 hover:border-violet-400/50 dark:hover:border-violet-400/40
                 hover:shadow-xl hover:shadow-violet-500/10
                 transition-all duration-300 hover:-translate-y-2"
    >
      {/* Project image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-900/30 to-slate-900/50 dark:from-violet-900/50 dark:to-slate-900/80">
        {/* Real image — falls back to placeholder if file is missing */}
        {!imgError && project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={cn(
              "object-cover object-center transition-transform duration-500",
              hovered && "scale-110"
            )}
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Layers size={36} className="text-violet-400/60 mx-auto mb-2" />
              <span className="text-xs text-slate-400/60">screenshot em breve</span>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-violet-900/70 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.05 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-violet-50 transition-colors shadow-lg"
            >
              <ExternalLink size={14} /> Ver Projeto
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/20 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Github size={14} /> Código
            </motion.a>
          )}
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-violet-500/30">
            ✦ Destaque
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-xs font-medium text-slate-200">
          {categories.find((c) => c.id === project.category)?.label ?? project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-500/20 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filteredProjects =
    activeCategory === "all"
      ? siteConfig.projects
      : siteConfig.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projetos" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#07071a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-violet-500 dark:text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Meu trabalho
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4"
          >
            Projetos em <span className="gradient-text">Destaque</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Uma seleção dos projetos que mais representam minha capacidade técnica e criativa.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={cn(
                "relative px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300",
                activeCategory === cat.id
                  ? "text-white"
                  : "glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-400/40"
              )}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 shadow-lg shadow-violet-500/30"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-slate-400"
          >
            <Layers size={40} className="mx-auto mb-4 opacity-40" />
            <p>Nenhum projeto nessa categoria ainda.</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 font-semibold hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200 group"
          >
            <Github size={18} className="group-hover:rotate-12 transition-transform" />
            Ver todos no GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
