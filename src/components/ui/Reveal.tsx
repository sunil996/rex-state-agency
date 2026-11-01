"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: keyof typeof variants;
  once?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={variants.up}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </motion.div>
  );
}
