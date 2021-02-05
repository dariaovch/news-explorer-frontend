import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
       <a className="naviagtion__main">Главная</a>
       <a className="naviagtion__main">Сохраненные статьи</a>
       <button className="navigation__auth">Грета</button>
    </nav>
  );
}

export default Navigation;