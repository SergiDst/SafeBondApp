import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';

const ModalMapa = ({ modalVisible, setModalVisible, tipoModal, setTipoModal,
    tituloModal, setTituloModal, subtitulo1, setSubtitulo1,
    texto1, setTexto1, texto2, setTexto2, DataActividad, LecturasRecomendadas, Duracion }) => {

    const navigation = useNavigation();

    console.log('DataActividad:', DataActividad);

    /* Cuando se cierra el modal se borra el contenido anterior */
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
    /* Segun el tipo de modal que se pasa al componente, este renderiza el contenido de diferente manera */
    switch (tipoModal) {
        case '1':
            content = (
                <>
                    <View style={styles.columnsContainer}>
                        <View style={styles.column}>
                            <Text style={styles.subtitulo} numberOfLines={2}>Lecturas recomendadas: </Text>
                            <Text style={styles.textStyle} >{Array.isArray(DataActividad.LecturasRecomendadas) ? DataActividad.LecturasRecomendadas.map((texto, index) => (
                                <Text key={index}>{texto}</Text>)) : 'No es necesario tener conocimientos previos para esta lectura.'}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.subtitulo}>Duracion estimada de la actividad</Text>
                            <Text style={styles.textStyle} numberOfLines={2}>{DataActividad.Duracion}</Text>
                        </View>
                    </View>
                </>
            );
            break;
        case '2':
            content = (
                <View>
                    <Text>{DataActividad.Contenido}</Text>
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

export default ModalMapa;