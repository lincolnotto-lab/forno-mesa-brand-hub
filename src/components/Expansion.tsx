import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const metrics = [
  { label: "Produção", value: "Padronizada", subtitle: "Processo industrial controlado de ponta a ponta" },
  { label: "Alcance", value: "Nacional", subtitle: "Atendimento a redes, padarias e food service" },
  { label: "Entrega", value: "Consistente", subtitle: "Mesma especificação, lote após lote" },
];

const Expansion = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <section id="operacao" ref={sectionRef} className="relative bg-wine min-h-[100svh] overflow-hidden flex items-center">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[120%] object-cover"
        >
          <source src="/__l5e/assets-v1/1a0a85f1-cd44-49b9-838b-1ed1bb13d8cb/expansion-video.mp4" type="video/mp4" />
        </video>
      </motion.div>
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-wine via-wine/90 to-wine/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-wine/40 via-transparent to-wine/60" />
      <div className="absolute inset-0 w-1/2 left-0 bg-wine/30" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="w-10 h-px bg-accent-red" />
              <span className="eyebrow text-bone/50">04 — Operação</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-bone">
              Estrutura para crescer.
              <br />
              <span className="italic">Capacidade para entregar.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-bone/60 max-w-lg text-base leading-relaxed">
              Expandimos mercado com base em produção sólida, operação organizada e visão de longo prazo. Não crescemos no improviso. Crescemos com consistência.
            </motion.p>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-4 lg:col-start-9 flex flex-col"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className={`py-8 relative ${i > 0 ? "border-t border-bone/10" : ""}`}
              >
                {/* Accent line on left */}
                <span className="absolute left-0 top-8 bottom-8 w-px bg-accent-red/30" />
                <div className="pl-5">
                  <span className="eyebrow text-bone/50">{m.label}</span>
                  <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-bone font-light tracking-tight leading-[1] mt-3">
                    {m.value}
                  </div>
                  <p className="text-sm text-bone/50 mt-3 max-w-xs">{m.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Expansion;
