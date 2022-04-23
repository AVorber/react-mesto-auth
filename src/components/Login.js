import React from 'react';
import { withRouter } from 'react-router-dom';

function Login() {
    return (
      <div className="login">
        <h2 className="popup__title popup__title_theme_dark">Вход</h2>
        <form className="popup__form">
          <fieldset className="popup__input-container">
            <input
              type="email"
              name="loginEmail"
              className="popup__field popup__field_theme_dark"
              id="login-email-input"
              placeholder="Email"
              minLength="2"
              maxLength="30"
              required
              value={''}
              onChange={''}
            />
            <input
              type="password"
              name="loginPassword"
              className="popup__field popup__field_theme_dark"
              id="login-password-input"
              placeholder="Пароль"
              required
              value={''}
              onChange={''}
            />
            <button type="submit" className="popup__save-button popup__save-button_theme_dark">Войти</button>
          </fieldset>
        </form>
      </div>
    );
}

export default withRouter(Login);
