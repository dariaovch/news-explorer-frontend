import React from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function RegisterPopup({isOpen, onClose, handleRegister, onToggle, tokenCheck, isFormBlocked}) {

    // const [ data, setData ] = React.useState({
    //     name: '',
    //     email: '',
    //     password: ''
    // });

    const { values, handleChange, errors, isFormValid, resetForm } = useFormWithValidation();
    
    // function handleChange(evt) {
    //   const {name, value} = evt.target;
    //   setData({
    //       ...data,
    //       [name]: value
    //   })
    // }
    function handleSubmit(evt) {
        evt.preventDefault();
        const { name, email, password } = values;
        console.log({ name, email, password });
        handleRegister(name, email, password);
    }

    React.useEffect(() => {
        resetForm();
    }, [isOpen]);


    return(
        <PopupWithForm name="signup" title="Регистрация" buttonText="Зарегистрироваться" isOpen={isOpen} onClose={onClose} onToggle={onToggle} onSubmit={handleSubmit} isFormValid={isFormValid} disabled={isFormBlocked}>
        <label className="popup__input-label" htmlFor="signup-email">Email</label>
                <input 
                  className="popup__input popup__input_email"
                  type="email" 
                  name="email" 
                  id="signup-email" 
                  required 
                  minLength="6" 
                  maxLength="40" 
                  placeholder="Введите почту" 
                  value={values.email || ''}
                  onChange={handleChange}
                  disabled={isFormBlocked}
                />
                {errors.email && <span className="popup__input-error">{errors.email}</span>}

                <label className="popup__input-label" htmlFor="signup-password">Пароль</label>
                <input 
                  className="popup__input popup__input_password"
                  type="password" 
                  name="password" 
                  id="signup-password" 
                  required 
                  minLength="6" 
                  maxLength="30" 
                  placeholder="Введите пароль" 
                  value={values.password || ''}
                  onChange={handleChange}
                  disabled={isFormBlocked}
                />
                {errors.password && <span className="popup__input-error">{errors.password}</span>}

                <label className="popup__input-label" htmlFor="name">Имя</label>
                <input 
                  className="popup__input popup__input_name" 
                  type="text" 
                  name="name" 
                  id="name" 
                  required 
                  minLength="2" 
                  maxLength="40" 
                  placeholder="Введите своё имя" 
                  value={values.name || ''}
                  onChange={handleChange}
                  disabled={isFormBlocked}
                />
                {errors.name && <span className="popup__input-error">{errors.name}</span>}
        </PopupWithForm>
    );
}

export default RegisterPopup;