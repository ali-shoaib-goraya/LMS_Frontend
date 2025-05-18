import api from '../api/axios';

const programService = {
    getAllPrograms: ({ pageNumber = 1, pageSize = 10, programName = '', departmentName = '', degreeType = '', code =''} = {}) =>
        api.get('/programs/mine', {
          params: {
            pageNumber,
            pageSize,
            programName,
            departmentName,
            degreeType,
            code,
          },
        }),
    createProgram: (data) => api.post('/programs', data),
    updateProgram: (programId, data) => api.put(`/programs/${programId}`, data),
    deleteProgram: (programId) => api.delete(`/programs/${programId}`),
    getProgramById: (programId) => api.get(`/programs/${programId}`),
    getDepartments: () => api.get('/departments'),
}

export default programService; 
