import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation.js';
import React from 'react';
import { Link } from 'react-router-dom';

function SavedNewsHeader(props) {
  return (
    <header className="header_sv">
        <Link to="/" className="header__logo-link"><h2 className="header__title_sv">NewsExplorer</h2></Link>
        <Navigation loggedIn={props.loggedIn} onLogout={props.onLogout} userName={props.userName} />
    </header>
  );
}

export default SavedNewsHeader;