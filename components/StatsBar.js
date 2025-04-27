import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressBar } from "react-native-paper";

const { width, height } = Dimensions.get('window');

const StatsBar = ({ progreso, nombreEstadistica, icono: Icono }) => {
    return (
        <View>
            <ProgressBar style={styles.recuadroIzq}
                progress={progreso}
                color="orange"
            />
            <View style={styles.circulo}>
                <Icono width={45} height={45} ></Icono>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circulo: {
        position:'absolute',
        right: width * 0.68,
        width: width * 0.18,
        height: width * 0.18,
        backgroundColor: '#f5ebd8',
        borderRadius: (width * 0.18) / 2,
        borderWidth: 4,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recuadroIzq: {
        top: height * 0.0412,
        left: width * 0.05,
        width: width * 0.78,
        height: height * 0.05,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'black',
        paddingStart: 20
    },
    icono: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StatsBar