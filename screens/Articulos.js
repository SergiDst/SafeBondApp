// Importaciones necesarias desde React y React Native
import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, MochiyPopOne_400Regular } from '@expo-google-fonts/mochiy-pop-one';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { useGetArticulos } from '../Service/Articulos';
import { useGetConsejos } from '../Service/Consejos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/ContextLogin';

// Obtiene dimensiones de la pantalla
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Asociación de íconos con categorías de consejos
const iconosPorCategoria = {
  Saludables: 'heartbeat',
  CrianzaPositiva: 'child',
  Seguridad: 'shield',
};

const Articulos = () => {
  // Datos del usuario desde el contexto de autenticación
  const { userData } = useAuthContext();

  // Mostrar datos de usuario en consola
  console.log('user', userData)

  // Carga de fuentes personalizadas
  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });

  // Hook de navegación
  const navigation = useNavigation();

  // Datos de artículos y consejos
  const dataArticulos = useGetArticulos();
  const dataConsejos = useGetConsejos();

  // Si aún no se han cargado los consejos, muestra un mensaje
  if (!dataConsejos || !dataConsejos.Saludables || !dataConsejos.CrianzaPositiva || !dataConsejos.Seguridad) {
    return <Text>Cargando consejos...</Text>;
  }

  // Obtiene claves aleatorias de consejos para cada categoría
  const salu = "Consejo" + Math.floor((Math.random() * 9) + 1);
  const crian = "Consejo" + Math.floor((Math.random() * 9) + 1);
  const segur = "Consejo" + Math.floor((Math.random() * 9) + 1);

  // Extrae los consejos correspondientes
  const consejosData = [
    dataConsejos.Saludables[salu],
    dataConsejos.CrianzaPositiva[crian],
    dataConsejos.Seguridad[segur],
  ];

  // Agrega metadatos a los consejos (ícono y color)
  const consejosEnriquecidos = consejosData.map((consejo, index) => {
    let tipo = "";
    if (index === 0) tipo = "Saludables";
    if (index === 1) tipo = "CrianzaPositiva";
    if (index === 2) tipo = "Seguridad";

    return {
      ...consejo,
      id: `consejo-${index}`, // ID generado
      icono: iconosPorCategoria[tipo],
      color: tipo === "Saludables" ? "#4CAF50" :
        tipo === "CrianzaPositiva" ? "#2196F3" :
          "#FFC107",
    };
  });

  // Debug en consola
  console.log(dataConsejos)
  console.log(dataArticulos)

  return (
    <View style={{ flex: 1 }}>
      {/* Encabezado con botón para volver */}
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate('Login')}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="chevron-left" size={30} color={'#000'} />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginStart: 5,
            color: '#000'
          }}>Volver</Text>
        </Pressable>
      </View>

      {/* Carrusel de artículos */}
      <View style={styles.imageCont}>
        <FlatList
          data={dataArticulos}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.contImage}>
              {/* Imagen del artículo */}
              <Image
                source={{ uri: item.Url?.UrlImagen }}
                style={styles.image}
              />

              {/* Título y subtítulo sobre la imagen */}
              <View style={{
                position: 'absolute',
                bottom: 0,
                marginStart: 10,
                marginBottom: 10,
              }}>
                <Text style={{
                  fontFamily: 'MochiyPopOne_400Regular',
                  fontSize: 12,
                  color: '#fff',
                }}>{item.Titulo}</Text>
                <Text style={{
                  fontFamily: 'MochiyPopOne_400Regular',
                  fontSize: 10,
                  color: '#ddd',
                }}>{item.Subtitulo}</Text>
              </View>

              {/* Gradiente para dar efecto sobre la imagen */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
              />
            </View>
          )}
        />

        {/* Botón para ver más artículos */}
        <Pressable onPress={() => {
          console.log(Object.values(dataArticulos))
          navigation.navigate('ListaArticulos', Object.values(dataArticulos))
        }}>
          <Text style={{
            fontWeight: 'bold',
            position: 'relative',
            textAlign: 'right',
            marginEnd: 5,
            fontFamily: 'MochiyPopOne_400Regular',
          }}>
            ver mas... {'->'}
          </Text>
        </Pressable>
      </View>

      {/* Título de sección de consejos */}
      <View styles={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'start'
      }}>
        <Text style={{
          fontWeight: 'bold',
          position: 'relative',
          fontSize: 25,
          marginStart: 15,
          fontFamily: 'MochiyPopOne_400Regular',
        }}>Consejos -{'>'}</Text>
      </View>

      {/* Contenedor de consejos */}
      <View style={styles.consejos}>
        <View style={{
          backgroundColor: '#A3CEF3',
          padding: 15,
          borderRadius: 10,
          width: '90%',
          minHeight: 250,
          alignItems: 'center',
          flex: '1'
        }}>
          <ScrollView style={{ flex: 1 }}>
            <FlatList
              data={consejosEnriquecidos}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <>
                  {/* Cabecera de cada consejo */}
                  <View style={{
                    flexDirection: 'row',
                    marginBottom: -10,
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                    <View style={{
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      borderBottomWidth: 2,
                      borderRadius: '100%',
                      backgroundColor: item.color,
                      zIndex: 1,
                    }}>
                      <Icon
                        name={item.icono}
                        size={30}
                        color={'#fff'}
                        style={{ margin: 'auto' }}
                      />
                    </View>

                    {/* Cinta decorativa tipo burbuja de texto */}
                    <View style={{
                      width: screenWidth * 0.6,
                      height: 20,
                      position: 'relative',
                      borderBottomWidth: 2,
                      right: 20,
                      top: 5,
                      zIndex: 0,
                    }}>
                      <Svg height="100%" width="100%">
                        <Polygon
                          points={`0,0 ${screenWidth * 0.52},0 ${screenWidth * 0.6},${screenWidth * 0.045} 0,${screenWidth * 0.3}`}
                          fill="lightgrey"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </Svg>
                      <Text style={{
                        position: 'absolute',
                        marginStart: 25,
                        fontFamily: 'MochiyPopOne_400Regular',
                        fontSize: 12
                      }}>
                        {item.Principio}
                      </Text>
                    </View>

                    {/* Botón de opciones del consejo */}
                    <View>
                      <Pressable style={{ marginTop: 5 }}>
                        <Image
                          source={require('../assets/options.png')}
                          style={{ width: 20, height: 20 }}
                        />
                      </Pressable>
                    </View>
                  </View>

                  {/* Contenido del consejo */}
                  <View style={{
                    position: 'relative',
                    bottom: 10,
                    marginStart: 65,
                    width: '70%',
                  }}>
                    <Text style={{ flexWrap: 'wrap' }}>
                      {item.Contenido}
                    </Text>
                  </View>
                </>
              )}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

// Estilos para la pantalla de artículos
const styles = StyleSheet.create({
  contImage: {
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  head: {
    justifyContent:'center',
    backgroundColor: '#FBE7A7',
    width: '100%',
    height: 50,
    borderWidth: 0.1,
    borderColor: '#000',
    paddingHorizontal: 10,
  },
  imageCont: {
    width: '100%',
    height: 'auto',
    borderColor: '#000',
    padding: 10,
  },
  image: {
    width: 320,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  consejos: {
    backgroundColor: '#fff',
    width: '100%',
    height: '50%',
    marginTop: 15,
    alignItems: 'center',
    borderColor: '#000',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    height: '25%',
    width: '100%',
  },
});

export default Articulos;
