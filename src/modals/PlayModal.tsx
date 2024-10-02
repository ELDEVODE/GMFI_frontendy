import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./PlayModal.css";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlayModal: React.FC<PlayModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSinglePlayerClick = () => {
    navigate("/game/single-player");
    onClose();
  };

  const handleMultiplayerClick = () => {
    navigate("/game/multiplayer-points");
    onClose();
  };

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
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="play-modal-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="play-modal-handle top"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="handle-design"></div>
            </motion.div>
            <motion.div
              className="play-modal-container"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className="play-modal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="play-modal-title">Play Options</h2>
                <div className="play-modal-button-container">
                  <motion.button
                    className="play-modal-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSinglePlayerClick}
                  >
                    Single Player
                  </motion.button>
                  <motion.button
                    className="play-modal-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMultiplayerClick}
                  >
                    Multiplayer
                  </motion.button>
                </div>
                <motion.button
                  className="play-modal-close-button"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              className="play-modal-handle bottom"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="handle-design"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayModal;
