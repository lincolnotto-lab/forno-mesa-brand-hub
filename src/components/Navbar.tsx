import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

const navLinks = [
  { label: "Marca", href: "#marca" },
  { label: "Produto", href: "#produto" },
  { label: "Operação", href: "#operacao" },
  { label: "Contato", href: "#contato" },
];

const sectionThemes: Record<string, "light" | "dark"> = {
  top: "dark",
  marca: "light",
  produto: "light",
  operacao: "dark",
  contato: "light",
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = Object.keys(sectionThemes);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setNavTheme(sectionThemes[id]);
            }
          });
        },
        { rootMargin: "-45% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const textColor = navTheme === "dark" ? "text-bone" : "text-graphite";
  const textMuted = navTheme === "dark" ? "text-bone/70" : "text-graphite/60";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled
            ? `${navTheme === "dark" ? "bg-ink/80" : "bg-bone/80"} backdrop-blur-sm border-b ${navTheme === "dark" ? "border-bone/10" : "border-graphite/10"}`
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "var(--ease-smooth)" }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-5 flex items-center justify-between">
          <a href="#top" className={`font-serif text-xl tracking-tight transition-colors duration-400 ${textColor}`}>
            Forno <span className="text-accent-red">&</span> Mesa
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`eyebrow transition-colors duration-500 ${textMuted} hover:${textColor}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
            <a href="#contato" className={`eyebrow transition-colors duration-500 ${textMuted}`}>
              Falar com vendas
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Abrir menu"
          >
            <span className={`w-6 h-px transition-colors duration-400 ${navTheme === "dark" ? "bg-bone" : "bg-graphite"}`} />
            <span className={`w-6 h-px transition-colors duration-400 ${navTheme === "dark" ? "bg-bone" : "bg-graphite"}`} />
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
