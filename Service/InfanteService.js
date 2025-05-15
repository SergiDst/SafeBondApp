import { getDatabase, ref, set } from 'firebase/database';

export const guardarDatosInfante = async (userData, formData) => {
  const db = getDatabase();
  const userID = userData?.id;
  const infoNiñoRef = ref(db, `TBRI/Usuarios/${userID}/InfoNiño`);

 
  try {
    await set(infoNiñoRef, formData);
    console.log('Niño guardado correctamente');
    return formData;
  } catch (error) {
    console.error('Error al guardar la lección:', error);
    // relanza el error para que tu .catch() exterior lo capture
    throw error;
  }
};

export const actualizarComportamiento = async (userData, caracteristica, data) => {
  const db = getDatabase();
  const userID = userData?.id;

  // Referencia concreta al campo Comportamiento
  const comportamientoRef = ref(db, `TBRI/Usuarios/${userID}/InfoNiño/${caracteristica}`);

  try {
    await set(comportamientoRef, data);
    console.log('Campo Comportamiento guardado correctamente');
  } catch (error) {
    console.error('Error al guardar Comportamiento:', error);
  }
};

