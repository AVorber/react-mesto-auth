import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ loggedIn, email, onSignOut }) {
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
          <div className="header__menu">
            <span className="header__email">{email}</span>
            <Link to="/" className="header__link header__link_type_signout" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        )
        : (
          <Link to={currentPath.path} className="header__link">
            {currentPath.name}
          </Link>
        )
      }
    </header>
  );
}

export default Header;
