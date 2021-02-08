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

  // const [news, setNews] = React.useState([]);

  // function getNews() {
  //   setNews(NewsArr);
  // }

  return (
    <div className="main">
        <div className="main__background">
        <Header onLogin={props.onLogin} loggedIn={props.loggedIn} userName={props.userName} />
        <section className="cover">
            <h1 className="cover__title">Что творится в мире?</h1>
            <p className="cover__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <SearchForm />
        </section>
        </div>

        <section className="results">
          
         {/* {isLoading && <Preloader />} */}

           {NewsArr && 
           <>
             <h2 className="results__title">
                Результаты поиска
             </h2>

             <NewsCardList />

             <button className="results__show-more">Показать ещё</button>
            </>}

            {/* {news.length === 0 && <NothingFound />} */}

        </section>
        <About />
    </div>
  );
}

export default Main;