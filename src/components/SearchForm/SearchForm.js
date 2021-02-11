import './SearchForm.css';

function SearchForm(props) {
  return (
    <form className="search" onSubmit={props.onSubmit}>
        <input className="search__input" type="text" placeholder="Введите тему новости" required minLength="2" maxLength="40" />
        <button className="search__button">Искать</button>
    </form>
  );
}

export default SearchForm;