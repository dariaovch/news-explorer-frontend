import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard({ item }) {
   const location = useLocation();

   const buttonClassName = (`${location.pathname === '/saved-news' ? 'card__delete-button' : 'card__save-button'}`);
   const hintClassName = (`${location.pathname === '/saved-news' ? 'card__delete-hint' : 'card__save-hint'}`);

    return(
        <li className="card">
        <button className={buttonClassName} type="button" aria-label="save"></button>
        <button className={hintClassName}>{location.pathname === '/saved-news' ? `Убрать из сохранённых` : `Войдите, чтобы сохранять статьи`}</button>
        <img className="card__image" alt="Картинка новости" src={item.image} />
        <div className="card__data-container">
            <p className="card__date">{item.date}</p>
              <h2 className="cards__heading">{item.title}</h2>
              <p className="card__text">{item.text}</p>
              <p className="card__source">{item.source}</p>
        </div>
      </li>
    )
}

export default NewsCard;