import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { guardarLeccionCompletada } from '../Service/LeccionesUser';
import { useAuthContext } from '../context/ContextLogin';
import { GetUserById } from '../Service/Usario';
import ModalRecuerdos from '../components/componentesLearningPath/ModalRecuerdos';

const LeccionMapaScreen = ({ route }) => {
    const { userData, setUserData } = useAuthContext();
    const { data } = route.params;
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [estaActivo, setEstaActivo] = useState(true);

    console.log('DataActividad:', route.params);

    const finalizarActividad = async () => {
        const now = new Date();
        const fecha = now.toLocaleDateString();
        const idLeccion = data.ID;

        const nuevaLeccion = {
            Calificacion: "",
            completo: true,
            ID: idLeccion,
            Recuerdos: imageUrl,
            Tiempo: fecha
        };
        guardarLeccionCompletada(userData, idLeccion, nuevaLeccion);
        const updateUserData = await GetUserById(userData.id);
        if (updateUserData) {
            setUserData(updateUserData);
            console.log('userData obtenido:', updateUserData); // Aquí deberías ver los datos correctamente
        } else {
            console.log('No se encontraron datos para este usuario');
        }
        navigation.goBack()
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{data.TituloModal}</Text>
                <View style={styles.separador} />
                {data.Sub1 ? <Text style={styles.subtitle}>{data.Sub1}</Text> : null}
                <View style={styles.separador} />
                {data.Texto1 ? <Text style={styles.bodyText}>{data.Texto1}</Text> : null}
                {data.Texto2 ? <Text style={styles.bodyText}>{data.Texto2}</Text> : null}
                <View style={styles.separador} />
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* Botón para regresar a la pantalla anterior */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { borderColor: 'red', borderWidth: 1 }]}>
                    <Text style={[styles.backButtonText, { color: 'red' }]}>Volver</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => finalizarActividad()} disabled={estaActivo} style={[styles.backButton, { borderColor: 'lightBlue', borderWidth: 1 }]}>
                    <Text style={[styles.backButtonText, { color: 'lightBlue' }]}>Finalizar</Text>
                </TouchableOpacity>
                {data.ID.startsWith("A") &&
                    <Pressable style={[styles.backButton, { borderColor: 'lightBlue', borderWidth: 1 }]}
                        onPress={() => setShowModal(true)}>
                        <Text style={[styles.backButtonText, { color: 'lightBlue' }]}>Recuerdo</Text>
                    </Pressable>
                }
            </View>
            <ModalRecuerdos
                visible={showModal}
                onDismiss={() => setShowModal(false)}
                initialTitle="Sube tu foto"
                onUploadSuccess={(url) => {
                    setImageUrl(url);
                    console.log('URL Cloudinary:', url);
                }}
                activar={(x)=>{
                    setEstaActivo(x)
                }}
                fotoRecuerdo={userData.Lecciones[data.ID].Recuerdos}
                />
        </View >
    )
}

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
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


export default LeccionMapaScreen;