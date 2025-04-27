import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import Svg, { Polygon } from 'react-native-svg';
import { Dimensions } from 'react-native';

const pruebaComponente = [
  {
    id: '1',
    color: 'red',
    title: 'conexion',
    icon: '',
    text: 'esta es una prueba del componente 1',
  },
  {
    id: '2',
    color: 'blue',
    title: 'empoderamiento',
    icon: '',
    text: 'esta es una prueba del componente 2',
  },
  {
    id: '3',
    color: 'orange',
    title: 'correccion',
    icon: '',
    text: 'esta es una prueba del componente 3',
  },
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const images = [
  {
    id: '1',
    uri: require('../assets/image.jpg'),
  },
  {
    id: '2',
    uri: {
      uri: 'https://child.tcu.edu/wp-content/uploads/2018/06/Screen-Shot-2018-06-20-at-3.52.23-PM.png',
    },
  },
  {
    id: '3',
    uri: {
      uri: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/9db5/live/48fd9010-c1c1-11ee-9519-97453607d43e.jpg.webp',
    },
  },
];

const Articulos = () => {
  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });
  return (
    <View
      style={{ flex: 1}}>
      <View style={styles.head}>
        <Text style={{ fontWeight: 'bold', fontSize: 30, marginStart: 5 }}>
          {'<-'}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Articulos</Text>
      </View>
      <View style={styles.imageCont}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.contImage}>
              <Image source={item.uri} style={styles.image} />
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
                  }}>
                  Cynthia Hall and the Karyn Purvis
                </Text>
                <Text
                  style={{
                    fontFamily: 'MochiyPopOne_400Regular',
                    fontSize: 10,
                  }}>
                  secondary text
                </Text>
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
              />
            </View>
          )}
        />
        <Text
          style={{
            fontWeight: 'bold',
            position: 'relative',
            textAlign: 'right',
            marginEnd: 5,
            fontFamily: 'MochiyPopOne_400Regular',
          }}>
          ver mas... {'->'}
        </Text>
      </View>
      {/*componente de consejos*/}
      <View styles={{
          width: '100%',
          display:'flex',
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
          style={{ backgroundColor: '#A3CEF3', padding: 15, borderRadius: 10, width:'90%', minHeight: 250 ,alignItems:'center', flex:'1' }}>
          {/*componente completo*/}
          <FlatList
            data={pruebaComponente}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({item}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: -10,
                  justifyContent:'center',
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
                  <Image
                    source={require('../assets/lol.png')}
                    style={{ width: 50, height: 50 }}
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
                      points={`0,0 ${screenWidth * 0.52},0 ${screenWidth * 0.6},${screenWidth * 0.053} 0,${screenWidth * 0.3}`}
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
                    }}>
                    {item.title}
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
                    bottom:20,
                    marginStart: 55,
                    width: '70%',
                  }}>
                  <Text style={{flexWrap:'wrap'}}>
                    {item.text}
                  </Text>
                </View>
            </>
            )}
          />
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
    backgroundColor: '#FBE7A7',
    width: '100%',
    height: 90,
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
