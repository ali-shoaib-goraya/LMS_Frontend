import api from '../api/axios';

const campusService = {
    getAllCampuses: () => api.get('/campuses/mine'),
    createCampus: (data) => api.post('/campuses', data),
    updateCampus: (campusId, data) => api.put(`/campuses/${campusId}`, data),
    deleteCampus: (campusId) => api.delete(`/campuses/${campusId}`),
    getCampusById: (campusId) => api.get(`/campuses/${campusId}`),
  };
  
export default campusService;

