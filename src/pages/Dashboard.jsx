import DashboardCards from '../components/DashboardCards';
import SalesChart from '../components/SalesChart';
import SalesTable from '../components/SalesTable';

export default function Dashboard() {

    return (

    <div className='min-h-screen bg-zinc-950 text-white p-6'>

        <h1 className='text-4xl font-bold mb-8'>
        Dashboard
        </h1>

        <DashboardCards />

        <div className='mt-10'>
        <SalesChart />
        </div>

        <div className='mt-10'>
        <SalesTable />
        </div>

    </div>
    );
}