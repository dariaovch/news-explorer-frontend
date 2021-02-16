import './Header.css';
import Navigation from '../Navigation/Navigation.js';
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
        <Link to="/" className="header__logo-link"><h2 className="header__title">NewsExplorer</h2></Link>
        <Navigation savedNews={false} onLogin={props.onLogin} loggedIn={props.loggedIn} userName={props.userName} onLogout={props.onLogout} />
    </header>
  );
}

export default Header;