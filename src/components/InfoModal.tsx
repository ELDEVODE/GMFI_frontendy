import React, { useState } from "react";
import { suiOnCampus, teamSpark, gmfi } from "../assets";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Team Spark",
      content: "Information about Team Spark goes here...",
      image: teamSpark,
    },
    {
      title: "Sui On Campus",
      content: "Information about Sui On Campus goes here...",
      image: suiOnCampus,
    },
    {
      title: "GMFI",
      content: "Information about GMFI goes here...",
      image: gmfi,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg max-w-3xl w-full mx-4 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>
        <div className="arcade-frame border-4 border-neon-blue p-4 rounded-lg">
          <div className="carousel-container">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-neon-green mb-2">
              {slides[currentSlide].title}
            </h3>
            <p className="text-gray-300 mb-4">{slides[currentSlide].content}</p>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={prevSlide}
              className="bg-neon-purple text-white px-4 py-2 rounded-lg hover:bg-neon-purple-dark transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextSlide}
              className="bg-neon-purple text-white px-4 py-2 rounded-lg hover:bg-neon-purple-dark transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
