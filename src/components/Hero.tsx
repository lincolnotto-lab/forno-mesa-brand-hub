import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, lineExpand } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_VIDEO_URL = "/__l5e/assets-v1/efc5bc15-46f4-42a2-98ce-0990cc8ffe22/hero-video.mp4";

const heroFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease, delay: 0.3 + i * 0.15 },
  }),
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "18%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1.02, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "-8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] bg-ink overflow-hidden">
      {/* Video background */}
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
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      </motion.div>

      {/* Multi-layer overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-ink"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto"
      >
        <div className="mb-auto" />

        <div className="flex gap-8 md:gap-12 mb-10 md:mb-14">
          {/* Vertical editorial line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, ease, delay: 0.6 }}
            className="hidden md:block w-px bg-accent-red/30 self-stretch origin-top"
          />

          <div className="flex flex-col gap-5 md:gap-7">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="w-10 h-px bg-accent-red" />
              <span className="eyebrow text-bone/50">Minas Gerais — Desde a origem</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              className="text-h1-hero font-serif text-bone font-light leading-[0.92] tracking-[-0.03em]"
            >
              Pão de queijo mineiro
              <br />
              com <em className="text-accent-red italic">padrão de indústria</em>
              <br />
              e alma de marca.
            </motion.h1>

            {/* Subtext — two lines, more breathing */}
            <motion.div
              custom={2}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-lg mt-1"
            >
              <p className="text-bone/55 text-base md:text-lg font-light leading-relaxed">
                Produção consistente, apresentação premium e entrega confiável.
              </p>
              <p className="text-bone/55 text-base md:text-lg font-light leading-relaxed mt-1">
                Um produto que sustenta operação e valor percebido no balcão.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={heroFadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-3"
            >
              <a
                href="#marca"
                className="group relative inline-flex items-center gap-2 pb-1"
              >
                <span
                  className="eyebrow text-bone group-hover:text-bone/80 transition-colors duration-500"
                  style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                >
                  Conhecer a marca
                </span>
                <span
                  className="inline-block transition-transform duration-500 text-bone group-hover:translate-x-1.5"
                  style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                >
                  →
                </span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-bone/20" />
                <span
                  className="absolute bottom-0 left-0 w-full h-px bg-accent-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-600"
                  style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                />
              </a>

              <span className="hidden sm:block w-px h-4 bg-bone/15" />

              <a href="#contato" className="flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span className="eyebrow text-bone/50 group-hover:text-bone transition-colors duration-500">
                  Falar com vendas
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 1.2 }}
          className="flex items-end justify-between text-bone/25"
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs"
            >
              ↓
            </motion.span>
            <span className="eyebrow text-[9px] tracking-[0.3em]">Role</span>
          </div>
          <span className="hidden lg:block eyebrow text-[9px] tracking-[0.3em]">
            Manifesto · Consistência · Presença · Recompra
          </span>
        </motion.div>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease, delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-bone/15 origin-left"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
