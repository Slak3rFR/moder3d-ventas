import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBq7eophXblGeCE4O9PVjZBDxE9FvZEQQg",
    authDomain: "moder3d-ventas.firebaseapp.com",
    projectId: "moder3d-ventas",
    storageBucket: "moder3d-ventas.firebasestorage.app",
    messagingSenderId: "88928679496",
    appId: "1:88928679496:web:f6ccacd0a497a126db4a7d",
    measurementId: "G-62XYSG7F6T"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos auth y db
export const auth = getAuth(app);
export const db = getFirestore(app);