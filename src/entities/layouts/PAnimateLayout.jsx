import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

export const PAnimateLayout = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5, type: "easeInOut" }}
        style={{ position: "relative" }}>
        <>{children}</>
      </motion.div>
    </AnimatePresence>
  );
};
