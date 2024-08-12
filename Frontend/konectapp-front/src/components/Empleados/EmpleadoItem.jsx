import PropTypes from 'prop-types'
import styled from 'styled-components'

const EmpleadoItemContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`

const EmpleadoItem = ({ empleado, onDelete }) => {
    return (
        <EmpleadoItemContainer>
            <h3>{ empleado.nombre }</h3>
            <p>Salario: { empleado.salario }</p>
            <p>Fecha de Ingreso: { new Date(empleado.fechaIngreso).toLocaleDateString() }</p>
            <button onClick={ onDelete }>Eliminar</button>
        </EmpleadoItemContainer>
    )
}

EmpleadoItem.propTypes = {
    empleado: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        salario: PropTypes.number.isRequired,
        fechaIngreso: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default EmpleadoItem