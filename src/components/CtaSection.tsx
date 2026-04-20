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
    <section id="contato" ref={sectionRef} className="relative bg-bone min-h-[95svh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src="/cta-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-[120%] object-cover opacity-[0.12]"
          loading="lazy"
        />
      </motion.div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start gap-8"
        >
          <motion.span variants={fadeUp} className="eyebrow text-graphite/50">Conversa</motion.span>

          <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-graphite">
            Para negócios que escolhem
            <br />
            <em className="italic text-accent-red">produto com padrão.</em>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-graphite/70 max-w-2xl text-base leading-relaxed">
            Se você busca qualidade, consistência e uma marca que valoriza o seu ponto de venda, a conversa começa aqui.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4">
            <a
              href="mailto:comercial@fornoemesa.com.br?subject=Forno%20%26%20Mesa%20%E2%80%94%20Contato%20comercial"
              className="group relative inline-block bg-graphite px-8 py-4 overflow-hidden transition-colors duration-500 hover:bg-ink"
              style={{ transitionTimingFunction: "var(--ease-smooth)" }}
            >
              <span className="absolute bottom-0 left-0 w-full h-px bg-accent-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ transitionTimingFunction: "var(--ease-smooth)" }} />
              <span className="eyebrow text-bone flex items-center gap-2">
                Iniciar uma conversa
              </span>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex w-full justify-start lg:justify-end mt-6">
            <p className="eyebrow text-graphite/40">
              comercial@fornoemesa.com.br · Contagem, MG · Resposta em até 1 dia útil
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
