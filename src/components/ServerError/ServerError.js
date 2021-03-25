import '../NothingFound/NothingFound.css';
import NotFound from '../../images/not-found_v1.png';

function ServerError() {
    return (
        <section className="results">
          <div className="not-found">
            <img src={NotFound} alt="Ничего не найдено" className="not-found__img" />
            <h2 className="not-found__title">Что-то пошло не так!</h2>
            <p className="not-found__text">Во время запроса возникли технические проблемы. Попробуйте еще раз!</p>
          </div>
        </section>
    )
}

export default ServerError;