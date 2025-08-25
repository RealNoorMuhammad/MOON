import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Memes from './Memes'
// Tilt Wrapper
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };

  const handleMouseLeave = () => setTransformStyle("");

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Card
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  return (
    <div className="relative size-full">
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={typeof title === "string" ? title : "bento-media"}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}

      {/* ✅ Centered Text */}
      <div className="relative z-10 flex size-full flex-col items-center justify-center p-5 text-blue-50 text-center">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-xl text-xs md:text-base mx-auto">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative mt-6 flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Features Section
const Features = () => (
  <section className="bg-black pb-1">
    <div className="container mx-auto px-3 md:px-10">
      {/* Section Intro */}
      <div className="px-5 py-32 text-center">
        <p className="font-circular-web text-lg text-blue-50">
         <h1 className="bento-title special-font text-3xl md:text-4xl">
       How to Buy $MOON
      </h1>
        </p>
      
      </div>

      {/* How to Buy Card */}
 <BentoTilt className="border-hsla relative mb-7 h-auto w-full overflow-hidden rounded-md md:h-[70vh]">
  <div className="relative size-full">
    {/* Background GIF */}
    <img
      src="videos/one.gif"
      alt="How to Buy MoonMoon"
      className="absolute left-0 top-0 size-full object-cover object-center"
    />

    {/* 🔥 Black overlay */}
    <div className="absolute inset-0 bg-black/70 mix-blend-multiply"></div>


    <div className="relative z-10 flex size-full flex-col items-center justify-center p-8 text-center text-white">
      

      <div className="space-y-6 mt-6 text-sm md:text-base leading-relaxed max-w-2xl">
        <div>
          
         <b><div className="flex items-center justify-center gap-6 pb-2">
          <img src="/videos/phantom.png" alt="Phantom" className="h-10 w-10" />
    
        </div></b>
          <p className="opacity-80">
            Download <span className="font-bold">Phantom</span> or{" "}
            <span className="font-bold">Solflare</span> — your shiny bag
            to carry $MOONMOON.
          </p>
        </div>
        <div>
        <b><div className="flex items-center justify-center gap-6 pb-2">
          <img src="/videos/solana.png" alt="Phantom" className="h-12 w-12" />
    
        </div></b>
      
          <p className="opacity-80">
            Buy some SOL from Coinbase, Binance, etc. and send it to your wallet.
          </p>
        </div>
        <div>
         <b><div className="flex items-center justify-center gap-6 pb-2">
          <img src="/img/logo.png" alt="Phantom" className="h-12 w-12" />
    
        </div></b>
          <p className="opacity-80">
            Go to <span className="font-bold">Raydium</span> or{" "}
            <span className="font-bold">Jupiter DEX</span>, swap your SOL for $MOON.
          </p>
        </div>
        <div>
          <b><div className="flex items-center justify-center gap-6 pb-3">
          <img src="/videos/arrow.png" alt="Phantom" className="h-10 w-10" />
    
        </div></b>
          <p className="opacity-80">
            That’s it — you’re officially part of the wolf pack. Howl with us as we stumble, trip, and moon together.
          </p>
        </div>

        {/* Icon Row */}
       
      </div>
    </div>
  </div>
</BentoTilt>


      {/* Grid Features */}
   <div>
  <Memes/>

   </div>


    </div>
  </section>
);

export default Features;
