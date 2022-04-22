import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatarLink: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
    }, [isOpen]);
  
  return (
    <PopupWithForm
      title='Обновить аватар'
      popupName='avatar'
      formName='editAvatar'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatarLink"
        className="popup__field popup__avatar-link-input"
        id="avatar-link-input"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span className="popup__field-error avatar-link-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
