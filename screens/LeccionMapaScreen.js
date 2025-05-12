import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeccionMapaScreen = ({route}) => {
    const {data} = route.params;
    const navigation = useNavigation();

    console.log('DataActividad:', route.params);
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>{data.TituloModal}</Text>
                {data.Sub1 ? <Text style={styles.subtitle}>{data.Sub1}</Text> : null}
                {data.Texto1 ? <Text style={styles.bodyText}>{data.Texto1}</Text> : null}
                {data.Texto2 ? <Text style={styles.bodyText}>{data.Texto2}</Text> : null}
            </ScrollView>
            
            {/* Botón para regresar a la pantalla anterior */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#555',
        marginBottom: 12,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
        marginBottom: 18,
    },
    backButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        marginHorizontal: 40,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


export default LeccionMapaScreen;