import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import SolicitudItem from './SolicitudItem'
import SolicitudForm from './SolicitudForm'
import { deleteSolicitud, getSolicitudes } from '../../services/solicitud.Service'

const SolicitudListContainer = styled.div`
  margin: 20px;
`

const SolicitudList = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['solicitudes'],
        queryFn: getSolicitudes,
    })

    const deleteMutation = useMutation({
        mutationFn: deleteSolicitud,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['solicitudes'] })
        },
    })

    if (isLoading) return <div>Cargando...</div>
    if (isError) return <div>Error al cargar solicitudes</div>

    const solicitudes = data?.data || []

    return (
        <SolicitudListContainer>
            <h2>Lista de Solicitudes</h2>
            <SolicitudForm />
            { solicitudes.length > 0 ? (
                solicitudes.map((solicitud) => (
                    <SolicitudItem
                        key={ solicitud.id }
                        solicitud={ solicitud }
                        onDelete={ () => deleteMutation.mutate(solicitud.id) }
                    />
                ))
            ) : (
                <p>No hay solicitudes para mostrar.</p>
            ) }
        </SolicitudListContainer>
    )
}
export default SolicitudList