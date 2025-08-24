import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moonImg from "./moon.png"; // your moon image

gsap.registerPlugin(ScrollTrigger);

const Background = () => {
  const moonRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    // Moon scroll movement
    gsap.to(moonRef.current, {
      y: 500, // adjust depth as needed
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Animate stars: twinkle, drift, and scale on scroll
    starsRef.current.forEach((star, i) => {
      // Twinkle effect
      gsap.to(star, {
        opacity: gsap.utils.random(0.3, 1),
        scale: gsap.utils.random(0.8, 1.5),
        duration: gsap.utils.random(1, 3),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.05,
      });

      // Slow drifting
      gsap.to(star, {
        x: `+=${gsap.utils.random(-30, 30)}`,
        y: `+=${gsap.utils.random(-30, 30)}`,
        duration: gsap.utils.random(10, 20),
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Scale subtly based on scroll (zoom effect)
      gsap.to(star, {
        scale: gsap.utils.random(0.8, 1.8),
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (starsRef.current[i] = el)}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${gsap.utils.random(1, 2)}px`,
              height: `${gsap.utils.random(1, 2)}px`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <motion.div
        ref={moonRef}
        className="absolute top-20 left-1/2 -translate-x-1/2 rounded-full"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "180px",
          height: "180px",
          backgroundImage: `url(${moonImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

export default Background;
