import { useEffect } from "react";

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("popup_opened")) onClose();
    };

    if (isOpen) window.addEventListener("click", handleOutsideClick);
    else window.removeEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form className="popup__form popup__form_profile" name={name}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <div className="popup__input-container"></div>
          <button
            className="popup__save-button"
            type="submit"
            title="Сохранить"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
