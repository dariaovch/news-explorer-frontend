import React from 'react';
import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import formatSentence from '../../utils/formatSentence';
import formatKeywords from '../../utils/formatKeywords';

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
        {currentUser.name}, у вас {savedNews.length} {formatSentence(savedNews)}
        </h2>
    
        {savedNews.length > 0 && formatKeywords(keywords)}
      </div>

      <div className="saved-news__container">
      <NewsCardList loggedIn={loggedIn} news={savedNews} onArticleDelete={onArticleDelete} keyword={keyword} />
      </div>

      </section>

    </>
  );
}

export default SavedNews;