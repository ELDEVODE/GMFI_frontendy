import React from "react";
import { flybot1 } from "../assets";
import "./GameFooter.css";

const GameFooter: React.FC = () => {
  return (
    <footer className="game-footer relative">
      <img src={flybot1} alt="Cutout 8" className="flybot" />
    </footer>
  );
};

export default GameFooter;
