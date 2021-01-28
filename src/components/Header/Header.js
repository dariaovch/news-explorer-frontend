import './Header.css';
import Navigation from '../Navigation/Navigation.js';

function Header() {
  return (
    <header className="header">
        <h2 className="header__title">NewsExplorer</h2>
        <Navigation />
    </header>
  );
}

export default Header;