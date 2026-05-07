import { useState } from 'react';

import {
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  auth
} from '../firebase/config';

import {
  useNavigate
} from 'react-router-dom';

export default function Login() {

  // =========================
  // ESTADOS
  // =========================

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate('/dashboard');

    } catch (error) {

      alert('Error al iniciar sesión');

    }
  };


  // =========================
  // RETURN
  // =========================

  return (

    <div className='min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-between relative overflow-hidden px-6 py-10'>


      {/* ========================= */}
      {/* GLOW GIGANTE */}
      {/* ========================= */}

      <div className='absolute w-[1200px] h-[1200px] bg-emerald-500 opacity-25 blur-[180px] rounded-full animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>


      {/* ========================= */}
      {/* CONTENIDO */}
      {/* ========================= */}

      <div className='relative z-10 flex flex-col items-center w-full flex-1 justify-center'>


        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <img
          src='/logo.png'
          alt='Moder3D'
          className='w-80 md:w-[200px] mb-4 object-contain drop-shadow-[0_0_60px_rgba(16,185,129,0.7)]'
        />


        {/* ========================= */}
        {/* TITULO */}
        {/* ========================= */}

        <h1 className='text-3xl md:text-4xl font-black text-center mb-4 tracking-tight'>

          Moder3D
          <span className='text-emerald-400'>
            {' '}ERP
          </span>

        </h1>


        {/* ========================= */}
        {/* SUBTITULO */}
        {/* ========================= */}

        <p className='text-zinc-300 text-center text-lg md:text-xl max-w-2xl leading-relaxed mb-10'>

          Sistema inteligente de gestión de ventas,
          estadísticas y control comercial
          en tiempo real.

        </p>


        {/* ========================= */}
        {/* LOGIN */}
        {/* ========================= */}

        <form
          onSubmit={handleLogin}
          className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl'
        >

          <h2 className='text-3xl font-bold mb-6 text-center'>

            Iniciar Sesión

          </h2>


          {/* EMAIL */}

          <input
            type='email'
            placeholder='Email'
            className='w-full p-4 rounded-2xl bg-zinc-800 mb-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all'
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          {/* PASSWORD */}

          <input
            type='password'
            placeholder='Contraseña'
            className='w-full p-4 rounded-2xl bg-zinc-800 mb-6 outline-none focus:ring-2 focus:ring-emerald-500 transition-all'
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {/* BOTON */}

          <button className='w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 p-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20'>

            Ingresar

          </button>

        </form>

      </div>


      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}

      <footer className='relative z-10 text-emerald-600 text-sm text-center mt-10'>

        Desarrollado por Franco Reynoso

      </footer>

    </div>
  );
}