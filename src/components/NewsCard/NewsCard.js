import './NewsCard.css';

function NewsCard({ item }) {
    return(
        <li className="card">
        <button className="card__save-button" type="button" aria-label="save"></button>
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