import React from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { useQuizStore } from "../store/store";

interface GameStatBarProps {
  points: number;
  lives: number;
}

const GameStatBar: React.FC<GameStatBarProps> = ({ points, lives = 3 }) => {
  const { isMusicPlaying, toggleMusic } = useQuizStore();

  return (
    <div className="relative">
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center p-4 mb-4 bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg relative overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ElectricBorder />
        <PointsDisplay points={points} />
        <div className="z-10 my-4 sm:my-0">
          <ConnectButton>Connect Wallet</ConnectButton>
        </div>
        <LivesDisplay lives={lives} />
      </motion.div>
      <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />
    </div>
  );
};

const ElectricBorder: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 rounded-lg"
      initial={{ opacity: 0.5 }}
      animate={{
        boxShadow: [
          `0 0 2px #00ffff,
           0 0 4px #00ffff,
           0 0 6px #00ffff,
           0 0 10px rgba(0, 255, 255, 0.3),
           inset 0 0 2px #00ffff,
           inset 0 0 4px #00ffff`,
          `0 0 4px #00ffff,
           0 0 8px #00ffff,
           0 0 12px #00ffff,
           0 0 20px rgba(0, 255, 255, 0.6),
           inset 0 0 4px #00ffff,
           inset 0 0 8px #00ffff`,
          `0 0 2px #00ffff,
           0 0 4px #00ffff,
           0 0 6px #00ffff,
           0 0 10px rgba(0, 255, 255, 0.3),
           inset 0 0 2px #00ffff,
           inset 0 0 4px #00ffff`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

const PointsDisplay: React.FC<{ points: number }> = ({ points }) => {
  return (
    <motion.div
      className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center cyberpunk-text"
      whileHover={{ scale: 1.1 }}
    >
      <motion.span
        className="mr-2 text-stroke-sm"
        animate={{
          textShadow: [
            "0 0 5px #00ffff, 0 0 10px #00ffff",
            "0 0 10px #00ffff, 0 0 20px #00ffff",
            "0 0 5px #00ffff, 0 0 10px #00ffff",
          ],
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Points:
      </motion.span>
      <motion.span
        key={points}
        className="text-glow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {points}
      </motion.span>
    </motion.div>
  );
};

const LivesDisplay: React.FC<{ lives: number }> = ({ lives }) => {
  return (
    <div className="flex items-center space-x-2">
      <motion.span
        className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mr-2 text-stroke-sm cyberpunk-text"
        animate={{
          textShadow: [
            "0 0 5px #00ffff, 0 0 10px #00ffff",
            "0 0 10px #00ffff, 0 0 20px #00ffff",
            "0 0 5px #00ffff, 0 0 10px #00ffff",
          ],
        }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Lives:
      </motion.span>
      <div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <LifeIcon key={index} active={index < lives} />
        ))}
      </div>
    </div>
  );
};

const LifeIcon: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <motion.div
      className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
        active ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gray-700"
      }`}
      initial={{ scale: 1, rotate: 0 }}
      animate={
        active
          ? { scale: [1, 1.2, 1], rotate: [0, 360, 0] }
          : { scale: 0.8, rotate: 360 }
      }
      transition={
        active
          ? { duration: 1, repeat: Infinity, repeatDelay: 1 }
          : { duration: 2, repeat: Infinity, ease: "linear" }
      }
    >
      {active && (
        <motion.div
          className="w-4 h-4 sm:w-6 sm:h-6 bg-cyan-300 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
          }}
        />
      )}
    </motion.div>
  );
};

const MusicToggle: React.FC<{ isPlaying: boolean; onToggle: () => void }> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <motion.div
      className="absolute bottom-[-40px] right-4 z-20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button
        className="text-cyan-400 bg-black bg-opacity-50 rounded-full p-3"
        onClick={onToggle}
        animate={{
          rotate: isPlaying ? [0, 10, -10, 0] : 0,
          scale: isPlaying ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isPlaying ? Infinity : 0,
          repeatDelay: 1,
        }}
      >
        {isPlaying ? (
          <FaVolumeUp size={32} className="text-glow-cyan" />
        ) : (
          <FaVolumeMute size={32} className="text-glow-cyan" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default GameStatBar;
