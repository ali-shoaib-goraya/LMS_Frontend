import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminCourseCard from './AdminCourseCard';
import courseSectionService from '../services/courseSectionService';

const DashboardHome = () => {
  const [courseSections, setCourseSections] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const showDashboardContent = location.pathname === '/dashboard';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await courseSectionService.getAllCourseSections();
        const courses = response.data.data || [];
        setCourseSections(courses);
        setFilteredCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = courseSections.filter((course) =>
      (course.courseName?.toLowerCase().includes(query)) ||
      (course.courseCode?.toLowerCase().includes(query))
    );
    setFilteredCourses(filtered);
  };

  const coursesBySemester = filteredCourses.reduce((acc, course) => {
    const semester = course.semesterName || 'Unknown Semester';
    if (!acc[semester]) acc[semester] = [];
    acc[semester].push(course);
    return acc;
  }, {});

  if (loading && showDashboardContent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading course sections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-6 px-6">
        {showDashboardContent ? (
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <h1 className="text-3xl font-normal">School Course Sections</h1>
              <div className="flex items-center gap-4 text-blue-600">
                <a href="/dashboard" className="hover:text-blue-800">Home</a>
                <span className="border-l h-4 border-gray-400" />
                <a href="/dashboard" className="hover:text-blue-800">Dashboard</a>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex justify-end mb-6">
              <input
                type="text"
                placeholder="Search by course name or code"
                onChange={handleSearch}
                className="w-60 p-2 border border-gray-300 rounded-full"
              />
            </div>

            {/* Course Sections grouped by Semester */}
            {Object.entries(coursesBySemester).map(([semester, courses]) => (
              <div key={semester} className="mb-8">
                <h2 className="text-xl font-medium text-gray-800 mb-4">{semester}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <AdminCourseCard key={course.courseSectionId} courseSection={course} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
