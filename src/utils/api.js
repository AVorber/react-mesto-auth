class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _validateResponse(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'GET',
        headers: this._headers,
      })
        .then(response => this._validateResponse(response))
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
        .then(response => this._validateResponse(response))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(response => this._validateResponse(response))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers,
      })
        .then(response => this._validateResponse(response))
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
        .then(response => this._validateResponse(response))
  }

  editUserAvatar({ avatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarLink
        })
      })
        .then(response => this._validateResponse(response))
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
      })
        .then(response => this._validateResponse(response))
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'e56ed49e-4783-4855-bf06-8b5123eda847',
    'Content-Type': 'application/json',
  }
});

export default api;
