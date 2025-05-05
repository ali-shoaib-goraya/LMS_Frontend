import api from '../api/axios';

const schoolService = {
  getAllSchools: ({ page = 1, pageSize = 10, name = '', shortName = '', city = '' } = {}) =>
    api.get('/schools/mine', {
      params: {
        page,
        pageSize,
        name,
        shortName,
        city,
      },
    }),

  createSchool: (data) => api.post('/schools', data),
  updateSchool: (schoolId, data) => api.put(`/schools/${schoolId}`, data),
  deleteSchool: (schoolId) => api.delete(`/schools/${schoolId}`),
  getSchoolById: (id) => api.get(`/schools/${id}`),
};

export default schoolService;
