import { getDatabase, ref, set } from 'firebase/database';

export const guardarLeccionCompletada = (userData, formData, datosLeccion) => {
    const db = getDatabase();
    const userID = userData?.id; // Asumiendo que `user` viene del contexto

    // Ruta donde guardarás la lección
    const leccionRef = ref(db, `TBRI/Usuarios/${userID}/InfoNiño/${idLeccion}`);

    // Datos que quieres guardar
    set(leccionRef, datosLeccion)
        .then(() => {
            console.log('Lección guardada correctamente');
        })
        .catch((error) => {
            console.error('Error al guardar la lección:', error);
        });
};
