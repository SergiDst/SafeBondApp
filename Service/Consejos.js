import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import React, { useEffect, useState } from 'react';

// En tu hook
export const useGetConsejos = () => {
    const [data, setData] = useState(null);
  console.log('entra consejos', data)
    useEffect(() => {
        console.log('entra useEffect')
      const dataRef = ref(database, 'TBRI/Articulos/Consejos');
      const unsubscribe = onValue(dataRef, (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setData(val); // ← Guardamos el objeto directamente
        } else {
          setData(null);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return data;
  };
  