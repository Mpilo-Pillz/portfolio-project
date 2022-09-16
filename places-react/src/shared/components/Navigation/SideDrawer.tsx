import React from "react";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";

interface SideDrawerProps {
  show: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
const SideDrawer: React.FC<SideDrawerProps> = ({ show, children, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={2}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("drawer-hook") as HTMLElement
  );
};

export default SideDrawer;
