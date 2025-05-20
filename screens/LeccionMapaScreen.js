import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { guardarLeccionCompletada } from '../Service/LeccionesUser';
import { useAuthContext } from '../context/ContextLogin';
import { GetUserById } from '../Service/Usario';
import ModalRecuerdos from '../components/componentesLearningPath/ModalRecuerdos';

// Componente que muestra una lección tipo "Mapa", permitiendo al usuario ver contenido y finalizar la actividad con una imagen tipo "recuerdo".
const LeccionMapaScreen = ({ route }) => {

    // Obtenemos datos del usuario desde el contexto de autenticación
    const { userData, setUserData } = useAuthContext();

    // Obtenemos los parámetros enviados por la ruta
    const { data } = route.params;

    // Hook de navegación para volver a otras pantallas
    const navigation = useNavigation();

    // Estado para mostrar u ocultar el modal de subida de recuerdos (imagen)
    const [showModal, setShowModal] = useState(false);

    // URL de la imagen subida como recuerdo
    const [imageUrl, setImageUrl] = useState(null);

    // Estado que controla si el botón "Finalizar" está habilitado
    const [estaDeshabilitado, setEstaDeshabilitado] = useState(true);

    // Hook que se ejecuta una vez cuando se monta el componente
    useEffect(() => {
        console.log(userData.Lecciones[data.ID]);

        // Si el ID no empieza con "A" y la lección no está registrada, se habilita el botón "Finalizar"
        if (!data.ID.startsWith("A") && userData.Lecciones[data.ID] == undefined) {
            setEstaDeshabilitado(false)
        }
    }, []);

    console.log('DataActividad:', route.params);

    // Función que se ejecuta al finalizar la actividad
    const finalizarActividad = async () => {
        const now = new Date();
        const fecha = now.toLocaleDateString();
        const idLeccion = data.ID;

        // Creamos el objeto de lección completada
        const nuevaLeccion = {
            Calificacion: "",
            completo: true,
            ID: idLeccion,
            Recuerdos: imageUrl,  // URL de imagen subida
            Tiempo: fecha
        };

        // Guardamos la lección como completada
        guardarLeccionCompletada(userData, idLeccion, nuevaLeccion);

        // Obtenemos nuevamente los datos del usuario actualizados desde la base de datos
        const updateUserData = await GetUserById(userData.id);

        if (updateUserData) {
            setUserData(updateUserData);
            console.log('userData obtenido:', updateUserData);
        } else {
            console.log('No se encontraron datos para este usuario');
        }

        // Regresamos a la pantalla anterior
        navigation.goBack()
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Título principal */}
                <Text style={styles.title}>{data.TituloModal}</Text>
                <View style={styles.separador} />

                {/* Subtítulo opcional */}
                {data.Sub1 ? <Text style={styles.subtitle}>{data.Sub1}</Text> : null}
                <View style={styles.separador} />

                {/* Textos opcionales del cuerpo */}
                {data.Texto1 ? <Text style={styles.bodyText}>{data.Texto1}</Text> : null}
                {data.Texto2 ? <Text style={styles.bodyText}>{data.Texto2}</Text> : null}
                <View style={styles.separador} />
            </ScrollView>

            {/* Botones inferiores */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                
                {/* Botón para regresar */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { borderColor: 'red', borderWidth: 1 }]}>
                    <Text style={[styles.backButtonText, { color: 'red' }]}>Volver</Text>
                </TouchableOpacity>

                {/* Botón para finalizar la actividad (solo si aún no fue completada) */}
                {userData.Lecciones[data.ID] == undefined &&
                    <TouchableOpacity 
                        onPress={() => finalizarActividad()} 
                        disabled={estaDeshabilitado}
                        style={estaDeshabilitado ? styles.btnDisable : styles.btnEnable}
                    >
                        <Text style={[styles.backButtonText, { color: 'lightBlue' }]}>Finalizar</Text>
                    </TouchableOpacity>
                }

                {/* Botón para subir un recuerdo (solo si la lección comienza con "A") */}
                {data.ID.startsWith("A") &&
                    <Pressable 
                        style={[styles.backButton, { borderColor: 'lightBlue', borderWidth: 1 }]}
                        onPress={() => setShowModal(true)}
                    >
                        <Text style={[styles.backButtonText, { color: 'lightBlue' }]}>Recuerdo</Text>
                    </Pressable>
                }
            </View>

            {/* Modal para subir foto de recuerdo */}
            <ModalRecuerdos
                visible={showModal}
                onDismiss={() => setShowModal(false)}
                initialTitle="Sube tu foto"
                onUploadSuccess={(url) => {
                    setImageUrl(url);  // Guardamos URL de la imagen subida
                    console.log('URL Cloudinary:', url);
                }}
                activar={(x) => {
                    setEstaDeshabilitado(x);  // Activar o desactivar botón "Finalizar"
                }}
                fotoRecuerdo={userData.Lecciones?.[data.ID]?.Recuerdos}  // Imagen previamente guardada, si existe
            />
        </View >
    );
};

const styles = StyleSheet.create({
    separador: {
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#555',
        marginBottom: 12,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
        marginBottom: 18,
    },
    backButton: {
        width: '25%',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
        borderColor: 'lightBlue',
        borderWidth: 1
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    btnDisable: {
        width: '25%',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'red',
        borderColor: 'lightBlue',
        borderWidth: 1
    },
    btnEnable: {
        width: '25%',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'green',
        borderColor: 'lightBlue',
        borderWidth: 1
    }
});


export default LeccionMapaScreen;