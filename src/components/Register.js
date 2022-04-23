import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register() {
    return (
      <div className="register">
        <h2 className="popup__title popup__title_theme_dark">Регистрация</h2>
        <form className="popup__form">
          <fieldset className="popup__input-container">
            <input
              type="email"
              name="registerEmail"
              className="popup__field popup__field_theme_dark"
              id="register-email-input"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              required
              value={''}
              onChange={''}
            />
            <input
              type="password"
              name="registerPassword"
              className="popup__field popup__field_theme_dark"
              id="register-password-input"
              placeholder="Пароль"
              required
              value={''}
              onChange={''}
            />
            <button type="submit" className="popup__save-button popup__save-button_theme_dark">Зарегистрироваться</button>
          </fieldset>
        </form>
        <p className="popup__help">Уже зарегистрированы?
          <Link to="/sign-in" className="popup__link"> Войти</Link>
        </p>
      </div>
    );
}

export default withRouter(Register);
