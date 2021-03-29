import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header_sv">
        <Link to="/" className="header__logo-link"><h2 className="header__title_sv">NewsExplorer</h2></Link>
        <Navigation loggedIn={props.loggedIn} onLogout={props.onLogout} userName={currentUser.name} />
    </header>
  );
}

export default SavedNewsHeader;