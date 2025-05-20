// Importa componentes de React Native para estructura visual y estilos
import { View, StyleSheet } from 'react-native';
// Importa el contexto de autenticación para saber si el usuario está registrándose o iniciando sesión
import { useAuthContext } from '../../context/ContextLogin';
// Importa el componente para registro
import { RegisterComponent } from './RegisterComponent';
// Importa el componente para login
import { LoginComponent } from './LoginComponent';

// Componente principal del formulario (Form)
export const Form = () => {
    // Obtiene el estado `isLoggingIn` del contexto de autenticación
    const { isLoggingIn } = useAuthContext()
    return (
        <>
            {/* Contenedor del formulario (login o registro) */}
            <View style={styles.cont}>
                {isLoggingIn ? (
                    // Si el usuario está en modo registro, renderiza el componente de registro
                    <RegisterComponent />
                ) : (
                    // Si no, muestra el componente de login
                    <LoginComponent />
                )}
            </View>
        </>
    )
}

// Estilos del componente Form
const styles = StyleSheet.create({
    // Estilo del contenedor del formulario
    cont: {
        position: 'relative',
        marginTop: 20,
        justifyContent: 'flex-start',
        width: '90%',
        marginHorizontal: 'auto' // centrado horizontal (solo en web, no funciona en móvil)
    },
});
