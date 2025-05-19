import api from '../api/axios';

const courseService = {
  // Get paginated courses with filters
  getCourses: ({ pageNumber = 1, pageSize = 10, courseCode = '', department = '', courseName = '' } = {}) =>
    api.get('/courses/mine', {
      params: {
        pageNumber,
        pageSize,
        courseCode,
        department,
        courseName,
      },
    }),

  // Get all courses (for dropdowns)
  getAllCourses: () => api.get('/courses/all'),

  // Create new course
  createCourse: (data) => {
    const courseData = {
      courseName: data.courseName,
      courseCode: data.courseCode,
      creditHours: data.creditHours,
      isLab: data.isLab,
      isCompulsory: data.isCompulsory,
      isTheory: data.isTheory,
      connectedCourseId: data.connectedCourseId,
      objective: data.objective,
      notes: data.notes,
      departmentId: data.departmentId,
    };
    return api.post('/courses', courseData);
  },

  // Update existing course
  updateCourse: (courseId, data) => {
    const courseData = {
      courseName: data.courseName,
      courseCode: data.courseCode,
      creditHours: data.creditHours,
      isLab: data.isLab,
      isCompulsory: data.isCompulsory,
      isTheory: data.isTheory,
      connectedCourseId: data.connectedCourseId,
      objective: data.objective,
      notes: data.notes,
      departmentId: data.departmentId,
    };
    return api.patch(`/courses/${courseId}`, courseData);
  },

  // Delete course
  deleteCourse: (courseId) => api.delete(`/courses/${courseId}`),

  // Get course by ID
  getCourseById: (courseId) => api.get(`/courses/${courseId}`),

  // Get all departments (for dropdowns)
  getAllDepartments: () => api.get('/departments'),
};

export default courseService;