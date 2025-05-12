import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { ViewPager, Divider, Input, Button, Select, SelectItem, Radio, RadioGroup, Datepicker, Layout } from '@ui-kitten/components';
import { Modal, Portal } from 'react-native-paper';
import { useAuthContext } from '../../context/ContextLogin';
import FormularioInfante from './FormularioInfante';
import PreguntasInfante from './PreguntasInfante';

const { width, height } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.9;
const MODAL_HEIGHT = height * 0.8;

const ModalFormulario = ({ visible, onClose, onSubmit }) => {
    const { formData, setFormData} = useAuthContext();

    const [selectedIndex, setSelectedIndex] = useState(0);

    // Lazy loading
    const shouldLoadComponent = (index) => index === selectedIndex;

    /* const pages = [
        {
            key: 'personal',
            title: 'Datos del infante',
            content: (
                <>
                    <Datepicker
                        label="Fecha de nacimiento"
                        placeholder="Selecciona tu fecha"
                        date={birthDate}
                        onSelect={date => {
                            // 1. Guardamos la fecha elegida
                            setBirthDate(date);
                            // 2. Marcamos el campo como tocado para validación
                            setTouched(prev => ({ ...prev, Edad: true }));
                            // 3. Calculamos y guardamos la edad en formData
                            const age = calculateAge(date);
                            setFormData(prev => ({
                                ...prev,
                                Edad: age.toString(),
                            }));
                        }}
                        min={eighteenYearsAgo}
                        max={today}  // no permitir fechas futuras
                        status={touched.Edad && !formData.Edad ? 'danger' : 'basic'}
                        caption={touched.Edad && !formData.Edad ? 'Requerido' : ''}
                    />
                    <Input
                        label="Peso"
                        placeholder="Peso del infante"
                        keyboardType="decimal-pad"
                        value={formData.Peso}
                        onChangeText={handlePesoChange}
                        onBlur={() => setTouched({ ...touched, Peso: true })}
                        style={styles.input}
                        status={touched.Peso && !formData.Peso ? 'danger' : 'basic'}
                        caption={touched.Peso && !formData.Peso ? 'Requerido' : ''}
                    />
                    <Input
                        label="Estatura"
                        placeholder="Estatura del infante"
                        keyboardType="decimal-pad"
                        autoCapitalize="none"
                        value={formData.Estatura}
                        onChangeText={handleEstaturaChange}
                        onBlur={() => setTouched({ ...touched, Estatura: true })}
                        style={styles.input}
                        status={touched.Estatura && !formData.Estatura ? 'danger' : 'basic'}
                        caption={touched.Estatura && !formData.Estatura ? 'Requerido' : ''}
                    />
                    <Select
                        style={{ paddingTop: 50 }}
                        label="Comportamiento"
                        status={touched.Comportamiento && !formData.Comportamiento ? 'danger' : 'basic'}
                        caption={touched.Comportamiento && !formData.Comportamiento ? 'Requerido' : ''}
                        selectedIndex={comportamiento}
                        onSelect={index => {
                            setComportamiento(index);
                            setFormData({ ...formData, Comportamiento: comportamientoOptions[index.row] });
                        }}
                        value={formData.Comportamiento}
                    >
                        {comportamientoOptions.map((item, idx) => (
                            <SelectItem key={idx} title={item} />
                        ))}
                    </Select>
                </>
            ),
             valid: () =>
                 formData.Edad?.trim() !== '' &&
                 formData.Peso?.trim() !== '' &&
                 formData.Estatura?.trim() !== '' &&
                 formData.Comportamiento?.trim() !== ''
        },
        {
            key: 'feedback',
            title: 'Preguntas',
            content: (
                <>
                    <Input
                        label="Comentarios"
                        placeholder="Tus comentarios"
                        multiline
                        textStyle={{ minHeight: 64 }}
                        value={formData.feedback}
                        onChangeText={text => setFormData({ ...formData, feedback: text })}
                        onBlur={() => setTouched({ ...touched, feedback: true })}
                        style={styles.input}
                        status={touched.feedback && !formData.feedback ? 'danger' : 'basic'}
                        caption={touched.feedback && !formData.feedback ? 'Requerido' : ''}
                    />
                    <RadioGroup
                        style={styles.containerRadio}
                        selectedIndex={opcion}
                        onChange={index => setOpcion(index)}
                    >
                        <Radio style={styles.radio}>
                            A
                        </Radio>
                        <Radio style={styles.radio}>
                            B
                        </Radio>
                        <Radio style={styles.radio}>
                            C
                        </Radio>
                    </RadioGroup>
                </>
            ),
            valid: () => formData.feedback?.trim() !== ''
        }
    ];
 */
    /* const canProceed = pages[selectedIndex].valid(); */

    const handleNext = () => {
        setTouched({});
        setSelectedIndex(i => Math.min(i + 1, pages.length - 1));
    };

    const handleBack = () => {
        setTouched({});
        setSelectedIndex(i => Math.max(i - 1, 0));
    };

    /* const handleSend = () => {
        const allValid = pages.every(p => p.valid());
        if (allValid) {
            onSubmit(formData);
            onClose();
            setSelectedIndex(0);
            setTouched({});
        } else {
            setTouched({ name: true, email: true, feedback: true });
        }
    }; */

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}>
                <View style={styles.content}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>Hola</Text>
                        <Divider />

                        <ViewPager
                            style={styles.pager}
                            selectedIndex={selectedIndex}
                            shouldLoadComponent={shouldLoadComponent}
                            onSelect={index => setSelectedIndex(index)}
                        >
                            <View style={styles.page}>
                                <FormularioInfante />
                            </View>
                            <View style={styles.page}>
                                <PreguntasInfante/>
                            </View>
                        </ViewPager>

                        {/* <View style={styles.nav}>
                    {selectedIndex > 0 && (
                        <Button appearance="outline" onPress={handleBack} style={styles.button}>
                            Anterior
                        </Button>
                    )}

                    {selectedIndex < pages.length - 1 ? (
                        <Button onPress={handleNext} style={styles.button}>
                            Siguiente
                        </Button>
                    ) : (
                        <Button status="success" disabled={!canProceed} onPress={handleSend} style={styles.button}>
                            Enviar
                        </Button>
                    )}
                </View> */}
                    </View>
                </View>

            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        width: MODAL_WIDTH,
        height: MODAL_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        elevation: 5,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pager: {
        height: height / 2,
        marginVertical: 10,
        backgroundColor: 'red'
    },
    page: {
        flex: 1,
    },
    input: {
        marginTop: 10,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    containerRadio: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radio: {
        margin: 2,
    },
});

export default ModalFormulario;
