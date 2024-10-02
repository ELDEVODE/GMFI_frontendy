import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayModal.css"; // We'll use the same CSS for consistency

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
}) => {
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
            <h2 className="play-modal-title">Leaderboard</h2>
            <div className="play-modal-content">
              <ol className="play-modal-list">
                <li>Player1 - 5000 pts</li>
                <li>Player2 - 4800 pts</li>
                <li>Player3 - 4600 pts</li>
                <li>Player4 - 4400 pts</li>
                <li>Player5 - 4200 pts</li>
              </ol>
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

export default LeaderboardModal;
