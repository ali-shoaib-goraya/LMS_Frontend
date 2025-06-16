import api from '../api/axios';

const permissionService = {
    createPermission: (data) => api.post('/Permission/Create', data),
    updatePermission: (id, data) => api.put(`/Permission/Edit/${id}`, data),
    deletePermission: (id) => api.delete(`/Permission/${id}`),
    getPermissionById: (id) => api.get(`/Permission/${id}`),
    getAllPermissions: () => api.get('/Permission/Permissions'),
}

export default permissionService; 
