import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Modal} from 'react-native';

const ModalMapa = ({ modalVisible, setModalVisible, tipoModal, setTipoModal,
    tituloModal, setTituloModal, subtitulo1, setSubtitulo1,
    texto1, setTexto1, texto2, setTexto2, DataActividad }) => {
    
    const navigation = useNavigation();

    useEffect(() => {
        if (!modalVisible) {
            setTipoModal(null);
            setTituloModal('');
            setSubtitulo1('');
            setTexto1('');
            setTexto2('');
        }
    }, [modalVisible]);

    let content;
    /* const data = DataActividad;
    console.log('tipoModal:', DataActividad); */
    switch (tipoModal) {
        case '1':
            content = (
                <>
                    <View style={styles.columnsContainer}>
                        <View style={styles.column}>
                            <Text style={styles.subtitulo} numberOfLines={2}>{subtitulo1}</Text>
                            <Text style={styles.textStyle} numberOfLines={2}>{texto1}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.subtitulo}>Tiempo</Text>
                            <Text style={styles.textStyle} numberOfLines={2}>{texto2}</Text>
                        </View>
                    </View>
                </>
            );
            break;
        case '2':
            content = (
                <View>
                    <Text>{texto1}</Text>
                    <Text>{texto2}</Text>
                </View>
            );
            break;
        case '3':
            content = (
                <View>
                    <Text>Tiempo</Text>
                    <Text>{texto2}</Text>
                    <View>

                    </View>
                </View>
            );
            break;
        default:
            content = null;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.titulo}>{tituloModal}</Text>
                    {content}
                    <View style={styles.containerButton}>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Cerrar</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => {
                            setModalVisible(false)
                            navigation.navigate("Lecciones", {
                                data: DataActividad,
                            })
                        }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Completar</Text>
                        </Pressable>
                    </View>
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
        paddingTop:20
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

export default ModalMapa;