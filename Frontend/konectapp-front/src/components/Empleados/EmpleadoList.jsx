import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import EmpleadoItem from './EmpleadoItem'
import EmpleadoForm from './EmpleadoForm'
import { deleteEmpleado, getEmpleados } from '../../services/empleado.Service'

const EmpleadoListContainer = styled.div`
  margin: 20px;
`

const EmpleadoList = () => {
    const queryClient = useQueryClient()

    const { data: empleados = [], isLoading, isError } = useQuery({
        queryKey: ['empleados'],
        queryFn: getEmpleados,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteEmpleado,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['empleados'] })
        },
    })

    if (isLoading) return <div>Cargando...</div>
    if (isError) return <div>Error al cargar empleados</div>

    return (
        <EmpleadoListContainer>
            <h2>Lista de Empleados</h2>
            <EmpleadoForm />
            { Array.isArray(empleados.data) && empleados.data.length > 0 ? (
                empleados.data.map((empleado) => (
                    <EmpleadoItem
                        key={ empleado.id }
                        empleado={ empleado }
                        onDelete={ () => deleteMutation.mutate(empleado.id) }
                    />
                ))
            ) : (
                <div>No hay empleados para mostrar</div>
            ) }
        </EmpleadoListContainer>
    )
}

export default EmpleadoList