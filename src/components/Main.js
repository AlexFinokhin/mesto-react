import { useState, useEffect } from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileData) => {
        setUserName(profileData.name);
        setUserDescription(profileData.about);
        setUserAvatar(profileData.avatar);
      })
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((cardsData) => {
        const formattedCardsData = cardsData.map((data) => ({
          cardId: data._id,
          name: data.name,
          link: data.link,
          likes: data.likes,
        }));

        setCards(formattedCardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-edit"
          type="button"
          title="Обновить аватар"
          onClick={() => props.onEditAvatar(true)}
        >
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            title="Редактировать профиль"
            onClick={() => props.onEditProfile(true)}
          />
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить новую фотографию"
          onClick={() => props.onAddPlace(true)}
        />
      </section>

      <section className="elements">
        <div className="elements__list">
          {cards.map((card) => (
            <Card
              key={card.cardId}
              card={card}
              onCardClick={props.onCardClick}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
