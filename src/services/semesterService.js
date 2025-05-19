import api from '../api/axios';

const semesterService = {
    getAllSemesters: ({ pageNumber = 1, pageSize = 10, name = '', status = '',} = {}) =>
        api.get('/semesters/mine', {
          params: {
            pageNumber,
            pageSize,
            name,
            status,
          },
        }),
    createSemester: (data) => api.post('/semesters', data),
    updateSemester: (semesterId, data) => api.patch(`/semesters/${semesterId}`, data),
    deleteSemester: (semesterId) => api.delete(`/semesters/${semesterId}`),
    getSemesterById: (semesterId) => api.get(`/semesters/${semesterId}`),
}

export default semesterService; 


