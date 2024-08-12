import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import api from '../../services/api'
import { Modal, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material'

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Register = ({ open = false, onClose, onSuccess }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('empleado')
    const [errorMessage, setErrorMessage] = useState('')

    const registerMutation = useMutation({
        mutationFn: (userData) => api.post('/auth/register', userData),
        onSuccess: () => {
            onSuccess()
            onClose()
        },
        onError: (error) => {
            setErrorMessage(error.response?.data?.message || 'Error al registrar el usuario')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage('')
        registerMutation.mutate({ email, password, role })
    }

    return (
        <Modal
            open={ open }
            onClose={ onClose }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ModalContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Registrarse
                </Typography>
                { errorMessage && (
                    <Typography color="error" gutterBottom>
                        { errorMessage }
                    </Typography>
                ) }
                <RegisterForm onSubmit={ handleSubmit }>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                        required
                    />
                    <TextField
                        fullWidth
                        id="password"
                        label="Contraseña"
                        type="password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="role-select-label">Rol</InputLabel>
                        <Select
                            labelId="role-select-label"
                            value={ role }
                            label="Rol"
                            onChange={ (e) => setRole(e.target.value) }
                        >
                            <MenuItem value="empleado">Empleado</MenuItem>
                            <MenuItem value="admin">Administrador</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={ registerMutation.isPending }
                        fullWidth
                    >
                        { registerMutation.isPending ? 'Cargando...' : 'Registrarse' }
                    </Button>
                </RegisterForm>
            </ModalContent>
        </Modal>
    )
}

Register.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
}

export default Register