import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, clipRevealHorizontal, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const gridImages = [
  { src: "/product-display.jpg", alt: "Forno & Mesa — exposição em balcão", span: "col-span-12 md:col-span-5" },
  { src: "/product-packaging.jpg", alt: "Forno & Mesa — embalagem", span: "col-span-12 md:col-span-4 md:mt-24" },
  { src: "/product-hand.jpg", alt: "Forno & Mesa — consumo", span: "col-span-12 md:col-span-3" },
];

const Product = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.04]);

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
          ref={imageRef}
          variants={clipRevealHorizontal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="overflow-hidden mb-6"
        >
          <motion.img
            style={{ scale: imageScale }}
            src="/product-macro.jpg"
            alt="Forno & Mesa — macro do pão de queijo"
            className="w-full aspect-video object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {gridImages.map((img) => (
            <motion.div
              key={img.src}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                loading="lazy"
                width={640}
                height={480}
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-accent-red scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" style={{ transitionTimingFunction: "var(--ease-smooth)" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
