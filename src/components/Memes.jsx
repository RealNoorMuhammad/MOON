import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Memes = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".meme-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const images = [
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151466/295104989_367191092265265_252369350061642269_n_ltpnxu.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151466/cc63b7b27bb098433a3f33f0fd47ca8952c4cddfd099750e73edf18a42fe29d3_1_pzjemd.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151466/da7fabdf93a8c6b201929f174c525f84_hd3ood.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151467/aXPWv2D_460s_mvshli.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151467/958b79ebddfbb0703dd830f9c3608c0d_z1q1h1.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151467/E8_I_WoX0A8MX4j_xjeeti.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151467/tumblr_mm391p5obL1rx9f6no1_640_q4kfyn.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151470/Moon-Moon-Memes-3_lghvar.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151467/Moon-Moon-Memes-15_jpxrjj.jpg",
    "https://res.cloudinary.com/dnbeefkuz/image/upload/v1756151468/E8_I_WrWQAcYm4r_f7g8fp.jpg"
  ];

  return (
    <section
      ref={galleryRef}
      className="relative z-10 w-full bg-black py-16 px-6"
    >
      <h2 className="mb-12 text-center text-3xl md:text-5xl font-bold text-white">
        Gallery
      </h2>

      <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
        {images.map((src, i) => (
          <div
            key={i}
            className="meme-card group relative flex items-center justify-center bg-gray-900 rounded-2xl shadow-lg cursor-pointer aspect-[4/3] overflow-hidden"
          >
            <img
              src={src}
              alt={`Meme ${i + 1}`}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
              <p className="text-white text-lg font-semibold">Meme #{i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Memes;
