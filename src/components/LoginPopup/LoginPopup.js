import React from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function LoginPopup({isOpen, onClose, handleLogin, onToggle, tokenCheck, isFormBlocked}) {

    const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();
  
    
    function handleSubmit(evt) {
        evt.preventDefault();
        // const { email, password } = data;
        // console.log({ email, password });
        handleLogin(values.email, values.password);
        tokenCheck();
    }

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);


    return(
        <PopupWithForm name="login" title="Вход" buttonText="Войти" isOpen={isOpen} onClose={onClose} onToggle={onToggle} onSubmit={handleSubmit} isFormValid={isFormValid} isFormBlocked={isFormBlocked}>
                <label className="popup__input-label" htmlFor="login-email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="login-email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                  disabled={isFormBlocked}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="login-password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="login-password" 
                  required 
                  minLength="6" 
                  maxLength="30"
                  placeholder="Введите пароль" 
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={isFormBlocked}
                />
                {errors.password && <span className="popup__input-error">{errors.password}</span>}
        </PopupWithForm>
    );
}

export default LoginPopup;