import React from "react";
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__logo-link">
        <img src={logo} alt="Место" className="header__logo" />
      </a>
      <hr className="header__line" />
    </header>
  );
}

export default Header;
