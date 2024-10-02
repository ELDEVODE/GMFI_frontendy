import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import PlayModal from "../modals/PlayModal";

interface MenuOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface SciFiMenuProps {
  options: MenuOption[];
  maxVisibleOptions?: number;
}

const SciFiMenu: React.FC<SciFiMenuProps> = ({
  options,
  maxVisibleOptions = 3,
}) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  useEffect(() => {
    if (optionRefs.current[0]) {
      const optionHeight = optionRefs.current[0].offsetHeight;
      setContainerHeight(optionHeight * maxVisibleOptions);
    }
  }, [maxVisibleOptions]);

  const scrollUp = () => setScrollIndex((prev) => Math.max(0, prev - 1));
  const scrollDown = () =>
    setScrollIndex((prev) =>
      Math.min(options.length - maxVisibleOptions, prev + 1)
    );

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) {
      scrollDown();
    } else {
      scrollUp();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      scrollDown();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      scrollUp();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      let touchStartY = 0;
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const handleTouchMove = (e: TouchEvent) => {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;
        if (deltaY > 10) {
          scrollUp();
        } else if (deltaY < -10) {
          scrollDown();
        }
        touchStartY = touchEndY;
      };

      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, []);

  const handlePlayClick = () => {
    setIsPlayModalOpen(true);
  };

  const NavigationButton = ({ direction, onClick, visible }) => (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: direction === "up" ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction === "up" ? 10 : -10 }}
          className={`absolute ${
            direction === "up" ? "-top-6" : "-bottom-6"
          } left-[90px] z-10`}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="relative w-12 h-6 overflow-visible"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className={`absolute inset-0 bg-cyan-500/10 backdrop-blur-sm`}
              initial={{
                clipPath:
                  direction === "up"
                    ? "polygon(0% 100%, 50% 0%, 100% 100%, 80% 100%, 50% 30%, 20% 100%)"
                    : "polygon(0% 0%, 50% 100%, 100% 0%, 80% 0%, 50% 70%, 20% 0%)",
              }}
              whileHover={{
                clipPath:
                  direction === "up"
                    ? "polygon(0% 100%, 50% 20%, 100% 100%, 70% 100%, 50% 50%, 30% 100%)"
                    : "polygon(0% 0%, 50% 80%, 100% 0%, 70% 0%, 50% 50%, 30% 0%)",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 border border-cyan-300/50"
              initial={{
                clipPath:
                  direction === "up"
                    ? "polygon(0% 100%, 50% 0%, 100% 100%, 80% 100%, 50% 30%, 20% 100%)"
                    : "polygon(0% 0%, 50% 100%, 100% 0%, 80% 0%, 50% 70%, 20% 0%)",
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-cyan-300/20"
              initial={{
                clipPath:
                  direction === "up"
                    ? "polygon(0% 100%, 50% 0%, 100% 100%, 80% 100%, 50% 30%, 20% 100%)"
                    : "polygon(0% 0%, 50% 100%, 100% 0%, 80% 0%, 50% 70%, 20% 0%)",
              }}
              whileHover={{
                background: [
                  "rgba(0, 255, 255, 0.2)",
                  "rgba(0, 255, 255, 0.4)",
                  "rgba(0, 255, 255, 0.2)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                className="text-cyan-300"
                initial={{ y: direction === "up" ? 5 : -5 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {direction === "up" ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative w-full max-w-md">
      {/* Top handle */}
      <div className="h-6 flex justify-center items-center overflow-hidden">
        <div className="w-full h-0.5 bg-cyan-500/30 relative">
          <motion.div
            className="absolute top-0 left-0 w-16 h-full bg-cyan-300/50"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Scroll up button */}
      <NavigationButton
        direction="up"
        onClick={scrollUp}
        visible={scrollIndex > 0}
      />

      {/* Menu options container */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-lg"
        style={{ height: `${containerHeight}px` }}
        onWheel={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <motion.div
          animate={{ y: -scrollIndex * (containerHeight / maxVisibleOptions) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="space-y-4 p-2"
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              ref={(el) => (optionRefs.current[index] = el)}
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity:
                  index >= scrollIndex &&
                  index < scrollIndex + maxVisibleOptions
                    ? 1
                    : 0,
                x: 0,
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.button
                className={`w-full py-4 px-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg text-cyan-300 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group backdrop-blur-sm border border-cyan-500/30`}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={
                  option.label === "Play" ? handlePlayClick : option.onClick
                }
              >
                <span className="relative z-10 flex items-center justify-center">
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  {option.label}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 flex justify-between items-center px-2">
                  <motion.div
                    className="w-2 h-8 bg-cyan-300/50 rounded-full"
                    animate={{ height: [8, 32, 8] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-8 bg-blue-300/50 rounded-full"
                    animate={{ height: [32, 8, 32] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down button */}
      <NavigationButton
        direction="down"
        onClick={scrollDown}
        visible={scrollIndex < options.length - maxVisibleOptions}
      />

      {/* Bottom handle */}
      <div className="h-6 flex justify-center items-center overflow-hidden">
        <div className="w-full h-0.5 bg-cyan-500/30 relative">
          <motion.div
            className="absolute top-0 right-0 w-16 h-full bg-cyan-300/50"
            animate={{ x: ["0%", "-100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      <PlayModal
        isOpen={isPlayModalOpen}
        onClose={() => setIsPlayModalOpen(false)}
      />
    </div>
  );
};

export default SciFiMenu;
