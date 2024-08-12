import api from './api'

export const getEmpleados = (params) => api.get('/empleados', { params })
export const createEmpleado = (data) => api.post('/empleados', data)
export const updateEmpleado = (id, data) => api.put(`/empleados/${id}`, data)
export const deleteEmpleado = (id) => api.delete(`/empleados/${id}`)