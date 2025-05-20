import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable, Modal, Alert, Linking } from 'react-native';
import { ComponenteLista } from '../components/componentesEjercicios/componenteLista';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// Componente que muestra una lista de artículos y abre un modal al hacer clic en uno
export const ListaArticulos = (Articulos) => {
    // Muestra por consola los artículos que vienen por parámetros de navegación
    console.log('articulos', Articulos.route.params);

    // Hook de navegación de React Navigation
    const navigation = useNavigation();

    // Estado que controla si el modal está visible
    const [modalVisible, setModalVisible] = useState(false);

    // Convierte el objeto recibido en un array de objetos con ID
    const articulosArray = Object.entries(Articulos).map(([id, value]) => ({
        id,
        ...value
    }));

    // Estado que guarda el artículo que se mostrará en el modal
    const [dataModal, setDataModal] = useState('');

    // Función al hacer clic en un artículo
    const onClick = (item) => {
        setDataModal(item);      // Guarda el artículo seleccionado
        setModalVisible(true);   // Muestra el modal
    };

    // Función para cerrar el modal
    const onClickClose = () => {
        setModalVisible(false);
    };

    // Muestra por consola los artículos de la posición [1] del array
    console.log(articulosArray[1].params);

    // Abre el enlace del artículo en el navegador
    const onClickVerArticulo = () => {
        Linking.openURL(dataModal.Url.UrlArticulo);
    }

    // Render del componente
    return (
        <View style={styles.contenedor}>
            
            {/* Capa negra semi-transparente detrás del modal */}
            {modalVisible && <View style={styles.overlay} />}

            {/* Encabezado con botón para volver */}
            <View style={styles.head}>
                <Pressable
                    onPress={() => navigation.navigate('TabNavigator')}
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                    <Icon name="chevron-left" size={30} color={'#000'} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginStart: 5,
                        color: '#000'
                    }}>
                        Volver
                    </Text>
                </Pressable>
            </View>

            {/* Lista de artículos renderizados con FlatList */}
            <FlatList
                data={articulosArray[1].params} // Usa los artículos de la posición [1]
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onClick(item)}>
                        <ComponenteLista item={item} /> {/* Componente personalizado que muestra el artículo */}
                    </Pressable>
                )}
            />

            {/* Modal que muestra detalles del artículo seleccionado */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* Título del artículo */}
                            <Text style={styles.modalText}>{dataModal.Titulo}</Text>

                            <View style={styles.separador} />

                            {/* Contenido del artículo */}
                            <Text style={[styles.modalText, { marginTop: 10 }]}>{dataModal.Texto}</Text>

                            <View style={styles.separador} />

                            {/* Botones: cerrar o ver artículo */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => onClickClose()}
                                >
                                    <Text style={styles.textStyle}>Cerrar</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => onClickVerArticulo()}
                                >
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
