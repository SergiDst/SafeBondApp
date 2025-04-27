import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de auth
const auth = getAuth(app);

export { auth };
export default app;