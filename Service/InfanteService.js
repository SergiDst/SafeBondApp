import { getDatabase, ref, set } from 'firebase/database';

export const guardarDatosInfante = (userData, formData) => {
  const db = getDatabase();
  const userID = userData?.id;
  const infoNiñoRef = ref(db, `TBRI/Usuarios/${userID}/InfoNiño`);

  // **IMPORTANTE**: devuelve la promesa
  return set(infoNiñoRef, formData)
    .then(() => {
      console.log('Niño guardado correctamente');
      // opcionalmente puedes devolver algo, ej. formData
      return formData;
    })
    .catch(error => {
      console.error('Error al guardar la lección:', error);
      // relanza el error para que tu .catch() exterior lo capture
      throw error;
    });
};

export const actualizarComportamiento = (userData, caracteristica, data) => {
  const db = getDatabase();
  const userID = userData?.id;

  // Referencia concreta al campo Comportamiento
  const comportamientoRef = ref(db, `TBRI/Usuarios/${userID}/InfoNiño/${caracteristica}`);

  set(comportamientoRef, data)
    .then(() => {
      console.log('Campo Comportamiento guardado correctamente');
    })
    .catch((error) => {
      console.error('Error al guardar Comportamiento:', error);
    });
};

