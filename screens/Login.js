// Importa el componente Form desde la carpeta de componentesLogin
import { Form } from '../components/componentesLogin/Form'

// Importa componentes de React Native para estilos y estructura visual
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'

// Componente funcional principal que representa la pantalla de Login
const Login = () => {
    return (
        <>
            {/* Contenedor principal de la pantalla */}
            <View style={styles.container}>
                
                {/* Contenedor de la imagen superior (ilustración de personas) */}
                <View>
                    <Image
                        source={require('../assets/Personas.png')}
                        style={{ height: 200, width: 200, zIndex: 0 }}
                    />
                </View>

                {/* Contenedor del título de la app (SafeBond con colores diferentes) */}
                <View style={styles.contTitle}>
                    <Text style={[styles.textTitle, styles.safe]}>SafeB</Text>
                    <Text style={[styles.textTitle, styles.bond]}>ond</Text>
                </View>

                {/* Contenedor del área de login */}
                <View style={styles.containerLogin}>

                    {/* Scroll para el formulario, útil si hay mucho contenido */}
                    <ScrollView>
                        <Form></Form> {/* Componente que contiene el formulario de login */}
                    </ScrollView>

                    {/* Imagen decorativa de una planta posicionada al fondo */}
                    <View style={styles.contPlant}>
                        <Image
                            source={require('../assets/plantLog.png')}
                            style={styles.plantImage}
                            pointerEvents="none" // 👈 evita que la imagen interfiera con clics/touches
                        />
                    </View>
                </View>
            </View>
        </>
    )
}

// Estilos de la pantalla Login
const styles = StyleSheet.create({
    // Contenedor del título de la app (SafeBond)
    contTitle: {
        display: 'flex',
        flexDirection: 'row'
    },

    // Contenedor principal de toda la pantalla
    container: {
        flex: 1,
        backgroundColor: '#BED9FF', // azul claro de fondo
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Contenedor del bloque de login con fondo amarillo claro
    containerLogin: {
        backgroundColor: '#FBE7A7',
        width: '80%',
        marginTop: '2%',
        height: '55%',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 7,
    },

    // Estilo base del texto del título
    textTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },

    // Color para la palabra "SafeB"
    safe: {
        color: '#02167D' // azul oscuro
    },

    // Color para la palabra "ond"
    bond: {
        color: '#6dd863' // verde claro
    },

    // Contenedor para la imagen de la planta decorativa
    contPlant: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        bottom: -25,
        zIndex: -1, // se coloca detrás del contenido principal
    },

    // Estilo de la imagen de la planta
    plantImage: {
        height: 250,
        width: 200,
        zIndex: 2, // por si hay solapamiento visual
        position: 'absolute',
    }
})

// Exporta el componente Login para que pueda ser usado en otras partes de la app
export default Login
// Fin del código