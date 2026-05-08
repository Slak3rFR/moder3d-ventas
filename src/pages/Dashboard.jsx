import Navbar from '../components/Navbar';

import DashboardCards from '../components/DashboardCards';

import SalesTable from '../components/SalesTable';


export default function Dashboard() {

  return (

    <div className='min-h-screen bg-zinc-950 text-white'>


      {/* NAVBAR */}

      <Navbar />


      {/* CONTENIDO */}

      <div className='p-6'>


        {/* CARDS */}

        <DashboardCards />


        {/* TABLA */}

        <div className='mt-6'>

          <SalesTable />

        </div>

      </div>

    </div>

  );

}