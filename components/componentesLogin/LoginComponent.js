import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React from 'react'
import { useAuthContext } from '../../context/ContextLogin'
import { useNavigation } from '@react-navigation/native'

export const LoginComponent = () => {

  const navigation = useNavigation()

  const { toggleAuthMode } = useAuthContext()

  const [data, setData] = useState({
    userName: '',
    password: ''
  })

  const logear = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.userName, data.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('entro')
        navigation.replace('TabNavigator')
      })
      .catch((error) => {
        // Traducción de errores comunes de Firebase para una mejor UX
        let errorMessage;
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No existe ninguna cuenta con este correo electrónico';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Demasiados intentos fallidos. Inténtalo más tarde';
            break;
          default:
            errorMessage = error.message;
        }
        Alert.alert('Error', errorMessage);
      });
  }
  return (
    <>
      <Text style={styles.titleInput}>Username</Text>
      <TextInput placeholder="example@tbri.com" style={styles.input}
        value={data.userName} onChangeText={(text) => {
          setData(prev => ({
            ...prev,
            userName: text
          }));
        }} />
      <Text style={styles.titleInput}>Password</Text>
      <TextInput placeholder="********" style={styles.input}
        value={data.password} secureTextEntry onChangeText={(text) => {
          setData(prev => ({
            ...prev,
            password: text
          }))
        }} />
      <Pressable style={styles.messagePassword}><Text style={styles.textbtnForgot}>¿Olvidaste tu contraseña?</Text></Pressable>
      <View style={styles.containerBtn}>
        <Pressable style={[styles.btn, styles.btnLogin]} onPress={() => logear()}><Text style={styles.textbtn}>Login</Text></Pressable>
        <Pressable style={[styles.btn, styles.btnRegister]} onPress={() => toggleAuthMode()}><Text style={styles.textbtn}>Register</Text></Pressable>
      </View>
    </>
  )
}

export const styles = StyleSheet.create({
  messagePassword: {
    alignItems: 'flex-end',
    zIndex: 1,
  },
  input: {
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF'
  },
  inputRegister: {
    borderColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    width: '100%',
    zIndex: 1,
  },
  textbtnForgot: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: 'Mochiy Pop One',
  },
  titleInput: {
    marginTop: '5%',
    fontWeight: 'bold',
    marginLeft: '5%',
    fontFamily: 'Mochiy Pop One'
  },
  titleInputRegister: {
    fontWeight: 'bold',
    marginLeft: '5%',
    fontFamily: 'Mochiy Pop One',
    zIndex: 1,
  },
  containerBtn: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerBtnHorizontal: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  btn: {
    marginHorizontal: 'auto',
    marginTop: 10,
    paddingVertical: 10,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  btnHorizontalLogin: {
    position: 'absolute',
    top: 0,
    left: 0, // O right: 20 para el segundo botón
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    elevation: 3, // para sombra en Android
    zIndex: 1,
    opacity: 0.8,
  },
  btnHorizontalRegister: {
    position: 'absolute',
    top: 0,
    right: 0, // O left: 20 para el primer botón
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#DCFFDD',
    borderRadius: 5,
    elevation: 3, // para sombra en Android
    zIndex: 1,
  },
  btnLogin: {
    backgroundColor: '#D9D9D9',
    zIndex: 1,
  },
  btnRegister: {
    backgroundColor: '#DCFFDD',
    opacity: 0.8,
    zIndex: 1,
  },
  textbtn: {
    fontWeight: 'bold',
    fontFamily: 'Mochiy Pop One'
  }
});