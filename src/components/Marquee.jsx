import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Marquee = () => {
  const { scrollY } = useScroll();

  // Create a scroll-based animation for marquee speed or direction
  const x = useTransform(scrollY, [0, 1000], [0, -500]);

  const marqueeStyle = {
    whiteSpace: "nowrap",
    display: "inline-block",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#4fd9ffff",
    textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
  };

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        background: "linear-gradient(90deg, #0b0b0c, #1a1a1a)",
        padding: "2rem 0",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          x, // animated position
        }}
        animate={{
          x: ["0%", "-50%"], // continuous loop animation
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,
          ease: "linear",
        }}
      >
        {/* Repeat text multiple times for smooth marquee */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} style={marqueeStyle}>
            $MOON&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
