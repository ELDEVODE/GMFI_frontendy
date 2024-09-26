import React from "react";
import { Link } from "react-router-dom";
import "./CustomButton.css";

interface CustomButtonProps {
  to: string;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ to, children }) => {
  return (
    <Link to={to} className="custom-button">
      {children}
    </Link>
  );
};

export default CustomButton;
