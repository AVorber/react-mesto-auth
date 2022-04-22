import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title='Редактировать профиль'
      popupName='profile'
      formName='editProfile'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__field popup__name-input"
        id="name-input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={ name || '' }
        onChange={handleNameChange}
      />
      <span className="popup__field-error name-input-error" />
      <input
        type="text"
        name="about"
        className="popup__field popup__about-input"
        id="about-input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={ description || '' }
        onChange={handleDescriptionChange}
      />
      <span className="popup__field-error about-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
