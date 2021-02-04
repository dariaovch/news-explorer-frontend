import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { NewsArr } from '../../db/news.js';

function NewsCardList() {
  return (
    <>
    <ul className="news">
    {NewsArr.map((item) => <NewsCard item={item} key={item._id} />)}
    </ul>

    <button className="results__show-more">Показать ещё</button>
    </>
  );
}

export default NewsCardList;