import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { newsApi } from '../../utils/NewsApi.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
  //  const [userName, setUserName] = React.useState('');

   // Cтейт-переменные для открытия и закрытия попапов
   const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
   const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);

   // Tooltip успешной регистрации
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

   // Ошибки валидации в формах
   const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();

   const history = useHistory();

   // Имитация ошибки с сервера в форме регистрации
   const [mockServerError, setMockServerError] = React.useState(false);

   // Стейты блока результатов
   const [foundNews, setFoundNews] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(false);
   const [notFound, setNotFound] = React.useState(false);
   const [serverError, setServerError] = React.useState(false);
 

  // function handleLogin() {
  //   setLoggedIn(true);
  // }

  React.useEffect(() => {
    const lastFoundNews = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
    setFoundNews(lastFoundNews);
  }, []);

  function handleLogout() {
    setLoggedIn(false);
    history.push('/');

  }

  function handleLoginPopupClick() {
    setIsLoginPopupOpen(true);
  }

  // function handleSignupPopupClick() {
  //   setIsSignupPopupOpen(true);
  // }

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

  function handleNewsSearch(keyword) {
    setFoundNews([]);
    localStorage.removeItem('news');
    setIsLoading(true);
    setNotFound(false);

    return newsApi.getNewsByKeyword(keyword)
             .then((data) => {
               localStorage.setItem('news', JSON.stringify(data.articles));
               setFoundNews(data.articles);
               setNotFound(false);

               if(data.articles.length === 0) {
                 setNotFound(true);
               }
             })
             .catch((err) => {
               setServerError(true);
             })
             .finally(() => {
               setIsLoading(false);
             })
  }

  return (
    <div className="page">
      <div className="page__container">
    
        {/* <Header /> */}

        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} onLogin={handleLoginPopupClick} logout={handleLogout} handleSearch={handleNewsSearch} news={foundNews} isLoading={isLoading} notFound={notFound} serverError={serverError} />
          </Route>
        
          <Route path="/saved-news">
            <SavedNews loggedIn={loggedIn} logout={handleLogout} />
          </Route>
        </Switch>

        <Footer />

      </div>

      {/* Для тестирования верстки формы принимают любые данные, ошибки валидации нативные, почта "example@test.com" имитирует ошибку сервера - пользователь уже существует */}
      <PopupWithForm name="login" title="Вход" buttonText="Войти" isOpen={isLoginPopupOpen} onClose={closeAllPopups} onToggle={togglePopup} onSubmit={handleLoginSubmit} isFormValid={isFormValid}>
                <label className="popup__input-label" htmlFor="login-email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="login-email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="login-password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="login-password" 
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
        <label className="popup__input-label" htmlFor="signup-email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="signup-email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="signup-password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="signup-password" 
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
