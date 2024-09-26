import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaRocket,
  FaSatellite,
  FaSpaceShuttle,
  FaGlobe,
  FaUserAstronaut,
} from "react-icons/fa";

interface MilestoneProps {
  title: string;
  description: string;
  delay: number;
  icon: React.ReactNode;
  isLeft: boolean;
}

const Milestone: React.FC<MilestoneProps> = ({
  title,
  description,
  delay,
  icon,
  isLeft,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isLeft ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay } },
      }}
      className={`flex items-center mb-24 ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-1/2 ${isLeft ? "pl-8" : "pr-8"} ${
          isLeft ? "text-right" : "text-left"
        }`}
      >
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
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
      title: "Q2 2023",
      description: "Launch of GMFI token and initial community building",
      icon: <FaRocket size={24} />,
    },
    {
      title: "Q3 2023",
      description: "Release of staking and farming features",
      icon: <FaSatellite size={24} />,
    },
    {
      title: "Q4 2023",
      description: "Integration with major DeFi protocols",
      icon: <FaSpaceShuttle size={24} />,
    },
    {
      title: "Q1 2024",
      description: "Launch of GMFI governance platform",
      icon: <FaGlobe size={24} />,
    },
    {
      title: "Q2 2024",
      description: "Expansion to multiple blockchain networks",
      icon: <FaUserAstronaut size={24} />,
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
              title={milestone.title}
              description={milestone.description}
              delay={index * 0.2}
              icon={milestone.icon}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
