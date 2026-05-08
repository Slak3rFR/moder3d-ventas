import { useEffect, useState } from 'react';

import {
  guardarPedido,
  obtenerPedidos,
  eliminarPedido
} from '../services/pedidosService';

import {
  guardarVenta
} from '../services/ventasService';

export default function PedidosTable() {

  // =========================
  // ESTADOS
  // =========================

  const [pedidos, setPedidos] = useState([]);

  const [cliente, setCliente] = useState('');
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [metodoPago, setMetodoPago] = useState('Transferencia');
  const [observaciones, setObservaciones] = useState('');


  // =========================
  // CARGAR PEDIDOS
  // =========================

  useEffect(() => {

    cargarPedidos();

  }, []);


  const cargarPedidos = async () => {

    const data = await obtenerPedidos();

    setPedidos(data);

  };


  // =========================
  // AGREGAR PEDIDO
  // =========================

  const agregarPedido = async () => {

    if (
      !cliente ||
      !producto ||
      !cantidad ||
      !precio ||
      !fecha
    ) {

      return alert('Completar todos los campos');

    }


    const nuevoPedido = {

      cliente,
      producto,
      categoria,
      cantidad: Number(cantidad),
      precio: Number(precio),
      total: Number(cantidad) * Number(precio),
      fecha,
      metodoPago,
      observaciones,
      estado: 'Pendiente'

    };


    await guardarPedido(nuevoPedido);

    cargarPedidos();


    // LIMPIAR FORMULARIO

    setCliente('');
    setProducto('');
    setCategoria('');
    setCantidad('');
    setPrecio('');
    setFecha('');
    setMetodoPago('Transferencia');
    setObservaciones('');

  };


  // =========================
  // APROBAR PEDIDO
  // =========================

  const aprobarPedido = async (pedido) => {

    // PASAR A VENTAS

    await guardarVenta({

      producto: pedido.producto,
      categoria: pedido.categoria,
      cantidad: pedido.cantidad,
      precio: pedido.precio,
      total: pedido.total,
      fecha: pedido.fecha,
      metodoPago: pedido.metodoPago

    });


    // ELIMINAR PEDIDO

    await eliminarPedido(pedido.id);


    // RECARGAR PEDIDOS

    cargarPedidos();

  };


  // =========================
  // ELIMINAR PEDIDO
  // =========================

  const borrarPedido = async (id) => {

    await eliminarPedido(id);

    cargarPedidos();

  };


  // =========================
  // TOTAL PENDIENTE
  // =========================

  const totalPendiente = pedidos.reduce(

    (acc, pedido) => acc + pedido.total,

    0

  );


  // =========================
  // RETURN
  // =========================

  return (

    <div className='bg-zinc-900 p-6 rounded-3xl'>


      {/* TITULO */}

      <div className='flex justify-between items-center mb-8'>

        <h2 className='text-3xl font-bold'>

          Pedidos Pendientes

        </h2>


        <div className='text-cyan-400 text-xl font-bold'>

          ${totalPendiente.toLocaleString()}

        </div>

      </div>


      {/* ========================= */}
      {/* FORMULARIO */}
      {/* ========================= */}

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>


        {/* CLIENTE */}

        <input
          type='text'
          placeholder='Cliente'
          value={cliente}
          onChange={(e) =>
            setCliente(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* PRODUCTO */}

        <input
          type='text'
          placeholder='Producto'
          value={producto}
          onChange={(e) =>
            setProducto(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* CATEGORIA */}

        <input
          type='text'
          placeholder='Categoría'
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* CANTIDAD */}

        <input
          type='number'
          placeholder='Cantidad'
          value={cantidad}
          onChange={(e) =>
            setCantidad(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* PRECIO */}

        <input
          type='number'
          placeholder='Precio'
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* FECHA */}

        <input
          type='date'
          value={fecha}
          onChange={(e) =>
            setFecha(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />


        {/* METODO PAGO */}

        <select
          value={metodoPago}
          onChange={(e) =>
            setMetodoPago(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        >

          <option>
            Transferencia
          </option>

          <option>
            Efectivo
          </option>

        </select>


        {/* OBSERVACIONES */}

        <input
          type='text'
          placeholder='Observaciones'
          value={observaciones}
          onChange={(e) =>
            setObservaciones(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

      </div>


      {/* ========================= */}
      {/* BOTON */}
      {/* ========================= */}

      <button
        onClick={agregarPedido}
        className='bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-4 rounded-2xl font-bold mb-8'
      >

        Agregar Pedido

      </button>


      {/* ========================= */}
      {/* TABLA */}
      {/* ========================= */}

      <div className='overflow-auto'>


        <table className='w-full'>


          {/* CABECERA */}

          <thead>

            <tr className='border-b border-zinc-700'>

              <th className='p-4 text-left'>
                Cliente
              </th>

              <th className='p-4 text-left'>
                Producto
              </th>

              <th className='p-4 text-left'>
                Categoría
              </th>

              <th className='p-4 text-left'>
                Cantidad
              </th>

              <th className='p-4 text-left'>
                Total
              </th>

              <th className='p-4 text-left'>
                Fecha
              </th>

              <th className='p-4 text-left'>
                Estado
              </th>

              <th className='p-4 text-left'>
                Acciones
              </th>

            </tr>

          </thead>


          {/* CUERPO */}

          <tbody>

            {pedidos.map((pedido) => (

              <tr
                key={pedido.id}
                className='border-b border-zinc-800'
              >


                {/* CLIENTE */}

                <td className='p-4'>

                  {pedido.cliente}

                </td>


                {/* PRODUCTO */}

                <td className='p-4'>

                  {pedido.producto}

                </td>


                {/* CATEGORIA */}

                <td className='p-4'>

                  {pedido.categoria}

                </td>


                {/* CANTIDAD */}

                <td className='p-4'>

                  {pedido.cantidad}

                </td>


                {/* TOTAL */}

                <td className='p-4 text-emerald-400 font-bold'>

                  ${pedido.total}

                </td>


                {/* FECHA */}

                <td className='p-4'>

                  {pedido.fecha}

                </td>


                {/* ESTADO */}

                <td className='p-4'>

                  <span className='bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-xl text-sm'>

                    {pedido.estado}

                  </span>

                </td>


                {/* ACCIONES */}

                <td className='p-4 flex gap-2'>


                  {/* APROBAR */}

                  <button
                    onClick={() =>
                      aprobarPedido(pedido)
                    }
                    className='bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl'
                  >

                    Aprobar

                  </button>


                  {/* ELIMINAR */}

                  <button
                    onClick={() =>
                      borrarPedido(pedido.id)
                    }
                    className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl'
                  >

                    Eliminar

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}