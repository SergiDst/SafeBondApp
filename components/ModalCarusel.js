import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Pressable, Modal, ActivityIndicator, Animated } from 'react-native';

const ModalCarusel = ({ modalVisible, setModalVisible }) => {

    /* useEffect(() => {
        if (!modalVisible) {
            setTipoModal(null);
            setTituloModal('');
            setSubtitulo1('');
            setTexto1('');
            setTexto2('');
        }
    }, [modalVisible]);
 */
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Hola</Text>
                </View>
                <View style={styles.containerButton}>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 13,
    },
    titulo: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitulo: {
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    columnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ModalCarusel;