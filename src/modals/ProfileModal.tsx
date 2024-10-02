import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PlayModal.css"; // We'll use the same CSS for consistency

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
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
            {/* Modal content */}
            <motion.div className="play-modal-content">
              <h2 className="play-modal-title">Profile</h2>
              <div className="play-modal-content">
                <p>Username: CoolPlayer123</p>
                <p>Level: 42</p>
                <p>XP: 9001 / 10000</p>
                <p>Rank: Gold</p>
              </div>
              <motion.button
                className="play-modal-close-button"
                onClick={onClose}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
