import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import Icon from 'react-native-vector-icons/FontAwesome';

const Ejercicios = () => {
  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });

  const [btnSeleccionado, setBtnSeleccionado] = useState(true);
  const [liked, setLiked] = useState(false);

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
                  borderStartEndRadius: 20,
                },
                btnSeleccionado ? styles.btnSeleccionado : '',
              ]}
              onPress={() => setBtnSeleccionado(true)}>
              <Text style={[styles.fuente, { fontSize: 10 }]}>
                boton izquierdo
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.btn,
                {
                  borderLeftWidth: 1,
                  borderEndStartRadius: 20,
                  borderEndEndRadius: 20,
                },
                !btnSeleccionado ? styles.btnSeleccionado : '',
              ]}
              onPress={() => setBtnSeleccionado(false)}>
              <Text style={[styles.fuente, { fontSize: 10 }]}>
                boton derecho
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
{/* contenedor de componente de ejercicio */}
      <View style={styles.contComponent}>
        <View style={styles.componentImage}>
          <Image
            source={require('../assets/Imagen1.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              borderWidth: 1,
            }}
          />
        </View>
        <View style={styles.componentText}>
          <Text style={[styles.fuente, { fontSize: 12, marginBottom: 10 }]}>
            Imitación y Espejo
          </Text>
          <Text style={[styles.fuente, { fontSize: 9, color: '#49454f' }]}>
            Categoria • Conexion
          </Text>
          <Text style={[styles.fuente, { fontSize: 9, color: '#49454f' }]}>
            En esta actividad es necesario...
          </Text>
        </View>
        <View>
          <Pressable onPress={() => setLiked(!liked)}>
            <Icon name="heart" size={20} color={liked ? 'red' : 'gray'} />
          </Pressable>
        </View>
      </View>

      {/* contenedor de boton ver mas*/}
      <View style={styles.contVerMas}>
        <Pressable style={styles.btnVerMas}>
          <Text style={[styles.fuente, { fontSize: 12}]}>Ver Mas</Text>
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

  //estilos del componente de ejercicios
  contComponent: {
    width: '90%',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#cac4d0',
  },
  componentImage: {
    width: 100,
    height: 65,
  },
  componentText: {
    marginLeft: 10,
    width: '55%',
  },

  //estilos del contenedor del boton ver mas
  contVerMas:{
    width: '100%',
    height: 100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fef7ff'
  },
  btnVerMas:{
    width: '80%',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:20,
    height:40
  }
});

export default Ejercicios;
