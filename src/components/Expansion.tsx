import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp, staggerContainer, viewportConfig, ease } from "@/lib/motion";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  const prefix = value > 100 ? "+ " : "";
  return <span ref={ref}>{prefix}{display.toLocaleString("pt-BR")}{suffix}</span>;
};

const metrics = [
  { value: 2400, suffix: "", label: "Toneladas por ano" },
  { value: 98.7, suffix: " %", label: "Consistência de lote", decimals: true },
  { value: 12, suffix: "", label: "Estados atendidos" },
];

const Expansion = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section id="operacao" ref={sectionRef} className="relative bg-ink min-h-[100svh] overflow-hidden flex items-center">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src="/factory.jpg"
          alt="Fábrica"
          className="w-full h-[120%] object-cover opacity-40"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-28 md:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="w-10 h-px bg-accent-red" />
              <span className="eyebrow text-bone/50">04 — Operação</span>
            </motion.div>

            <motion.h2 variants={fadeUp} className="text-h2-section font-serif text-bone">
              Estrutura para crescer.
              <br />
              <em className="italic">Capacidade para entregar.</em>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-bone/60 max-w-lg text-base leading-relaxed">
              Expandimos mercado com base em produção sólida, operação organizada e visão de longo prazo. Não crescemos no improviso. Crescemos com consistência.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="lg:col-span-4 lg:col-start-9 flex flex-col"
          >
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className={`py-6 ${i < metrics.length - 1 ? "border-b border-bone/15" : ""}`}
              >
                <div className="font-serif text-5xl md:text-6xl text-bone font-light tracking-tight">
                  {m.decimals ? (
                    <CounterDecimal value={m.value} />
                  ) : (
                    <Counter value={m.value} suffix={m.suffix} />
                  )}
                </div>
                <span className="eyebrow text-bone/40 mt-2 block">{m.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CounterDecimal = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState("0,0");

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setDisplay(current.toFixed(1).replace(".", ","));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{display} %</span>;
};

export default Expansion;
