import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import useAuthInit from "../hooks/useAuthInit";
import { useEffect } from "react";

const HomePage = () => {
  const { initializeAuth } = useAuthInit();

  useEffect(() => {
    initializeAuth();
  }, []);

  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  // console.log('USER:', user);
  // console.log("tOKEN:", token);
  if (token && user?.Type === 'Faculty') {
    return <Navigate to="/dashboard" />;
  }

  if (token && user?.Type === 'Student') {
    return <Navigate to="/student" />;
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

      <div className="relative flex flex-col items-center justify-center py-20 bg-cover bg-center text-white" style={{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80\')' }}>
        <h1 className="text-5xl font-bold mb-6">Welcome to University LMS</h1>
        <p className="text-lg mb-10 max-w-3xl text-center">
          Transform your learning experience with our state-of-the-art Learning Management System that empowers students, faculty, and administrators to succeed.
        </p>
        <div className="flex gap-6">
          <button className="px-6 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition duration-200 shadow-md">Book a Demo</button>
          <button className="px-6 py-3 bg-secondary-700 text-white rounded-lg hover:bg-secondary-800 transition duration-200 shadow-md">Request Information</button>
        </div>
      </div>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-700 mb-8">Why Choose Our LMS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src="https://images.unsplash.com/photo-1584697964359-f19234c65529?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Feature 1" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Streamlined Learning</h3>
              <p className="text-gray-600 mt-2">Access all your learning resources in one place.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Feature 2" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Collaboration Tools</h3>
              <p className="text-gray-600 mt-2">Work together with peers and instructors seamlessly.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img src="https://images.unsplash.com/photo-1555431189-0fabf7145274?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="Feature 3" className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Performance Tracking</h3>
              <p className="text-gray-600 mt-2">Monitor your progress and achieve your goals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;