import React from "react";
import "./GameFooter.css"; // We'll create this file for the animations

const GameFooter: React.FC = () => {
  return (
    <div className="game-footer">
      <div className="content">whatever is here</div>
      <div className="electricity-container">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="electricity-bolt"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameFooter;
