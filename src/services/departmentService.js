import api from '../api/axios';

const departmentService = {
    getAllDepartments: ({ pageNumber = 1, pageSize = 10, schoolName = '',departmentName = '', type = ''} = {}) =>
        api.get('/departments/mine', {
          params: {
            pageNumber,
            pageSize,
            schoolName,
            departmentName,
            type,
          },
        }),
    createDepartment: (data) => api.post('/departments', data),
    updateDepartment: (departmentId, data) => api.put(`/departments/${departmentId}`, data),
    deleteDepartment: (departmentId) => api.delete(`/departments/${departmentId}`),
    getDepartmentById: (departmentId) => api.get(`/departments/${departmentId}`),
    getAllSchools: () => api.get('/schools/all'),
}

export default departmentService;
