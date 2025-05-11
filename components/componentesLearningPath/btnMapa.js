import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';
import { IconButton } from "react-native-paper";
import Bandera from '../../assets/bandera.svg';

const { width } = Dimensions.get('window');

const BUTTON_SIZE = width * 0.18; // Aproximadamente el 18% del ancho
const BANDERA_WIDTH = width * 0.2; // La bandera ocupa 20% del ancho
const BANDERA_HEIGHT = BANDERA_WIDTH * 1.25;

const BtnMapa = ({ icono, nombreEstilo, accion, completado }) => {
    const estilos = styles[nombreEstilo] || {};

    return (
        <View style={[estilos, { position: 'relative' }]}>
            {completado && (
                <View style={[styles.banderaOverlay, { left: 17.5, pointerEvents: 'none'}]}>
                    <Bandera width={BANDERA_WIDTH} height={BANDERA_HEIGHT} />
                </View>
            )}
            <IconButton
                style={styles.boton}
                icon={completado ? 'radiobox-blank' : icono}
                size={BUTTON_SIZE * 0.67} 
                onPress={accion}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    boton: {
        // Sombra web
        boxShadow: '0px 6px 10px rgba(3, 104, 255, 0.4)',
        // Sombra para iOS
        shadowColor: '#3A7BBF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    estilo1: {
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: '#4A90E2',
        alignSelf: 'flex-start',
        marginTop: 40,
        marginLeft: width * 0.2,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    estilo2: {
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: '#4A90E2',
        alignSelf: 'center',
        marginTop: 30,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    estilo3: {
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: '#4A90E2',
        alignSelf: 'flex-end',
        marginTop: 30,
        marginRight: width * 0.2,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    estiloEspecial: {
        alignSelf: 'center',
        width: width * 0.8,
        height: 70,
        backgroundColor: '#F5A623',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 45,
        marginBottom: 30,
    },
    banderaOverlay: {
        position: 'absolute',
        top: -BANDERA_HEIGHT * 0.6,
        zIndex: 1,
    },
});

export default BtnMapa;
