export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _fetch(path, options = {}) {
    const res = await fetch(`${this._baseUrl}${path}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  setUserInfo(data) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addCard(data) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  putLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  setUserAvatar(data) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "71809042-8d48-4365-9054-51d9ac130004",
    "Content-Type": "application/json",
  },
});

export default api;
