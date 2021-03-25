import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Main from '../Main/Main.js';
import SavedNews from '../SavedNews/SavedNews.js';
import Footer from '../Footer/Footer.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import RegisterPopup from '../RegisterPopup/RegisterPopup.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import { newsApi } from '../../utils/NewsApi.js';
import { mainApi } from '../../utils/MainApi.js';
import * as Auth from '../../utils/Auth.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CLOSE_POPUP_TIME } from '../../utils/constants';

function App() {

   // Стейт-переменные для авторизации
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [currentUser, setCurrentUser] = React.useState({
    id: '',
    name: '',
    email: '',
  });

   // Cтейт-переменные для открытия и закрытия попапов
   const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
   const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);

   // Tooltip успешной регистрации или ошибки при запросе на сервер
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
   const [tooltipMessage, setTooltipMessage] = React.useState('');

   const history = useHistory();


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
     const token = localStorage.getItem('token');

     if(loggedIn) {
       mainApi.getUserInfo(token)
         .then((data) => {
           console.log(data)
           setCurrentUser({
            id: data._id,
            name: data.name,
            email: data.email,
           })
         })
     }
   }, [loggedIn]);

  function handleLoginPopupClick() {
    setIsLoginPopupOpen(true);
  }

  function closeAllPopups() {
    setIsSignupPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsInfoTooltipOpen(false);
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

   const token = localStorage.getItem('token');
  
    const isArticleSaved = savedNews.find((article) => article.title === item.title);

    if (isArticleSaved) {
      return mainApi.deleteArticle(isArticleSaved._id, token)
        .then(() => {
          const newList = savedNews.filter((a) => a._id !== isArticleSaved._id);
          setSavedNews(newList);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return mainApi.saveArticle(item, keyword, token)
        .then((newArticle) => {
          console.log(newArticle);
          setSavedNews([newArticle, ...savedNews]);
        })
        .catch((err) => {
          console.log(err);
        })
      } 
  }

  function handleArticleDelete(item) {
    const token = localStorage.getItem('token');

    return mainApi.deleteArticle(item._id, token)
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
  function handleRegister(name, email, password) {
    setIsFormBlocked(true);
    console.log(name, email, password)
    Auth.register(name, email, password)
      .then((res) => {
        console.log('Вы успешно зарегистрировались!')
        setTooltipMessage('Пользователь успешно зарегистрирован!');
        setIsSignupPopupOpen(false);
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
          setIsLoginPopupOpen(true);
        }, CLOSE_POPUP_TIME);
      })
      .catch((err) => {
        console.log(err)
        setIsSignupPopupOpen(false);
        if (err.status === 400) {
          console.log('Неверно заполнено одно из полей')
          setTooltipMessage('Неверно заполнено одно из полей. Попробуйте еще раз!')
        } else if (err.statusCode === 409) {
          console.log('Такой пользователь уже существует')
          setTooltipMessage('Такой пользователь уже существует. Попробуйте еще раз!')
        } else {
          setTooltipMessage('Что-то пошло не так! Попробуйте еще раз.');
        }
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
          setIsSignupPopupOpen(true);
        }, CLOSE_POPUP_TIME);
      })
      .finally(() => setIsFormBlocked(false))
  }

  function handleLogin(email, password) {
    setIsFormBlocked(true);

    Auth.login(email, password)
      .then((res) => {
        console.log(res)
        if(res.token) {
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          tokenCheck();
          history.push('/');
          
          setTimeout(() => {
            setIsLoginPopupOpen(false);
          }, CLOSE_POPUP_TIME);
        }
      })
      .catch((err) => {
        console.log(err)
        setIsLoginPopupOpen(false);
        if (err.status === 400) {
          console.log('Неверно заполнено одно из полей')
          setTooltipMessage('Неверно заполнено одно из полей. Попробуйте еще раз!')
        } else if (err.status === 401) {
          console.log('Пользователь не найден')
          setTooltipMessage('Пользователь не найден. Попробуйте еще раз!')
        } else {
          setTooltipMessage('Что-то пошло не так! Попробуйте еще раз.');
        }
        setIsInfoTooltipOpen(true);
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
          setIsLoginPopupOpen(true);
        }, CLOSE_POPUP_TIME);
      })
      .finally(() => setIsFormBlocked(false))
  }

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if(token) {
      Auth.getContent(token)
        .then((res) => { 
          if(res) {
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
  };

  function handleLogout() {
      localStorage.removeItem('token');
      setLoggedIn(false);
      setCurrentUser({
        id: '',
        name: '',
        email: '',
      })
      history.push('/');
  }

  // Проверяем наличие валидного токена и достаем из хранилища результаты последнего поиска
  React.useEffect(() => {
    // tokenCheck();
    const lastFoundNews = localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : [];
    setFoundNews(lastFoundNews);
    const lastKeyword = localStorage.getItem('keyword') ? JSON.parse(localStorage.getItem('keyword')) : '';
    setKeyword(lastKeyword);
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    // tokenCheck();
    console.log(currentUser)
    if (loggedIn){
      return mainApi.getSavedArticlesWithToken(token)
        .then((articles) => {
          const savedNewsByUser = articles.filter((a) => a.owner === currentUser.id);
          setSavedNews(savedNewsByUser);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [currentUser.id, loggedIn]);


  React.useEffect(() => {
    tokenCheck();
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

      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} handleLogin={handleLogin} onToggle={togglePopup} tokenCheck={tokenCheck} isFormBlocked={isFormBlocked} />

      <RegisterPopup isOpen={isSignupPopupOpen} onClose={closeAllPopups} handleRegister={handleRegister} onToggle={togglePopup} isFormBlocked={isFormBlocked} />
     
      <InfoTooltip title={tooltipMessage} name="tooltip" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onLogin={handleLoginPopupClick} />

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
