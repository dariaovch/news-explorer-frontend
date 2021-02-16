import './About.css';
import AuthorImg from '../../images/author.png';

function About() {
  return (
    <section className="about">
        <img src={AuthorImg} alt="Фото автора" className="about__photo" />

        <div className="about__text-container">
        <h2 className="about__title">
            Об авторе
        </h2>

        <p className="about__text">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
        </p>

        <p className="about__text">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
        </p>
        </div>
    </section>
  );
}

export default About;