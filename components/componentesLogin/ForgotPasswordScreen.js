import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Pantalla para recuperación de contraseña
export default function ForgotPasswordScreen({ navigation }) {
  // Estados locales
  const [email, setEmail] = useState(''); // Correo electrónico del usuario
  const [isLoading, setIsLoading] = useState(false); // Carga mientras se envía el email
  const [emailError, setEmailError] = useState(''); // Error de validación de email

  // Validación básica del formato del correo
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

  // Maneja el envío del correo para restablecer la contraseña
  const handleResetPassword = () => {
    if (!validateEmail(email)) return; // No continúa si el email es inválido

    setIsLoading(true); // Muestra indicador de carga
    const auth = getAuth();

    // Envía el correo usando Firebase
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Muestra alerta y redirige al login
        Alert.alert(
          'Correo enviado',
          'Te hemos enviado un enlace para restablecer tu contraseña.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      })
      .catch((error) => {
        // Muestra error si algo falla
        Alert.alert('Error', error.message);
      })
      .finally(() => {
        // Oculta el indicador de carga
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.subtitle}>
          No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para recuperarla.
        </Text>

        {/* Campo de entrada del correo */}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Correo electrónico"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) validateEmail(text); // Revalida si ya había error
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {/* Muestra mensaje de error si existe */}
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Botón para enviar el correo */}
        <TouchableOpacity
          style={[styles.button, isLoading ? styles.buttonDisabled : null]}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" /> // Indicador de carga
          ) : (
            <Text style={styles.buttonText}>Enviar enlace</Text>
          )}
        </TouchableOpacity>

        {/* Botón para volver a la pantalla de login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backToLogin}>← Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1e3a8a',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#475569',
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#2563eb',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 14,
    color: '#2563eb',
  },
});
