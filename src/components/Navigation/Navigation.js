import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ savedNews, onLogin, loggedIn, userName }) {

  const mainLinkClassName = (`${savedNews ? 'navigation__main_black' : 'navigation__main navigation__main_active'}`);
  const savedNewsLinkClassName = (`${savedNews ? 'navigation__main_black  navigation__main_active_black' : 'navigation__main'}`);
  // const authButtonClassName = (`${savedNews ? 'navigation__auth_black' : 'navigation__auth'}`);
  const logoutButtonClassName = (`${savedNews ? 'navigation__logout_black' : 'navigation__logout'}`);

  return (
    <>
    <nav className="navigation">
       <Link to="/" className={mainLinkClassName}>Главная</Link>
       {loggedIn && 
        <>
        <Link to="/saved-news" className={savedNewsLinkClassName}>Сохраненные статьи</Link>
       <button className={logoutButtonClassName}>Грета</button>
       </>
      }
       {!loggedIn && <button className="navigation__auth" onClick={onLogin}>Авторизоваться</button>}
    </nav>

    <div className="burger-menu">
    {/* <label className="burger-menu__btn" htmlFor="menu"> */}
      <input className="burger-menu__toggle" id="menu" type="checkbox" />
      <label className="burger-menu__btn" htmlFor="menu">
      <span className="burger-menu__pseudo-btn"></span>
    </label>
        
        <ul className="burger-menu__box">
          <li><Link className="burger-menu__item" to="/">Главная</Link></li>
          <li><Link className="burger-menu__item" to="/saved-news">Сохраненные статьи</Link></li>
          <li><button className="burger-menu__auth-btn">Авторизоваться</button></li>
        </ul>
    </div>
    </>
  );
}

export default Navigation;