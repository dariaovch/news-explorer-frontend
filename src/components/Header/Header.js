import './Header.css';
import Navigation from '../Navigation/Navigation.js';

function Header(props) {
  return (
    <header className="header">
        <h2 className="header__title">NewsExplorer</h2>
        <Navigation savedNews={false} onLogin={props.onLogin} loggedIn={props.loggedIn} userName={props.userName} />
    </header>
  );
}

export default Header;