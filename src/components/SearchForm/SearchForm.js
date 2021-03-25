import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  
  function handleInputChange(evt) {
    setKeyword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if(!keyword) {
      return setErrorMessage('Поле ввода не может быть пустым, введите ключевое слово')
    }

    props.handleSearch(keyword);
  }

  console.log(keyword)

  return (
    <form className="search" onSubmit={handleSubmit}>
        <input 
          className="search__input" 
          type="text" 
          placeholder="Введите тему новости" 
          required 
          minLength="2" 
          maxLength="40"
          onChange={handleInputChange}
          value={keyword}
          disabled={props.isFormBlocked}
        />
        <button className="search__button" disabled={props.isFormBlocked}>Искать</button>
        {errorMessage && <span className="search__input-error">{errorMessage}</span>}
    </form>
  );
}

export default SearchForm;