import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeccionMapaScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1}}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{
                    padding: 8,
                    backgroundColor: '#ddd',
                    borderRadius: 4,
                    marginBottom: 16,
                }}>
                <Text>← Volver</Text>
            </Pressable>
            <View style={styles.centeredView}>
                <Text>ESTA ES LA PANTALLA DE ACTIVIDADES, LECTURAS O QUICES DEL LEARNINGPATH</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default LeccionMapaScreen;