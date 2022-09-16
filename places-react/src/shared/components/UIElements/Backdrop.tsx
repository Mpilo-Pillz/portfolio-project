import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

interface BackdropProps {
  onClick: () => void;
}
const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("backdrop-hook") as HTMLElement
  );
};

export default Backdrop;
