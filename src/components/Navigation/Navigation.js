import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
       <a className="naviagtion__main">Главная</a>
       <button className="navigation__auth">Авторизоваться</button>
    </nav>
  );
}

export default Navigation;