import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayModal.css"; // We'll use the same CSS for consistency

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose }) => {
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
            <h2 className="play-modal-title">Shop</h2>
            <div className="play-modal-content">
              <div className="play-modal-button-container">
                <motion.button className="play-modal-button">
                  Power-up Bundle (500 coins)
                </motion.button>
                <motion.button className="play-modal-button">
                  Exclusive Skin (1000 coins)
                </motion.button>
                <motion.button className="play-modal-button">
                  XP Booster (750 coins)
                </motion.button>
              </div>
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

export default ShopModal;
