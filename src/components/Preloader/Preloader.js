import './Preloader.css';
import spinner from '../../images/Preloader.png';

function Preloader() {
    return (
        <div className="preloader">
          <img src={spinner} className="preloader__spinner rotation" />
          <p className="preloader__text">Идёт поиск новостей...</p>
        </div>
    )
}

export default Preloader;