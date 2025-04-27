import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../context/ContextLogin';
import React, { useState } from 'react';
import { Text, TextInput, Pressable, View, Alert } from 'react-native';
import { styles } from './LoginComponent';

export const RegisterComponent = () => {

    const { toggleAuthMode } = useAuthContext()

    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    //Validaciones Registro

    // Estados para errores de validación
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Validación del nombre
    const validateName = (name) => {
        if (!name.trim()) {
            setNameError('El nombre es obligatorio');
            return false;
        }
        setNameError('');
        return true;
    };

    // Validación de email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('El correo electrónico es obligatorio');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Introduce un correo electrónico válido');
            return false;
        }
        setEmailError('');
        return true;
    };

    // Validación de contraseña
    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('La contraseña es obligatoria');
            return false;
        } else if (password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        setPasswordError('');
        return true;
    };

    // Validación de confirmación de contraseña
    const validateConfirmPassword = (confirmPassword) => {
        if (!confirmPassword) {
            setConfirmPasswordError('Por favor confirma tu contraseña');
            return false;
        } else if (confirmPassword !== dataRegister.password) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const registrar = () => {
        console.log('registrar', dataRegister)

        const isNameValid = validateName(dataRegister.name);
        const isEmailValid = validateEmail(dataRegister.email);
        const isPasswordValid = validatePassword(dataRegister.password);
        const isConfirmPasswordValid = validateConfirmPassword(dataRegister.confirmPassword);

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, dataRegister.email, dataRegister.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                // Actualizar el perfil del usuario con el nombre
                return updateProfile(user, {
                    displayName: dataRegister.name
                }).then(() => {
                    console.log(
                        'Registro Exitoso',
                        '¡Tu cuenta ha sido creada correctamente!',                       
                    )
                    Alert.alert(
                        'Registro Exitoso',
                        '¡Tu cuenta ha sido creada correctamente!',
                        [{ text: 'OK', onPress: () => navigation.replace('Home') }]
                    );
                });
            })
            .catch((error) => {
                // Traducción de errores comunes de Firebase para una mejor UX
                let errorMessage;
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este correo electrónico ya está en uso';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'El formato del correo electrónico no es válido';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'La contraseña es demasiado débil';
                        break;
                    default:
                        errorMessage = error.message;
                }
                Alert.alert('Error', errorMessage);
            })
    }

    return (
        <>
            <Text style={styles.titleInputRegister}>Nombre</Text>
            <TextInput placeholder="Nombre" onChangeText={(text) => {
                setDataRegister(prev => ({
                    ...prev,
                    name: text
                }))
                if (nameError) {
                    validateName(text);
                };
            }} style={styles.inputRegister} />
            <Text style={styles.titleInputRegister}>Correo</Text>
            <TextInput placeholder="Correo electrónico" onChangeText={(text) => {
                setDataRegister(prev => ({
                    ...prev,
                    email: text
                }));
                if (emailError) {
                    validateEmail(text);
                }
            }} style={styles.inputRegister} />
            <Text style={styles.titleInputRegister}>Contraseña</Text>
            <TextInput placeholder="Contraseña" onChangeText={(text) => {
                setDataRegister(prev => ({
                    ...prev,
                    password: text
                }));
                if (passwordError) validatePassword(text);
                if (dataRegister.confirmPassword && confirmPasswordError) {
                    validateConfirmPassword(dataRegister.confirmPassword);
                }
            }} style={styles.inputRegister} secureTextEntry />
            <Text style={styles.titleInputRegister}>Confirmar contraseña</Text>
            <TextInput placeholder="Confirmar contraseña" onChangeText={(text) => {
                setDataRegister(prev => ({
                    ...prev,
                    confirmPassword: text
                }));
                if (confirmPasswordError) {
                    validateConfirmPassword(text);
                }
            }} style={styles.inputRegister} secureTextEntry />
            <View style={styles.containerBtnHorizontal}>
                <Pressable style={styles.btnHorizontalLogin} onPress={() => toggleAuthMode()}><Text style={styles.textbtn}>Login</Text></Pressable>
                <Pressable style={styles.btnHorizontalRegister} onPress={() => registrar()}><Text style={styles.textbtn}>Register</Text></Pressable>
            </View>
        </>
    )
}