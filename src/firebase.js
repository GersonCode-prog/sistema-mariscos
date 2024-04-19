// Importa las funciones necesarias del SDK de Firebase para la conexion
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAGBggMa6M8kLeWAR7BbZ-pakvGNYzakro",
    authDomain: "sistema-de-venta-de-mariscos.firebaseapp.com",
    projectId: "sistema-de-venta-de-mariscos",
    storageBucket: "sistema-de-venta-de-mariscos.appspot.com",
    messagingSenderId: "544148414227",
    appId: "1:544148414227:web:2788e11e84559e0d5b44e6",
    measurementId: "G-T4ZZ93WY1M"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }; 
