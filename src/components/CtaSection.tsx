import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const CtaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "8%"]);

  return (
    <section id="contato" ref={sectionRef} className="relative bg-bone min-h-[100svh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="w-full h-[120%] object-cover opacity-[0.12]"
        >
          <source src="/__l5e/assets-v1/72ad1c73-4003-4624-8093-7ec8bb9b634a/cta-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-14 py-32 md:py-48 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start gap-8"
        >
          <motion.span variants={fadeUp} className="eyebrow text-graphite/40">05 — Conversa</motion.span>

          <motion.h2 variants={fadeUp} className="font-serif text-graphite" style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)", lineHeight: 0.95 }}>
            Para negócios que escolhem
            <br />
            <em className="italic text-accent-red">produto com padrão.</em>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-graphite/70 max-w-2xl text-base md:text-lg leading-relaxed">
            Se você busca qualidade, consistência e uma marca que valoriza o seu ponto de venda, a conversa começa aqui.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6">
            <a
              href="mailto:comercial@fornoemesa.com.br?subject=Forno%20%26%20Mesa%20%E2%80%94%20Contato%20comercial"
              className="group relative inline-flex items-center gap-3 bg-graphite px-8 py-4 overflow-hidden transition-colors duration-500 hover:bg-ink"
              style={{ transitionTimingFunction: "var(--ease-smooth)" }}
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-accent-red"
              />
              <span className="eyebrow text-bone">Iniciar uma conversa</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ transitionTimingFunction: "var(--ease-smooth)" }} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex w-full justify-start lg:justify-end mt-10">
            <p className="font-serif italic text-graphite/35 text-sm md:text-base">
              comercial@fornoemesa.com.br · Contagem, MG · Resposta em até 1 dia útil
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
