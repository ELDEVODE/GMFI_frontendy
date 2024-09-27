import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar2";
import { motion } from "framer-motion";
import { Star, Trophy, Users } from "lucide-react";

export default function GamePage() {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b text-white flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12 flex flex-col justify-center">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
        >
          <motion.div className="max-w-3xl mx-auto">
            <motion.h1
              className="text-6xl font-bold mb-8 shadow-text bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                WebkitTextStroke: "1px black",
              }}
            >
              Epic Trivia Adventure
            </motion.h1>
            <motion.p
              className="text-2xl mb-16 shadow-text bg-gradient-to-b from-[#d4ffff] to-[#8a2be2] bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Choose Your Battle Mode!
            </motion.p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <GameModeButton
                to="/game/single-player"
                icon={<Star size={24} />}
                text="Single Player"
              />
              <GameModeButton
                to="/multiplayer-points"
                icon={<Trophy size={24} />}
                text="Multiplayer Points"
              />
              <GameModeButton
                to="/multiplayer-stakes"
                icon={<Users size={24} />}
                text="Multiplayer Stakes"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="text-center py-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-xl font-bold shadow-text bg-gradient-to-b from-[#00ffff] to-[#8a2be2] bg-clip-text text-transparent">
          Powered by Team Spark ✨
        </p>
      </motion.div>
    </div>
  );
}

const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

const GameModeButton = ({ to, icon, text }) => (
  <Link to={to} className="w-full md:w-auto">
    <motion.button
      className="w-full py-4 px-6 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-gray-800 font-bold text-lg"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  </Link>
);

// Add this to your global CSS or in a style tag in your HTML
`
<style>
  .shadow-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
</style>
`;
