import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useEffect } from "react";

import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [hasClicked, setHasClicked] = useState(false);

  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const starsRef = useRef([]);
  const previewContainerRef = useRef(null);

  const handleMiniClick = () => {
    setHasClicked(true);

    gsap.set("#next-video", { visibility: "visible" });
    gsap.to("#next-video", {
      transformOrigin: "center center",
      scale: 1,
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power1.inOut",
      onStart: () => videoRef.current?.play(),
    });
    gsap.from("#current-image", {
      transformOrigin: "center center",
      scale: 0,
      duration: 1.5,
      ease: "power1.inOut",
    });
  };

  // Twinkling stars
  useEffect(() => {
    starsRef.current.forEach((star) => {
      gsap.to(star, {
        opacity: Math.random(),
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  // Pop-up image animation every 3 seconds
  useEffect(() => {
    gsap.to(imgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      repeatDelay: 2, // Wait 2 seconds before popping again, total 3s including animation
    });
  }, []);

  // Scroll-triggered video frame animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  // Generate star elements
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2 + 1;
      stars.push(
        <div
          key={i}
          ref={(el) => (starsRef.current[i] = el)}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: size,
            height: size,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: Math.random(),
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 -z-20">{renderStars()}</div>

      {/* Black background layer */}
      <div className="absolute inset-0 -z-10 " />

      {/* Animated Pop-up Image */}
      <div
        ref={previewContainerRef}
        className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <img
          ref={imgRef}
          src="https://res.cloudinary.com/dnbeefkuz/image/upload/v1756022392/4994632179237629484_psg3jv.jpg"
          alt="preview"
          className="absolute top-0 left-0 w-64 h-64 object-cover opacity-0 scale-50 rounded-lg"
        />
      </div>

      {/* Video frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div onClick={handleMiniClick} className="origin-center">
                <img
                  ref={imgRef}
                  src="https://res.cloudinary.com/dnbeefkuz/image/upload/v1756022392/4994632179237629484_psg3jv.jpg"
                  alt="preview"
                  id="current-image"
                  className="size-64 origin-center scale-150 object-cover object-center opacity-0"
                />
              </div>
            </VideoPreview>
          </div>
        </div>

        {/* Overlay Text */}
        <h1 className="special-font hero-heading absolute right-5 z-40 text-blue-75 bottom-24">
          $MOON
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 text-shadow-outline">
              $MOON 
            </h1>
          </div>
        </div>
      </div>

      {/* Second Heading */}
      <h1 className="special-font hero-heading text-shadow-outline absolute right-5 z-40 text-white bottom-24">
        $MOON
      </h1>
    </div>
  );
};

export default Hero;
