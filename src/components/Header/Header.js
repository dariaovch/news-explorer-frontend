import './Header.css';
import Navigation from '../Navigation/Navigation.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
        <Link to="/" className="header__logo-link"><h2 className="header__title">NewsExplorer</h2></Link>
        <Navigation savedNews={false} onLogin={props.onLogin} loggedIn={props.loggedIn} userName={currentUser.name} onLogout={props.onLogout} />
    </header>
  );
}

export default Header;