import React from "react";

function ImagePopup({name, link, isOpened, onClose}) {
  return (
    <div className={ isOpened ? 'popup popup_type_image popup_opened' : 'popup popup_type_image' }>
      <div className="popup__image-container">
        <figure className="popup__image-wrapper">
          <img src={link} alt={name} className="popup__image" />
            <figcaption className="popup__image-title">{name}</figcaption>
        </figure>
        <button type="button" className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  );
}

export default ImagePopup;
