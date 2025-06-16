import api from '../api/axios';

const facultyService = {
  getFaculty: ({ pageNumber = 1, pageSize = 20, name = '', email = '', designation = '', qualification = '', departments = [], facultyType = '', type = ''  } = {}) =>
    api.get('/users/faculty-mine', {
      params: {
        pageNumber,
        pageSize,
        name,
        email,
        designation,
        qualification,
        departments,
        facultyType,
        type,
      },
    }),
  getAllFaculty: () => api.get('/users/faculty/all'),
  createFaculty: (data) => api.post('/users/register-employee', data),
  createCampusAdmin: (data) => api.post('/users/register-campus-admin', data),
  deleteFaculty: (userId) => api.delete(`/users/${userId}`),
  getFacultyById: (userId) => api.get(`/users/${userId}`),
}; 

export default facultyService;
