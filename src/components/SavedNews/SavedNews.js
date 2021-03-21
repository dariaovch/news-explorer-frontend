import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { mainApi } from '../../utils/MainApi.js';

function SavedNews({loggedIn, logout, savedNews, onArticleDelete, keyword}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <SavedNewsHeader loggedIn={loggedIn} onLogout={logout} userName={currentUser.name} />

    <section className="saved-news">
      <div className="saved-news__text-container">
        <p className="saved-news__breadcrumbs">Сохраненные статьи</p>
      
        <h2 className="saved-news__title">
        {currentUser.name}, у вас {savedNews.length} сохраненных статей
        </h2>
    
        <p className="saved-news__keywords">По ключевым словам: <span className="saved-news__keyword-span">Природа</span>, <span className="saved-news__keyword-span">Тайга</span> и <span className="saved-news__keyword-span">2-м другим</span></p>
      </div>

      <div className="saved-news__container">
      <NewsCardList news={savedNews} onArticleDelete={onArticleDelete} keyword={keyword} />
      </div>

      </section>

    </>
  );
}

export default SavedNews;