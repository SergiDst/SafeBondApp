import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable, Modal, Alert } from 'react-native';
import { ComponenteLista } from '../components/componentesEjercicios/componenteLista';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export const ListaArticulos = (Articulos) => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const articulosArray = Object.entries(Articulos).map(([id, value]) => ({
        id,
        ...value
    }));

    const [dataModal, setDataModal] = useState('');

    const onClick = (item) => {
        setDataModal(item);
        setModalVisible(true);
    };

    const onClickClose = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.contenedor}>
            
            {/* Capa negra semi-transparente cuando el modal está visible */}
            {modalVisible && <View style={styles.overlay} />}

            {/* Header */}
            <View style={styles.head}>
                <Pressable onPress={() => navigation.navigate('Tabs')}
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="chevron-left"
                        size={30}
                        color={'#000'}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginStart: 5,
                        color: '#000'
                    }}>Volver</Text>
                </Pressable>
            </View>

            {/* Lista de artículos */}
            <FlatList
                data={articulosArray[1].params.Articulos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onClick(item)}>
                        <ComponenteLista item={item} />
                    </Pressable>
                )}
            />

            {/* Modal */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{dataModal.Titulo}</Text>
                            <View style={styles.separador} />
                            <Text style={[styles.modalText, { marginTop: 10 }]}>{dataModal.Texto}</Text>
                            <View style={styles.separador} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => onClickClose()}>
                                    <Text style={styles.textStyle}>Cerrar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Ver Articulo</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // necesario para que el overlay se posicione correctamente
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // opacidad del fondo
        zIndex: 2,
    },
    head: {
        width: '100%',
        padding: 10,
        backgroundColor: '#FBE7A7',
        zIndex: 3, // para asegurarse de que está por encima del overlay si necesitas
    },
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5, // asegúrate de que esté por encima del overlay
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
    button: {
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '40%',
    },
    buttonOpen: {
        borderWidth: 1,
        borderColor: 'green',
    },
    buttonClose: {
        borderWidth: 1,
        borderColor: 'red',
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    separador: {
        borderBottomWidth: 1,
        borderColor: '#cac4d0',
        width: '90%',
        alignSelf: 'center',
    },
});
