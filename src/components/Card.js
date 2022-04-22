import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({_id, name, link, owner, likes, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function handleClick() {
    onCardClick({name, link});
  }

  function handleLikeClick() {
    onCardLike({_id, likes});
  }

  function handleDeleteClick() {
    onCardDelete({_id});
  }

  return (
    <article className="card">
      <img src={link} alt={name} className="card__image" onClick={handleClick} />
        <div className="card__info">
          <h3 className="card__title">{name}</h3>
          <div className="card__like-wrapper">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
            <span className="card__like-counter">{likes.length}</span>
          </div>
        </div>
          { isOwn && (<button type="button" className="card__delete-button" onClick={handleDeleteClick} />)}
    </article>
  );
};

export default Card;
