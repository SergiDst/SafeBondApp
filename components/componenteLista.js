import { Pressable, Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  useFonts,
  MochiyPopOne_400Regular,
} from '@expo-google-fonts/mochiy-pop-one';
import React, { useState } from 'react';

export const ComponenteLista = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [fontsLoaded] = useFonts({
    MochiyPopOne_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
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
        <Text style={[styles.fuente, { fontSize: 12, marginBottom: 10 }]} numberOfLines={2}>
          {item.Titulo}
        </Text>
        <Text style={[styles.fuente, { fontSize: 9, color: '#49454f' }]} numberOfLines={1}>
          Categoria • {item.TagsArticulo}
        </Text>
        <Text style={[styles.fuente, { fontSize: 9, color: '#49454f' }]} numberOfLines={2}>
          {item.Texto}
        </Text>
      </View>
      <View>
        <Pressable onPress={() => setLiked(!liked)}>
          <Icon name="heart" size={20} color={liked ? 'red' : 'gray'} />
        </Pressable>
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