import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation(props) {
  const mainLinkClassName = (`${props.savedNews ? 'navigation__main_black' : 'navigation__main navigation__main_active'}`);
  const savedNewsLinkClassName = (`${props.savedNews ? 'navigation__main_black  navigation__main_active_black' : 'navigation__main'}`);
  const authButtonClassName = (`${props.savedNews ? 'navigation__auth_black' : 'navigation__auth'}`);

  return (
    <nav className="navigation">
       <Link to="/" className={mainLinkClassName}>Главная</Link>
       <Link to="/saved-news" className={savedNewsLinkClassName}>Сохраненные статьи</Link>
       <button className={authButtonClassName}>Грета</button>
    </nav>
  );
}

export default Navigation;