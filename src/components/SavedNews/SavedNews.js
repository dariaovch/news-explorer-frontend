import './SavedNews.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function SavedNews() {
  return (
    <>
    <SavedNewsHeader />

    <section className="saved-news">
      <div className="saved-news__text-container">
        <p className="saved-news__breadcrumbs">Сохраненные статьи</p>
      
        <h2 className="saved-news__title">
        Грета, у вас 6 сохраненных статей
        </h2>
    
        <p className="saved-news__keywords">По ключевым словам: Природа, Тайга и 2-м другим</p>
      </div>

      <div className="saved-news__container">
      <NewsCardList />
      </div>

      </section>

    </>
  );
}

export default SavedNews;