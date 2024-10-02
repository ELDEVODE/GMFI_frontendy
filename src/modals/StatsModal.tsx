import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayModal.css"; // We'll use the same CSS for consistency

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="play-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="play-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="play-modal-title">Stats</h2>
            <div className="play-modal-content">
              <p>Games Played: 100</p>
              <p>Win Rate: 65%</p>
              <p>Average Score: 1500</p>
              <p>Highest Score: 3000</p>
            </div>
            <motion.button
              className="play-modal-close-button"
              onClick={onClose}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatsModal;
