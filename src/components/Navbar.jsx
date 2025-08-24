import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX, FiMusic } from "react-icons/fi";

import Button from "./Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Single MusicButton component
  const MusicButton = () => (
    <button
      onClick={toggleAudioIndicator}
      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition-colors"
    >
      <FiMusic size={24} className={clsx({ "text-blue-500": isIndicatorActive })} />
     
    </button>
  );

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm transition-all duration-700 sm:inset-x-6"
    >
      {/* Single audio element */}
      <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />

      <header className="w-full">
        <nav className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img src="/img/logo.png" alt="logo" className="w-14" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn"
              >
                {item}
              </a>
            ))}

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 flex items-center justify-center gap-1"
            />

            <MusicButton />
          </div>

          {/* Mobile Hamburger */}
        {/* Mobile Hamburger */}
<div className="md:hidden flex items-center gap-4">
  <MusicButton />

  <button onClick={toggleMobileMenu}>
    {isMobileMenuOpen ? (
      <FiX
        size={24}
        className={clsx(
          currentScrollY === 0 ? "text-black" : "text-white",
          "transition-colors duration-300"
        )}
      />
    ) : (
      <FiMenu
        size={24}
        className={clsx(
          currentScrollY === 0 ? "text-black" : "text-white",
          "transition-colors duration-300"
        )}
      />
    )}
  </button>
</div>

        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 p-4 bg-black border-t">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button
              id="product-button-mobile"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 flex items-center justify-center gap-1 w-full"
            />
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
