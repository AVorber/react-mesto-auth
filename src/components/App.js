import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const emptyCard = {isOpened: false, name: null, link: null};
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(emptyCard);
  const [authStatus, setAuthStatus] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(emptyCard);
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData)
        setCards(initialCards);
      })
      .catch(err => alert(err))
  }, []);

  const handleValidateToken = React.useCallback(() => {
    const token = localStorage.getItem('jwt');
    auth.validateToken(token)
      .then(result => {
        setEmail(result.data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        alert(err)
        localStorage.removeItem('jwt');
        history.push('/sign-up');
      })
      }, [history]);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleValidateToken();
    }
    }, [handleValidateToken])

  function handleRegister(email, password) {
    auth.signup(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setAuthStatus(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
        setAuthStatus(false);
      })
    }

  function handleLogin(email, password) {
      auth.signin(email, password)
        .then(result => {
          setLoggedIn(true);
          localStorage.setItem('jwt', result.token);
          handleValidateToken();
        })
        .catch(err => {
          setIsInfoTooltipOpen(true);
          setAuthStatus(false);
          setLoggedIn(false);
        })
    }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  const handleCardClick = card => {
    setSelectedCard({isOpened: true, ...card})
  };

  function handleUpdateUser({name, about}) {
    api.editUserInfo({name, about})
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  function handleUpdateAvatar(avatarLink) {
    api.editUserAvatar(avatarLink)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => alert(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id))
      })
      .catch(err => alert(err))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut}/>
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          >
          </ProtectedRoute>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          {...selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          authStatus={authStatus}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
