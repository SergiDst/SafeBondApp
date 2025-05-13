import { Pressable, Text, View, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ComponenteLista } from '../components/componentesEjercicios/componenteLista';
import { useGetActividades, obtenerFavoritos } from '../Service/Actividades';
import { useAuthContext } from '../context/ContextLogin';
import { useNavigation } from '@react-navigation/native';


const Ejercicios = () => {

  const { userData } = useAuthContext();

  const navigation = useNavigation();
  const actividadesData = useGetActividades();
  console.log('Actividades:', actividadesData);

  const [refreshFavoritos, setRefreshFavoritos] = useState(false);

  

  const [mostrarTodos, setMostrarTodos] = useState(false);

  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });

  const [btnSeleccionado, setBtnSeleccionado] = useState(true);
  const [liked, setLiked] = useState(false);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  console.log('User:', userData);
  useEffect(() => {
    const actividadesCompletadas = userData.Lecciones
      ? Object.keys(userData.Lecciones).filter(id => userData.Lecciones[id].completo)
      : [];

    console.log('Actividades completadas:', actividadesCompletadas);

    const data = actividadesData
      .filter((item) => item.Lectura1 && item.Actividad1)
      .flatMap((item) => {
        const elementos = [];
        const lecturaID = item.Lectura1.ID;
        const actividadID = item.Actividad1.ID;

        if (actividadesCompletadas.includes(lecturaID)) {
          elementos.push({
            id: lecturaID,
            tipo: 'Lectura',
            contenido: item.Lectura1,
            principio: item.id,
          });
        }

        if (actividadesCompletadas.includes(actividadID)) {
          elementos.push({
            id: actividadID,
            tipo: 'Actividad',
            contenido: item.Actividad1,
            principio: item.id,
          });
        }
        return elementos;
      });
    console.log('Data filtrada:', data);
    setDataFiltrada(data); // Almacenar los datos filtrados en el estado
  }, [userData, actividadesData]);
  console.log('Data filtrada:', dataFiltrada);


  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      const favIds = await obtenerFavoritos(userData.id);
      console.log('ids favoritos', favIds)
      const actividadesFavoritas = dataFiltrada.filter(act =>
        favIds.includes(act.id)
      );
      setFavoritos(actividadesFavoritas);
      console.log('Favoritos:', actividadesFavoritas);
    };

    fetchFavoritos();
  }, [userData, dataFiltrada]);

  const fetchFavoritos = async () => {
    const favIds = await obtenerFavoritos(userData.id);
    const actividadesFavoritas = dataFiltrada.filter(act =>
      favIds.includes(act.id)
    );
    setFavoritos(actividadesFavoritas);
  };

  useEffect(() => {
    fetchFavoritos();
  }, [userData, dataFiltrada, refreshFavoritos]);


  const elementosParaMostrar = mostrarTodos ? dataFiltrada : dataFiltrada.slice(0, 3);

  const handleVerMas = () => {
    setMostrarTodos(!mostrarTodos);
  };

  return (
    <View style={styles.container}>
      {/* Imagen Prinicpal */}
      <View style={styles.contImage}>
        <Image
          source={require('../assets/Imagen1.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      {/* Contenedor de titulos y botones principales */}
      <View style={styles.head}>
        <View style={styles.contTitulos}>
          <Text style={[styles.fuente, { fontSize: 15 }]}>
            Ejercicios de reforzamiento
          </Text>
          <Text style={[styles.fuente, { fontSize: 10 }]}>
            Actvidades en Familia
          </Text>
        </View>
        <View style={styles.contBtns}>
          <View style={styles.aroundBtn}>
            <Pressable
              style={[
                styles.btn,
                {
                  borderRightWidth: 1,
                  borderStartStartRadius: 20,
                  borderEndStartRadius: 20,
                },
                btnSeleccionado ? styles.btnSeleccionado : '',
              ]}
              onPress={() => setBtnSeleccionado(true)}>
              <Text style={[styles.fuente, { fontSize: 10 }]}>
                Favoritos
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                {
                  borderLeftWidth: 1,
                  borderStartEndRadius: 20,
                  borderEndEndRadius: 20,
                },
                !btnSeleccionado ? styles.btnSeleccionado : '',
              ]}
              onPress={() => setBtnSeleccionado(false)}>
              <Text style={[styles.fuente, { fontSize: 10 }]}>
                Actividades
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* contenedor de componente de ejercicio */}
      <FlatList
        data={btnSeleccionado ? favoritos : elementosParaMostrar}
        keyExtractor={(item) => item.id}
        extraData={btnSeleccionado ? favoritos : ''}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={[styles.fuente, { fontSize: 12 }]}>
              Principio: {item.principio}
            </Text>
            <Pressable onPress={() => navigation.navigate("Lecciones", {
              data: item.contenido,
            })}>
              <ComponenteLista
                item={[item.contenido, item.principio]}
                tipo={item.tipo}
                onFavoritoCambiado={() => setRefreshFavoritos(prev => !prev)}
              />
            </Pressable>
          </View>
        )}
      />
      {/* contenedor de boton ver mas*/}
      <View style={styles.contVerMas}>
        <Pressable style={styles.btnVerMas} onPress={handleVerMas}>
          <Text style={[styles.fuente, { fontSize: 12 }]}>{mostrarTodos ? 'Ver menos' : 'Ver mas'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //estilo contenedor imagen principal
  contImage: {
    paddingTop: 30,
    width: '100%',
    height: 230,
    borderBottomWidth: 1,
    borderColor: '#cac4d0',
  },
  //estilos de titulos y botones principales
  head: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FBE7A7',
  },
  contTitulos: {
    alignItems: 'center',
  },
  contBtns: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  aroundBtn: {
    width: '80%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  btn: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
  btnSeleccionado: {
    backgroundColor: '#A3C4F3',
  },
  //fuente general
  fuente: {
    fontFamily: 'MochiyPopOne_400Regular',
  },
  //estilos del contenedor del boton ver mas
  contVerMas: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fef7ff'
  },
  btnVerMas: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    height: 40
  }
});

export default Ejercicios;
