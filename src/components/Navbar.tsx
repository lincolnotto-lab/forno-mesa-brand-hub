import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const navLinks = [
  { label: "Marca", href: "#marca", num: "01" },
  { label: "Produto", href: "#produto", num: "02" },
  { label: "Operação", href: "#operacao", num: "03" },
  { label: "Contato", href: "#contato", num: "04" },
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
  const [activeSection, setActiveSection] = useState("top");

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
              setActiveSection(id);
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? `${navTheme === "dark" ? "bg-ink/80" : "bg-bone/80"} backdrop-blur-sm`
            : "bg-transparent"
        }`}
        style={{ transitionTimingFunction: "var(--ease-smooth)" }}
      >
        <div
          className={`max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3" : "py-5"
          }`}
          style={{ transitionTimingFunction: "var(--ease-smooth)" }}
        >
          <a
            href="#top"
            className="transition-all duration-500"
            style={{ transitionTimingFunction: "var(--ease-smooth)" }}
          >
            <img
              src={navTheme === "dark" ? logoLight : logoDark}
              alt="Forno & Mesa"
              className={`transition-all duration-500 ${scrolled ? "h-8 md:h-9" : "h-10 md:h-11"}`}
              style={{ transitionTimingFunction: "var(--ease-smooth)" }}
            />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative eyebrow transition-colors duration-500 ${
                    isActive
                      ? navTheme === "dark" ? "text-bone" : "text-graphite"
                      : textMuted
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-accent-red transition-all duration-500 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                    style={{ transitionTimingFunction: "var(--ease-smooth)" }}
                  />
                </a>
              );
            })}
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
                  className="flex items-baseline gap-4"
                >
                  <span className="eyebrow text-graphite/30">{link.num}</span>
                  <span className="font-serif text-graphite text-4xl tracking-tight">
                    {link.label}
                  </span>
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
