class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _validateResponse(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then(response => this._validateResponse(response))
        .catch(err => console.log(err))
  }

  signup(email, password) {
    return fetch(`${this._baseUrl}/signup`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
        .then(response => this._validateResponse(response))
        .catch(err => console.log(err))
  }

  validateToken(token) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => this._validateResponse(response))
        .catch(err => console.log(err))
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});

export default auth;
