import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation.js';

function SavedNewsHeader(props) {
  return (
    <header className="header_sv">
        <h2 className="header__title_sv">NewsExplorer</h2>
        <Navigation loggedIn={props.loggedIn} />
    </header>
  );
}

export default SavedNewsHeader;