import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/motion";

const Footer = () => {
  return (
    <footer className="bg-wine text-bone/70 relative">
      {/* Accent line on top */}
      <div className="h-px bg-accent-red/30 w-full" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-6 pb-12 border-b border-bone/10"
        >
          {/* Left — Logo large */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <span className="font-serif text-3xl md:text-4xl text-bone tracking-tight font-light">
              Forno <span className="text-accent-red">&</span> Mesa
            </span>
            <p className="text-sm text-bone/40 max-w-xs">
              Pão de queijo mineiro. Padrão de indústria.
            </p>
          </motion.div>

          {/* Right — Links + info stacked */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-bone/30 mb-1">Navegação</span>
              <a href="#marca" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Marca</a>
              <a href="#produto" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Produto</a>
              <a href="#operacao" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Operação</a>
              <a href="#contato" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Contato</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow text-bone/30 mb-1">Informações</span>
              <span className="text-sm text-bone/40">Contagem, MG — Brasil</span>
              <span className="text-sm text-bone/40">CNPJ 00.000.000/0001-00</span>
              <div className="flex gap-4 mt-1">
                <a href="#" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">LinkedIn</a>
                <a href="#" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Instagram</a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-between pt-6">
          <p className="text-[10px] eyebrow text-bone/25">
            © 2026 Forno & Mesa
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2"
          >
            <span className="eyebrow text-[10px] text-bone/30 group-hover:text-bone/60 transition-colors duration-500">Topo</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-bone/30 text-sm group-hover:text-bone/60 transition-colors duration-500"
            >
              ↑
            </motion.span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
