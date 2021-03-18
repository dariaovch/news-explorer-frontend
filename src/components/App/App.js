import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import RegisterPopup from '../RegisterPopup/RegisterPopup.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { newsApi } from '../../utils/NewsApi.js';
import { mainApi } from '../../utils/MainApi.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [userName, setUserName] = React.useState('');
   const [currentUser, setCurrentUser] = React.useState({
    name: '',
    email: '',
  });
  // const [userEmail, setUserEmail] = React.useState('');
  // const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = React.useState(false);

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


  // Логика регистрации и авторизации
  
  function handleRegister(name, email, password) {
    console.log(name, email, password)
    mainApi.register(name, email, password)
      .then((res) => {
        console.log('Вы успешно зарегистрировались!')
        setUserName(res.name);
        setIsInfoTooltipOpen(true);
        setTimeout(() => 
          setIsInfoTooltipOpen(false),
          3000
        );
        history.push('/signin');
      })
      .catch((err) => {
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')}
        
        // setIsFailTooltipOpen(true)
        // setTimeout(() => 
        // setIsFailTooltipOpen(false),
        // 10000
        // );
      })
  }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          // setUserName(email);
          tokenCheck();
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err)
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')} else if (err.status === '401') {
            console.log('Пользователь с таким email не найден');
          }

        // setIsFailTooltipOpen(true)
        // setTimeout(() => 
        // setIsFailTooltipOpen(false),
        // 10000
        // );
      })
  }

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      mainApi.getContent(token)
        .then((res) => { 
          if(res) {
            // setUserEmail(res.email);
            setLoggedIn(true)
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    }
  }


  function handleLogout() {
      localStorage.removeItem('token');
      // setUserEmail('');
      setLoggedIn(false);
      history.push('/');
  }

  // Проверяем наличие валидного токена и достаем из хранилища результаты последнего поиска
  React.useEffect(() => {
    tokenCheck();
    const lastFoundNews = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
    setFoundNews(lastFoundNews);
  }, []);

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
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} handleLogin={handleLogin} onToggle={togglePopup} tokenCheck={tokenCheck} />

      <RegisterPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} handleRegister={handleRegister} onToggle={togglePopup} />
     
      <InfoTooltip title="Пользователь успешно зарегистрирован!" name="success" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />


    </div>
  );
}

export default App;
