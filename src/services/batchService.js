import api from '../api/axios';

const batchService = {
    getAllBatches: ({ pageNumber = 1, pageSize = 10, program = ''} = {}) =>
        api.get('/batches/mine', {
          params: {
            pageNumber,
            pageSize,
            program
          },
        }),
    createBatch: (data) => api.post('/batches', data),
    updateBatch: (batchId, data) => api.put(`/batches/${batchId}`, data),
    deleteBatch: (batchId) => api.delete(`/batches/${batchId}`),
    getBatchById: (batchId) => api.get(`/batches/${batchId}`),
    getPrograms: () => api.get('/programs'),
}

export default batchService; 
