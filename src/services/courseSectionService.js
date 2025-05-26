import { get } from 'react-hook-form';
import api from '../api/axios';

const courseService = {
  // Get paginated coursesections with filters
  getCourseSection: ({ pageNumber = 1, pageSize = 10,  school = '', name = '' , teacher = ''} = {}) =>
    api.get('/coursesections/mine', {
      params: {
        pageNumber,
        pageSize,
        school,
        name,
        teacher,
      },
    }),

  // Get all courses (for dropdowns)
  getAllCourseSections: () => api.get('/coursesections/all'),
  createCourseSection: (data) => api.post('/coursesections', data),
  createCourseSectionBulk: (data) => api.post('/coursesections/bulk-create', data),
  updateCourseSection: (courseSectionId, data) => api.put(`/coursesections/${courseSectionId}`, data),
  deleteCourseSection: (courseSectionId) => api.delete(`/coursesections/${courseSectionId}`),
  getCourseSectionById: (courseSectionId) => api.get(`/coursesections/${courseSectionId}`),
  // below are function for dropdowns
  getAllSchools: () => api.get('/schools/all'),
  getAllTeachers: () => api.get('/users/faculty/all'),
  getAllSemesters: () => api.get('/semesters/all'),
  getAllCourses: () => api.get('/courses/all'),
};

export default courseService;