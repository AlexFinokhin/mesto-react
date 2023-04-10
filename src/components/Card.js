function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <figure className="element">
      <img
        className="element__image"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />
      <figcaption className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <button
          className="element__trash-button"
          type="button"
          title="Удалить"
        ></button>

        <div className="element__like-container">
          <button
            className="element__like-button"
            type="button"
            title="Нравится"
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
