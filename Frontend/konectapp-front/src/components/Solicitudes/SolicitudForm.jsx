import { useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { createSolicitud } from '../../services/solicitud.Service'
import { useState } from 'react'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const SolicitudForm = () => {
    const [codigo, setCodigo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [resumen, setResumen] = useState('')
    const [empleadoId, setEmpleadoId] = useState('')

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createSolicitud,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['solicitudes'] })
            setCodigo('')
            setDescripcion('')
            setResumen('')
            setEmpleadoId('')
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createMutation.mutate({ codigo, descripcion, resumen, empleadoId: parseInt(empleadoId) })
    }

    return (
        <FormContainer onSubmit={ handleSubmit }>
            <input
                type="text"
                value={ codigo }
                onChange={ (e) => setCodigo(e.target.value) }
                placeholder="Código"
                required
            />
            <input
                type="text"
                value={ descripcion }
                onChange={ (e) => setDescripcion(e.target.value) }
                placeholder="Descripción"
                required
            />
            <input
                type="text"
                value={ resumen }
                onChange={ (e) => setResumen(e.target.value) }
                placeholder="Resumen"
                required
            />
            <input
                type="number"
                value={ empleadoId }
                onChange={ (e) => setEmpleadoId(e.target.value) }
                placeholder="ID del Empleado"
                required
            />
            <button type="submit" disabled={ createMutation.isPending }>
                { createMutation.isPending ? 'Creando...' : 'Crear Solicitud' }
            </button>
        </FormContainer>
    )
}

export default SolicitudForm