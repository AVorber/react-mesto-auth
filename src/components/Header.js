import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ loggedIn }) {
  const location = useLocation();
  let currentPath = {};
  if (location.pathname === '/sign-in') {
    currentPath = {path: '/sign-up', name: 'Регистрация'};
  }
  else {
    currentPath = {path: '/sign-in', name: 'Войти'};
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img src={logo} alt="Место" className="header__logo" />
      </Link>
      { loggedIn
        ? (
          <Link to="/" className="header__logo-link">
            Выйти
          </Link>
        )
        : (
          <Link to={currentPath.path} className="header__auth-link">
            {currentPath.name}
          </Link>
        )
      }
    </header>
  );
}

export default Header;
