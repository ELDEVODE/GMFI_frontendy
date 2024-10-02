import React from "react";
import "./CustomButton.css";

interface CustomButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
