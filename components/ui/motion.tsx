"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/client/utils";

// Watermelon spring configuration
export const watermelonSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

export const watermelonGentleSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 24,
};

// ── FadeIn Primitive ───────────────────────────────────────────────
export interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  viewportOnce?: boolean;
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      children,
      className,
      direction = "up",
      delay = 0,
      duration = 0.5,
      viewportOnce = true,
      ...props
    },
    ref
  ) => {
    const offsets = {
      up: { y: 24, x: 0 },
      down: { y: -24, x: 0 },
      left: { x: 24, y: 0 },
      right: { x: -24, y: 0 },
      none: { x: 0, y: 0 },
    };

    const initial = {
      opacity: 0,
      ...offsets[direction],
    };

    return (
      <motion.div
        ref={ref}
        initial={initial}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: viewportOnce, margin: "-40px" }}
        transition={{
          duration,
          delay,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeIn.displayName = "FadeIn";

// ── Staggered Container & Items ────────────────────────────────────
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const FadeInStagger = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeInStagger.displayName = "FadeInStagger";

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
    },
  },
};

export const FadeInStaggerItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={staggerItemVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeInStaggerItem.displayName = "FadeInStaggerItem";

// ── Spring Card ────────────────────────────────────────────────────
export const SpringCard = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{
          y: -4,
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
        whileTap={{
          scale: 0.99,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
        className={cn(
          "relative rounded-xl border border-white/10 bg-[#161619] p-5 shadow-md transition-colors hover:border-white/20",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
SpringCard.displayName = "SpringCard";

// ── Interactive Spring Button ──────────────────────────────────────
export const SpringButton = forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
SpringButton.displayName = "SpringButton";
