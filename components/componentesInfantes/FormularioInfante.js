import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Input, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { useAuthContext } from '../../context/ContextLogin';

const { width, height } = Dimensions.get('window');

const FormularioInfante = ({ animatedValue }) => {
    
    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedValue.value,
            [-1, 0, 1],
            [0, 1, 0],
            Extrapolation.CLAMP
        );

        return {
            opacity,
        };
    }, []);

    const { comportamiento, setComportamiento, comportamientoOptions,
        formData, setFormData, birthDate, setBirthDate,
        pesoOptions, pesoSelect, setPesoSelect, estaturaOptions, estaturaSelect, setEstaturaSelect,
        nombreSelect, setNombreSelect
    } = useAuthContext();

    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const calculateAge = (birthDate) => {
        const now = new Date();
        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        const dayDiff = now.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    return (
        <Animated.View style={[styles.modalView, animatedStyle]}>
            <Input
                label="Nombre"
                placeholder='Nombre del infante'
                value={nombreSelect}
                onChangeText={nextValue => {
                    setNombreSelect(nextValue)
                    setFormData(prev => ({ ...prev, Nombre: nextValue }))
                }}
            />
            <Datepicker
                label="Fecha de nacimiento"
                placeholder="Selecciona tu fecha"
                date={birthDate}
                onSelect={date => {
                    // 1. Guardamos la fecha elegida
                    setBirthDate(date);
                    // 3. Calculamos y guardamos la edad en formData
                    const age = calculateAge(date);
                    setFormData(prev => ({
                        ...prev,
                        Edad: age.toString(),
                    }));
                }}
                min={eighteenYearsAgo}
                max={today}  // no permitir fechas futuras
            />
            <Select
                label="Selecciona el rango de estatura de tu niño?"
                size='small'
                selectedIndex={estaturaSelect}
                value={estaturaSelect !== '' ? estaturaOptions[estaturaSelect.row] : ''}
                onSelect={index => {
                    setEstaturaSelect(index);
                    setFormData(prev => ({ ...prev, Estatura: estaturaOptions[index.row] }));
                }}
            >
                {estaturaOptions.map((option, i) => (
                    <SelectItem key={i} title={option} />
                ))}
            </Select>
            <Select
                label="Selecciona el rango de peso de tu niño?"
                size='small'
                selectedIndex={pesoSelect}
                value={pesoSelect !== '' ? pesoOptions[pesoSelect.row] : ''}
                onSelect={index => {
                    setPesoSelect(index);
                    setFormData(prev => ({ ...prev, Peso: pesoOptions[index.row] }));
                }}
            >
                {pesoOptions.map((option, i) => (
                    <SelectItem key={i} title={option} />
                ))}
            </Select>
            <Select
                label="Comportamiento"
                selectedIndex={comportamiento}
                onSelect={index => {
                    setComportamiento(index);
                    setFormData(prev => ({ ...prev, Comportamiento: comportamientoOptions[index.row] }));
                }}
                value={formData.Comportamiento}
            >
                {comportamientoOptions.map((item, idx) => (
                    <SelectItem key={idx} title={item} />
                ))}
            </Select>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalView: {
        width: width / 1.2,
        height: height / 1.5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-evenly'
    },
    input: {
        marginTop: 10,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default FormularioInfante;