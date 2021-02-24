import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard({ item, loggedIn }) {
   const location = useLocation();

  //  const buttonClassName = (`${location.pathname === '/saved-news' ? 'card__delete-button' : 'card__save-button'}`);
   const hintClassName = (`${location.pathname === '/saved-news' ? 'card__delete-hint' : 'card__save-hint'}`);

  //  const saveButtonClassName = (`${isSaved ? 'card__save-button card__save-button_saved' : 'card__save-button'}`);

  function handleSaveClick(evt) {
    if(loggedIn) {
      evt.target.classList.toggle('card__save-button_saved')
    }
  }

  return (
        <li className="card">
        {location.pathname === '/saved-news' && <button className="card__keyword">{item.keyword}</button>}
        {location.pathname === '/saved-news' && <button className="card__delete-button" type="button" aria-label="delete"></button>}
        {location.pathname === '/' && <button className="card__save-button" type="button" aria-label="save" onClick={handleSaveClick}></button>}
        {location.pathname === '/' && !loggedIn && <button className={hintClassName}>Войдите, чтобы сохранять статьи</button>}
        {location.pathname === '/saved-news' && <button className={hintClassName}>Убрать из сохраненных</button>}
        <img className="card__image" alt="Картинка новости" src={item.urlToImage} />
        <a className="card__src-link" href={item.url} target="_blank">
        <div className="card__data-container">
          <div className="card__article-container">
            <p className="card__date">{item.publishedAt}</p>
              <h2 className="card__heading">{item.title}</h2>
              <p className="card__text">{item.description}</p>
           </div>
           
              
              <p className="card__source">{item.source.name}</p>
        </div>
        </a>
      </li>
    )
}

export default NewsCard;