import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

import Pedidos from './pages/Pedidos';

import ProtectedRoute from './components/ProtectedRoute';


export default function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* LOGIN */}

        <Route
          path='/'
          element={<Login />}
        />


        {/* DASHBOARD */}

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />


        {/* PEDIDOS */}

        <Route
          path='/pedidos'
          element={
            <ProtectedRoute>

              <Pedidos />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}