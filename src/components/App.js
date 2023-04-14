import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithSubmit from "./PopupWithSubmit";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDeleteConfirmation, setCardDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileInfo = await api.getUserInfo();
        setCurrentUser(profileInfo);
        const data = await api.getInitialCards();
        const formattedCards = data.map((card) => ({
          _id: card._id,
          name: card.name,
          link: card.link,
          likes: card.likes,
          owner: card.owner,
        }));
        setCards(formattedCards);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleCardLike = async (card) => {
    try {
      const isLiked = card.likes.some((user) => user._id === currentUser._id);
      const newCard = await api.setLike(card._id, !isLiked);
      setCards((state) =>
        state.map((item) => (item._id === card._id ? newCard : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      setIsLoading(true);
      const newCard = await api.addCard(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (newUserInfo) => {
    try {
      setIsLoading(true);
      const data = await api.setUserInfo(newUserInfo);
      setCurrentUser(data);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAvatar = async (newAvatar) => {
    try {
      setIsLoading(true);
      const data = await api.setUserAvatar(newAvatar);
      setCurrentUser(data);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDelete = (cardId) => {
    setCardDelete(cardId);
  };

  const handleDeleteConfirmation = async () => {
    try {
      setIsLoading(true);
      await api.deleteCard(cardToDeleteConfirmation);
      setCards(cards.filter((c) => c._id !== cardToDeleteConfirmation));
      closeAllPopups();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardDelete(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="pages">
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            onAddPlace={setIsAddPlacePopupOpen}
            onCardDelete={handleCardDelete}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onEditProfile={setIsEditProfilePopupOpen}
          />
          <Footer />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <PopupWithSubmit
            onConfirm={handleDeleteConfirmation}
            isOpen={!!cardToDeleteConfirmation}
            onClose={closeAllPopups}
            onLoading={isLoading}
          ></PopupWithSubmit>
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
