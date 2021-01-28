import './Main.css';
import About from '../About/About.js';
import SearchForm from '../SearchForm/SearchForm.js';

function Main() {
  return (
    <main className="Main">
        <section className="cover">
            <h1 className="cover__title"></h1>
            <p className="cover__text"></p>
            <SearchForm />
        </section>
        <section className="results">
            
        </section>
        <About />
    </main>
  );
}

export default Main;