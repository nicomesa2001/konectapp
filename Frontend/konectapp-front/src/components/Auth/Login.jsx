import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useMutation } from '@tanstack/react-query'
import api from '../../services/api'
import styled from 'styled-components'
import { Button } from '@mui/material'
import Register from './Register'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
`

const ErrorLabel = styled.label`
  color: red;
  margin-bottom: 10px;
`

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: (credentials) => api.post('/auth/login', credentials),
        onSuccess: (response) => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            login(token);
            navigate('/empleados');
        },
        onError: (error) => {
            setErrorMessage(error.response?.data?.message || 'Error al iniciar sesión. Por favor, inténtelo de nuevo.')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage('')
        loginMutation.mutate({ email, password })
    }

    return (
        <LoginContainer>
            <h2>Iniciar Sesión</h2>
            { errorMessage && <ErrorLabel>{ errorMessage }</ErrorLabel> }
            <LoginForm onSubmit={ handleSubmit }>
                <input
                    type="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder="Contraseña"
                    required
                />
                <Button type="submit" variant="contained" color="primary" disabled={ loginMutation.isPending }>
                    { loginMutation.isPending ? 'Cargando...' : 'Iniciar Sesión' }
                </Button>
            </LoginForm>
            <Button onClick={ () => setIsRegisterOpen(true) } variant="outlined" style={ { marginTop: '20px' } }>
                Registrarse
            </Button>
            <Register
                open={ isRegisterOpen }
                onClose={ () => setIsRegisterOpen(false) }
                onSuccess={ () => {
                    setIsRegisterOpen(false)
                } }
            />
        </LoginContainer>
    )
}

export default Login