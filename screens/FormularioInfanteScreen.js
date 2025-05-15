import React, { useState, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import FormularioInfante from '../components/componentesInfantes/FormularioInfante';
import PreguntasInfante from '../components/componentesInfantes/PreguntasInfante';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/ContextLogin';
import { useGetFormulario } from '../Service/Formulario';
import { guardarDatosInfante } from '../Service/InfanteService';
import { GetUserById } from '../Service/Usario'


/* const dbData = {
    InstruccionesIniciales: {
        escala: "1 = Casi nunca,2 = Rara vez,3 = A veces,4 = Frecuentemente,5 = Casi siempre",
        instrucciones: "Por favor conteste cada pregunta …",
        proposito: "Este cuestionario se hace con el proposito …"
    },
    RegulacionEmociones: {
        Pregunta1: { Pregunta: "Cuando se siente frustrado/a…", id: 1 },
        Pregunta2: { Pregunta: "¿Con qué frecuencia expresa sus emociones…?", id: 2 },
        Pregunta3: { Pregunta: "¿Con qué frecuencia reacciona de forma exagerada…?", id: 3 }
    },
    SeguimientoInstrucciones: {
        Pregunta1: { Pregunta: "Cuando le da una instrucción simple…", id: 1 },
        Pregunta2: { Pregunta: "¿Con qué frecuencia necesita que le repita…?", id: 2 },
        Pregunta3: { Pregunta: "¿Con qué frecuencia se distrae antes…?", id: 3 }
    },
    VinculoPadre: {
        Pregunta1: { Pregunta: "¿Con qué frecuencia busca consuelo…?", id: 1 },
        Pregunta2: { Pregunta: "¿Con qué frecuencia disfruta pasar tiempo…?", id: 2 },
        Pregunta3: { Pregunta: "¿Con qué frecuencia comparte sus sentimientos…?", id: 3 }
    }
};
 */

const { width, height } = Dimensions.get('window');

const FormularioInfanteScreen = () => {
    const dbData = useGetFormulario();

    const questionItems = dbData
        .filter(item => item.id !== 'InstruccionesIniciales') // omitimos solo esa sección
        .flatMap(section =>
            Object.entries(section)
                .filter(([key]) => key.startsWith('Pregunta'))
                .map(([_, { id, Pregunta }]) => ({
                    type: 'question',
                    key: `${section.id}-${id}`,
                    sectionKey: section.id,
                    id,
                    pregunta: Pregunta,
                }))
        );

    const carouselData = [
        { type: 'form', key: 'form-page' },
        ...questionItems,
    ];

    const { valorStats, setValorStats, formData, setFormData, userData, setUserData } = useAuthContext();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const advancedParallax = useCallback((value) => {
        'worklet';
        const zIndex = Math.round(interpolate(
            value,
            [-1, 0, 1],
            [10, 20, 30],
            Extrapolation.CLAMP
        ));
        const scale = interpolate(
            value,
            [-1, 0, 1],
            [0.8, 1, 0.8],
            Extrapolation.CLAMP
        );
        const translateX = interpolate(
            value,
            [-2, 0, 1],
            [-width, 0, width],
            Extrapolation.CLAMP
        );
        return {
            transform: [
                { translateX },
                { scale },
            ],
            zIndex,
        };
    }, []);

    const navigation = useNavigation();
    const [responses, setResponses] = useState({});
    const progress = useSharedValue(0);
    const carouselRef = useRef(null);

    const handleSelect = (sectionKey, id, value) => {
        setResponses(prev => ({
            ...prev,
            [sectionKey]: {
                ...prev[sectionKey],
                [id]: value,
            }
        }));
    };

    const normalizeScore = (values = []) => {
        const n = values.length;
        if (n === 0) return 0;
        const sum = values.reduce((a, v) => a + v, 0);
        return (sum - n) / (4 * n);
    };

    const calcularResultados = () => {
        // 1. Calculas los nuevos stats
        const nuevosStats = Object.keys(valorStats).reduce((acc, sectionKey) => {
            const valores = responses[sectionKey]
                ? Object.values(responses[sectionKey])
                : [];
            acc[sectionKey] = normalizeScore(valores);
            return acc;
        }, {});

        // 2. Construyes el formData actualizado
        const updatedFormData = {
            ...formData,
            ...nuevosStats,  // esto sobreescribe sólo RegulacionEmociones, etc.
        };

        // 3. Actualizas tus estados
        setValorStats(nuevosStats);
        setFormData(updatedFormData);
        /* console.log(`Antes: ${formData.Nombre}`, `Se envia: ${updatedFormData.Nombre}`); */
        
        // 4. Guardas ENVIANDO el formData ya actualizado
        guardarDatosInfante(userData, updatedFormData)
            .then(async () => {
                /* console.log(formData);
                console.log('iddddd', userData) */
                const userDataaa = await GetUserById(userData.id);
                setUserData(userDataaa);
                navigation.navigate('TabNavigator', { screen: 'Infante' });
            })
            .catch(err => {
                console.error('No se pudo guardar en Firebase:', err);
            });
    };

    const formKeysFormulario = ['Nombre', 'Edad', 'Peso', 'Estatura', 'Comportamiento'];

    const formDataLleno = useMemo(() => {
        return formKeysFormulario.every(key => formData[key] && formData[key].trim() !== '');
    }, [formData]);

    // cuenta cada vez que cambian las respuestas
    const respuestasContestadas = useMemo(() => {
        return Object
            .values(responses)
            .reduce((sum, secObj) => sum + Object.keys(secObj).length, 0);
    }, [responses]);

    const allAnswered = respuestasContestadas === 9;
    const mostrarBoton = formDataLleno && allAnswered;

    return (
        <View style={{ flex: 1 }}>
            {/* {console.log(mostrarBoton+'--'+allAnswered+'--'+formDataLleno+'--'+formData.Nombre+'--'+formData.Edad+'--'+formData.Peso+'--'+formData.Estatura+'--'+formData.Comportamiento)} */}
            <Text style={[styles.titulo]}>Responde el formulario y las preguntas, para avanzar a la siguiente pantalla</Text>
            <Carousel
                ref={carouselRef}
                data={carouselData}
                width={width}
                height={height / 1.3}
                onSnapToItem={idx => setSelectedIndex(idx)}
                onProgressChange={p => (progress.value = p)}
                renderItem={({ item, animationValue, index }) =>
                    index === selectedIndex  // solo renderiza el slide activo
                        ? item.type === 'form'
                            ? <View style={styles.centeredView}>
                                <FormularioInfante animatedValue={animationValue} />
                            </View>
                            : <View style={styles.centeredView}>
                                <PreguntasInfante
                                    sectionKey={item.sectionKey}
                                    id={item.id}
                                    pregunta={item.pregunta}
                                    response={responses[item.sectionKey]?.[item.id]}
                                    onSelect={handleSelect}
                                    animatedValue={animationValue}
                                />
                            </View>
                        : null
                }
                customAnimation={advancedParallax}
                scrollAnimationDuration={800}
                loop={false}
            />
            {mostrarBoton &&
                <Pressable
                    onPress={calcularResultados}
                    style={{
                        padding: 12,
                        backgroundColor: '#4A1F43',
                        margin: 16,
                        borderRadius: 6
                    }}
                >
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        Enviar Respuestas
                    </Text>
                </Pressable>
            }


            {/* <View style={styles.pagination}>
                <Pagination.Basic
                    progress={progress}
                    data={carouselData}
                    dotStyle={{ backgroundColor: "#262626" }}
                    activeDotStyle={{ backgroundColor: "#f1f1f1" }}
                    containerStyle={{ gap: 5, marginBottom: 10 }}
                    onPress={i => carouselRef.current?.scrollTo({ count: i, animated: true })}
                />
            </View> */}

        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        backgroundColor: '#ddd',
        borderRadius: 4,
        margin: 16,
        alignSelf: 'flex-start',
    },
    titulo: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    pagination: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#333',
    },
});

export default FormularioInfanteScreen;