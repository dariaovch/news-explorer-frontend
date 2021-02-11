import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [userName, setUserName] = React.useState('');

   // Cтейт-переменные для открытия и закрытия попапов
   const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
   const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);

   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

   const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

   const history = useHistory();

   const [mockServerError, setMockServerError] = React.useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    history.push('/');

  }

  function handleLoginPopupClick() {
    setIsLoginPopupOpen(true);
  }

  function handleSignupPopupClick() {
    setIsSignupPopupOpen(true);
  }

  function closeAllPopups() {
    setIsSignupPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsInfoTooltipOpen(false);
    resetForm();
  }

  function togglePopup() {
    setIsSignupPopupOpen(!isSignupPopupOpen);
    setIsLoginPopupOpen(!isLoginPopupOpen);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups()
    }
  }

  function handleEscClick (evt) {
    if(evt.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    setIsLoginPopupOpen(false);
    setLoggedIn(true);
  }

  function handleSignUpSubmit(evt) {
    evt.preventDefault();
    if(values.email === 'example@test.com') {
      setMockServerError(true);
    } else {
      setIsSignupPopupOpen(false);
      handleInfoTooltipOpen(true);
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleEscClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
      document.removeEventListener('keydown', handleEscClick);
    }
  })

  return (
    <div className="page">
      <div className="page__container">
    
        {/* <Header /> */}

        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} userName={userName} onLogin={handleLoginPopupClick} logout={handleLogout} />
          </Route>
        
          <Route path="/saved-news">
            <SavedNews userName={userName} loggedIn={loggedIn} logout={handleLogout} />
          </Route>
        </Switch>

        <Footer />

      </div>

      <PopupWithForm name="login" title="Вход" buttonText="Войти" isOpen={isLoginPopupOpen} onClose={closeAllPopups} onToggle={togglePopup} onSubmit={handleLoginSubmit} isFormValid={isFormValid}>
                <label className="popup__input-label" htmlFor="email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="password" 
                  required 
                  minLength="5" 
                  maxLength="30" 
                  placeholder="Введите пароль" 
                  value={values.password || ''}
                  onChange={handleChange}
                />
                {errors.password && <span className="popup__input-error">{errors.password}</span>}
        </PopupWithForm>

        <PopupWithForm name="signup" title="Регистрация" buttonText="Зарегистрироваться" isOpen={isSignupPopupOpen} onClose={closeAllPopups} onToggle={togglePopup} onSubmit={handleSignUpSubmit} mockServerError={mockServerError} isFormValid={isFormValid}>
        <label className="popup__input-label" htmlFor="email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="password" 
                  required 
                  minLength="5" 
                  maxLength="30" 
                  placeholder="Введите пароль" 
                  value={values.password || ''}
                  onChange={handleChange}
                />
                {errors.password && <span className="popup__input-error">{errors.password}</span>}

                <label className="popup__input-label" htmlFor="name">Имя</label>
                <input 
                  className="popup__input popup__input_name" 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  minLength="2" 
                  maxLength="40" 
                  placeholder="Введите своё имя" 
                  value={values.name || ''}
                  onChange={handleChange}
                />
                {errors.name && <span className="popup__input-error">{errors.name}</span>}
        </PopupWithForm>

        <InfoTooltip title="Пользователь успешно зарегистрирован!" name="success" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />


    </div>
  );
}

export default App;
