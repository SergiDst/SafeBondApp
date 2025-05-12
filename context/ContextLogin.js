import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const FormContext = createContext();

// Proveedor del contexto
export const FormProvider = ({ children }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para saber si está en login o registro
    const [comportamiento, setComportamiento] = useState(0)
    const [formData, setFormData] = useState({
            Edad: '',
            Peso: '',
            Estatura: '',
            Comportamiento: '',
            feedback: ''
    });
    const [birthDate, setBirthDate] = useState(null);
    const [userData, setUserData] = useState(null);

    const toggleAuthMode = () => {
        setIsLoggingIn((prev) => !prev); // Cambiar entre login y registro
    };

    return (
        <FormContext.Provider
            value={{
                isLoggingIn,
                toggleAuthMode,
                comportamiento,
                setComportamiento,
                formData,
                setFormData,
                birthDate,
                setBirthDate
                ,userData,
                setUserData
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuthContext = () => {
    return useContext(FormContext);
};