import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
// import { NewsArr } from '../../db/news.js';
import { useLocation } from 'react-router-dom';

function NewsCardList({ news, loggedIn }) {

  const [shownNews, setShownNews] = React.useState([]);
  const [showMoreButton, setShowMoreButton] = React.useState(false);


  React.useEffect(() => {
    setShownNews(news.slice(0, 3));
    if(news.length <= 3) {
      setShowMoreButton(false);
    } else {
      setShowMoreButton(true);
    }
  }, [news]);

  function handleMoreButtonClick() {
    setShownNews(news.slice(0, shownNews.length + 3));
    if(shownNews.length >= news.length - 3) {
      setShowMoreButton(false);
    }
  }

  const location = useLocation();

  return (
    <>
    <ul className="news">
    {shownNews.map((item) => <NewsCard item={item} key={item.url} loggedIn={loggedIn} />)}
    </ul>

    {(location.pathname === '/' && showMoreButton) && <button className="results__show-more" onClick={handleMoreButtonClick}>Показать ещё</button>}

    </>
  );
}

export default NewsCardList;