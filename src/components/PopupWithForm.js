import React from 'react';

function PopupWithForm({title, popupName, formName, buttonTitle, children, isOpen, onClose, onSubmit}) {
  return (
    <div className={ isOpen ? `popup popup_type_${popupName} popup_opened` : `popup popup_type_${popupName}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={formName} className="popup__form" noValidate onSubmit={onSubmit}>
          <fieldset className="popup__input-container">
            {children}
            <button type="submit" className="popup__save-button">{buttonTitle}</button>
          </fieldset>
        </form>
        <button type="button" className="popup__close-button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
