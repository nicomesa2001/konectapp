import api from './api'

export const getSolicitudes = (params) => api.get('/solicitudes', { params })
export const createSolicitud = (data) => api.post('/solicitudes', data)
export const updateSolicitud = (id, data) => api.put(`/solicitudes/${id}`, data)
export const deleteSolicitud = (id) => api.delete(`/solicitudes/${id}`)