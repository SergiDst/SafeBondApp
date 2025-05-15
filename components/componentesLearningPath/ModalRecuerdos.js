import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { Portal, Modal, Button, Title } from 'react-native-paper';
import { launchCamera } from 'react-native-image-picker';

const CLOUD_NAME = 'dnarrwt9b';
const UPLOAD_PRESET = 'recuerdosApp';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Función para solicitar permisos de cámara y almacenamiento en Android
async function requestCameraPermission() {
    if (Platform.OS !== 'android') return true;

    const storagePermission =
        Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const [hasCamera, hasStorage] = await Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA),
        PermissionsAndroid.check(storagePermission),
    ]);

    if (hasCamera && hasStorage) {
        return true;
    }

    const toRequest = [];
    if (!hasCamera) toRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (!hasStorage) toRequest.push(storagePermission);

    const statuses = await PermissionsAndroid.requestMultiple(toRequest);

    return toRequest.every(
        perm => statuses[perm] === PermissionsAndroid.RESULTS.GRANTED
    );
}

const ModalRecuerdos = ({ visible, onDismiss, initialTitle = 'Título por defecto', onUploadSuccess, activar, fotoRecuerdo }) => {
    const [photoUri, setPhotoUri] = useState(null);
    const [title, setTitle] = useState(initialTitle);

    useEffect(() => {
        if (fotoRecuerdo !== undefined || fotoRecuerdo !== null || fotoRecuerdo !== '') {
            setPhotoUri(fotoRecuerdo)
        }
    }, []);

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
        try {
            const blob = await (await fetch(photoUri)).blob();
            const data = new FormData();
            data.append('file', blob, 'photo.jpg');
            data.append('upload_preset', UPLOAD_PRESET);
            const res = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            console.log(result);
            onUploadSuccess(result.secure_url);
            activar(false)
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
                    {fotoRecuerdo == undefined || fotoRecuerdo == '' ?
                        <>
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
                        </>
                        :
                        <Button
                            mode="contained"
                            onPress={onDismiss}
                            style={[styles.button, { backgroundColor: '#f44336' }]} // Rojo
                        >
                            {'Cerrar'}
                        </Button>
                    }
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
