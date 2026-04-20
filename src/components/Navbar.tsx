import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

const navLinks = [
  { label: "Marca", href: "#origem" },
  { label: "Produto", href: "#produto" },
  { label: "Operação", href: "#operacao" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between">
          <a href="#" className="font-serif text-xl text-bone tracking-tight">
            Forno <span className="text-accent-red">&</span> Mesa
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="eyebrow text-bone hover:opacity-60 transition-opacity duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
            <a href="#contato" className="eyebrow text-bone hover:opacity-60 transition-opacity duration-500">
              Falar com vendas
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Abrir menu"
          >
            <span className="w-6 h-px bg-bone" />
            <span className="w-6 h-px bg-bone" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[60] bg-bone flex flex-col items-start justify-center px-6"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-6 eyebrow text-graphite"
              aria-label="Fechar menu"
            >
              Fechar
            </button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.1 }}
                  className="font-serif text-graphite text-4xl tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.4 }}
                className="flex items-center gap-2 mt-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                <span className="eyebrow text-graphite">Falar com vendas</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
