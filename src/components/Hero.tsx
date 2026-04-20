import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, lineExpand, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1.04, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-6%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.85]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] bg-ink overflow-hidden">
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/hero.webm" type="video/webm" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-ink"
      />

      <motion.div
        style={{ y: contentY }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto"
      >
        <div className="mb-auto" />

        <div className="flex flex-col gap-6 md:gap-8 mb-12 md:mb-16">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-10 h-px bg-accent-red" />
            <span className="eyebrow text-bone/70">Minas Gerais — Desde a origem</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-h1-hero font-serif text-bone font-light">
            Pão de queijo mineiro
            <br />
            com <em className="text-accent-red italic">padrão de indústria</em>
            <br />
            e alma de marca.
          </motion.h1>

          <motion.p variants={fadeUp} className="text-bone/70 max-w-xl text-base md:text-lg font-light leading-relaxed">
            Produzimos com consistência, presença e cuidado de ponta a ponta. Um produto que sustenta operação, percepção e recompra.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
            <a
              href="#marca"
              className="group relative inline-block border border-bone/70 px-8 py-4 overflow-hidden"
            >
              <span className="eyebrow text-bone group-hover:text-bone/80 transition-colors duration-500 flex items-center gap-2" style={{ transitionTimingFunction: "var(--ease-smooth)" }}>
                Conhecer a marca <span className="inline-block transition-transform duration-500 group-hover:translate-x-1" style={{ transitionTimingFunction: "var(--ease-smooth)" }}>→</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-bone scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ transitionTimingFunction: "var(--ease-smooth)" }} />
            </a>
            <a href="#contato" className="flex items-center gap-2 group">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
              <span className="eyebrow text-bone/70 group-hover:text-bone transition-colors duration-500">Falar com vendas</span>
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="flex items-end justify-between text-bone/40">
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg"
            >
              ↓
            </motion.span>
            <span className="eyebrow">Role para conhecer</span>
          </div>
          <span className="hidden lg:block eyebrow">
            01 — Manifesto · Consistência · Presença · Recompra
          </span>
        </motion.div>

        <motion.div
          variants={lineExpand}
          className="absolute bottom-0 left-0 right-0 h-px bg-bone/25 origin-left"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
