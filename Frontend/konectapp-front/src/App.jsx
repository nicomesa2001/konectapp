import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProtectedRoute from './components/ProtectedRoute'

const Login = lazy(() => import('./components/Auth/Login'))
const Register = lazy(() => import('./components/Auth/Register'))
const EmpleadoList = lazy(() => import('./components/Empleados/EmpleadoList'))
const SolicitudList = lazy(() => import('./components/Solicitudes/SolicitudList'))

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Suspense fallback={ <div>Cargando...</div> }>
          <Routes>
            <Route path="/" element={ <Navigate to="/login" replace /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/empleados" element={
              <ProtectedRoute>
                <EmpleadoList />
              </ProtectedRoute>
            } />
            <Route path="/solicitudes" element={
              <ProtectedRoute>
                <SolicitudList />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App