import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { ViewPager, Divider, Input, Button, Select, SelectItem, Radio, RadioGroup, Datepicker } from '@ui-kitten/components';
import { useAuthContext } from '../../context/ContextLogin';

const { width, height } = Dimensions.get('window');

const ModalFormulario = ({ visible, onClose, onSubmit }) => {
    const { comportamiento, setComportamiento, formData, setFormData, birthDate, setBirthDate } = useAuthContext();

    const [opcion, setOpcion] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0);

    const comportamientoOptions = ['Alocado', 'Serio', 'Neutro'];
    const [touched, setTouched] = useState({});

    // Lazy loading
    const shouldLoadComponent = (index) => index === selectedIndex;

    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    const calculateAge = (birthDate) => {
        const now = new Date();
        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        const dayDiff = now.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    const handlePesoChange = (text) => {
        const filtered = text.replace(/[^0-9.]/g, '');
        const validText = filtered.split('.').length > 2
            ? filtered.substring(0, filtered.lastIndexOf('.'))
            : filtered;

        const number = parseFloat(validText);
        if (!isNaN(number) && number >= 2 && number <= 100) {
            setFormData({ ...formData, Peso: validText });
        } else if (validText === '') {
            setFormData({ ...formData, Peso: '' });
        }
    };

    const handleEstaturaChange = (text) => {
        const filtered = text.replace(/[^0-9.]/g, '');
        const validText = filtered.split('.').length > 2
            ? filtered.substring(0, filtered.lastIndexOf('.'))
            : filtered;

        const number = parseFloat(validText);
        if (!isNaN(number) && number >= 0.5 && number <= 2.5) {
            setFormData({ ...formData, Estatura: validText });
        } else if (validText === '') {
            setFormData({ ...formData, Estatura: '' });
        }
    };

    const pages = [
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

    const canProceed = pages[selectedIndex].valid();

    const handleNext = () => {
        setTouched({});
        setSelectedIndex(i => Math.min(i + 1, pages.length - 1));
    };

    const handleBack = () => {
        setTouched({});
        setSelectedIndex(i => Math.max(i - 1, 0));
    };

    const handleSend = () => {
        const allValid = pages.every(p => p.valid());
        if (allValid) {
            onSubmit(formData);
            onClose();
            setSelectedIndex(0);
            setTouched({});
        } else {
            setTouched({ name: true, email: true, feedback: true });
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{pages[selectedIndex].title}</Text>
                    <Divider />

                    <ViewPager
                        style={styles.pager}
                        selectedIndex={selectedIndex}
                        shouldLoadComponent={shouldLoadComponent}
                        onSelect={index => setSelectedIndex(index)}
                    >
                        {pages.map(page => (
                            <View key={page.key} style={styles.page}>
                                {page.content}
                            </View>
                        ))}
                    </ViewPager>

                    <View style={styles.nav}>
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
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pager: {
        height: height / 2,
        marginVertical: 10,
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
