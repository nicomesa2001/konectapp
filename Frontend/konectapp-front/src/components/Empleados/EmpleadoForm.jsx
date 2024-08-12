import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { useState } from 'react'
import { createEmpleado } from '../../services/empleado.Service'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const EmpleadoForm = () => {
    const [nombre, setNombre] = useState('')
    const [salario, setSalario] = useState('')
    const [fechaIngreso, setFechaIngreso] = useState('')

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createEmpleado,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['empleados'] })
            setNombre('')
            setSalario('')
            setFechaIngreso('')
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createMutation.mutate({ nombre, salario: parseFloat(salario), fechaIngreso })
    }

    return (
        <FormContainer onSubmit={ handleSubmit }>
            <input
                type="text"
                value={ nombre }
                onChange={ (e) => setNombre(e.target.value) }
                placeholder="Nombre"
                required
            />
            <input
                type="number"
                value={ salario }
                onChange={ (e) => setSalario(e.target.value) }
                placeholder="Salario"
                required
            />
            <input
                type="date"
                value={ fechaIngreso }
                onChange={ (e) => setFechaIngreso(e.target.value) }
                required
            />
            <button type="submit" disabled={ createMutation.isPending }>
                { createMutation.isPending ? 'Creando...' : 'Crear Empleado' }
            </button>
        </FormContainer>
    )
}

export default EmpleadoForm