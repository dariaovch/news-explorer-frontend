import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation.js';

function SavedNewsHeader() {
  return (
    <header className="header_sv">
        <h2 className="header__title_sv">NewsExplorer</h2>
        <Navigation savedNews={true} />
    </header>
  );
}

export default SavedNewsHeader;