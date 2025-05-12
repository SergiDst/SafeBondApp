import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEEqgUYUlEsjUiNs-JW4J2dKAHkNeSJ-w",
    authDomain: "tbri-c2b17.firebaseapp.com",
    databaseURL: "https://tbri-c2b17-default-rtdb.firebaseio.com",
    projectId: "tbri-c2b17",
    storageBucket: "tbri-c2b17.firebasestorage.app",
    messagingSenderId: "602137279599",
    appId: "1:602137279599:web:c5b5567d300c392646a19a",
    measurementId: "G-FY0N4D3VK2"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene y exporta la instancia de auth
const auth = getAuth(app);


const database = getDatabase(app);

export { database };

export { auth };
export default app;