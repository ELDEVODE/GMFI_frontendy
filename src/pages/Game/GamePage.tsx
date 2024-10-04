import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar2";
import { motion } from "framer-motion";
import { bg2, cutout2, cutout8, flybot1, mainType } from "../../assets";
import SciFiMenu from "../../components/SciFiMenu";
import {
  Play,
  Settings,
  BarChart2,
  Trophy,
  User,
  Award,
  ShoppingCart,
} from "lucide-react";
import PlayModal from "../../modals/PlayModal";
import OptionsModal from "../../modals/OptionsModal";
import StatsModal from "../../modals/StatsModal";
import LeaderboardModal from "../../modals/LeaderboardModal";
import ProfileModal from "../../modals/ProfileModal";
import AchievementsModal from "../../modals/AchievementsModal";
import ShopModal from "../../modals/ShopModal";
import MusicPlayer from "../../components/MusicPlayer";

export default function GamePage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [cutoutPositions, setCutoutPositions] = useState({
    cutout1: { right: "-10%", bottom: "-10%" },
    cutout2: { left: "-10%", top: "-10%" },
    cutout3: { left: "-10%", bottom: "-10%" },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger the animation
    const timer = setTimeout(() => setIsLoaded(true), 500);

    // Animate cutout images to their final positions
    setTimeout(() => {
      setCutoutPositions({
        cutout1: { right: "0%", bottom: "0%" },
        cutout2: { left: "10%", top: "10%" },
        cutout3: { left: "0%", bottom: "0%" },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  const menuOptions = [
    {
      label: "Play",
      onClick: () => setActiveModal("play"),
      icon: <Play size={18} />,
    },
    {
      label: "Options",
      onClick: () => setActiveModal("options"),
      icon: <Settings size={18} />,
    },
    {
      label: "Stats",
      onClick: () => setActiveModal("stats"),
      icon: <BarChart2 size={18} />,
    },
    {
      label: "Leaderboard",
      onClick: () => setActiveModal("leaderboard"),
      icon: <Trophy size={18} />,
    },
    {
      label: "Profile",
      onClick: () => setActiveModal("profile"),
      icon: <User size={18} />,
    },
    {
      label: "Achievements",
      onClick: () => setActiveModal("achievements"),
      icon: <Award size={18} />,
    },
    {
      label: "Shop",
      onClick: () => setActiveModal("shop"),
      icon: <ShoppingCart size={18} />,
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      <Navbar />
      <div
        className="h-full inset-0 absolute"
        style={{
          backgroundImage: `url(${bg2})`,
          transform: `translateY(${scrollY * 0.5}px)`,
          boxShadow: `0 0 20px 2px rgba(0, 255, 255, 0.2), 0 0 70px 10px rgba(0, 255, 255, 0.1)`,
        }}
      />

      <div
        id="hero"
        className={`relative h-screen overflow-hidden bg-gray-900 bg-opacity-85`}
      >
        <div
          className="absolute inset-[10%] blur-[1.1px] bg-cover bg-top bg-no-repeat rounded-2xl transition-shadow duration-[1000ms] ease-in-out"
          style={{
            backgroundImage: `url(${bg2})`,
            transform: `translateY(${scrollY * 0.5}px)`,
            boxShadow: `0 0 20px 2px rgba(0, 255, 255, 0.2), 0 0 70px 10px rgba(0, 255, 255, 0.1)`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.img
            src={mainType}
            alt=""
            className={`mb-8 w-64 transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
            } animate-glow`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <SciFiMenu options={menuOptions} maxVisibleOptions={3} />
          </motion.div>
        </div>

        {/* cutout images */}
        <img
          src={cutout8}
          alt=""
          className="z-9 w-[22vw] hidden md:block absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout1,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        {/* <img
          src={flybot1}
          alt=""
          className="z-9 w-[18vw] blur-[.4px] hidden md:block absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout2,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        /> */}
        <img
          src={cutout2}
          alt=""
          className="z-9 w-[25vw] hidden md:block absolute transition-all duration-1000 ease-out"
          style={{
            ...cutoutPositions.cutout3,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
      </div>

      <motion.div
        className="text-center py-4 bg-transparent w-full flex absolute bottom-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="font-bold text-center w-full">Powered by Team Spark ✨</p>
      </motion.div>

      <PlayModal isOpen={activeModal === "play"} onClose={closeModal} />
      <OptionsModal isOpen={activeModal === "options"} onClose={closeModal} />
      <StatsModal isOpen={activeModal === "stats"} onClose={closeModal} />
      <LeaderboardModal
        isOpen={activeModal === "leaderboard"}
        onClose={closeModal}
      />
      <ProfileModal isOpen={activeModal === "profile"} onClose={closeModal} />
      <AchievementsModal
        isOpen={activeModal === "achievements"}
        onClose={closeModal}
      />
      <ShopModal isOpen={activeModal === "shop"} onClose={closeModal} />
      <MusicPlayer />
    </div>
  );
}

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};
