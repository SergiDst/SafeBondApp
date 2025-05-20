import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable,ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, MochiyPopOne_400Regular } from '@expo-google-fonts/mochiy-pop-one';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { useGetArticulos } from '../Service/Articulos';
import { useGetConsejos } from '../Service/Consejos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../context/ContextLogin';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const iconosPorCategoria = {
  Saludables: 'heartbeat',          // FontAwesome
  CrianzaPositiva: 'child',         // FontAwesome
  Seguridad: 'shield',              // FontAwesome
};


const Articulos = () => {

  const { userData } = useAuthContext();

  console.log('user', userData)

  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });
  const navigation = useNavigation();

  const dataArticulos = useGetArticulos();
  const dataConsejos = useGetConsejos();

  if (!dataConsejos || !dataConsejos.Saludables || !dataConsejos.CrianzaPositiva || !dataConsejos.Seguridad) {
    return <Text>Cargando consejos...</Text>;
  }

  const salu = "Consejo" + Math.floor((Math.random() * 9) + 1);
  const crian = "Consejo" + Math.floor((Math.random() * 9) + 1);
  const segur = "Consejo" + Math.floor((Math.random() * 9) + 1);

  const consejosData = [
    dataConsejos.Saludables[salu],
    dataConsejos.CrianzaPositiva[crian],
    dataConsejos.Seguridad[segur],
  ];

  const consejosEnriquecidos = consejosData.map((consejo, index) => {
    let tipo = "";
    if (index === 0) tipo = "Saludables";
    if (index === 1) tipo = "CrianzaPositiva";
    if (index === 2) tipo = "Seguridad";

    return {
      ...consejo,
      id: `consejo-${index}`, // o usar alguna librería de UUID
      icono: iconosPorCategoria[tipo],
      color: tipo === "Saludables" ? "#4CAF50" :
        tipo === "CrianzaPositiva" ? "#2196F3" :
          "#FFC107",
    };
  });

  console.log(dataConsejos)

  console.log(dataArticulos)

  return (
    <View
      style={{ flex: 1 }}>
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate('Login')}
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="chevron-left"
            size={30}
            color={'#000'}
          />
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginStart: 5,
            color: '#000'
          }}>Volver</Text>
        </Pressable>
      </View>
      <View style={styles.imageCont}>
        <FlatList
          data={dataArticulos} // Asegúrate de que esto sea el array que viene de tu hook (data)
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.contImage}>
              {/* Imagen */}
              <Image
                source={{ uri: item.Url?.UrlImagen }}
                style={styles.image}
              />

              {/* Texto sobre la imagen */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginStart: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'MochiyPopOne_400Regular',
                    fontSize: 12,
                    color: '#fff',
                  }}>
                  {item.Titulo}
                </Text>
                <Text
                  style={{
                    fontFamily: 'MochiyPopOne_400Regular',
                    fontSize: 10,
                    color: '#ddd',
                  }}>
                  {item.Subtitulo}
                </Text>
              </View>

              {/* Gradiente */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
              />
            </View>
          )}
        />
        <Pressable onPress={() => {
          console.log(Object.values(dataArticulos))
          navigation.navigate('ListaArticulos', Object.values(dataArticulos))
        }}>
          <Text
            style={{
              fontWeight: 'bold',
              position: 'relative',
              textAlign: 'right',
              marginEnd: 5,
              fontFamily: 'MochiyPopOne_400Regular',
            }}>
            ver mas... {'->'}
          </Text></Pressable>
      </View>
      {/*componente de consejos*/}
      <View styles={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'start'

      }
      }>
        <Text style={{
          fontWeight: 'bold',
          position: 'relative',
          fontSize: 25,
          marginStart: 15,
          fontFamily: 'MochiyPopOne_400Regular',
        }}>Consejos -{'>'}</Text>
      </View>
      <View style={styles.consejos}>
        {/*contenedor de los componentes*/}
      
        <View
          style={{ backgroundColor: '#A3CEF3', padding: 15, borderRadius: 10, width: '90%', minHeight: 250, alignItems: 'center', flex: '1' }}>
          {/*componente completo*/}
          <ScrollView style={{ flex: 1 }}>
          <FlatList
            data={consejosEnriquecidos}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: -10,
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
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
                  <View
                    style={{
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
                        // puntos: izq arriba, der arriba, der abajo, izq abajo
                        points={`0,0 ${screenWidth * 0.52},0 ${screenWidth * 0.6},${screenWidth * 0.045} 0,${screenWidth * 0.3}`}
                        fill="lightgrey"
                        stroke="black" // Color del borde
                        strokeWidth="2"
                      />
                    </Svg>
                    <Text
                      style={{
                        position: 'absolute',
                        marginStart: 25,
                        fontFamily: 'MochiyPopOne_400Regular',
                        fontSize: 12
                      }}>
                      {item.Principio}
                    </Text>
                  </View>
                  <View>
                    <Pressable style={{ marginTop: 5 }}>
                      <Image
                        source={require('../assets/options.png')}
                        style={{ width: 20, height: 20 }}
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
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
