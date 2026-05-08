import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {

  const location = useLocation();

  return (

    <nav className='w-full bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex items-center justify-between'>

      {/* LOGO */}

      <div className='flex items-center gap-4'>

        <img
          src='/logo.png'
          alt='Moder3D'
          className='w-14 h-14 object-contain'
        />

        <h1 className='text-2xl font-black text-white'>

          Moder3D
          <span className='text-emerald-400'> ERP</span>

        </h1>

      </div>


      {/* LINKS */}

      <div className='flex gap-6 text-lg'>

        <Link
          to='/dashboard'
          className={`transition-all hover:text-emerald-400 ${
            location.pathname === '/dashboard'
              ? 'text-emerald-400'
              : 'text-zinc-300'
          }`}
        >
          Home
        </Link>


        <Link
          to='/pedidos'
          className={`transition-all hover:text-emerald-400 ${
            location.pathname === '/pedidos'
              ? 'text-emerald-400'
              : 'text-zinc-300'
          }`}
        >
          Pedidos
        </Link>

      </div>

    </nav>
  );
}