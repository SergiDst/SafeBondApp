import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/ContextLogin';
import ModalFormulario from '../components/componentesInfantes/ModalFormulario';
import CaruselCircular from '../components/componentesInfantes/CaruselCircular';
import StatsBar from '../components/componentesInfantes/StatsBar';
import Emocion from '../assets/emocion.svg'
import Seguimiento from '../assets/Seguimiento.svg'
import Vinculo from '../assets/vinculo.svg'
import Comportamiento from '../assets/Comportamiento.svg'
import Edad from '../assets/Edad.svg'
import Estatura from '../assets/Estatura.svg'
import Peso from '../assets/Peso.svg'

const { width, height } = Dimensions.get('window');

const estadisticas = [
    { icono: Emocion, progreso: 1, nombreEstadistica: 'Regulacion de Emociones'},
    { icono: Seguimiento, progreso: 0.9, nombreEstadistica: 'Segumiento de Instrucciones'},
    { icono: Vinculo, progreso: 0.2, nombreEstadistica: 'Vinculo con el Padre'},
];

const datos = [
    { icono: Comportamiento, nombreIcono: 'Comportamiento' },
    { icono: Edad, nombreIcono: 'Edad' },
    { icono: Estatura, nombreIcono: 'Estatura' },
    { icono: Peso, nombreIcono: 'Peso' },
];


const InfanteScreen = () => {
    const { valorStats } = useAuthContext();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const estadisticas = [
        { icono: Emocion, progreso: valorStats.RegulacionEmociones, nombreEstadistica: 'Regulacion de Emociones' },
        { icono: Seguimiento, progreso: valorStats.SeguimientoInstrucciones, nombreEstadistica: 'Segumiento de Instrucciones' },
        { icono: Vinculo, progreso: valorStats.VinculoPadre, nombreEstadistica: 'Vinculo con el Padre' },
    ];

    const handleFormSubmit = async (data) => {
        try {
            // Aquí poner lógica de Firebase
            // await firebase.firestore().collection('feedback').add(data);
            console.log('Datos enviados:', data);
        } catch (error) {
            console.error('Error enviando a Firebase:', error);
        }
    }
    
    return (
        <View style={styles.container}>
            <CaruselCircular datos={datos} />
            <Pressable onPress={() => navigation.navigate("FormInfante")}>
                <Text>Abrir Form</Text>
            </Pressable>
            <FlatList
                style={styles.containerSecundario}
                contentContainerStyle={{ paddingVertical: 10 }}
                data={estadisticas}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    return (
                        <StatsBar
                            progreso={item.progreso}
                            icono={item.icono}
                            nombreEstadistica={item.nombreEstadistica}
                        />
                    );
                }}
                ItemSeparatorComponent={() => <View style={{ height: 60 }} />}
            />
            <ModalFormulario
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleFormSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSecundario: {
        backgroundColor: '#FBE7A7',
        borderWidth: 3,
        borderColor: '#E5D28D',
        borderRadius:20,
        height: 350,
        width: '90%',
        bottom:0
    }
});

export default InfanteScreen