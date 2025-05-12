import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable } from 'react-native';
import { Radio, RadioGroup } from '@ui-kitten/components';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';


const { width, height } = Dimensions.get('window');

const radios = {
    InstruccionesIniciales: {
        escala: "1 = Casi nunca,2 = Rara vez,3 = A veces,4 = Frecuentemente,5 = Casi siempre"
    }
};

const PreguntasInfante = ({ sectionKey, id, pregunta, response, onSelect, animatedValue }) => {
    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedValue.value,
            [-1, 0, 1],
            [0, 1, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity,
        };
    }, [animatedValue]);

    const mountFade = useSharedValue(0);

    useEffect(() => {
        mountFade.value = withTiming(1, { duration: 500 });
    }, []);

    const fadeStyle = useAnimatedStyle(() => {
        return { opacity: mountFade.value };
    }, []);

    const escalaMap = useMemo(() => {
        const escalaStr = radios.InstruccionesIniciales.escala;
        return escalaStr.split(',').reduce((acc, pair) => {
            const [key, label] = pair.split('=').map(s => s.trim());
            acc[key] = label;
            return acc;
        }, {});
    }, []);

    
    return (
        <Animated.View style={[styles.modalView, animatedTextStyle, fadeStyle]}>
            <Text style={styles.titulo}>{sectionKey}</Text>
            <Text style={styles.questionText}>{pregunta}</Text>
            <RadioGroup
                selectedIndex={response != null ? response - 1 : null}
                onChange={idx => onSelect(sectionKey, id, idx + 1)}
                style={styles.radioGroup}
            >
                {[1, 2, 3, 4, 5].map(val => (
                    <Radio key={val}>
                        {escalaMap[val] /* ahora muestra "Casi nunca", "Rara vez", … */}
                    </Radio>
                ))}
            </RadioGroup>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    modalView: {
        width: width / 1.2,
        height: height / 1.5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titulo: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    questionText: {
        fontSize: 16,
        marginBottom: 16,
    },
    radioGroup: {
        justifyContent: 'space-between',
    },
});

export default PreguntasInfante;