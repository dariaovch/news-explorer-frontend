import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import { NewsArr } from '../../db/news.js';

function SavedNews(props) {
  return (
    <>
    <SavedNewsHeader loggedIn={props.loggedIn} onLogout={props.logout} />

    <section className="saved-news">
      <div className="saved-news__text-container">
        <p className="saved-news__breadcrumbs">Сохраненные статьи</p>
      
        <h2 className="saved-news__title">
        Грета, у вас 6 сохраненных статей
        </h2>
    
        <p className="saved-news__keywords">По ключевым словам: <span className="saved-news__keyword-span">Природа</span>, <span className="saved-news__keyword-span">Тайга</span> и <span className="saved-news__keyword-span">2-м другим</span></p>
      </div>

      <div className="saved-news__container">
      <NewsCardList news={NewsArr} />
      </div>

      </section>

    </>
  );
}

export default SavedNews;