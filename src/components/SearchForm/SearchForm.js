import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search">
        <input className="search__input" type="text" placeholder="Введите тему новости" />
        <button className="search__button">Искать</button>
    </form>
  );
}

export default SearchForm;