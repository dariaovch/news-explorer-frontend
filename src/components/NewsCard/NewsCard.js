import './NewsCard.css';
import { useLocation } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

function NewsCard({ item, loggedIn, onSave, onDelete, keyword, image, link, date, text, source, userId }) {
   const location = useLocation();

   const hintClassName = (`${location.pathname === '/saved-news' ? 'card__delete-hint' : 'card__save-hint'}`);
  // const saveButtonClassName = (`${isSaved ? 'card__save-button card__save-button_saved' : 'card__save-button'}`);

  function handleSaveClick(evt) {
      evt.target.classList.toggle('card__save-button_saved')
      onSave(item, keyword);
      console.log(loggedIn)
  }

  function handleDeleteClick() {
    console.log(loggedIn)
      onDelete(item);
  }

  return (
        <li className="card">
        {location.pathname === '/saved-news' && <button className="card__keyword">{item.keyword}</button>}
        {location.pathname === '/saved-news' && <button className="card__delete-button" type="button" aria-label="delete" onClick={handleDeleteClick}></button>}
        {location.pathname === '/' && <button className="card__save-button" type="button" aria-label="save" onClick={handleSaveClick}></button>}
        {location.pathname === '/' && !loggedIn && <button className={hintClassName}>Войдите, чтобы сохранять статьи</button>}
        {location.pathname === '/saved-news' && <button className={hintClassName}>Убрать из сохраненных</button>}
        <img className="card__image" alt="Картинка новости" src={image} />
        <a className="card__src-link" href={link} target="_blank">
        <div className="card__data-container">
          <div className="card__article-container">
            <p className="card__date">{formatDate(date)}</p>
              <h2 className="card__heading">{item.title}</h2>
              <p className="card__text">{text}</p>
           </div>
           
              
              <p className="card__source">{source}</p>
        </div>
        </a>
      </li>
    )
}

export default NewsCard;