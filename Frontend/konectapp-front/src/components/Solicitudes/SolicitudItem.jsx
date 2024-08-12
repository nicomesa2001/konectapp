import PropTypes from 'prop-types'
import styled from 'styled-components'

const SolicitudItemContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`

const SolicitudItem = ({ solicitud, onDelete }) => {
    return (
        <SolicitudItemContainer>
            <h3>{ solicitud.codigo }</h3>
            <p>Descripción: { solicitud.descripcion }</p>
            <p>Resumen: { solicitud.resumen }</p>
            <p>ID del Empleado: { solicitud.empleadoId }</p>
            <button onClick={ onDelete }>Eliminar</button>
        </SolicitudItemContainer>
    )
}

SolicitudItem.propTypes = {
    solicitud: PropTypes.shape({
        id: PropTypes.number.isRequired,
        codigo: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        resumen: PropTypes.string.isRequired,
        empleadoId: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default SolicitudItem