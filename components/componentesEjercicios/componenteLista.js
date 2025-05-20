import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import React, { useState, useEffect } from 'react';
import {guardarActividadFavorita,eliminarActividadFavorita, verificarActividadFavorita} from '../../Service/Actividades'
import { useAuthContext } from '../../context/ContextLogin';

// Componente funcional que recibe una actividad y una función callback cuando se cambia el favorito
export const ComponenteLista = ({ item, onFavoritoCambiado }) => {
  // Obtiene los datos del usuario desde el contexto de autenticación
  const { userData } = useAuthContext();

  // Verifica si el item es un array (caso para actividades con lectura/actividad)
  const Articulos = Array.isArray(item);

  // Estado local para saber si la actividad está marcada como favorita
  const [liked, setLiked] = useState(false);

  // Carga la fuente personalizada
  const [fontsLoaded] = useFonts({ MochiyPopOne_400Regular });

  // useEffect que verifica si esta actividad ya es favorita cuando el componente se monta o cambia el item
  useEffect(() => {
    const checkFavorito = async () => {
      const existe = await verificarActividadFavorita(userData.id, item[0].ID); // Verifica en la base si es favorita
      setLiked(existe); // Actualiza el estado local
    };

    // Solo verifica favoritos si el item es un array (caso de actividades)
    if (Articulos) checkFavorito();
  }, [userData.id, item]);

  // Si las fuentes aún no se cargan, no renderiza nada
  if (!fontsLoaded) return null;

  // Función que alterna entre marcar/desmarcar como favorito
  const toggleFavorite = async () => {
    if (liked) {
      // Si ya era favorito, lo elimina
      await eliminarActividadFavorita(userData.id, item[0].ID);
    } else {
      // Si no era favorito, lo guarda
      await guardarActividadFavorita(userData.id, item[0].ID);
    }

    // Actualiza el estado local
    setLiked(!liked);

    // Llama la función externa si está definida, para avisar que el estado del favorito cambió
    if (onFavoritoCambiado) {
      onFavoritoCambiado();
    }
  };

  // Render del componente
  return (
    <View style={styles.contComponent}>
      {/* Imagen de la actividad o artículo */}
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

      {/* Contenido textual: título, categoría, descripción */}
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

      {/* Botón de favorito (solo si es una actividad) */}
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