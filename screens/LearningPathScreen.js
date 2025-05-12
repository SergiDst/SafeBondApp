import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import BtnMapa from '../components/componentesLearningPath/btnMapa';
import IndicadorLabel from '../components/componentesLearningPath/IndicadorLabel';
import ModalMapa from '../components/componentesLearningPath/ModalMapa';
import { useGetActividades } from '../Service/Actividades';
import { useAuthContext } from '../context/ContextLogin';

const { width } = Dimensions.get('window');

const datosIniciales = [
    { icono: 'book-open-variant', tipoModal: '1', tituloModal: 'Lectura ', idContenido: 'L1' },
    { icono: 'map', tipoModal: '1', tituloModal: 'Lecturas Recomendadas', idContenido: 'A1' },
    { icono: 'key', tipoModal: '2', tituloModal: 'Quiz sobre conexion', idContenido: 'Q1' },
    { icono: 'book-open-variant', tipoModal: '1', tituloModal: 'Accesos Rápidos', idContenido: 'L2' },
    { icono: 'map', tipoModal: '1', tituloModal: 'Favoritos', idContenido: 'A2' },
    { icono: 'key', tipoModal: '2', tituloModal: 'Ejercicios', idContenido: 'Q2' },
    { icono: 'book-open-variant', tipoModal: '1', tituloModal: 'Accesos Rápidos', idContenido: 'L3' },
    { icono: 'map', tipoModal: '1', tituloModal: 'Favoritos', idContenido: 'A3' },
    { icono: 'key', tipoModal: '1', tituloModal: 'Ejercicios', idContenido: 'Q3' },
];
const secuenciaEstilos = ['estilo2', 'estilo3', 'estilo2', 'estilo1'];
const estilosEspeciales = [2, 5, 8] //Añadir el indice de los botones especiales

const LearningPathScreen = () => {

    const { userData } = useAuthContext();

    const actividadesData = useGetActividades();
    console.log('Actividades:', actividadesData);

    const navigation = useNavigation();

    const flatListRef = useRef(null);

    const [botones, setBotones] = useState([]);
    const [completados, setCompletados] = useState(0);

     useEffect(() => {
        if (userData && userData.Lecciones) {
            const datosActualizados = datosIniciales.map(item => {
                const leccion = userData.Lecciones[item.idContenido];
                return {
                    ...item,
                    completado: leccion?.completo === true
                };
            });

            setBotones(datosActualizados);

            const cantidadCompletados = datosActualizados.filter(item => item.completado).length;
            setCompletados(cantidadCompletados);
        }
    }, [userData]);

    const [enFinal, setEnFinal] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [tituloModal, setTituloModal] = useState('');
    const [subtitulo1, setSubtitulo1] = useState('');
    //const [subtitulo2, setSubtitulo2] = useState('');
    const [texto1, setTexto1] = useState('');
    const [texto2, setTexto2] = useState('');
    const [DataActividad, setDataActividad] = useState('');

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
        let actividad = null;

        for (const item of actividadesData) {
            for (const clave in item) {
                const contenido = item[clave];
                if (contenido?.ID === idContenido) {
                    actividad = contenido;
                    break;
                }
            }
            if (actividad) break;
        }

        setTipoModal(tipo);
        console.log('Actividad:', actividad);
        setDataActividad(actividad);
        console.log('DataActividad:', DataActividad);
        if (actividad) {
            setTituloModal(actividad.TituloModal || titulo);
            setSubtitulo1(actividad.Sub1 || '');
            setTexto1(actividad.Texto1 || '');
            setTexto2(actividad.Texto2 || '');
        } else {
            setSubtitulo1('');
            setTexto1('');
            setTexto2('');
        }
        console.log('DataActividad:', DataActividad);
        setModalVisible(true);
    };


    return (
        <View style={styles.container}>
            <Appbar.Header mode="center-aligned" style={styles.appbar}>
                <IndicadorLabel posicion="recuadroIzq" icono="monedas" numMonedas={40} />
                <View style={styles.circulo}>
                    <Text style={{ fontFamily: 'MochiyPopOne_400Regular', }}>{Math.ceil((completados / botones.length) * 100)}%</Text>
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
                            datosActividad={actividadesData?.find(a => a.idContenido === item.idContenido)}
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
                DataActividad={DataActividad}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
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