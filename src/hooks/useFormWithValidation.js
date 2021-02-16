import { useState, useCallback } from 'react';

function useFormWithValidation() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    function handleChange(evt) {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: target.validationMessage
        });


        setIsFormValid(target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {
            name: '',
            email: '',
            password: ''
        }, 
        newErrors = {}, 
        newIsFormValid = false) => {
          setValues(newValues);
          setErrors(newErrors);
          setIsFormValid(newIsFormValid);
        },
        [setValues, setErrors, setIsFormValid]
      );


    return { values, handleChange, errors, isFormValid, resetForm }
}

export default useFormWithValidation;