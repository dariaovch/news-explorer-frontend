import './Footer.css';
import FbIcon from '../../images/fb-icon.png';
import GithubIcon from '../../images/github-icon.png';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
      <ul className="footer__links">
          <div className="footer__main-links">
          <li className="footer__link"><a>Главная</a></li>
          <li className="footer__link"><a>Яндекс.Практикум</a></li>
          </div>
          <li className="footer__social">
              <img src={FbIcon} className="footer__icon footer__fb" />
              <img src={GithubIcon} className="footer__icon footer__github" />
          </li>
      </ul>
    </footer>
  );
}

export default Footer;