import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaGamepad,
  FaUsers,
  FaChartLine,
  FaCube,
} from "react-icons/fa";

interface MilestoneProps {
  phase: string;
  title: string;
  description: string;
  details: string[];
  delay: number;
  icon: React.ReactNode;
  isLeft: boolean;
}

const Milestone: React.FC<MilestoneProps> = ({
  phase,
  title,
  description,
  details,
  delay,
  icon,
  isLeft,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`flex items-center mb-24 ${isLeft ? "flex-row-reverse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-1/2 ${isLeft ? "pl-8" : "pr-8"} ${
          isLeft ? "text-right" : "text-left"
        }`}
      >
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{phase}</h3>
        <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
        {isHovered && (
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-gray-400 list-disc list-inside"
          >
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </motion.ul>
        )}
      </div>
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className="w-16 h-16 bg-cyan-900 rounded-full flex items-center justify-center text-cyan-400 z-10"
      >
        {icon}
      </motion.div>
      <div className={`w-1/2 ${isLeft ? "pr-8" : "pl-8"}`}></div>
    </motion.div>
  );
};

const Roadmap = () => {
  const roadmapData = [
    {
      phase: "Phase 1: Ignition",
      title: "Launching the Arcade Universe",
      description: "Introducing Time Accuracy Mode and Multiplayer Onboarding",
      details: [
        "Arcade Gaming Debut: Time Accuracy Mode for precision-driven gameplay",
        "Multiplayer Onboarding: Head-to-head challenges for ultimate arcade competition",
      ],
      icon: <FaRocket size={24} />,
    },
    {
      phase: "Phase 2: Q1",
      title: "Unleashing In-Game Dynamics",
      description: "Enhancing gameplay with purchases and community features",
      details: [
        "In-Game Purchases & Boosters: Exclusive power-ups and premium upgrades",
        "Community World Chat: Global gaming network for connections and strategy",
      ],
      icon: <FaGamepad size={24} />,
    },
    {
      phase: "Phase 3: Q2",
      title: "Raising the Stakes",
      description: "Introducing competitive modes and global rankings",
      details: [
        "Multiplayer Stakes Mode: High-stakes battles where every move counts",
        "Global Leaderboard: Compete against the best and climb the ranks",
      ],
      icon: <FaUsers size={24} />,
    },
    {
      phase: "Phase 4: Q3",
      title: "The Evolution Begins",
      description: "Expanding the platform with tokens and new experiences",
      details: [
        "GMFi Token Launch: Native token for transactions and rewards",
        "Multi-Gaming Experience: New game genres",
        "RWA Introduction: Real-World Asset integration",
      ],
      icon: <FaChartLine size={24} />,
    },
    {
      phase: "Phase 5: Q4",
      title: "Enter the Realm of Ownership",
      description: "Introducing real-world asset integration and ownership",
      details: [
        "Community Expansion: Grow global presence and player base",
        "Real World Asset Integration: Co-ownership of physical and digital assets",
        "Fractional Ownership: Become fractional owners of real assets",
      ],
      icon: <FaCube size={24} />,
    },
  ];

  return (
    <div className="bg-black pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-white mb-16 text-center">
          Roadmap
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
          {roadmapData.map((milestone, index) => (
            <Milestone
              key={index}
              phase={milestone.phase}
              title={milestone.title}
              description={milestone.description}
              details={milestone.details}
              delay={index * 0.2}
              icon={milestone.icon}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-4">
            Year 2 – Unstoppable Growth
          </h3>
          <p className="text-gray-300">
            Scale up gaming modes, onboard strategic partners, and continuously
            enrich the GMFi ecosystem. Stay tuned as we transform digital
            engagement and redefine blockchain gaming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
