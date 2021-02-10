import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import { NewsArr } from '../../db/news.js';

function NewsCardList(props) {
  return (
    <>
    <ul className="news">
    {NewsArr.map((item) => <NewsCard item={item} key={item._id} onSaveClick={props.onSaveClick} isSaved={props.isSaved} />)}
    </ul>
    </>
  );
}

export default NewsCardList;