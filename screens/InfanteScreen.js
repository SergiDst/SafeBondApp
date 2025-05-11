import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import CaruselCircular from '../components/CaruselCircular';
import StatsBar from '../components/StatsBar';
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
    return (
        <View style={styles.container}>
            <CaruselCircular datos={datos} />
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