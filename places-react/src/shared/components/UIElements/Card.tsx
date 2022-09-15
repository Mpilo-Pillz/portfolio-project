import React from "react";

import "./Card.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  style?: any;
}
const Card: React.FC<CardProps> = ({ className, children, style }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
