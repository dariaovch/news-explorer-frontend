import './Preloader.css';
import spinner from '../../images/Preloader.png';

function Preloader() {
    return (
        <section className="results">
          <div className="preloader">
              <img src={spinner} className="preloader__spinner rotation" />
              <p className="preloader__text">Идёт поиск новостей...</p>
          </div>
        </section>
    )
}

export default Preloader;