import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes, FaPlay } from "react-icons/fa";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { to: "hero", label: "Home" },
    { to: "about", label: "About" },
    { to: "roadmap", label: "Roadmap" },
    { to: "community", label: "Community" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);

      // Determine active section
      if (scrollPosition < 10) {
        setActiveSection("hero");
      } else {
        const viewportHeight = window.innerHeight;
        const scrollBottom = scrollPosition + viewportHeight;

        for (const item of [...navItems].reverse()) {
          if (item.to === "hero") continue; // Skip "hero" section in this loop
          const element = document.getElementById(item.to);
          if (
            element &&
            element.offsetTop < scrollBottom - viewportHeight / 3
          ) {
            setActiveSection(item.to);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`p-4 md:px-10 fixed left-0 right-0 top-0 z-50 mx-auto w-full md:w-[80%] rounded-lg transition-all duration-300 ${
        isScrolled ? "bg-gray-900 bg-opacity-90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={logo} alt="GMFI Logo" className="h-8 w-auto" />
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => scrollToSection(item.to)}
              className={`nav-link cursor-pointer transition-all duration-300 relative ${
                isScrolled
                  ? "text-white hover:text-gray-300"
                  : "text-white hover:text-gray-200"
              }`}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform origin-left transition-all duration-300 ease-in-out ${
                  activeSection === item.to ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </button>
          ))}
          <div className="w-2" />
          <Link to="/game" className="play-button-3d">
            <div className="play-button-face front">
              <FaPlay className="text-sm mr-2" />
              <span>Play Now</span>
            </div>
            <div className="play-button-face back">
              <FaPlay className="text-sm mr-2" />
              <span>Play Now</span>
            </div>
            <div className="play-button-face top"></div>
            <div className="play-button-face bottom"></div>
            <div className="play-button-face left"></div>
            <div className="play-button-face right"></div>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-gray-900 transition-all duration-300 ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.to}
            onClick={() => scrollToSection(item.to)}
            className={`nav-link block py-2 px-4 cursor-pointer w-full text-left text-white hover:bg-gray-800 relative`}
          >
            {item.label}
            <span
              className={`absolute left-0 top-0 h-full w-1 bg-cyan-400 transform origin-top transition-all duration-300 ease-in-out ${
                activeSection === item.to ? "scale-y-100" : "scale-y-0"
              }`}
            ></span>
          </button>
        ))}
        <Link
          to="/game"
          className="play-button-3d-mobile block py-2 px-4"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaPlay className="inline-block mr-2 text-sm" />
          Play Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
