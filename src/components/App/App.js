import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [userName, setUserName] = React.useState('');

   // Cтейт-переменные для открытия и закрытия попапов
   const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
   const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);


  function handleLoginPopupClick() {
    setIsLoginPopupOpen(true);
  }

  function handleSignupPopupClick() {
    setIsSignupPopupOpen(true);
  }

  function closeAllPopups() {
    setIsSignupPopupOpen(false);
    setIsLoginPopupOpen(false);
  }

  function togglePopup() {
    setIsSignupPopupOpen(!isSignupPopupOpen);
    setIsLoginPopupOpen(!isLoginPopupOpen);
  }

  return (
    <div className="page">
      <div className="page__container">
    
        {/* <Header /> */}

        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} userName={userName} onLogin={handleLoginPopupClick} />
          </Route>
        
          <Route path="/saved-news">
            <SavedNews userName={userName} />
          </Route>
        </Switch>

        <Footer />

      </div>

      <PopupWithForm name="login" title="Вход" buttonText="Войти" isOpen={isLoginPopupOpen} onClose={closeAllPopups} onToggle={togglePopup}>
                <label className="popup__input-label" htmlFor="email">Email</label>
                <input className="popup__input popup__input_email" type="email" name="email" id="email" required minLength="6" maxLength="40" placeholder="Введите почту" />
                <span className="popup__form-error" id="email-error"></span>
                <label className="popup__input-label" htmlFor="password">Пароль</label>
                <input className="popup__input popup__input_password" type="password" name="password" id="password" required minLength="5" maxLength="30" placeholder="Введите пароль" />
                <span className="popup__form-error" id="password-error"></span>
        </PopupWithForm>

        <PopupWithForm name="signup" title="Регистрация" buttonText="Зарегистрироваться" isOpen={isSignupPopupOpen} onClose={closeAllPopups} onToggle={togglePopup}>
          <label className="popup__input-label" htmlFor="email">Email</label>
                <input className="popup__input popup__input_email" type="email" name="name" id="email" required minLength="6" maxLength="40" placeholder="Введите почту" />
                <span className="popup__form-error" id="email-error"></span>
                <label className="popup__input-label" htmlFor="password">Пароль</label>
                <input className="popup__input popup__input_password" type="password" name="password" id="password" required minLength="5" maxLength="30" placeholder="Введите пароль" />
                <span className="popup__form-error" id="password-error"></span>
                <label className="popup__input-label" htmlFor="name">Имя</label>
                <input className="popup__input popup__input_name" type="text" name="name" id="name" required minLength="2" maxLength="30" placeholder="Введите своё имя" />
                <span className="popup__form-error" id="name-error"></span>
        </PopupWithForm>
    </div>
  );
}

export default App;
