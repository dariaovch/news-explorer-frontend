import './Footer.css';
import FbIcon from '../../images/fb-icon.png';
import GithubIcon from '../../images/github-icon.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <ul className="footer__links">
          <div className="footer__main-links">
          <li className="footer__link"><Link to="/" className="footer__link-decor">Главная</Link></li>
          <li className="footer__link"><a href="https://praktikum.yandex.ru/" target="_blank" className="footer__link-decor">Яндекс.Практикум</a></li>
          </div>
          <li className="footer__social">
              <a href="https://github.com/dariaovch" target="_blank" ><img src={FbIcon} className="footer__icon footer__fb" /></a>
              <a href="https://github.com/dariaovch" target="_blank" ><img src={GithubIcon} className="footer__icon footer__github" /></a>
          </li>
      </ul>
    </footer>
  );
}

export default Footer;