import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { interpolate } from 'react-native-reanimated';
import { useFonts, MochiyPopOne_400Regular, } from '@expo-google-fonts/mochiy-pop-one';
import ElementosCarusel from "./ElementosCarusel";
import ModalCarusel from "./ModalCarusel";
import ContainerCarrusel from '../assets/containerCarrusel.svg'

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 1;
const ITEM_HEIGHT = height / 3.2;
const centerOffset = width / 4.7;

const CaruselCircular = ({ datos }) => {
    const [fontsLoaded] = useFonts({ MochiyPopOne_400Regular, });
    const [indiceActivo, setIndiceActivo] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const abrirModal = () => {
        setModalVisible(true);
    };

    const animationStyle = useCallback((value) => {
        'worklet';

        //Separacion de los items renderizados
        const itemGap = interpolate(
            value,
            [-1, 0, 1,],
            [50, 10, -50]
        );

        //Posición en x de los elementos ()
        const translateX =
            interpolate(value, [-1, 0, 1], [-150, 0, 80]) +
            centerOffset -
            itemGap;

        const translateY = interpolate(
            value,
            [-1, -0.5, 0, 0.5, 1],
            [65, 30, 10, 30, 65] //Posición en Y de los elementos (la curvatura del carrusel)
        );

        //Tamaño del item en cierta posición
        const scale = interpolate(
            value,
            [-1, -0.5, 0, 0.5, 1],
            [0.45, 0.65, 0.8, 0.65, 0.45]
        );

        return {
            transform: [
                { translateX },
                { translateY: -translateY },
                { scale },
            ],
        };
    }, []);

    return (
        <>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ContainerCarrusel style={styles.containerItem}/>
                <Carousel
                    width={ITEM_WIDTH}
                    height={ITEM_HEIGHT}
                    data={datos}
                    renderItem={({ item, animationValue }) => (
                        <ElementosCarusel
                            icono={item.icono}
                            nombreIcono={item.nombreIcono}
                            animatedValue={animationValue}
                            accion={() => abrirModal()}
                        />
                    )}
                    customAnimation={animationStyle}
                    loop
                    onSnapToItem={(index) => setIndiceActivo(index)}
                />
            </View>

            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                <Text style={styles.texto}>
                    {datos[indiceActivo]?.nombreIcono}
                </Text>
            </View>

            <ModalCarusel
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        width:width,
        height:height/2,
        position: 'absolute',
        zIndex: -1,
        pointerEvents: 'none',
    },
    texto: {
        fontSize: width / 15,
        fontWeight: 'bold',
        fontFamily: 'MochiyPopOne_400Regular'
    }
});

export default CaruselCircular