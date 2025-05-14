import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { Select, SelectItem, Calendar, Input } from '@ui-kitten/components';
import { Modal, Portal } from 'react-native-paper';
import { useAuthContext } from '../../context/ContextLogin';
import Bebe1 from '../../assets/bebe1.svg'
import Bebe2 from '../../assets/bebe2.svg'
import Niños from '../../assets/niños.svg'
import Adolecente1 from '../../assets/adolecente1.svg'
import Adolecente2 from '../../assets/adolecente2.svg'
import {actualizarComportamiento} from '../../Service/InfanteService'


const { width, height } = Dimensions.get('window');

const ModalCarusel = ({ modalVisible, setModalVisible, indexItem }) => {

    const { comportamiento, setComportamiento, comportamientoOptions,
        formData, setFormData, birthDate, setBirthDate,
        pesoOptions, pesoSelect, setPesoSelect, estaturaOptions, estaturaSelect, setEstaturaSelect, userData
    } = useAuthContext();
    const [estaActivo, setEstaActivo] = useState(true)

    useEffect(() => {
        switch (indexItem) {
            case 0:
                setEstaActivo(userData.InfoNiño.Comportamiento !== '');
                break;
            case 1:
                setEstaActivo(userData.InfoNiño.Edad !== '');
                break;
            case 2:
                setEstaActivo(userData.InfoNiño.Estatura !== '');
                break;
            case 3:
                setEstaActivo(userData.InfoNiño.Peso !== '');
                break;
            default:
                setEstaActivo(false);
        }
    }, [indexItem, userData]);

    const today = new Date();
    const maxDate = today;
    const minDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
    );

    const calculateAge = (birth) => {
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        const dayDiff = now.getDate() - birth.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    const handleSaveAge = () => {
        if (!birthDate) return;
        const edad = calculateAge(birthDate).toString();
        setFormData(prev => ({ ...prev, Edad: edad }));
        setEstaActivo(true)
    };

    const handleSaveComportamiento = () => {
        if (comportamiento.row == null) return; // nada seleccionado
        const seleccion = comportamientoOptions[comportamiento.row];
        setFormData(prev => ({ ...prev, Comportamiento: seleccion }));
        setEstaActivo(true);
    };

    const handleSavePeso = () => {
        if (pesoSelect.row == null) return;
        const seleccion = pesoOptions[pesoSelect.row];
        setFormData(prev => ({ ...prev, Peso: seleccion }));
        setEstaActivo(true);
    };

    const handleSaveEstatura = () => {
        if (estaturaSelect.row == null) return;
        const seleccion = pesoOptions[estaturaSelect.row];
        setFormData(prev => ({ ...prev, Estatura: seleccion }));
        setEstaActivo(true);
    };


    const funcionCambiante = useCallback(() => {
        switch (indexItem) {
            case 0:
                handleSaveComportamiento();
                break;
            case 1:
                handleSaveAge();
                break;
            case 2:
                handleSaveEstatura();
                break;
            case 3:
                handleSavePeso();

                break;
            default:
        }
    }, [
        indexItem,
        // asegúrate de listar aquí todas las dependencias que uses dentro:
        handleSaveComportamiento,
        handleSaveAge,
        handleSaveEstatura,
        handleSavePeso
    ]);

    const renderSvgsPorEdad = (edad) => {
        if (edad <= 3) {
            return (
                <>
                    <Bebe1 style={styles.svg} />
                    <Bebe2 style={styles.svg} />
                </>
            );
        } else if (edad <= 11) {
            return <Niños style={styles.svg} />;
        } else if (edad <= 18) {
            return (
                <>
                    <Adolecente1 style={styles.svg} />
                    <Adolecente2 width={width / 2.2} height={height / 4} />
                </>
            );
        }
        return <Text>Edad fuera de rango</Text>;
    };

    const renderSvgsPorComportamiento = (comportamiento) => {
        switch (comportamiento) {
            case 'Alocado':
                return (<>
                    <Bebe1 style={styles.svg} />
                </>)
            case 'Serio':
                return (<>
                    <Bebe2 style={styles.svg} />
                </>)
            case 'Desinteresado':
                return (<>
                    <Adolecente1 style={styles.svg} />
                </>)
            default:
                return (<Text>Comportamiento no encontrado</Text>)
        }
    };

    const actualizarCampo = (campo, valor) => {
        actualizarComportamiento(userData, campo, valor)
        //setFormData(prev => ({ ...prev, [campo]: valor }));
    };

    const actualizarDatosModal = () => {
        switch (indexItem) {
            case 0:
                setComportamiento('')
                actualizarCampo('Comportamiento', '');
                //console.log(formData.Comportamiento);
                setEstaActivo(false)
                break;
            case 1:
                actualizarCampo('Edad', '');
                setEstaActivo(false)
                break;
            case 2:
                actualizarCampo('Estatura', '');
                setEstaActivo(false)
                break;
            case 3:
                actualizarCampo('Peso', '');
                setEstaActivo(false)
                break;
            default:
                break;
        }
    };

    let content;

    switch (indexItem) {
        case 0:
            content = (
                <>
                    {userData.InfoNiño.Comportamiento == '' ?
                        <>
                            <Text style={styles.titulo}>¿Como es tu hijo?</Text>
                            <View>
                                <Select
                                    style={{ width: width / 2 }}
                                    size='small'
                                    selectedIndex={comportamiento}
                                    value={comportamiento !== '' ? comportamientoOptions[comportamiento.row] : ''} // muestra vacío si no hay selección
                                    onSelect={index => setComportamiento(index)}
                                >
                                    {comportamientoOptions.map((option, index) => (
                                        <SelectItem key={index} title={option} />
                                    ))}
                                </Select>
                            </View>
                            <View>
                                {renderSvgsPorComportamiento(comportamientoOptions[comportamiento.row])}
                            </View>

                        </> :
                        <>
                            <Text style={styles.titulo}>Tu hijo es {userData.InfoNiño.Comportamiento}</Text>
                            <View>
                                {renderSvgsPorComportamiento(userData.InfoNiño.Comportamiento)}
                            </View>
                        </>
                    }

                </>
            );
            break;
        case 1:
            content = (
                <>
                    {userData.InfoNiño.Edad == '' ?
                        <>
                            <Text style={styles.titulo}>¿Selecciona el dia de nacimiento del niño?</Text>
                            <View>
                                <Text>Edad calculada: {birthDate
                                    ? `${calculateAge(birthDate)} año${calculateAge(birthDate) === 1 ? '' : 's'}`
                                    : 'Selecciona una fecha'}
                                </Text>
                                <Calendar
                                    style={{ width: width / 1.5, height: height / 2.4 }}
                                    date={birthDate}
                                    onSelect={setBirthDate}
                                    min={minDate}
                                    max={maxDate}
                                />
                            </View>
                        </> :
                        <>
                            <Text style={styles.titulo}>Tu hijo tiene:</Text>
                            <View>
                                <Text style={styles.textStyle}>{userData.InfoNiño.Edad} Años</Text>
                                <View style={styles.columnsContainer}>
                                    {renderSvgsPorEdad(parseInt(userData.InfoNiño.Edad))}
                                </View>
                            </View>
                        </>
                    }

                </>
            );
            break;
        case 2:
            content = (
                <>
                    {userData.InfoNiño.Estatura == '' ?
                        <>
                            <Text style={styles.titulo}>¿Aproximadamente cuanto mide tu niño?</Text>
                            <Select
                                style={{ width: width / 2 }}
                                size='small'
                                selectedIndex={estaturaSelect}
                                value={estaturaSelect !== '' ? estaturaOptions[estaturaSelect.row] : ''}
                                onSelect={index => {setEstaturaSelect(index);}}
                            >
                                {estaturaOptions.map((option, i) => (
                                    <SelectItem key={i} title={option} />
                                ))}
                            </Select>
                        </>
                        :
                        <>
                            <Text>Estatura</Text>
                            <Text>indice 2</Text>
                            <Text>{userData.InfoNiño.Estatura}</Text>
                        </>
                    }
                </>
            );
            break;
        case 3:
            content = (
                <>
                    {userData.InfoNiño.Peso == '' ?
                        <>
                            <Text style={styles.titulo}>¿Aproximadamente cuanto pesa tu niño?</Text>
                            <Select
                                style={{ width: width / 2 }}
                                size='small'
                                selectedIndex={pesoSelect}
                                value={pesoSelect !== '' ? pesoOptions[pesoSelect.row] : ''}
                                onSelect={index => {setPesoSelect(index);}}
                            >
                                {pesoOptions.map((option, i) => (
                                    <SelectItem key={i} title={option} />
                                ))}
                            </Select>
                        </>
                        :
                        <>
                            <Text>Peso</Text>
                            <Text>indice 3</Text>
                            <Text>{userData.InfoNiño.Peso}</Text>
                        </>
                    }
                </>

            );
            break;
        default:
            content = null;
    }

    return (
        <Portal>
            <Modal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {content}
                        <View style={styles.containerButton}>
                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Cerrar</Text>
                            </Pressable>
                            {estaActivo ?
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={actualizarDatosModal}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Actualizar</Text>
                                </Pressable>
                                :
                                <Pressable style={[styles.button, styles.buttonOpen]} onPress={funcionCambiante}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Guardar</Text>
                                </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: width / 1.2,
        height: height / 1.5,
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
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    svg: {
        width: width / 3,
        height: height / 4
    }
});

export default ModalCarusel;