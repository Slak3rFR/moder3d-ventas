import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export default function Login() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

  // LOGIN
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

return (

    <div className='min-h-screen bg-zinc-950 flex items-center justify-center text-white'>

    <form
        onSubmit={handleLogin}
        className='bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-zinc-800'
    >

        <h1 className='text-4xl font-bold mb-8 text-center'>
        Moder3D
        </h1>

        <input
        type='email'
        placeholder='Email'
        className='w-full p-4 rounded-xl bg-zinc-800 mb-4'
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type='password'
        placeholder='Contraseña'
        className='w-full p-4 rounded-xl bg-zinc-800 mb-6'
        onChange={(e) => setPassword(e.target.value)}
        />

        <button className='w-full bg-emerald-500 hover:bg-emerald-600 transition-all p-4 rounded-xl font-bold'>
        Ingresar
        </button>

    </form>

    </div>
);
}