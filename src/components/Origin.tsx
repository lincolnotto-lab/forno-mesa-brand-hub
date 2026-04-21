import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, clipRevealVertical, viewportConfig } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const metadata = [
  { label: "Origem", value: "Minas Gerais" },
  { label: "Método", value: "Padrão, lote após lote" },
  { label: "Atuação", value: "Padarias, cafés e redes" },
];

const Origin = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ["0%", "0%"] : ["0%", "10%"]);

  return (
    <section id="marca" className="bg-bone min-h-[95svh] py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="w-10 h-px bg-accent-red" />
              <span className="eyebrow text-graphite/50">02 — Origem</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-graphite">
              Nascemos em Minas.
              <br />
              <span className="italic">Crescemos com método.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-graphite/70 max-w-md text-base md:text-lg leading-relaxed">
              A raiz está no sabor mineiro. A diferença está em como transformamos tradição em processo, processo em padrão, e padrão em marca.
            </motion.p>

            {/* Separator line */}
            <motion.div variants={fadeUp} className="w-12 h-px bg-accent-red/30" />

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col"
            >
              {metadata.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className={`flex justify-between items-center py-4 ${i < metadata.length - 1 ? "border-b border-graphite/10" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                    <span className="eyebrow text-graphite/40">{item.label}</span>
                  </span>
                  <span className="font-sans text-sm text-graphite">{item.value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={videoRef}
            variants={clipRevealVertical}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-7 lg:col-start-7 overflow-hidden"
          >
            <motion.div style={{ y: videoY }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-[4/5] object-cover"
              >
                <source src="/__l5e/assets-v1/10c0dd9d-fb82-40a7-a4fc-309a2aa0394a/origin-video.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Origin;
