import { motion } from "framer-motion";
import { fadeUp, staggerContainer, clipRevealVertical, viewportConfig } from "@/lib/motion";

const metadata = [
  { label: "Origem", value: "Minas Gerais" },
  { label: "Método", value: "Produção padronizada" },
  { label: "Posicionamento", value: "Marca premium B2B" },
];

const Origin = () => {
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
            <motion.span variants={fadeUp} className="eyebrow text-graphite/60">Origem</motion.span>

            <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-graphite">
              Nascemos em Minas.
              <br />
              <span className="italic">Crescemos com método.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-graphite/70 max-w-md text-base leading-relaxed">
              Nossa raiz mineira está no sabor. Nossa diferença está na forma como transformamos isso em padrão, escala e marca.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col mt-4">
              {metadata.map((item, i) => (
                <div key={item.label} className={`flex justify-between items-center py-4 ${i < metadata.length - 1 ? "border-b border-graphite/15" : ""}`}>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                    <span className="eyebrow text-graphite/50">{item.label}</span>
                  </span>
                  <span className="font-sans text-sm text-graphite">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={clipRevealVertical}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-7 lg:col-start-7"
          >
            <img
              src="/origin.jpg"
              alt="Forno & Mesa — detalhe de produto"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
              width={960}
              height={1200}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Origin;
