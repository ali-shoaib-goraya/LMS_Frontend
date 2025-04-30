  import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { sampleCourses } from '../../MockData/CourseData';
import Navbar from '../../components/student/Navbar';
import Sidebar from '../../components/student/Sidebar';
import Footer from '../../components/student/Footer'; 

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const location = useLocation();

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
        setCourses(sampleCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const showDashboardContent = location.pathname === '/student';

  if (loading && showDashboardContent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Navbar onMenuClick={toggleSidebar} />
      </div>
  
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="fixed left-0 top-0 bottom-0 w-44 z-40">
          <Sidebar />
        </div>
      )}
  
      {/* Content + Footer Wrapper */}
      <div className={`pt-24 ${isSidebarVisible ? 'pl-44' : ''}`}>
        <div className="p-2 bg-gray-100 min-h-[calc(100vh-64px-200px)]">
          {showDashboardContent ? (
            <>
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
                <h1 className="text-3xl font-normal">Ongoing Courses</h1>
                <div className="flex gap-4">
                  <a href="/student" className="text-blue-600 hover:text-blue-800">
                    Home
                  </a>
                  <span className="text-gray-500">Ongoing Courses</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
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

export default StudentDashboard;
