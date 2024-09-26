import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { FaBars, FaTimes, FaPlay } from "react-icons/fa";
import "./Navbar.css";
import { ConnectButton } from "@mysten/dapp-kit";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`p-4 md:px-10 fixed left-0 right-0 top-0 z-50 mx-auto w-full md:w-[80%] rounded-lg transition-all duration-300 ${
        isScrolled ? "bg-gray-900 bg-opacity-90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          <button className="flex items-center space-x-2 cursor-pointer">
            <img src={logo} alt="GMFI Logo" className="h-8 w-auto" />
          </button>
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <div className="w-2" />
          <div className="play-button-3d">
            <div className="play-button-face front">
              <ConnectButton className="btn btn-primary font-bold uppercase text-base-content hover:text-secondary" />
            </div>
            <div className="play-button-face back">
              <ConnectButton className="btn btn-primary font-bold uppercase text-base-content hover:text-secondary" />
            </div>
            <div className="play-button-face top"></div>
            <div className="play-button-face bottom"></div>
            <div className="play-button-face left"></div>
            <div className="play-button-face right"></div>
          </div>
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
