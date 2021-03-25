import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
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
import * as Auth from '../../utils/Auth.js';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { closePopupTime } from '../../utils/constants';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [userName, setUserName] = React.useState('');
   const [currentUser, setCurrentUser] = React.useState({
    id: '',
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


   const history = useHistory();

   // Имитация ошибки с сервера в форме регистрации
  //  const [mockServerError, setMockServerError] = React.useState(false);

   // Стейты блока результатов
   const [foundNews, setFoundNews] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(false);
   const [notFound, setNotFound] = React.useState(false);
   const [serverError, setServerError] = React.useState(false);
   const [isFormBlocked, setIsFormBlocked] = React.useState(false);

   // Стейты сохраненных новостей
   const [savedNews, setSavedNews] = React.useState([]);
   const [keyword, setKeyword] = React.useState('');
   
   
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    tokenCheck();
    console.log(currentUser)
    if(loggedIn){
      return mainApi.getSavedArticlesWithToken(token)
        .then((articles) => {
          console.log(articles)
          const savedNewsByUser = articles.filter((a) => a.owner === currentUser.id);
          setSavedNews(savedNewsByUser);
          console.log(savedNewsByUser)
          console.log(currentUser.id)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [currentUser.id, loggedIn]);

  //  React.useEffect(() => {
  //   if (loggedIn) {
  //     return mainApi.getUserInfo()
  //       .then((userData) => {
  //         setCurrentUser({
  //           id: userData._id,
  //           name: userData.name,
  //           email: userData.email,
  //         });
  //         setLoggedIn(true);
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }, [loggedIn]);

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
    // resetForm();
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
    localStorage.removeItem('keyword');
    setIsLoading(true);
    setNotFound(false);
    setIsFormBlocked(true);

    return newsApi.getNewsByKeyword(keyword)
             .then((data) => {
               localStorage.setItem('news', JSON.stringify(data.articles));
               localStorage.setItem('keyword', JSON.stringify(keyword));
               setFoundNews(data.articles);
               setKeyword(keyword);
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
               setIsFormBlocked(false);
             })
  }

  function handleArticleSave(item, keyword) {
    if(!loggedIn) {
      return setIsLoginPopupOpen(true);
    }
    console.log(savedNews)
    console.log(item)
    const isArticleSaved = savedNews.find((article) => article.title === item.title);
    console.log(isArticleSaved)
    

    if (isArticleSaved) {
      return mainApi.deleteArticle(isArticleSaved._id)
        .then(() => {
          const newList = savedNews.filter((a) => a._id !== isArticleSaved._id);
          setSavedNews(newList);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return mainApi.saveArticle(item, keyword)
        .then((newArticle) => {
          console.log(newArticle);
          setSavedNews([newArticle, ...savedNews]);
        // getSavedNewsByUser();
        })
        .catch((err) => {
          console.log(err);
        })
      } 
  }

  function handleArticleDelete(item) {
    return mainApi.deleteArticle(item._id)
      .then(() => {
        const newList = savedNews.filter((a) => a._id !== item._id);
        setSavedNews(newList);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getSavedNewsByUser() {
    if (loggedIn) {
      return mainApi.getSavedArticles()
        .then((articles) => {
          const savedNewsByUser = articles.filter((a) => (a.owner === currentUser.id));
          setSavedNews(savedNewsByUser);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }


  // Логика регистрации и авторизации
  function tokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      Auth.getContent(token)
        .then((res) => { 
          if(res) {
            console.log(res)
            setCurrentUser({
              id: res._id,
              name: res.name,
              email: res.email,
            });
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleRegister(name, email, password) {
    setIsFormBlocked(true);
    console.log(name, email, password)
    Auth.register(name, email, password)
      .then((res) => {
        console.log('Вы успешно зарегистрировались!')
        setUserName(res.name);
        setIsSignupPopupOpen(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
          setIsSignupPopupOpen(true);
        }, closePopupTime);
        history.push('/signin');
      })
      .catch((err) => {
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')}
      })
      .finally(() => setIsFormBlocked(false))
  }

  function handleLogin(email, password) {
    setIsFormBlocked(true);

    Auth.login(email, password)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          tokenCheck();
          // getSavedNewsByUser();
          history.push('/');
          setTimeout(() => {
            setIsLoginPopupOpen(false);
          }, closePopupTime);
        }
      })
      .catch((err) => {
        console.log(err)
        if(err.status === '400') {
          console.log('Неверно заполнено одно из полей')} else if (err.status === '401') {
            console.log('Пользователь с таким email не найден');
          }
      })
      .finally(() => setIsFormBlocked(false))
  }

  function handleLogout() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      history.push('/');
  }

  // Проверяем наличие валидного токена и достаем из хранилища результаты последнего поиска
  React.useEffect(() => {
    tokenCheck();
    const lastFoundNews = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
    setFoundNews(lastFoundNews);
    const lastKeyword = localStorage.getItem('keyword') ? JSON.parse(localStorage.getItem('keyword')) : '';
    setKeyword(lastKeyword);
  }, []);

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <div className="page__container">
  

        <Switch>
          <Route exact path="/">
            <Main 
              loggedIn={loggedIn} 
              onLogin={handleLoginPopupClick}
              logout={handleLogout}
              handleSearch={handleNewsSearch}
              news={foundNews}
              isLoading={isLoading}
              notFound={notFound}
              serverError={serverError}
              onArticleSave={handleArticleSave}
              keyword={keyword}
              isFormBlocked={isFormBlocked}
            />
          </Route>
        
          <Route path="/saved-news">
            <ProtectedRoute path="/saved-news"
              component={SavedNews}
              loggedIn={loggedIn}
              logout={handleLogout}
              savedNews={savedNews}
              onArticleDelete={handleArticleDelete}
              keyword={keyword}
              onUnauthorized={handleLoginPopupClick}
              onGetSavedNews={getSavedNewsByUser}
            />
          </Route>
        </Switch>

        <Footer />

      </div>

      {/* Для тестирования верстки формы принимают любые данные, ошибки валидации нативные, почта "example@test.com" имитирует ошибку сервера - пользователь уже существует */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} handleLogin={handleLogin} onToggle={togglePopup} tokenCheck={tokenCheck} isFormBlocked={isFormBlocked} />

      <RegisterPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} handleRegister={handleRegister} onToggle={togglePopup} isFormBlocked={isFormBlocked} />
     
      <InfoTooltip title="Пользователь успешно зарегистрирован!" name="success" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
