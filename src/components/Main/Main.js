import React from 'react';
import './Main.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import SearchForm from '../SearchForm/SearchForm.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import Preloader from '../Preloader/Preloader.js';
import NothingFound from '../NothingFound/NothingFound.js';
import { NewsArr } from '../../db/news.js';

function Main(props) {

  const [news, setNews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function getNews(arr) {
    setNews(arr);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setTimeout(() => 
      setIsLoading(false),
      4000
    );
    setTimeout(() =>
    getNews(NewsArr),
    4000
    );
  }

  return (
    <div className="main">
        <div className="main__background">
        <Header onLogin={props.onLogin} loggedIn={props.loggedIn} userName={props.userName} onLogout={props.logout} />
        <section className="cover">
            <h1 className="cover__title">Что творится в мире?</h1>
            <p className="cover__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <SearchForm onSubmit={handleSearchSubmit} />
        </section>
        </div>
          
       {isLoading && <Preloader />}

       {news.length > 0 && 
           <section className="results">
             <h2 className="results__title">
                Результаты поиска
             </h2>

             <NewsCardList news={news} loggedIn={props.loggedIn} />

            </section>}

        {news.length === 1 && <NothingFound />}

        <About />
    </div>
  );
}

export default Main;