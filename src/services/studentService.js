import api from '../api/axios';

const studentService = {
    getAllStudents: ({ pageNumber = 1, pageSize = 10, name = '', enrollmentNo = '', programBatch = '', section = ''} = {}) =>
        api.get('/students/mine', {
          params: {
            pageNumber,
            pageSize,
            name,
            enrollmentNo,
            programBatch,
            section,
          },
        }),
    createStudent: (data) => api.post('/students/enroll', data),
    createStudentsInBulk: (batchSectionId, data) => api.post(`/students/bulk-enroll/${batchSectionId}`, data),
    updateStudent: (studentId, data) => api.patch(`/students/${studentId}`, data),
    deleteStudent: (studentId) => api.delete(`/students/${studentId}`),
    getStudentById: (studentId) => api.get(`/semesters/${studentId}`),
    getProgramBatches: () => api.get('/batches'),
    getSectionsByBatchId: (batchId) => api.get(`/sections/${batchId}`),
}

export default studentService; 


