import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navigation({ onLogin, loggedIn, userName, onLogout }) {

  const location = useLocation();

  const mainLinkClassName = (`${location.pathname === '/saved-news' ? 'navigation__main navigation__main_black' : 'navigation__main navigation__main_active'}`);
  const savedNewsLinkClassName = (`${location.pathname === '/saved-news' ? 'navigation__main navigation__main_active navigation__main_black navigation__main_active_black' : 'navigation__main'}`);
  const authButtonClassName = (`${location.pathname === '/saved-news'? 'navigation__auth navigation__auth_black' : 'navigation__auth'}`);
  const logoutButtonClassName = (`${location.pathname === '/saved-news' ? 'navigation__logout navigation__logout_black' : 'navigation__logout'}`);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const menuBoxClassName = (`${location.pathname === '/saved-news' ? 'burger-menu__box burger-menu__box_black' : 'burger-menu__box'}`);
  const menuMainLinkClassName = (`${location.pathname === '/saved-news' ? 'burger-menu__item burger-menu__item_black' : 'burger-menu__item burger-menu__item_active'}`);
  const menuSavedLinkClassName = (`${location.pathname === '/saved-news' ? 'burger-menu__item burger-menu__item_active burger-menu__item_black' : 'burger-menu__item'}`);
  const menuAuthButtonClassName = (`${location.pathname === '/saved-news'? 'burger-menu__auth-btn burger-menu__auth-btn_black' : 'burger-menu__auth-btn'}`);
  const menuToggleButtonClassName = (`${location.pathname === '/saved-news' ? 'burger-menu__pseudo-btn burger-menu__pseudo-btn_black' : 'burger-menu__pseudo-btn'}`);

  function toggleBurgerMenu() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <>
    <nav className="navigation">
       <Link to="/" className={mainLinkClassName}>Главная</Link>
       {loggedIn && 
        <>
        <Link to="/saved-news" className={savedNewsLinkClassName}>Сохраненные статьи</Link>
       <button className={logoutButtonClassName} onClick={onLogout}>Грета</button>
       </>
      }
       {!loggedIn && <button className={authButtonClassName} onClick={onLogin}>Авторизоваться</button>}
    </nav>

    <div className={isBurgerMenuOpen ? "burger-menu burger-menu__open" : "burger-menu"}>
      <input className="burger-menu__toggle" id="menu" type="checkbox" onClick={toggleBurgerMenu} />
      <label className="burger-menu__btn" htmlFor="menu">
      <span className={menuToggleButtonClassName}></span>
    </label>
        
        <ul className={menuBoxClassName}>
          <li><Link className={menuMainLinkClassName} to="/">Главная</Link></li>
          {loggedIn &&
            <>
              <li><Link className={menuSavedLinkClassName} to="/saved-news">Сохраненные статьи</Link></li>
              <button className={logoutButtonClassName} onClick={onLogout}>Грета</button>
            </>}

            {!loggedIn && <li><button className={menuAuthButtonClassName} onClick={onLogin}>Авторизоваться</button></li>}

        </ul>
    </div>
    </>
  );
}

export default Navigation;