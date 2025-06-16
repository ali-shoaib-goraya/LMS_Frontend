import api from '../api/axios';

const roleService = {
    createRole: (data) => api.post('/Role/CreateRole', data),
    updateRole: (id, data) => api.put(`/Role/EditRole/${id}`, data),
    deleteRole: (roleId) => api.delete(`/Role/DeleteRole/${roleId}`),
    getRoles: () => api.get('/Role/GetAllRoles'),
    getRoleById: (roleId) => api.get(`/Role/GetRoleById/${roleId}`),

}

export default roleService; 
