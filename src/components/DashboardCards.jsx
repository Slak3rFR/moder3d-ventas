import { useEffect, useState } from 'react';

import { obtenerVentas } from '../services/ventasService';

export default function DashboardCards() {

  // Estado ventas
  const [ventas, setVentas] = useState([]);

  // Cargar ventas
  useEffect(() => {

    cargarVentas();

  }, []);

  // Obtener Firebase
  const cargarVentas = async () => {

    const data = await obtenerVentas();

    setVentas(data);

  };

  // TOTAL VENDIDO
  const totalVentas = ventas.reduce(
    (acc, venta) => acc + venta.total,
    0
  );

  // CANTIDAD VENTAS
  const cantidadVentas = ventas.length;

  // PRODUCTO MÁS VENDIDO
  const productos = {};

  ventas.forEach((venta) => {

    // Si no existe
    if (!productos[venta.producto]) {

      productos[venta.producto] = 0;

    }

    // Sumamos cantidades
    productos[venta.producto] += venta.cantidad;

  });

  // Encontrar producto top
  let productoTop = 'Sin ventas';

  let maxCantidad = 0;

  for (const producto in productos) {

    if (productos[producto] > maxCantidad) {

      maxCantidad = productos[producto];

      productoTop = producto;

    }

  }

  return (

    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

      {/* TOTAL VENDIDO */}

      <div className='bg-zinc-900 p-6 rounded-3xl border border-zinc-800'>

        <h2 className='text-zinc-400 text-sm uppercase'>
          Ventas Totales
        </h2>

        <p className='text-4xl font-bold mt-4 text-emerald-400'>

          ${totalVentas.toLocaleString()}

        </p>

      </div>

      {/* CANTIDAD */}

      <div className='bg-zinc-900 p-6 rounded-3xl border border-zinc-800'>

        <h2 className='text-zinc-400 text-sm uppercase'>
          Ventas del Mes
        </h2>

        <p className='text-4xl font-bold mt-4 text-cyan-400'>

          {cantidadVentas}

        </p>

      </div>

      {/* PRODUCTO TOP */}

      <div className='bg-zinc-900 p-6 rounded-3xl border border-zinc-800'>

        <h2 className='text-zinc-400 text-sm uppercase'>
          Producto Más Vendido
        </h2>

        <p className='text-2xl font-bold mt-4 text-yellow-400'>

          {productoTop}

        </p>

      </div>

    </div>
  );
}