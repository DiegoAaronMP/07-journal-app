import { useState } from "react";

export const useForm = ( initialForm = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ( { target } ) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    // Reiniciar los valores del formulario
    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        // Desestructurar formState
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
}
