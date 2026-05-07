import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const data = [
  { dia: 'Lun', ventas: 12000 },
  { dia: 'Mar', ventas: 22000 },
  { dia: 'Mié', ventas: 18000 },
  { dia: 'Jue', ventas: 25000 },
  { dia: 'Vie', ventas: 40000 }
];

export default function SalesChart() {

  return (

    <div className='bg-zinc-900 p-6 rounded-3xl'>

      <h2 className='text-2xl font-bold mb-6'>
        Ventas Semanales
      </h2>

      <ResponsiveContainer width='100%' height={350}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray='3 3' />

          <XAxis dataKey='dia' />

          <YAxis />

          <Tooltip />

          <Line
            type='monotone'
            dataKey='ventas'
            stroke='#10b981'
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}