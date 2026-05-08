import Navbar from '../components/Navbar';

import PedidosTable from '../components/PedidosTable';

export default function Pedidos() {

  return (

    <div className='min-h-screen bg-zinc-950 text-white'>


      {/* NAVBAR */}

      <Navbar />


      {/* CONTENIDO */}

      <div className='p-6'>

        <PedidosTable />

      </div>

    </div>

  );

}