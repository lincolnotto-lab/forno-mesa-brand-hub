import { useReducedMotion } from "framer-motion";

export const useReducedMotionSafe = () => useReducedMotion() ?? false;
