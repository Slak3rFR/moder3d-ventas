import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from '../firebase/config';

const pedidosRef = collection(db, 'pedidos');


// =========================
// GUARDAR
// =========================

export const guardarPedido = async (pedido) => {

  await addDoc(pedidosRef, pedido);

};


// =========================
// OBTENER
// =========================

export const obtenerPedidos = async () => {

  const snapshot = await getDocs(pedidosRef);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data()

  }));

};


// =========================
// ELIMINAR
// =========================

export const eliminarPedido = async (id) => {

  const pedidoDoc = doc(db, 'pedidos', id);

  await deleteDoc(pedidoDoc);

};