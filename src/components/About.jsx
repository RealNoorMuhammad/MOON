import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Blinking border animation for about text
    gsap.to(".about-text", {
      borderColor: "white",
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] text-white">
          Lore
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* About Text Section with black background, padding, and blinking border */}
        <div className="about-text bg-black p-6 md:p-10 border-2 border-white rounded-md max-w-3xl text-white flex flex-col gap-3">
          <p>
            Other wolves had fierce names like Shadow Fang or Blood Howl, our boy got stuck with Moon Moon — the lovable idiot of the pack. He tripped over logs, ruined hunts, and howled at the wrong moon.
          </p>
          <p className="text-gray-300">
            Fast forward to today: Moon Moon has stumbled his way into crypto on Solana. 🐺💸
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
