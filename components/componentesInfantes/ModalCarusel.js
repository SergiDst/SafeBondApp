import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native';
import { Select, SelectItem, Calendar } from '@ui-kitten/components';
import { useAuthContext } from '../../context/ContextLogin';

const ModalCarusel = ({ modalVisible, setModalVisible, indexItem }) => {

    const { comportamiento, setComportamiento, formData, setFormData, birthDate, setBirthDate } = useAuthContext();
    const [estaActivo, setEstaActivo] = useState(true)
    useEffect(() => {
        switch (indexItem) {
            case 0:
                if (comportamiento !== '') {
                    setEstaActivo(true)
                } else {
                    setEstaActivo(false)
                }
                break;
            case 1:
                if (formData.Edad !== '') {
                    setEstaActivo(true)
                } else {
                    setEstaActivo(false)
                }
                break;
            case 2:
                if (formData.Estatura !== '') {
                    setEstaActivo(true)
                } else {
                    setEstaActivo(false)
                }
                break;
            case 3:
                if (formData.Peso !== '') {
                    setEstaActivo(true)
                } else {
                    setEstaActivo(false)
                }
                break;
            default:
                break;
        }
            
        }, [indexItem]);

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

    const actualizarCampo = (campo, valor) => {
        setFormData(prev => ({ ...prev, [campo]: valor }));
    };

    const actualizarDatosModal = () => {
        switch (indexItem) {
            case 0:
                setComportamiento('')
                actualizarCampo('Comportamiento', '');
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

    const handleSaveComportamiento = () => {
        if (comportamiento.row == null) return; // nada seleccionado
        const seleccion = comportamientoOptions[comportamiento.row];
        // actualiza formData (añade campo "Comportamiento")
        setFormData(prev => ({ ...prev, Comportamiento: seleccion }));
        // activa el botón o cierra el modal
        setEstaActivo(true);
      };

    const comportamientoOptions = ['Alocado', 'Serio', 'Neutro'];

    let content;

    switch (indexItem) {
        case 0:
            content = (
                <>
                    {formData.Comportamiento == '' ?
                        <>
                            <Text style={styles.titulo}>¿Como es tu hijo?</Text>
                            <View style={styles.columnsContainer}>
                                <View style={styles.column}>
                                    <Select
                                        selectedIndex={comportamiento}
                                        value={comportamiento !== '' ? comportamientoOptions[comportamiento.row] : ''} // muestra vacío si no hay selección
                                        onSelect={index => setComportamiento(index)}
                                    >
                                        {comportamientoOptions.map((option, index) => (
                                            <SelectItem key={index} title={option} />
                                        ))}
                                    </Select>
                                </View>
                                <View style={styles.column}>
                                    <Text style={styles.subtitulo}>Poner img o svg</Text>
                                    <Text style={styles.textStyle}>img o svg{comportamientoOptions[comportamiento.row]}</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={handleSaveComportamiento}
                                    >
                                        <Text style={styles.buttonText}>Guardar selección</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </> :
                        <>
                            <Text style={styles.titulo}>Tu hijo es {comportamientoOptions[comportamiento.row]}</Text>
                            <View>
                                <Text>Img representativa del comportamiento</Text>
                            </View>
                        </>
                    }

                </>
            );
            break;
        case 1:
            content = (
                <>
                    {formData.Edad == '' ?
                        <>
                            <Text style={styles.titulo}>¿Selecciona el dia de nacimiento del niño?</Text>
                            <View>
                                <Text>Edad calculada</Text>
                                <Text>
                                    {birthDate
                                        ? `${calculateAge(birthDate)} año${calculateAge(birthDate) === 1 ? '' : 's'}`
                                        : 'Selecciona una fecha'}
                                </Text>
                                <Calendar
                                    date={birthDate}
                                    onSelect={setBirthDate}
                                    min={minDate}
                                    max={maxDate}
                                />
                            </View>
                            <Pressable style={styles.button} onPress={handleSaveAge}>
                                <Text category='button'>Guardar Edad</Text>
                            </Pressable>
                        </> :
                        <>
                            <Text style={styles.titulo}>Tu hijo tiene:</Text>
                            <View>
                                <Text>{formData.Edad}</Text>
                                <Text>Años</Text>
                            </View>
                        </>
                    }

                </>
            );
            break;
        case 2:
            content = (
                <View>
                    <Text>Estatura</Text>
                    <Text>indice 2</Text>
                    <Text>{formData.Estatura}</Text>
                </View>
            );
            break;
        case 3:
            content = (
                <View>
                    <Text>Peso</Text>
                    <Text>indice 3</Text>
                    <Text>{formData.Peso}</Text>
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
                    {content}
                    <View style={styles.containerButton}>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Cerrar</Text>
                        </Pressable>
                        {estaActivo &&
                            <Pressable style={[styles.button, styles.buttonOpen]} onPress={actualizarDatosModal}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Actualizar</Text>
                            </Pressable>
                        }
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

export default ModalCarusel;