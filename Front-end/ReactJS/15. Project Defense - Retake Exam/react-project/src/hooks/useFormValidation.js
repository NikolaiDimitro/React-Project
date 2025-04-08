import { useState } from 'react';

export const useFormValidation = (initialState, validationRules) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (!rules) return '';

        for (const rule of rules) {
            if (!rule.validate(value)) {
                return rule.message;
            }
        }

        return '';
    };

    const validateForm = () => {
        const newErrors = {};
        let formIsValid = true;

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);
        setIsValid(formIsValid);
        return formIsValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    return {
        formData,
        errors,
        isValid,
        handleChange,
        validateForm,
        setFormData
    };
}; 