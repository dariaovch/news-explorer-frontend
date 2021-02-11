import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
// import { NewsArr } from '../../db/news.js';
import { useLocation } from 'react-router-dom';

function NewsCardList(props) {

  const location = useLocation();

  return (
    <>
    <ul className="news">
    {props.news.map((item) => <NewsCard item={item} key={item._id} loggedIn={props.loggedIn} />)}
    </ul>

    {location.pathname === '/' && <button className="results__show-more">Показать ещё</button>}

    </>
  );
}

export default NewsCardList;