import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/ContextLogin';
import CaruselCircular from '../components/componentesInfantes/CaruselCircular';
import StatsBar from '../components/componentesInfantes/StatsBar';
import Emocion from '../assets/emocion.svg'
import Seguimiento from '../assets/Seguimiento.svg'
import Vinculo from '../assets/vinculo.svg'
import Comportamiento from '../assets/Comportamiento.svg'
import Edad from '../assets/Edad.svg'
import Estatura from '../assets/Estatura.svg'
import Peso from '../assets/Peso.svg'

const { width, height } = Dimensions.get('window');

/* Elementos del carrusel */
const datos = [
    { icono: Comportamiento, nombreIcono: 'Comportamiento' },
    { icono: Edad, nombreIcono: 'Edad' },
    { icono: Estatura, nombreIcono: 'Estatura' },
    { icono: Peso, nombreIcono: 'Peso' },
];

const InfanteScreen = () => {
    const { valorStats, formData, userData, setUserData } = useAuthContext();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    /* Si el infante del usuario no tiene datos, aparecera un modal que lo redirije a FormularioInfanteScreen */
    useEffect(() => {
        console.log(userData.InfoNiño);
        const faltaDato = userData?.InfoNiño?.RegulacionEmociones == null || userData.InfoNiño.RegulacionEmociones == '';
        //setUserData(GetUserById(userData.id)) 
        if (faltaDato) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }
    }, []);

    /* Actualiza las estadisticas del infante, segun la info del usuario en la db*/
    const estadisticas = useMemo(() => {
        if (!userData?.InfoNiño) return [];

        return [
            {
                icono: Emocion,
                progreso: userData.InfoNiño.RegulacionEmociones,
                nombreEstadistica: 'Regulación de Emociones',
            },
            {
                icono: Seguimiento,
                progreso: userData.InfoNiño.SeguimientoInstrucciones,
                nombreEstadistica: 'Seguimiento de Instrucciones',
            },
            {
                icono: Vinculo,
                progreso: userData.InfoNiño.VinculoPadre,
                nombreEstadistica: 'Vínculo con el Padre',
            },
        ];
    }, [userData]);


    return (
        <View style={styles.container}>
            <CaruselCircular datos={datos} />
            {/* <Pressable onPress={() => navigation.navigate("FormInfante")}>
                <Text>Abrir Form</Text>
            </Pressable> */}
            <FlatList
                style={styles.containerSecundario}
                contentContainerStyle={{ paddingVertical: 10 }}
                data={estadisticas}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    return (
                        <StatsBar
                            progreso={item.progreso}
                            icono={item.icono}
                            nombreEstadistica={item.nombreEstadistica}
                        />
                    );
                }}
                ListHeaderComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>
                            {userData.InfoNiño.RegulacionEmociones !== '' ? `${userData.InfoNiño.Nombre}` : 'Nombre Del Infante'}
                        </Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 60 }} />}
            />
            {/* Modal de redireccion */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible} // Android back button
            >
                <View style={styles.backdrop}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {userData.InfoNiño.RegulacionEmociones !== '' ? 'Terminaste' : 'Completa tu información'}
                        </Text>
                        <Text style={styles.modalText}>
                            {userData.InfoNiño.RegulacionEmociones !== '' ?
                                'Ya puedes continuar y visualizar los apartados del niño' :
                                'Para acceder a esta sección, primero debes llenar los datos de tu infante.'}
                        </Text>

                        <View>
                            {userData.InfoNiño.RegulacionEmociones !== '' ?
                                <Pressable
                                    style={[styles.button, styles.buttonPrimary]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>Continuar</Text>
                                </Pressable> :
                                <Pressable
                                    style={[styles.button, styles.buttonPrimary]}
                                    onPress={() => {
                                        setModalVisible(false);
                                        navigation.navigate('FormInfante');
                                    }}
                                >
                                    <Text style={styles.buttonText}>Ir al Formulario</Text>
                                </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSecundario: {
        backgroundColor: '#FBE7A7',
        borderWidth: 3,
        borderColor: '#E5D28D',
        borderRadius: 20,
        height: 350,
        width: '90%',
        bottom: 0
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 8,
    },
    buttonPrimary: {
        backgroundColor: '#4A1F43',
    },
    buttonSecondary: {
        backgroundColor: '#999',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default InfanteScreen