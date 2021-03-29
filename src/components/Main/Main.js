import React from 'react';
import './Main.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import SearchForm from '../SearchForm/SearchForm.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import Preloader from '../Preloader/Preloader.js';
import NothingFound from '../NothingFound/NothingFound.js';
import ServerError from '../ServerError/ServerError';

function Main({onLogin, loggedIn, logout, handleSearch, isLoading, notFound, news, serverError, onArticleSave, keyword, isFormBlocked}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="main">
        <div className="main__background">
        <Header onLogin={onLogin} loggedIn={loggedIn} userName={currentUser.name} onLogout={logout} />
        <section className="cover">
            <h1 className="cover__title">Что творится в мире?</h1>
            <p className="cover__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <SearchForm handleSearch={handleSearch} isFormBlocked={isFormBlocked} />
        </section>
        </div>

       {isLoading && <Preloader />}
      
       {news.length > 0 && 
           <section className="results">
             <h2 className="results__title">
                Результаты поиска
             </h2>

             <NewsCardList news={news} loggedIn={loggedIn} onArticleSave={onArticleSave} keyword={keyword} userId={currentUser.id} />

            </section>}

        {notFound && <NothingFound />}
        {serverError && <ServerError />}

        <About />
    </div>
  );
}

export default Main;