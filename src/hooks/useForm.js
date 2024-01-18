import { useEffect, useMemo, useState } from 'react'

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm)
    const [formValidation, setFormValidation] = useState({})

    // Cada que cambia el formulario se ejecutan los validadores
    useEffect(() => {
        createValidators();
    }, [formState])
    
    // Cambiar el initial form
    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            // Si hay alguna validacion diferente a null, significa que no
            // es correcto el formulario y retorna falso
            if (formValidation[formValue !== null]) {
                return false;
            }
        }

        return true;
    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    // Reiniciar los valores del formulario
    const onResetForm = () => {
        setFormState(initialForm)
    }

    const createValidators = () => { 
        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

        }

        setFormValidation(formCheckedValues);
        // console.log(formCheckedValues);
    }

    return {
        // Desestructurar formState
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}
