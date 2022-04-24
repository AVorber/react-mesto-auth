import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register({onRegister}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
    setEmail('');
    setPassword('');
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="register">
      <h2 className="popup__title popup__title_theme_dark">Регистрация</h2>
      <form className="popup__form" onSubmit={handleSubmit}>
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
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="registerPassword"
            className="popup__field popup__field_theme_dark"
            id="register-password-input"
            placeholder="Пароль"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="popup__save-button popup__save-button_theme_dark"
          >
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <p className="popup__help">Уже зарегистрированы?
        <Link to="/sign-in" className="popup__link"> Войти</Link>
      </p>
    </div>
  );
}

export default withRouter(Register);
