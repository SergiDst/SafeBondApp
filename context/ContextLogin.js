import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const FormContext = createContext();

// Proveedor del contexto
export const FormProvider = ({ children }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para saber si está en login o registro
    const [formData, setFormData] = useState({
        Nombre:'',
        Edad: '',
        Peso: '',
        Estatura: '',
        Comportamiento: '',
        RegulacionEmociones: '',
        SeguimientoInstrucciones: '',
        VinculoPadre: ''
    });
    const [valorStats, setValorStats] = useState({
        RegulacionEmociones: '',
        SeguimientoInstrucciones: '',
        VinculoPadre: ''
    });
    const [comportamiento, setComportamiento] = useState('')
    const comportamientoOptions = ['Alocado', 'Serio', 'Desinteresado'];
    const [birthDate, setBirthDate] = useState(null);
    const [userData, setUserData] = useState(null);
    const [pesoSelect, setPesoSelect] = useState('');
    const [estaturaSelect, setEstaturaSelect] = useState('');
    const [nombreSelect, setNombreSelect] = useState('');

    // Opciones de rango
    const pesoOptions = ['2 - 20 kg', '21 - 50 kg', '51 - 100 kg'];
    const estaturaOptions = ['0.5 - 1.0 m', '1.1 - 1.8 m', '1.9 - 2.5 m'];


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
                comportamientoOptions,
                formData,
                setFormData,
                birthDate,
                setBirthDate,
                pesoSelect,
                setPesoSelect,
                pesoOptions,
                estaturaOptions,
                estaturaSelect,
                setEstaturaSelect,
                nombreSelect,
                setNombreSelect,
                userData,
                setUserData,
                valorStats,
                setValorStats
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