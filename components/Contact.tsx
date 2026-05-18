"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail, Phone, MapPin, Github, Linkedin, Instagram,
  MessageSquare, Send, CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.social.whatsapp,
  },
  {
    icon: MapPin,
    label: "Localização",
    value: siteConfig.location,
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: MessageSquare, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const emailjsConfigured =
    !!siteConfig.emailjs.serviceId &&
    !!siteConfig.emailjs.templateId &&
    !!siteConfig.emailjs.publicKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (!emailjsConfigured) {
      // Redireciona para e-mail direto quando EmailJS não está configurado
      window.location.href = `mailto:${siteConfig.email}?subject=Contato via portfólio — ${formData.name}&body=${encodeURIComponent(formData.message)}`;
      return;
    }

    setFormState("loading");
    try {
      await emailjs.sendForm(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        formRef.current!,
        siteConfig.emailjs.publicKey
      );
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contato" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-[#07071a]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-violet-500/10 dark:bg-violet-500/15 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeInUp} custom={0} className="text-violet-500 dark:text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Fale comigo
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Tem um projeto incrível? Vamos criar algo extraordinário juntos.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — info */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact info cards */}
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const cardClass = cn(
                "flex items-start gap-4 p-5 glass-card rounded-2xl transition-all duration-200",
                item.href && "hover:border-violet-400/50 dark:hover:border-violet-400/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/10"
              );
              const inner = (
                <>
                  <div className="p-2.5 rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wide mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium text-sm">
                      {item.value}
                    </p>
                  </div>
                </>
              );
              return (
                <motion.div key={item.label} variants={fadeInUp} custom={i * 0.1}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cardClass}>{inner}</div>
                  )}
                </motion.div>
              );
            })}

            {/* Social links */}
            <motion.div variants={fadeInUp} custom={0.4} className="pt-2">
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-4 font-medium uppercase tracking-wide">
                Redes sociais
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-xl glass-card text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400/40 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={0.2}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Envie uma mensagem
              </h3>

              {!emailjsConfigured && (
                <div className="flex items-start gap-2 p-3 mb-5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    EmailJS não configurado — o botão vai abrir seu cliente de e-mail.
                    Configure as variáveis <code className="font-mono">NEXT_PUBLIC_EMAILJS_*</code> no Netlify para envio automático.
                  </span>
                </div>
              )}

              {formState === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">Mensagem enviada!</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                      Obrigado pelo contato. Responderei em até 24h.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-2 text-sm text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Seu nome *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="João Silva"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 dark:focus:border-violet-400/50 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Seu e-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="joao@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 dark:focus:border-violet-400/50 transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Olá! Gostaria de conversar sobre um projeto..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 dark:focus:border-violet-400/50 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {formState === "error" && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle size={14} />
                      Erro ao enviar. Tente pelo e-mail diretamente.
                    </div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={formState === "loading"}
                    whileHover={formState !== "loading" ? { scale: 1.02, y: -1 } : {}}
                    whileTap={formState !== "loading" ? { scale: 0.98 } : {}}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-base transition-all duration-300",
                      formState === "loading"
                        ? "bg-violet-400 dark:bg-violet-600/60 cursor-not-allowed"
                        : "bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40"
                    )}
                  >
                    {formState === "loading" ? (
                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                    ) : (
                      <><Send size={18} /> Enviar Mensagem</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
