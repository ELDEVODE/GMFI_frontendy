import React, { useEffect, useState, useRef } from "react";
import {
  cutout1,
  cutout2,
  cutout3,
  float1,
  HeroBg,
  mainType,
  TopBg,
} from "../assets";
import CustomButton from "../components/CustomButton";
import { AboutSection, CommunitySection, Roadmap } from "../components";
import "../styles/roadmap.css";
import Features from "../components/Features";
import { features } from "../constants";

function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cutoutPositions, setCutoutPositions] = useState({
    cutout1: { right: "-10%", bottom: "-10%" },
    cutout2: { right: "40%", bottom: "-10%" },
    cutout3: { left: "-10%", bottom: "-10%" },
  });

  const communitySectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    // Set isLoaded to true after a short delay to trigger the animation
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // Animate cutout images to their final positions
    setTimeout(() => {
      setCutoutPositions({
        cutout1: { right: "0%", bottom: "0%" },
        cutout2: { right: "calc(50% - 10vw)", bottom: "0%" },
        cutout3: { left: "0%", bottom: "0%" },
      });
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen text-white font-orbitron overflow-x-hidden bg-cover bg-top bg-no-repeat`}
      style={{ backgroundImage: `url(${TopBg})` }}
    >
      {/* Hero section */}
      <div
        id="hero"
        className={`relative h-screen overflow-hidden bg-gray-800 bg-opacity-85`}
      >
        <div
          className="absolute inset-[10%] bg-cover bg-top bg-no-repeat rounded-2xl transition-shadow duration-[1000ms] ease-in-out"
          style={{
            backgroundImage: `url(${HeroBg})`,
            transform: `translateY(${scrollY * 0.5}px)`,
            boxShadow: isLoaded
              ? `0 0 20px 2px rgba(212,193,230, 0.2), 0 0 70px 10px rgba(212,193,230, 0.1)`
              : "none",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <img
            src={mainType}
            alt=""
            className={`mb-8 transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
            } animate-glow`}
          />
          <CustomButton to="/game">Enter Game</CustomButton>
        </div>

        {/* cutout images */}
        <img
          src={cutout1}
          alt=""
          className="z-9 w-[35vw] absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout1,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        {/* <img
          src={cutout2}
          alt=""
          className="z-9 w-[20vw] absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout2,
            transform: `translateY(${scrollY * 0.2}px) translateX(${
              scrollY * 0.1
            }px)`,
          }}
        /> */}
        <img
          src={cutout3}
          alt=""
          className="z-9 w-[35vw] absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout3,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      {/* About section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Features section */}
      <Features features={features} />

      {/* Roadmap section */}
      <div id="roadmap">
        <Roadmap />
      </div>

      {/* Community section */}
      <div id="community" ref={communitySectionRef}>
        <CommunitySection scrollY={scrollY} parentRef={communitySectionRef} />
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-24 h-24 rounded-full border-2 border-cyan-400 opacity-50"
          style={{
            top: "20%",
            left: "10%",
            transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.1}px)`,
          }}
        />
        <div
          className={`absolute w-20 h-20 bg-[url('../assets/cutouts/float1.png')] opacity-50`}
          style={{
            top: "60%",
            right: "15%",
            transform: `translate(${scrollY * -0.15}px, ${scrollY * 0.12}px)`,
          }}
        />

        <div
          className="absolute w-16 h-16 bg-cyan-400 opacity-40"
          style={{
            top: "40%",
            left: "80%",
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
          }}
        />
      </div>
    </div>
  );
}

export default LandingPage;
