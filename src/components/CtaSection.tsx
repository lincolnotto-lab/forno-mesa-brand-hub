import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

const CtaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="contato" ref={sectionRef} className="relative bg-bone min-h-[95svh] flex items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src="/cta-bg.jpg"
          alt=""
          className="w-full h-[120%] object-cover opacity-[0.12]"
          loading="lazy"
        />
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start lg:items-center gap-8"
        >
          <motion.span variants={fadeUp} className="eyebrow text-graphite/50">05 — Contato</motion.span>

          <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-graphite lg:text-center">
            Para negócios que escolhem
            <br />
            <em className="italic text-accent-red">produto com padrão.</em>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-graphite/70 max-w-2xl text-base leading-relaxed lg:text-center">
            Se você busca qualidade, consistência e uma marca que valoriza o seu ponto de venda, a conversa começa aqui.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
            <a
              href="mailto:comercial@fornoemesa.com.br"
              className="group relative rounded-full bg-graphite px-8 py-3.5 overflow-hidden"
            >
              <span className="absolute inset-0 bg-accent-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }} />
              <span className="relative z-10 eyebrow text-bone flex items-center gap-2">
                Iniciar uma conversa
              </span>
            </a>
            <a href="#" className="eyebrow text-graphite/60 hover:text-graphite transition-colors duration-500">
              Baixar apresentação comercial →
            </a>
          </motion.div>

          <motion.p variants={fadeUp} className="eyebrow text-graphite/40 mt-6 lg:text-center">
            comercial@fornoemesa.com.br · +55 31 9 0000-0000 · Contagem, MG
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
