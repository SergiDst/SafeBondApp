import React from 'react';
import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import Animated, {useAnimatedStyle, interpolate, Extrapolation} from 'react-native-reanimated';
import { useFonts, MochiyPopOne_400Regular, } from '@expo-google-fonts/mochiy-pop-one';

const { width, height} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.34;
const ITEM_HEIGHT = height / 3.6;

const ElementosCarusel = ({ icono: Icono, nombreIcono, animatedValue, accion}) => {
    const [fontsLoaded] = useFonts({MochiyPopOne_400Regular,});
    const animatedTextStyle = useAnimatedStyle(() => {
        /* Opacidad del nombre del icono */
        const opacity = interpolate(
            animatedValue.value,
            [-1, -0.5, 0, 0.5, 1],
            [ 1, 0.3, 0, 0.3, 1],
            Extrapolation.CLAMP
        );

        return {
            opacity,
        };
    }, []);

    return (
        <View style={styles.itemContainer}>
            <Pressable onPress={accion}>
                <Icono width={ITEM_WIDTH} height={ITEM_HEIGHT} ></Icono>
            </Pressable>
            <Animated.View style={[animatedTextStyle]}>
                <Text style={styles.texto}>{nombreIcono}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop:height/5,
        width: width * 0.52,
        height: height / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: width / 15,
        fontWeight: 'bold',
        fontFamily: 'MochiyPopOne_400Regular'
    }
});

export default ElementosCarusel;
