import api from '../api/axios';

const sectionService = {
    getAllSections: ({ pageNumber = 1, pageSize = 10, sectionName ='', programBatch = '', } = {}) =>
        api.get('/sections/mine', {
          params: {
            pageNumber,
            pageSize,
            programBatch,
            sectionName
          },
        }),
    createSection: (data) => api.post('/sections', data),
    updateSection: (sectionId, data) => api.patch(`/sections/${sectionId}`, data),
    deleteSection: (sectionId) => api.delete(`/sections/${sectionId}`),
    getSectionById: (sectionId) => api.get(`/sections/${sectionId}`),
    getAllProgramBatches: () => api.get('/batches'),
}

export default sectionService; 
