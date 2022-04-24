import React from 'react';
import { withRouter } from 'react-router-dom';

function Login({onLogin}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login">
      <h2 className="popup__title popup__title_theme_dark">Вход</h2>
      <form className="popup__form" onSubmit={handleSubmit}>
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
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="loginPassword"
            className="popup__field popup__field_theme_dark"
            id="login-password-input"
            placeholder="Пароль"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="submit"
            className="popup__save-button popup__save-button_theme_dark"
          >
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default withRouter(Login);
