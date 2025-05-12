import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de auth
const auth = getAuth(app);

const database = getDatabase(app);

export { database };

export { auth };
export default app;