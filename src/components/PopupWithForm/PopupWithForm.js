import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({ children, name, title, buttonText, isOpen, onClose, onToggle }) {

    const popupClassName = (`${isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}`);

    return (
        <div className={popupClassName}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
            <form className={`popup__form popup__form_type_${name}`} method="POST" name={`${name}`} noValidate>
                <h2 className="popup__heading">{title}</h2>
                {children}
                <button type="submit" className="popup__submit-button">{buttonText}</button>
                {name === 'login' && <p className="popup__toggle">или <span className="popup__toggle-span" onClick={onToggle}>Зарегистрироваться</span></p>}
                {name === 'signup' && <p className="popup__toggle">или <span className="popup__toggle-span" onClick={onToggle}>Войти</span></p>}
            </form>
            </div>
        </div>
    )
}

export default PopupWithForm;