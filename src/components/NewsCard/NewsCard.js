import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard({ item, onSaveClick, isSaved }) {
   const location = useLocation();

  //  const buttonClassName = (`${location.pathname === '/saved-news' ? 'card__delete-button' : 'card__save-button'}`);
   const hintClassName = (`${location.pathname === '/saved-news' ? 'card__delete-hint' : 'card__save-hint'}`);

   const saveButtonClassName = (`${isSaved ? 'card__save-button card__save-button_saved' : 'card__save-button'}`);

   function handleCardSave() {
     onSaveClick(item)
   }

    return(
        <li className="card">
        {location.pathname === '/saved-news' && <button className="card__keyword">{item.keyword}</button>}
        {location.pathname === '/saved-news' && <button className="card__delete-button" type="button" aria-label="delete"></button>}
        {location.pathname === '/' && <button className={saveButtonClassName} type="button" aria-label="save" onClick={handleCardSave}></button>}
        <button className={hintClassName}>{location.pathname === '/saved-news' ? `Убрать из сохранённых` : `Войдите, чтобы сохранять статьи`}</button>
        <img className="card__image" alt="Картинка новости" src={item.image} />
        <a className="card__src-link" href={item.link} target="_blank">
        <div className="card__data-container">
          <div className="card__article-container">
            <p className="card__date">{item.date}</p>
              <h2 className="card__heading">{item.title}</h2>
              <p className="card__text">{item.text}</p>
           </div>
           
              
              <p className="card__source">{item.source}</p>
        </div>
        </a>
      </li>
    )
}

export default NewsCard;