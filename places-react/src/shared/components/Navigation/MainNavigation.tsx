import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";

const MainNavigation = () => {
  return (
    <MainHeader className="main-navigation__menu-btn">
      <button>
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Your Places</Link>
      </h1>
      <nav>...</nav>
    </MainHeader>
  );
};

export default MainNavigation;
