import { useEffect, useState } from 'react';

import {
  guardarVenta,
  obtenerVentas,
  eliminarVenta,
  actualizarVenta
} from '../services/ventasService';

export default function SalesTable() {

  // =========================
  // ESTADOS
  // =========================

  const [ventas, setVentas] = useState([]);

  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [metodoPago, setMetodoPago] = useState('Transferencia');

  // Ordenamiento
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  // =========================
  // CARGAR VENTAS
  // =========================

  useEffect(() => {

    cargarVentas();

  }, []);


  const cargarVentas = async () => {

    const data = await obtenerVentas();

    setVentas(data);

  };


  // =========================
  // AGREGAR VENTA
  // =========================

  const agregarVenta = async () => {

    // Validación
    if (
      !producto ||
      !categoria ||
      !cantidad ||
      !precio ||
      !fecha
    ) {

      return alert('Completar todos los campos');

    }

    // Nueva venta
    const nuevaVenta = {

      producto,
      categoria,
      cantidad: Number(cantidad),
      precio: Number(precio),
      total: Number(cantidad) * Number(precio),
      fecha,
      metodoPago

    };

    // Guardar Firebase
    await guardarVenta(nuevaVenta);

    // Recargar tabla
    cargarVentas();

    // Limpiar formulario
    setProducto('');
    setCategoria('');
    setCantidad('');
    setPrecio('');
    setFecha('');
    setMetodoPago('Transferencia');

  };


  // =========================
  // BORRAR
  // =========================

  const borrarVenta = async (id) => {

    await eliminarVenta(id);

    cargarVentas();

  };


  // =========================
  // EDITAR FECHA
  // =========================

  const cambiarFecha = async (
    id,
    nuevaFecha
  ) => {

    await actualizarVenta(id, {
      fecha: nuevaFecha
    });

    cargarVentas();

  };


  // =========================
  // EDITAR MÉTODO PAGO
  // =========================

  const cambiarMetodoPago = async (
    id,
    metodo
  ) => {

    await actualizarVenta(id, {
      metodoPago: metodo
    });

    cargarVentas();

  };


  // =========================
  // ORDENAR TABLA
  // =========================

  const ordenarPor = (campo) => {

    // Si clickea mismo campo
    // invertimos orden

    if (sortBy === campo) {

      setSortOrder(
        sortOrder === 'asc'
          ? 'desc'
          : 'asc'
      );

    } else {

      setSortBy(campo);

      setSortOrder('asc');

    }
  };


  // =========================
  // VENTAS ORDENADAS
  // =========================

  const ventasOrdenadas = [...ventas].sort((a, b) => {

    // Si no hay orden
    if (!sortBy) return 0;

    // =====================
    // TEXTO
    // =====================

    if (
      sortBy === 'producto' ||
      sortBy === 'categoria' ||
      sortBy === 'metodoPago'
    ) {

      const valorA = a[sortBy].toLowerCase();
      const valorB = b[sortBy].toLowerCase();

      if (sortOrder === 'asc') {

        return valorA.localeCompare(valorB);

      } else {

        return valorB.localeCompare(valorA);

      }
    }

    // =====================
    // NÚMEROS
    // =====================

    if (
      sortBy === 'precio' ||
      sortBy === 'total'
    ) {

      if (sortOrder === 'asc') {

        return a[sortBy] - b[sortBy];

      } else {

        return b[sortBy] - a[sortBy];

      }
    }

    // =====================
    // FECHAS
    // =====================

    if (sortBy === 'fecha') {

      if (sortOrder === 'asc') {

        return new Date(a.fecha) - new Date(b.fecha);

      } else {

        return new Date(b.fecha) - new Date(a.fecha);

      }
    }

    return 0;

  });


  // =========================
  // TOTAL MENSUAL
  // =========================

  const totalMensual = ventas.reduce(
    (acc, venta) => acc + venta.total,
    0
  );


  // =========================
  // RETURN
  // =========================

  return (

    <div className='bg-zinc-900 p-6 rounded-3xl'>

      {/* TÍTULO */}

      <h2 className='text-3xl font-bold mb-6'>
        Gestión de Ventas
      </h2>

      {/* ========================= */}
      {/* FORMULARIO */}
      {/* ========================= */}

      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-6'>

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

        {/* CATEGORÍA */}

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

        {/* MÉTODO PAGO */}

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

      </div>


      {/* ========================= */}
      {/* BOTÓN */}
      {/* ========================= */}

      <button
        onClick={agregarVenta}
        className='bg-emerald-500 hover:bg-emerald-600 transition-all px-6 py-4 rounded-2xl font-bold mb-8'
      >
        Agregar Venta
      </button>


      {/* ========================= */}
      {/* TABLA */}
      {/* ========================= */}

      <div className='overflow-auto'>

        <table className='w-full'>

          {/* CABECERA */}

          <thead>

            <tr className='border-b border-zinc-700'>

              <th
                onClick={() =>
                  ordenarPor('producto')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Producto
              </th>

              <th
                onClick={() =>
                  ordenarPor('categoria')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Categoría
              </th>

              <th className='p-4 text-left'>
                Cantidad
              </th>

              <th
                onClick={() =>
                  ordenarPor('precio')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Precio
              </th>

              <th
                onClick={() =>
                  ordenarPor('total')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Total
              </th>

              <th
                onClick={() =>
                  ordenarPor('fecha')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Fecha
              </th>

              <th
                onClick={() =>
                  ordenarPor('metodoPago')
                }
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Pago
              </th>

              <th className='p-4 text-left'>
                Acciones
              </th>

            </tr>

          </thead>


          {/* CUERPO */}

          <tbody>

            {ventasOrdenadas.map((venta) => (

              <tr
                key={venta.id}
                className='border-b border-zinc-800'
              >

                {/* PRODUCTO */}

                <td className='p-4'>
                  {venta.producto}
                </td>

                {/* CATEGORÍA */}

                <td className='p-4'>
                  {venta.categoria}
                </td>

                {/* CANTIDAD */}

                <td className='p-4'>
                  {venta.cantidad}
                </td>

                {/* PRECIO */}

                <td className='p-4'>
                  ${venta.precio}
                </td>

                {/* TOTAL */}

                <td className='p-4 text-emerald-400 font-bold'>
                  ${venta.total}
                </td>

                {/* FECHA EDITABLE */}

                <td className='p-4'>

                  <input
                    type='date'
                    value={venta.fecha}
                    onChange={(e) =>
                      cambiarFecha(
                        venta.id,
                        e.target.value
                      )
                    }
                    className='bg-zinc-800 p-2 rounded-xl'
                  />

                </td>

                {/* MÉTODO PAGO */}

                <td className='p-4'>

                  <select
                    value={venta.metodoPago}
                    onChange={(e) =>
                      cambiarMetodoPago(
                        venta.id,
                        e.target.value
                      )
                    }
                    className='bg-zinc-800 p-2 rounded-xl'
                  >

                    <option>
                      Transferencia
                    </option>

                    <option>
                      Efectivo
                    </option>

                  </select>

                </td>

                {/* ELIMINAR */}

                <td className='p-4'>

                  <button
                    onClick={() =>
                      borrarVenta(venta.id)
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


      {/* ========================= */}
      {/* TOTAL */}
      {/* ========================= */}

      <div className='mt-8 text-right'>

        <h2 className='text-3xl font-bold text-emerald-400'>

          Total Mensual:
          ${totalMensual.toLocaleString()}

        </h2>

      </div>

    </div>

  );
}
