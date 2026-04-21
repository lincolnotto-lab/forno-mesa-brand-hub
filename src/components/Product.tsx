import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, clipRevealHorizontal, clipRevealUp, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const MACRO_VIDEO = "/__l5e/assets-v1/86ded337-a443-4acb-8176-d71b40a03f0d/product-macro.mp4";

const gridVideos = [
  { src: "/__l5e/assets-v1/42f8d66d-4a5b-456e-8290-01c7fff4719d/product-display.mp4", label: "Exposição", span: "col-span-12 md:col-span-5" },
  { src: "/__l5e/assets-v1/238d86a8-d316-4646-9a9b-e0b20ca767e7/product-packaging.mp4", label: "Embalagem", span: "col-span-12 md:col-span-4 md:mt-24" },
  { src: "/__l5e/assets-v1/98c95cdf-2874-4b5c-8cbf-c4bd185a3458/product-hand.mp4", label: "Consumo", span: "col-span-12 md:col-span-3" },
];

const Product = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.04]);

  return (
    <section id="produto" className="bg-cream min-h-[110svh] py-20 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col items-start gap-6 mb-16 md:mb-24"
        >
          <motion.span variants={fadeUp} className="eyebrow text-graphite/60">03 — Produto</motion.span>
          <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-graphite">
            Um produto forte no balcão
            <br />
            e forte na memória.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-graphite/70 max-w-2xl text-base leading-relaxed">
            Forno & Mesa une performance comercial e apresentação premium. É o tipo de produto que vende pelo sabor e permanece pela percepção.
          </motion.p>
        </motion.div>

        <motion.div
          ref={videoRef}
          variants={clipRevealHorizontal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="overflow-hidden"
        >
          <motion.div style={{ scale: videoScale }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src={MACRO_VIDEO} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>

        {/* Editorial quote separator */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex items-center justify-center py-16 md:py-24"
        >
          <p className="font-serif text-graphite/50 text-xl md:text-2xl lg:text-3xl italic text-center max-w-2xl leading-relaxed font-light">
            "O sabor convence. A presença confirma."
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {gridVideos.map((vid, i) => (
            <motion.div
              key={vid.src}
              variants={clipRevealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ ...viewportConfig, margin: "-10%" }}
              transition={{ delay: i * 0.15 }}
              className={`relative overflow-hidden group ${vid.span}`}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: "var(--ease-smooth)" }}
              >
                <source src={vid.src} type="video/mp4" />
              </video>
              {/* Hover label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionTimingFunction: "var(--ease-smooth)" }}>
                <span className="eyebrow text-bone/80">{vid.label}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-accent-red scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" style={{ transitionTimingFunction: "var(--ease-smooth)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
