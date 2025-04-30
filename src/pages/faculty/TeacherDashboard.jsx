import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TeacherCourseCard from '../../components/faculty/TeacherCourseCard';
import { sampleCourses } from '../../MockData/CourseData';
import TeacherNavbar from '../../components/faculty/TeacherNavbar';
import TeacherSidebar from '../../components/faculty/TeacherSidebar';
import Footer from '../../components/student/Footer'; // Adjust the import path as necessary

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024'); // Default semester
  const location = useLocation();

  const loggedInTeacherName = 'Muhammad Shahzad Arif'; // Replace this with actual login data later

  const accreditations = [
    'Washington Accord',
    'ABET',
    'Seoul Accord',
    'Sydney Accord',
    'Dublin Accord',
    'AACSB',
    'ACBSP'
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const teacherCourses = sampleCourses.filter(
          (course) => course.instructorName === loggedInTeacherName
        );

        setCourses(teacherCourses);
        setFilteredCourses(teacherCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course => course.term === selectedSemester);
    setFilteredCourses(filtered);
  }, [selectedSemester, courses]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const showDashboardContent = location.pathname === '/teacher';

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase().trim();
    const filtered = courses.filter((course) => {
      const courseTitle = course.title?.toLowerCase() || '';
      const courseCode = course.code?.toLowerCase() || '';
      return courseTitle.includes(query) || courseCode.includes(query);
    });
    setFilteredCourses(filtered);
  };

  const coursesByTerm = filteredCourses.reduce((acc, course) => {
    const term = course.term || 'Unknown Term';
    if (!acc[term]) {
      acc[term] = [];
    }
    acc[term].push(course);
    return acc;
  }, {});

  if (loading && showDashboardContent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Navbar */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <TeacherNavbar 
          onMenuClick={toggleSidebar} 
          selectedSemester={selectedSemester}
          onSemesterChange={setSelectedSemester} // Pass the semester change handler
        />
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed left-0 top-0 bottom-0 w-44">
          <TeacherSidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 mt-24 ${isSidebarVisible ? 'ml-36' : 'ml-0'} overflow-y-auto`}>
        <div className="p-4 bg-gray-100 min-h-full">
          {showDashboardContent ? (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
                <h1 className="text-3xl font-normal">Department Course Sections</h1>
                <div className="flex items-center gap-4 text-blue-600">
                  <a href="/teacher" className="hover:text-blue-800">Home</a>
                  <span className="border-l h-4 border-gray-400" />
                  <a href="/teacher" className="hover:text-blue-800">Dashboard</a>
                </div>
              </div>

              {/* Search Input */}
              <div className="flex justify-end mb-6">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  className="w-48 p-2 border border-gray-300 rounded-full"
                />
              </div>

              {/* Course Sections by Term */}
              {Object.entries(coursesByTerm).map(([term, termCourses]) => (
                <div key={term} className="mb-8">
                  <h2 className="text-xl font-medium text-gray-800 mb-4">{term}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {termCourses.map((course) => (
                      <TeacherCourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
                      {/* Footer */}
                      <div className={`${isSidebarVisible ? 'pl-10' : ''}`}>
    <Footer accreditations={accreditations} />
</div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
