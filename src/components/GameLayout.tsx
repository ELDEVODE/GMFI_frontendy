import React from "react";
import { Outlet } from "react-router-dom";

const GameLayout: React.FC = () => {
  return (
    <div className="game-layout">
      {/* Add any game-specific layout elements here */}
      <Outlet />
    </div>
  );
};

export default GameLayout;
