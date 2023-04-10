import React from "react";
import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  };

  return (
    <div className="pages">
      <div className="page__container">
        <Header />
        <Main
          onEditAvatar={setIsEditAvatarPopupOpen}
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__input-container">
            <input
              className="popup__input"
              id="avatar"
              type="url"
              name="avatar"
              defaultValue=""
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__input-error" id="avatar-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__input-container">
            <input
              className="popup__input"
              name="name"
              type="text"
              id="nameInput"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              autoFocus
              required
            />
            <span className="popup__input-error" id="nameInput-error"></span>
          </div>
          <div className="popup__input-container">
            <input
              className="popup__input"
              name="about"
              type="text"
              id="jobInput"
              placeholder="Профессия"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__input-error" id="jobInput-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="photo"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__input-container">
            <input
              className="popup__input"
              id="name"
              type="text"
              name="name"
              defaultValue=""
              placeholder="Название"
              minLength="2"
              maxLength="30"
              autoFocus
              required
            />
            <span className="popup__input-error" id="name-error"></span>
          </div>
          <div className="popup__input-container">
            <input
              className="popup__input"
              id="link"
              type="url"
              name="link"
              defaultValue=""
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error" id="link-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm
          name="profileData"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
      </div>
    </div>
  );
}

export default App;
