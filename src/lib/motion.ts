export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const clipRevealVertical = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.1, ease },
  },
};

export const clipRevealHorizontal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.1, ease },
  },
};

export const clipRevealUp = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: { duration: 1.1, ease },
  },
};

export const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.6, ease, delay: 0.5 },
  },
};

export const viewportConfig = {
  once: true,
  margin: "-20%" as const,
};
