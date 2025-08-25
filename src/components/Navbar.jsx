import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX, FiMusic } from "react-icons/fi";

import Button from "./Button";

const navItems = ["About $MOON", "Dexscreener", "Telegram", "Twitter(X)"];

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
      className="flex items-center p-2 rounded hover:bg-gray-200 transition-colors"
    >
      <FiMusic
        size={24}
        className={clsx(
          "text-white transition-colors duration-300",
          isIndicatorActive && "text-blue-500"
        )}
      />
    </button>
  );

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm transition-all duration-700 border-b border-white"
    >
      <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />

      <header className="w-full">
        <nav className="flex items-center justify-between p-4 relative">
          {/* Left: Music */}
          <div className="absolute left-4 md:left-6 flex items-center">
            <MusicButton />
          </div>

          {/* Center: Logo */}
          <div className="mx-auto flex justify-center items-center">
            <img src="/img/logo.png" alt="logo" className="w-14" />
          </div>

          {/* Right: Hamburger Menu */}
          <div className="absolute right-4 md:right-6 flex items-center md:hidden">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <FiX size={24} className="text-white transition-colors duration-300" />
              ) : (
                <FiMenu size={24} className="text-white transition-colors duration-300" />
              )}
            </button>
          </div>

          {/* Desktop Menu (optional, hidden on scroll if needed) */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {navItems.map((item, index) => (
              <a key={index} href={`#${item.toLowerCase()}`} className="text-white nav-hover-btn">
                {item}
              </a>
            ))}
            <Button
              id="product-button"
              title="Buy $MOON"
              containerClass="bg-white text-black flex items-center justify-center gap-1"
            />
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 p-4 bg-black border-t border-gray-700">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn py-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button
              id="product-button-mobile"
              title="Buy Moon"
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
