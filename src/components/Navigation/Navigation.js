import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation(props) {

  const mainLinkClassName = (`${props.savedNews ? 'navigation__main_black' : 'navigation__main navigation__main_active'}`);
  const savedNewsLinkClassName = (`${props.savedNews ? 'navigation__main_black  navigation__main_active_black' : 'navigation__main'}`);
  const authButtonClassName = (`${props.savedNews ? 'navigation__auth_black' : 'navigation__auth'}`);

  return (
    <>
    <nav className="navigation">
       <Link to="/" className={mainLinkClassName}>Главная</Link>
       <Link to="/saved-news" className={savedNewsLinkClassName}>Сохраненные статьи</Link>
       <button className={authButtonClassName}>Грета</button>
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