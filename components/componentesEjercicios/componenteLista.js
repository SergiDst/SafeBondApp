import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import React, { useState, useEffect } from 'react';
import {guardarActividadFavorita,eliminarActividadFavorita, verificarActividadFavorita} from '../../Service/Actividades'
import { useAuthContext } from '../../context/ContextLogin';

export const ComponenteLista = ({ item, onFavoritoCambiado }) => {
  const { userData } = useAuthContext();
  const Articulos = Array.isArray(item);
  const [liked, setLiked] = useState(false);
  const [fontsLoaded] = useFonts({ MochiyPopOne_400Regular });

  useEffect(() => {
    const checkFavorito = async () => {
      const existe = await verificarActividadFavorita(userData.id, item[0].ID);
      setLiked(existe);
    };

    if (Articulos) checkFavorito();
  }, [userData.id, item]);

  if (!fontsLoaded) return null;

  const toggleFavorite = async () => {
    if (liked) {
      await eliminarActividadFavorita(userData.id, item[0].ID);
    } else {
      await guardarActividadFavorita(userData.id, item[0].ID);
    }
    setLiked(!liked);

    if(onFavoritoCambiado){
      onFavoritoCambiado();
    }
  };

  return (
    <View style={styles.contComponent}>
      <View style={styles.componentImage}>
        <Image
          source={Articulos ? require("../../assets/Imagen1.png") : { uri: item.Url.UrlImagen }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            borderWidth: 1,
          }}
        />
      </View>
      <View style={styles.componentText}>
        <Text style={[styles.fuente, { fontSize: 12, marginBottom: 10 }]} numberOfLines={2}>
          {Articulos ? item[0].TituloModal : item.Titulo}
        </Text>
        <Text style={[styles.fuente, { fontSize: 9, color: "#49454f" }]} numberOfLines={1}>
          Categoria • {Articulos ? item[1] : item.TagsArticulo}
        </Text>
        <Text style={[styles.fuente, { fontSize: 9, color: "#49454f" }]} numberOfLines={2}>
          {Articulos ? item[0].Contenido : item.Texto}
        </Text>
      </View>
      <View>
        {Articulos && (
          <Pressable onPress={toggleFavorite}>
            <Icon name="heart" size={20} color={liked ? "red" : "gray"} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  fuente: {
    fontFamily: 'MochiyPopOne_400Regular',
  },
})