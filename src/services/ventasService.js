import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import { db } from '../firebase/config';

// Colección
const ventasRef = collection(db, 'ventas');


// OBTENER
export const obtenerVentas = async () => {

  const data = await getDocs(ventasRef);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));

};


// GUARDAR
export const guardarVenta = async (venta) => {

  await addDoc(ventasRef, venta);

};


// ELIMINAR
export const eliminarVenta = async (id) => {

  const ventaDoc = doc(db, 'ventas', id);

  await deleteDoc(ventaDoc);

};


// ACTUALIZAR
export const actualizarVenta = async (id, nuevosDatos) => {

  const ventaDoc = doc(db, 'ventas', id);

  await updateDoc(ventaDoc, nuevosDatos);

};