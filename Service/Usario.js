import { database } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

export const GetUserById = async (id) => {
  if (!id) {
    console.log('ID no válido');
    return null;
  }

  try {
    console.log("Buscando en Firebase:", id); // Log para verificar el ID
    const userRef = ref(database, `TBRI/Usuarios/${id}`); // Asegúrate de que esta es la ruta correcta
    const snapshot = await get(userRef); // Utiliza get para obtener los datos una sola vez
    const val = snapshot.val();

    if (val) {
      console.log('Datos encontrados en Firebase:', val); // Verifica los datos completos
      return { id, ...val };  // Devuelve todos los datos del usuario
    } else {
      console.log('No se encontraron datos para este ID');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos de Firebase:', error);
    return null;
  }
};
