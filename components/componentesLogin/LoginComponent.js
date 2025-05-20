import { Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useAuthContext } from '../../context/ContextLogin'
import { useNavigation } from '@react-navigation/native'
import { GetUserById } from '../../Service/Usario'

export const LoginComponent = () => {
  // Estados para los inputs del formulario
  const [data, setData] = useState({
    userName: '',
    password: ''
  });

  // Controla si el botón está habilitado
  const [btnEnable, setBtnEnable] = useState(false);

  // Controla si se está cargando la información
  const [isChargging, setIsCharging] = useState(false);

  // Navegación entre pantallas
  const navigation = useNavigation();

  // Funciones del contexto de autenticación
  const { toggleAuthMode, setUserData } = useAuthContext();

  // Valida el formato del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !!(email && emailRegex.test(email));
  };

  // Activa o desactiva el botón según la validez de los campos
  useEffect(() => {
    if (data.userName && data.password) {
      setBtnEnable(validateEmail(data.userName) && data.password.length > 5);
    } else {
      setBtnEnable(false);
    }
  }, [data]);

  // Función para iniciar sesión
  const logear = async () => {
    setIsCharging(true);
    const auth = getAuth();

    try {
      // Inicia sesión con Firebase
      const userCredentials = await signInWithEmailAndPassword(auth, data.userName, data.password);
      const user = userCredentials.user;
      console.log('Usuario autenticado:', user.uid);

      // Consulta los datos del usuario por UID
      const userData = await GetUserById(user.uid);

      if (userData) {
        setUserData(userData);
        console.log('Datos del usuario obtenidos:', userData);
      } else {
        console.log('No se encontraron datos para este usuario');
      }

      // Navega al dashboard principal
      navigation.replace('TabNavigator');
    } catch (error) {
      // Manejo de errores según el código
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
    }

    setIsCharging(false);
  }

  return (
    <>
      {isChargging ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          {/* Campo de usuario */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="example@tbri.com"
              placeholderTextColor="#999"
              style={styles.input}
              value={data.userName}
              onChangeText={(text) =>
                setData((prev) => ({
                  ...prev,
                  userName: text,
                }))
              }
            />
          </View>

          {/* Campo de contraseña */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#999"
              secureTextEntry
              minLength={6}
              style={styles.input}
              value={data.password}
              onChangeText={(text) =>
                setData((prev) => ({
                  ...prev,
                  password: text,
                }))
              }
            />
          </View>

          {/* Link para recuperar contraseña */}
          <Pressable
            style={styles.messagePassword}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          >
            <Text style={styles.textbtnForgot}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          {/* Botones de acción */}
          <View style={styles.containerBtn}>
            {/* Botón de Login */}
            <Pressable
              style={[styles.btn, btnEnable ? styles.btnLogin : styles.btnLoginDisable]}
              onPress={() => {
                if (btnEnable) {
                  logear();
                } else {
                  Alert.alert('Algún campo está vacío');
                }
              }}
            >
              <Text style={styles.textbtn}>Login</Text>
            </Pressable>

            {/* Botón para cambiar al modo de registro */}
            <Pressable
              style={[styles.btn, styles.btnRegister]}
              onPress={() => toggleAuthMode()}
            >
              <Text style={styles.textbtn}>Register</Text>
            </Pressable>
          </View>
        </>
      )}
    </>
  )
}
// Estilos para el componente de Login
export const styles = StyleSheet.create({
  messagePassword: {
    alignItems: 'flex-end',
    zIndex: 1,
  },
  input: {
    backgroundColor: '#F4F4F4',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: '2%',
    fontSize: 15,
    color: '#000',
    fontFamily: 'Mochiy Pop One',
  },
  label: {
    marginBottom: 8,
    marginLeft: '2%',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Mochiy Pop One',
    color: '#333',
  },

  inputRegister: {
    backgroundColor: '#F4F4F4',
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: '2%',
    fontSize: 15,
    color: '#000',
    fontFamily: 'Mochiy Pop One',
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
    zIndex:1,
  },
  containerBtnHorizontal: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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
  btnLoginDisable: {
    backgroundColor: '#a2a2a2',
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
  },
  disable: {
    position: 'absolute',
    top: 0,
    right: 0, // O left: 20 para el primer botón
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: '#9bb89c',
    borderRadius: 5,
    elevation: 3, // para sombra en Android
    zIndex: 1,
  }
});