import './Main.css';
import Header from '../Header/Header.js';
import About from '../About/About.js';
import SearchForm from '../SearchForm/SearchForm.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';

function Main() {
  return (
    <div className="main">
        <div className="main__background">
        <Header />
        <section className="cover">
            <h1 className="cover__title">Что творится в мире?</h1>
            <p className="cover__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <SearchForm />
        </section>
        </div>

        <section className="results">
            <h2 className="results__title">
                Результаты поиска
            </h2>

            <NewsCardList />
        </section>
        <About />
    </div>
  );
}

export default Main;