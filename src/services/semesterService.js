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
    createSemester: (data) => api.post('/semesteres', data),
    updateSemester: (semesterId, data) => api.put(`/semesteres/${semesterId}`, data),
    deleteSemester: (semesterId) => api.delete(`/semesteres/${semesterId}`),
    getSemesterById: (semesterId) => api.get(`/semesteres/${semesterId}`),
}

export default semesterService; 


