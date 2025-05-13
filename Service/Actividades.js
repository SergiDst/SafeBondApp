import { database } from '../firebaseConfig';
import { ref, onValue, set, remove, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';

export const useGetActividades = () => {
    const [data, setData] = useState([]);
    console.log('entra', data)

    useEffect(() => {
        const dataRef = ref(database, 'TBRI/Actividades'); // ajusta la ruta
        console.log('dataRef', dataRef)
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const val = snapshot.val();
            if (val) {
                // Convertimos el objeto en array si es necesario
                const arrayData = Object.entries(val).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                console.log('arrayData', arrayData)
                setData(arrayData);
            } else {
                setData([]);
            }
        });

        // Limpieza
        return () => unsubscribe();
    }, []);

    return data;
};


export const guardarActividadFavorita = async (userId, actividadId) => {
  const actividadRef = ref(database, `TBRI/Usuarios/${userId}/ActividadesFavoritas/${actividadId}`);
  await set(actividadRef, true);
};


export const eliminarActividadFavorita = async (userId, actividadId) => {
  const actividadRef = ref(database, `TBRI/Usuarios/${userId}/ActividadesFavoritas/${actividadId}`);
  await remove(actividadRef);
};

export const verificarActividadFavorita = async (userId, actividadId) => {
  const actividadRef = ref(database, `TBRI/Usuarios/${userId}/ActividadesFavoritas/${actividadId}`);
  const snapshot = await get(actividadRef);
  return snapshot.exists();
};

export const obtenerFavoritos = async (userId) => {
  const favsRef = ref(database, `TBRI/Usuarios/${userId}/ActividadesFavoritas`);
  const snapshot = await get(favsRef);
  if (snapshot.exists()) {
    return Object.keys(snapshot.val()); // Devuelve un array con los IDs de las actividades
  } else {
    return [];
  }
};