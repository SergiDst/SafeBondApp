import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
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