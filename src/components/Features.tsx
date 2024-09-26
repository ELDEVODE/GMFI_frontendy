import React, { useState, useRef, useEffect } from "react";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current) {
        const scrollPosition = window.scrollY - featuresRef.current.offsetTop;
        const newActiveFeature = Math.round(
          scrollPosition / window.innerHeight
        );
        if (newActiveFeature >= 0 && newActiveFeature < features.length) {
          setActiveFeature(newActiveFeature);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [features.length]);

  return (
    <div ref={featuresRef} className="bg-gray-900 py-32">
      <h2 className="text-5xl font-bold text-white mb-16 text-center">
        Features
      </h2>
      {features.map((feature, index) => (
        <div
          key={index}
          className={`min-h-screen flex flex-col md:flex-row items-center justify-center p-8 px-16 transition-opacity duration-500 relative ${
            index === activeFeature ? "opacity-100" : "opacity-30"
          }`}
        >
          {/* Add vignette overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray- opacity-75"></div>
          </div>

          <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-16 flex flex-col justify-center text-center relative z-10">
            <h3 className="text-4xl font-bold mb-4 text-white">
              {feature.title}
            </h3>
            <p className="text-lg leading-relaxed text-gray-300">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
