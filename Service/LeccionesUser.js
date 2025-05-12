import { getDatabase, ref, set } from 'firebase/database';

import React from 'react';

export const guardarLeccionCompletada = (userData, idLeccion, datosLeccion) => {
    const db = getDatabase();
    const userID = userData?.id; // Asumiendo que `user` viene del contexto

    // Ruta donde guardarás la lección
    const leccionRef = ref(db, `TBRI/Usuarios/${userID}/Lecciones/${idLeccion}`);

    // Datos que quieres guardar
    set(leccionRef, datosLeccion)
        .then(() => {
            console.log('Lección guardada correctamente');
        })
        .catch((error) => {
            console.error('Error al guardar la lección:', error);
        });
};
