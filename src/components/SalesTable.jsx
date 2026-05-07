import { useEffect, useState } from 'react';

import {
  guardarVenta,
  obtenerVentas,
  eliminarVenta,
  actualizarVenta
} from '../services/ventasService';

import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

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
  // EXPORTAR EXCEL
  // =========================

  const exportarExcel = () => {

    // Datos para excel
    const datos = ventas.map((venta) => ({

      Producto: venta.producto,
      Categoria: venta.categoria,
      Cantidad: venta.cantidad,
      Precio: venta.precio,
      Total: venta.total,
      Fecha: venta.fecha,
      MetodoPago: venta.metodoPago

    }));

    // Crear hoja
    const worksheet = XLSX.utils.json_to_sheet(datos);

    // Crear libro
    const workbook = XLSX.utils.book_new();

    // Agregar hoja
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Ventas'
    );

    // Generar archivo
    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: 'xlsx',
        type: 'array'
      }
    );

    // Crear blob
    const data = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      }
    );

    // Descargar
    saveAs(
      data,
      `ventas-moder3d.xlsx`
    );

  };


  // =========================
  // AGREGAR VENTA
  // =========================

  const agregarVenta = async () => {

    if (
      !producto ||
      !categoria ||
      !cantidad ||
      !precio ||
      !fecha
    ) {

      return alert('Completar todos los campos');

    }

    const nuevaVenta = {

      producto,
      categoria,
      cantidad: Number(cantidad),
      precio: Number(precio),
      total: Number(cantidad) * Number(precio),
      fecha,
      metodoPago

    };

    await guardarVenta(nuevaVenta);

    cargarVentas();

    // Limpiar
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
  // EDITAR PAGO
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
  // ORDENAR
  // =========================

  const ordenarPor = (campo) => {

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
  // ORDENAMIENTO TABLA
  // =========================

  const ventasOrdenadas = [...ventas].sort((a, b) => {

    if (!sortBy) return 0;

    // TEXTO
    if (
      sortBy === 'producto' ||
      sortBy === 'categoria' ||
      sortBy === 'metodoPago'
    ) {

      const valorA = a[sortBy].toLowerCase();

      const valorB = b[sortBy].toLowerCase();

      return sortOrder === 'asc'
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);

    }

    // NUMEROS
    if (
      sortBy === 'precio' ||
      sortBy === 'total'
    ) {

      return sortOrder === 'asc'
        ? a[sortBy] - b[sortBy]
        : b[sortBy] - a[sortBy];

    }

    // FECHAS
    if (sortBy === 'fecha') {

      return sortOrder === 'asc'
        ? new Date(a.fecha) - new Date(b.fecha)
        : new Date(b.fecha) - new Date(a.fecha);

    }

    return 0;

  });


  // =========================
  // TOTAL
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

      {/* HEADER */}

      <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>

        <h2 className='text-3xl font-bold'>
          Gestión de Ventas
        </h2>

      </div>


      {/* FORMULARIO */}

      <div className='grid grid-cols-1 md:grid-cols-6 gap-4 mb-6'>

        <input
          type='text'
          placeholder='Producto'
          value={producto}
          onChange={(e) =>
            setProducto(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

        <input
          type='text'
          placeholder='Categoría'
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

        <input
          type='number'
          placeholder='Cantidad'
          value={cantidad}
          onChange={(e) =>
            setCantidad(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

        <input
          type='number'
          placeholder='Precio'
          value={precio}
          onChange={(e) =>
            setPrecio(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

        <input
          type='date'
          value={fecha}
          onChange={(e) =>
            setFecha(e.target.value)
          }
          className='bg-zinc-800 p-4 rounded-xl'
        />

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


      {/* BOTON AGREGAR */}

      <button
        onClick={agregarVenta}
        className='bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-4 rounded-2xl font-bold mb-8'
      >
        Agregar Venta
      </button>


      {/* TABLA */}

      <div className='overflow-auto'>

        <table className='w-full'>

          <thead>

            <tr className='border-b border-zinc-700'>

              <th
                onClick={() => ordenarPor('producto')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Producto
              </th>

              <th
                onClick={() => ordenarPor('categoria')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Categoría
              </th>

              <th className='p-4 text-left'>
                Cantidad
              </th>

              <th
                onClick={() => ordenarPor('precio')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Precio
              </th>

              <th
                onClick={() => ordenarPor('total')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Total
              </th>

              <th
                onClick={() => ordenarPor('fecha')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Fecha
              </th>

              <th
                onClick={() => ordenarPor('metodoPago')}
                className='p-4 text-left cursor-pointer hover:text-emerald-400'
              >
                Pago
              </th>

              <th className='p-4 text-left'>
                Acciones
              </th>

            </tr>

          </thead>


          <tbody>

            {ventasOrdenadas.map((venta) => (

              <tr
                key={venta.id}
                className='border-b border-zinc-800'
              >

                <td className='p-4'>
                  {venta.producto}
                </td>

                <td className='p-4'>
                  {venta.categoria}
                </td>

                <td className='p-4'>
                  {venta.cantidad}
                </td>

                <td className='p-4'>
                  ${venta.precio}
                </td>

                <td className='p-4 text-emerald-400 font-bold'>
                  ${venta.total}
                </td>

                {/* FECHA */}

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

                {/* METODO PAGO */}

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


      {/* TOTAL */}

      <div className='mt-8 text-right'>

        <h2 className='text-3xl font-bold text-emerald-400'>

          Total Mensual:
          ${totalMensual.toLocaleString()}

        </h2>

                {/* BOTON EXCEL */}

        <button
          onClick={exportarExcel}
          className='mt-8 text-left bg-emerald-500 hover:bg-emerald-600 transition-all px-6 py-3 rounded-2xl font-bold'
        >
          Exportar Excel
        </button>

      </div>

    </div>
  );
}