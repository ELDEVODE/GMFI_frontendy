import React, { useState } from "react";
import { bg } from "../assets";
import InfoModal from "./InfoModal"; // We'll create this component next

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gray-900 relative">
      <div
        className="bg-no-repeat bg-cover opacity-15 absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />
      <div className={`py-[200px] px-4 z-1 relative`}>
        <h2 className="text-5xl font-bold text-white mb-16 text-center">
          About
        </h2>
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto text-gray-300">
          GMFI brings you cutting-edge blockchain technology combined with
          immersive gameplay. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Natus veritatis, dolore adipisci consequuntur repellendus ipsum
          minima repellat, soluta aperiam mollitia aliquam esse! Ad cum facere
          debitis magni. Dicta enim ex, nam nisi omnis quas accusamus sed
          mollitia. Blanditiis, pariatur inventore!
        </p>
        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black border-2 border-cyan-200/50 text-gray-300 font-semibold py-2 px-6 rounded-sm 
                             hover:bg-cyan-300 hover:text-black 
                             transition-all duration-300 ease-in-out 
                             shadow-lg shadow-cyan-200/50
                             focus:outline-none focus:ring-2 focus:ring-cyan-200/50 focus:ring-opacity-50 
                             relative overflow-hidden group"
          >
            <span className="relative z-10">Learn More</span>
            <span className="absolute inset-0 bg-cyan-200/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </div>
      </div>
      <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AboutSection;
