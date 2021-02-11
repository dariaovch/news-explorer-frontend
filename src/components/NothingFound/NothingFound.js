import './NothingFound.css';
import NotFound from '../../images/not-found_v1.png';

function NothingFound() {
    return (
        <section className="results">
          <div className="not-found">
            <img src={NotFound} className="not-found__img" />
            <h2 className="not-found__title">Ничего не найдено</h2>
            <p className="not-found__text">К сожалению по вашему запросу ничего не найдено</p>
          </div>
        </section>
    )
}

export default NothingFound;