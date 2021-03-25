import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function SavedNews({loggedIn, logout, savedNews, onArticleDelete, keyword, onGetSavedNews}) {
  const currentUser = React.useContext(CurrentUserContext);

  const allKeywords = savedNews.map((item) => item.keyword);
 
  const keywords = allKeywords.filter((item, i) => allKeywords.indexOf(item) === i);

  return (
    <>
    <SavedNewsHeader loggedIn={loggedIn} onLogout={logout} userName={currentUser.name} />

    <section className="saved-news">
      <div className="saved-news__text-container">
        <p className="saved-news__breadcrumbs">Сохраненные статьи</p>
      
        <h2 className="saved-news__title">
        {currentUser.name}, у вас {savedNews.length} сохраненных статей
        </h2>
    
        <p className="saved-news__keywords">По ключевым словам: <span className="saved-news__keyword-span">{keywords[0]}</span>, <span className="saved-news__keyword-span">{keywords[1]}</span> и <span className="saved-news__keyword-span">{keywords[2]}</span></p>
      </div>

      <div className="saved-news__container">
      <NewsCardList news={savedNews} onArticleDelete={onArticleDelete} keyword={keyword} />
      </div>

      </section>

    </>
  );
}

export default SavedNews;