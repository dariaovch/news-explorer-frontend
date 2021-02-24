import React from 'react';
import './SearchForm.css';

function SearchForm(props) {

  const [keyword, setKeyword] = React.useState('');
  
  function handleInputChange(evt) {
    setKeyword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

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
        />
        <button className="search__button">Искать</button>
    </form>
  );
}

export default SearchForm;