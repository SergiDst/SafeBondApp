import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Portal, Modal, Button, Title } from 'react-native-paper';
import { launchCamera } from 'react-native-image-picker';

const CLOUD_NAME = 'YOUR_CLOUD_NAME';
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Función para solicitar permisos de cámara y almacenamiento en Android
async function requestCameraPermission() {
    if (Platform.OS !== 'android') return true;

    // Verificar permisos existentes
    const hasCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    const hasWrite = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (hasCamera && hasWrite) return true;

    // Solicitar permisos faltantes
    const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    return (
        statuses[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
    );
  }

const ModalRecuerdos = ({visible, onDismiss, initialTitle = 'Título por defecto', onUploadSuccess}) => {
    const [photoUri, setPhotoUri] = useState(null);
    const [title, setTitle] = useState(initialTitle);
    
    // Función para abrir cámara y tomar foto
    const handleTakePhoto = async () => {
        const ok = await requestCameraPermission();
        if (!ok) {
            Alert.alert(
                'Permiso de Cámara',
                'Necesitamos permiso para usar la cámara. Por favor habilítalo en Configuración.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Abrir Configuración', onPress: () => Linking.openSettings() },
                ]
            );
            console.error('Permisos de cámara denegados');
            return;
          }
        launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
            if (response.didCancel) {
                console.error('Fallo la apertura de la camara');
                return;
            } 
            if (response.errorCode) {
                console.error('Error al tomar la foto:', response.errorMessage);
                return;
            }
            const uri = response.assets[0].uri;
            setPhotoUri(uri);
            setTitle('¿Deseas conservar la foto?');
        });
    };

    // Función para subir imagen a Cloudinary
    const handleUpload = async () => {
        if (!photoUri) return;
        const data = new FormData();
        data.append('file', {
            uri: photoUri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });
        data.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            onUploadSuccess(result.secure_url);
            onDismiss();
        } catch (err) {
            console.error('Error al subir a Cloudinary:', err);
        }
    };

    // Función de retroceso a estado inicial
    const handleReset = () => {
        setPhotoUri(null);
        setTitle(initialTitle);
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modal}>
                <Title style={styles.title}>{title}</Title>
                <View style={styles.imageContainer}>
                    {photoUri ? (
                        <Image source={{ uri: photoUri }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder} />
                    )}
                </View>
                <View style={styles.buttons}>
                    <Button
                        mode="contained"
                        onPress={photoUri ? handleReset : onDismiss}
                        style={[styles.button, { backgroundColor: '#f44336' }]} // Rojo
                    >
                        {photoUri ? 'Retroceder' : 'Cerrar'}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={photoUri ? handleUpload : handleTakePhoto}
                        style={[styles.button, { backgroundColor: '#4caf50' }]} // Verde
                    >
                        {photoUri ? 'Subir foto' : 'Tomar foto'}
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        marginBottom: 20,
    },
    placeholder: {
        width: 180,
        height: 180,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 4,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default ModalRecuerdos;
