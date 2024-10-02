import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayModal.css"; // We're using the same CSS file
import { useQuizStore } from "../store/store"; // Import the store
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import icons

interface OptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({ isOpen, onClose }) => {
  const { isMusicPlaying, toggleMusic } = useQuizStore(); // Use the store

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="play-modal-overlay transparent"
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
            <div className="play-modal-container">
              <div className="play-modal-handle">
                <div className="handle-design"></div>
              </div>
              {/* Modal content */}
              <motion.div className="play-modal-content">
                <h2 className="play-modal-title">Options</h2>
                <div className="play-modal-button-container">
                  <motion.button className="play-modal-button">
                    Graphics Settings
                  </motion.button>
                  <motion.button
                    className="play-modal-button"
                    onClick={toggleMusic}
                  >
                    {isMusicPlaying ? (
                      <>
                        <FaVolumeUp className="button-icon" />
                        Turn Off Music
                      </>
                    ) : (
                      <>
                        <FaVolumeMute className="button-icon" />
                        Turn On Music
                      </>
                    )}
                  </motion.button>
                  <motion.button className="play-modal-button">
                    Controls
                  </motion.button>
                </div>
                <motion.button
                  className="play-modal-close-button"
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OptionsModal;
