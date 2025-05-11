import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts, MochiyPopOne_400Regular, } from '@expo-google-fonts/mochiy-pop-one';
import Monedas from '../../assets/monedas.svg'
import Bandera from '../../assets/bandera.svg'

const { width, height } = Dimensions.get('window');

const IndicadorLabel = ({ posicion, icono, numCompletados, numMonedas }) => {
    const posicionRecuadro = styles[posicion] || {};
    const [fontsLoaded] = useFonts({
            MochiyPopOne_400Regular,
        });
    return (
        <View>
            <View style={[posicionRecuadro]}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'MochiyPopOne_400Regular'}}>
                    {icono === 'monedas' ? numMonedas : numCompletados}
                </Text>
            </View>
            <View style={styles.circulo}>
                {icono === 'monedas' ? <Monedas width={45} height={45} /> : <Bandera width={50} height={50} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circulo: {
        width: width * 0.18,
        height: width * 0.18,
        backgroundColor: '#552582',
        borderRadius: (width * 0.18) / 2,
        borderWidth: 7,
        borderColor: '#2C0056',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recuadroIzq: {
        position: 'absolute',
        left: width * 0.05,
        bottom: height * 0.001,
        width: width * 0.3,
        height: height * 0.035,
        borderRadius: 30,
        backgroundColor: '#552582',
        borderWidth: 4,
        borderColor: '#2C0056',
        paddingStart: 55
    },
    recuadroDer: {
        position: 'absolute',
        right: width * 0.05,
        bottom: height * 0.001,
        width: width * 0.3,
        height: height * 0.035,
        borderRadius: 30,
        backgroundColor: '#552582',
        borderWidth: 4,
        borderColor: '#2C0056',
        paddingStart: 40
    },
    icono: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default IndicadorLabel;