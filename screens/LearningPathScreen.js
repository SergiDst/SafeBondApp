import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import BtnMapa from '../components/btnMapa';
import IndicadorLabel from '../components/IndicadorLabel';
import ModalMapa from '../components/ModalMapa';

const { width } = Dimensions.get('window');

const datosIniciales = [
    { icono: 'map', tipoModal: '1', tituloModal: 'Mapa de Ubicación', idContenido: 'ubicacion' },
    { icono: 'book-open-variant', tipoModal: '1', tituloModal: 'Lecturas Recomendadas', idContenido: 'lecturas', completado: true },
    { icono: 'dumbbell', tipoModal: '1', tituloModal: 'Entrenamiento Diario', idContenido: 'entrenamiento', completado: true },
    { icono: 'key', tipoModal: '2', tituloModal: 'Accesos Rápidos', idContenido: 'accesos', completado: true },
    { icono: 'star-circle', tipoModal: '3', tituloModal: 'Favoritos', idContenido: 'favoritos', completado: true },
    { icono: 'dumbbell', tipoModal: '2', tituloModal: 'Ejercicios', idContenido: 'ejercicios', completado: true },
];

const contenidosModal = {
    ubicacion: {
        subtitulo1: 'Materiales',
        texto1: '1.Palo \n2.Papel \n3.Tijeras',
        texto2: '60min.',
    },
    lecturas: {
        subtitulo1: 'Lecturas sugeridas',
        texto1: 'Explora temas recomendados.',
        texto2: 'Contenido actualizado semanalmente.',
    },
    entrenamiento: {
        subtitulo1: 'Plan diario',
        texto1: 'Sigue la rutina recomendada.',
        texto2: 'Recuerda calentar antes de comenzar.',
    },
    accesos: {
        subtitulo1: 'Atajos útiles',
        texto1: 'Navega más rápido.',
        texto2: 'Accede a lo importante con un solo clic.',
    },
    favoritos: {
        subtitulo1: 'Tus favoritos',
        texto1: 'Guarda lo que más te gusta.',
        texto2: 'Accede rápido a tus elementos preferidos.',
    },
    ejercicios: {
        subtitulo1: 'Sesión activa',
        texto1: 'Rutina adaptada a tu nivel.',
        texto2: 'Incluye descanso y estiramiento.',
    },
};

const secuenciaEstilos = ['estilo1', 'estilo2', 'estilo3', 'estilo2'];
const estilosEspeciales = [4, 7] //Añadir el indice de los botones especiales

const LearningPathScreen = () => {
    const navigation = useNavigation();

    const flatListRef = useRef(null);

    const [botones, setBotones] = useState([]);
    const [completados, setCompletados] = useState(0);

    useEffect(() => {
        // traer datos de la DB
        setBotones(datosIniciales);
    }, []);

    useEffect(() => {
        const total = botones.filter(b => b.completado).length;
        setCompletados(total);
    }, [botones]);

    const [enFinal, setEnFinal] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [tituloModal, setTituloModal] = useState('');
    const [subtitulo1, setSubtitulo1] = useState('');
    //const [subtitulo2, setSubtitulo2] = useState('');
    const [texto1, setTexto1] = useState('');
    const [texto2, setTexto2] = useState('');

    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const estaEnFinal = contentOffset.y + layoutMeasurement.height >= contentSize.height - 30;
        const estaEnInicio = contentOffset.y <= 20;
        if (estaEnFinal) {
            setEnFinal(true);
            //console.log('Llego al final');
        } else if (estaEnInicio) {
            setEnFinal(false);
            //console.log('Llego al inicio');
        }
    };

    const abrirModal = (tipo, titulo, idContenido) => {
        const contenido = contenidosModal[idContenido];
        setTipoModal(tipo);
        setTituloModal(titulo);
        setSubtitulo1(contenido?.subtitulo1 || '');
        setTexto1(contenido?.texto1 || '');
        setTexto2(contenido?.texto2 || '');
        setModalVisible(true);
    };
    return (
        <View style={styles.container}>
            <Appbar.Header mode="center-aligned" style={styles.appbar}>
                <IndicadorLabel posicion="recuadroIzq" icono="monedas" numMonedas={40} />
                <View style={styles.circulo}>
                    <Text>{Math.ceil((completados / botones.length) * 100)}%</Text>
                </View>
                <IndicadorLabel posicion="recuadroDer" icono="bandera" numCompletados={completados} />
            </Appbar.Header>

            <FlatList
                inverted
                ref={flatListRef}
                data={botones}
                onScroll={handleScroll}
                scrollEventThrottle={5}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    const nombreEstilo = estilosEspeciales.includes(index)
                        ? 'estiloEspecial'
                        : secuenciaEstilos[index % secuenciaEstilos.length];
                    return (
                        <BtnMapa
                            icono={item.icono}
                            nombreEstilo={nombreEstilo}
                            accion={() => abrirModal(item.tipoModal, item.tituloModal, item.idContenido)}
                            completado={item.completado}
                        />
                    );
                }}
            />

            <IconButton
                icon={enFinal ? 'arrow-down' : 'arrow-up'}
                onPress={() => {
                    if (enFinal) {
                        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
                    } else {
                        flatListRef.current?.scrollToEnd();
                    }
                }}
                style={styles.btnSubir}
            />
            <ModalMapa
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                tipoModal={tipoModal}
                setTipoModal={setTipoModal}
                tituloModal={tituloModal}
                setTituloModal={setTituloModal}
                subtitulo1={subtitulo1}
                setSubtitulo1={setSubtitulo1}
                texto1={texto1}
                setTexto1={setTexto1}
                texto2={texto2}
                setTexto2={setTexto2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appbar: {
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: '#4681C2',
    },
    circulo: {
        width: 80,
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 7,
        borderColor: '#2C0056',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSubir: {
        width: width * 0.15,
        height: width * 0.15,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#f5ebd8',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E3dac9',
        padding: 15,
    },
});

export default LearningPathScreen;