import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import coursemanagement from "../assets/coursemanagement.jpg";
import timetable from "../assets/timetable.png";
import attendance from "../assets/attendance.png";
import progresstracking from "../assets/progresstracking.png";
import discussionforum from "../assets/discussionforum.png";
import namal from "../assets/namal.jpg";
import Footer from "../components/student/Footer";
import { useAuth } from "../auth/AuthContext";

const HomePage = () => {
  const { initializeAuth } = useAuthInit();
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
    initializeAuth();
  }, []);

  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  
  // Handle authentication redirects
  if (accessToken) {
    if (user?.Type === 'Faculty' || user?.Type === 'CampusAdmin') {
      return <Navigate to="/dashboard" />;
    } else if (user?.Type === 'Student') {
      return <Navigate to="/student" />;
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="flex justify-between items-center p-5 bg-white shadow-sm">
        <div className="text-2xl font-bold text-primary-700">University LMS</div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
            onClick={() => navigate("/faculty-login")}
          >
            Faculty Login
          </button>
          <button
            className="px-4 py-2 bg-secondary-700 text-white rounded hover:bg-secondary-800"
            onClick={() => navigate("/student-login")}
          >
            Student Login
          </button>
        </div>
      </header>

      <div
        className="relative flex flex-col items-center justify-center py-32 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${namal})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '80vh' }}
      >
        <h1 className="text-5xl font-bold mb-6">Welcome to University LMS</h1>
        <p className="text-lg mb-10 max-w-3xl text-center">
          Transform your learning experience with our state-of-the-art Learning Management System that empowers students, faculty, and administrators to succeed.
        </p>
        <div className="flex gap-6">
          {/* <button className="px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition duration-200 shadow-md">Book a Demo</button>
          <button className="px-6 py-3 bg-secondary-700 text-white rounded-lg hover:bg-secondary-800 transition duration-200 shadow-md">Request Information</button> */}
        </div>
      </div>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-700 mb-8">Why Choose Our LMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src={coursemanagement} 
                alt="Course Management" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Course Management</h3>
              <p className="text-gray-600 mt-2">Create, update, and manage courses seamlessly for all academic levels.</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src={timetable} 
                alt="Timetable Generation" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Timetable Generation</h3>
              <p className="text-gray-600 mt-2">Automatically generate class and lab schedules to save time and avoid clashes.</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src={attendance} 
                alt="Attendance Management" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Attendance Management</h3>
              <p className="text-gray-600 mt-2">Track student attendance lab-wise with smart summaries and totals.</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src={progresstracking} 
                alt="Progress Tracking" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Progress Tracking</h3>
              <p className="text-gray-600 mt-2">Monitor student performance and visualize academic growth over time.</p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src={discussionforum} 
                alt="Collaboration Tools" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Faculty & Student Collaboration</h3>
              <p className="text-gray-600 mt-2">Enable smooth communication between faculty and students for better learning.</p>
            </div>
          </div>
        </div>
      </section>
{/* Footer */}
<Footer accreditations={accreditations} />
    </div>
  );
};

export default HomePage;