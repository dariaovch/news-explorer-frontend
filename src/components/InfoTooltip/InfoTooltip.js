import React from 'react';
import './InfoTooltip.css';

function InfoTooltip(props) {

    function handleLoginPopupOpen() {
        props.onClose();
        props.onLogin();
    }

    return (
        <div className={props.isOpen ? `popup popup_type_${props.name} popup_opened` : `popup popup_type_${props.name}`}>
            <div className="popup__container">
              <button className="popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
              <div className="popup__container popup__container_tooltip">
                <h2 className="popup__heading popup__heading_tooltip">{props.title}</h2>
                <p className="popup__toggle popup__toggle_tooltip "><span className="popup__toggle-span" onClick={handleLoginPopupOpen}>Войти</span></p>
              </div>
            </div>
        </div>
    )
}

export default InfoTooltip;
