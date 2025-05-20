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

  // Contexto de autenticación para obtener los datos del usuario
  const { userData } = useAuthContext();

  // Hook de navegación
  const navigation = useNavigation();

  // Hook personalizado para obtener las actividades
  const actividadesData = useGetActividades();
  console.log('Actividades:', actividadesData);

  // Estado para forzar la recarga de favoritos
  const [refreshFavoritos, setRefreshFavoritos] = useState(false);

  // Estado para controlar si se muestran todos los elementos o solo algunos
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Carga de fuentes personalizadas
  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });

  // Estado para saber si está seleccionado el botón de actividades o favoritos
  const [btnSeleccionado, setBtnSeleccionado] = useState(true);

  // Estado para almacenar las actividades completadas y filtradas
  const [dataFiltrada, setDataFiltrada] = useState([]);
  console.log('User:', userData);

  // Efecto para filtrar las actividades completadas del usuario
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

  // Estado para almacenar los favoritos del usuario
  const [favoritos, setFavoritos] = useState([]);

  // Efecto para obtener los favoritos del usuario cuando cambia el usuario o los datos filtrados
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

  // Función para actualizar los favoritos, reutilizada en otro efecto
  const fetchFavoritos = async () => {
    const favIds = await obtenerFavoritos(userData.id);
    const actividadesFavoritas = dataFiltrada.filter(act =>
      favIds.includes(act.id)
    );
    setFavoritos(actividadesFavoritas);
  };

  // Efecto que actualiza favoritos cuando cambia userData, dataFiltrada o se solicita un refresh
  useEffect(() => {
    fetchFavoritos();
  }, [userData, dataFiltrada, refreshFavoritos]);

  // Determinar qué elementos mostrar según si se ha hecho clic en "ver más"
  const elementosParaMostrar = mostrarTodos ? dataFiltrada : dataFiltrada.slice(0, 3);

  // Maneja el clic del botón "Ver más"
  const handleVerMas = () => {
    setMostrarTodos(!mostrarTodos);
  };

  return (
    <View style={styles.container}>
      {/* Imagen Principal */}
      <View style={styles.contImage}>
        <Image
          source={require('../assets/Imagen1.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
      
      {/* Contenedor de títulos y botones principales */}
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
            {/* Botón de Actividades */}
            <Pressable
              style={[
                styles.btn,
                {
                  borderRightWidth: 1,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                },
                btnSeleccionado ? styles.btnSeleccionado : null,
              ]}
              onPress={() => setBtnSeleccionado(true)}
            >
              <Text style={[styles.fuente, { fontSize: 10 }]}>Actividades</Text>
            </Pressable>

            {/* Botón de Favoritos */}
            <Pressable
              style={[
                styles.btn,
                {
                  borderLeftWidth: 1,
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                },
                !btnSeleccionado ? styles.btnSeleccionado : null,
              ]}
              onPress={() => setBtnSeleccionado(false)}
            >
              <Text style={[styles.fuente, { fontSize: 10 }]}>Favoritos</Text>
            </Pressable>

          </View>
        </View>
      </View>

      {/* Contenedor del componente de ejercicios */}
      <FlatList
        data={btnSeleccionado ? elementosParaMostrar : favoritos}
        keyExtractor={(item) => item.id}
        extraData={btnSeleccionado ? '' : favoritos}
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

      {/* Contenedor del botón "Ver más" */}
      <View style={styles.contVerMas}>
        <Pressable style={styles.btnVerMas} onPress={handleVerMas}>
          <Text style={[styles.fuente, { fontSize: 12 }]}>{mostrarTodos ? 'Ver menos' : 'Ver mas'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
// Estilos para el componente Ejercicios
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
