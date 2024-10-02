import React, { useEffect, useState } from "react";
import { community1, community2, CommunityBg, flybot } from "../assets";
import { FaEnvelope, FaTwitter } from "react-icons/fa";

interface CommunitySectionProps {
  scrollY: number;
  parentRef: React.RefObject<HTMLDivElement>;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  scrollY,
  parentRef,
}) => {
  const [sectionScrollY, setSectionScrollY] = useState(0);

  useEffect(() => {
    const updateSectionScroll = () => {
      if (parentRef.current) {
        const sectionTop = parentRef.current.offsetTop;
        const sectionScroll = Math.max(0, scrollY - sectionTop);
        setSectionScrollY(sectionScroll);
      }
    };

    updateSectionScroll();
  }, [scrollY, parentRef]);

  const calculateCutoutTransform = (initialOffset: number, speed: number) => {
    const offset = Math.max(0, initialOffset - sectionScrollY * speed);
    return `translateY(${offset}px)`;
  };

  return (
    <div className={`relative h-screen overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${CommunityBg})`,
          transform: `translateY(${sectionScrollY * 0.5}px)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-10 z-10">Community</h2>
        <p className="text-white text-xl max-w-[600px]">
          Chat with the community, ask questions, share your ideas, participate
          in competitions, and more!
        </p>
        <div className="flex justify-center mt-10">
          <a
            href="mailto:teamspark.sui@gmail.com"
            className="mx-4 transition-all duration-300 ease-in-out hover:scale-125 hover:text-red-400"
          >
            <FaEnvelope className="text-white text-2xl" />
          </a>
          <a
            href="https://x.com/teamsparksui?t=ycf5JwKwa_3L5kUfhCFSRg&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 transition-all duration-300 ease-in-out hover:scale-125 hover:text-blue-400"
          >
            <FaTwitter className="text-white text-2xl" />
          </a>
        </div>
      </div>

      {/* cutout images */}
      <img
        src={community1}
        alt=""
        className="z-9 w-[100vw] absolute transition-all duration-1000 ease-out"
        style={{
          left: "0",
          bottom: "0",
          transform: calculateCutoutTransform(150, 1),
        }}
      />
      <img
        src={community2}
        alt=""
        className="z-9 w-[70vw] absolute transition-all duration-1000 ease-out"
        style={{
          right: "0",
          bottom: "0",
          transform: calculateCutoutTransform(100, 1),
        }}
      />
      <img
        src={flybot}
        alt=""
        className="z-10 w-[20vw] absolute transition-all duration-1000 ease-out"
        style={{
          right: "14vw",
          top: "0",
          transform: `translateX(${sectionScrollY * 0.5}px) translateY(${
            sectionScrollY * 0.3
          }px)`,
        }}
      />

      {/* top gradient */}
      <div className="absolute inset-0 h-full bg-gradient-to-t from-transparent to-black z-[0]" />
    </div>
  );
};

export default CommunitySection;
