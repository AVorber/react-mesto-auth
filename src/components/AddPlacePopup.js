import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
  const [name, setName] = React.useState('');
  const [imageLink, setImageLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleImageLinkChange(e) {
    setImageLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, imageLink);
  }

  React.useEffect(() => {
    setName('');
    setImageLink('');
    }, [isOpen]);

  return (
    <PopupWithForm
      title='Новое место'
      popupName='card'
      formName='addCard'
      buttonTitle='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__field popup__card-name-input"
        id="card-name-input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__field-error card-name-input-error" />
      <input
        type="url"
        name="imageLink"
        className="popup__field popup__image-link-input"
        id="image-link-input"
        placeholder="Ссылка на картинку"
        required
        value={imageLink}
        onChange={handleImageLinkChange}
      />
      <span className="popup__field-error image-link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
