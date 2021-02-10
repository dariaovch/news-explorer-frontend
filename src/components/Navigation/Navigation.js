import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navigation({ savedNews, onLogin, loggedIn, userName }) {

  const location = useLocation();

  const mainLinkClassName = (`${location.pathname === '/saved-news' ? 'navigation__main navigation__main_black' : 'navigation__main navigation__main_active'}`);
  const savedNewsLinkClassName = (`${location.pathname === '/saved-news' ? 'navigation__main navigation__main_active navigation__main_black navigation__main_active_black' : 'navigation__main'}`);
  const authButtonClassName = (`${location.pathname === '/saved-news'? 'navigation__auth navigation__auth_black' : 'navigation__auth'}`);
  const logoutButtonClassName = (`${location.pathname === '/saved-news' ? 'navigation__logout navigation__logout_black' : 'navigation__logout'}`);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function toggleBurgerMenu() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen)
  }

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
       {!loggedIn && <button className={authButtonClassName} onClick={onLogin}>Авторизоваться</button>}
    </nav>

    <div className={isBurgerMenuOpen ? "burger-menu burger-menu__open" : "burger-menu"}>
    {/* <label className="burger-menu__btn" htmlFor="menu"> */}
      <input className="burger-menu__toggle" id="menu" type="checkbox" onClick={toggleBurgerMenu} />
      <label className="burger-menu__btn" htmlFor="menu">
      <span className="burger-menu__pseudo-btn"></span>
    </label>
        
        <ul className="burger-menu__box">
          <li><Link className="burger-menu__item" to="/">Главная</Link></li>
          {loggedIn &&
            <>
              <li><Link className="burger-menu__item" to="/saved-news">Сохраненные статьи</Link></li>
              <button className={logoutButtonClassName}>Грета</button>
            </>}

            {!loggedIn && <li><button className="burger-menu__auth-btn" onClick={onLogin}>Авторизоваться</button></li>}

        </ul>
    </div>
    </>
  );
}

export default Navigation;