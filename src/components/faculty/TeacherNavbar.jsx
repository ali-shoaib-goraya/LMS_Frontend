import React, { useState, useRef, useEffect } from 'react';
import logo from '@/assets/logo.png';
import Bars3Icon from '@/assets/bars.png';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { mockSemesters } from '../../MockData/mockSemesters';
import { useAuth } from '../../auth/AuthContext';

function TeacherNavbar({ onMenuClick, selectedSemester, onSemesterChange }) {
  const { user, logout } = useAuth(); // 👈 using context instead of Redux
  const userName = user?.Email || "Guest";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const getInitials = () => {
    if (!user?.Email) return "AB";
    const parts = user.Email.split('@')[0].split('.');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : user.Email.substring(0, 2).toUpperCase();
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = () => {
    logout(); // 👈 from AuthContext
    setIsDropdownOpen(false);
    navigate("/faculty-login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSemesterChange = (event) => onSemesterChange(event.target.value);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="w-full px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="LMS Logo" className="h-20 w-auto" />
            <h1 className="text-4xl font-bold text-primary-700">LMS</h1>
            <button
              type="button"
              className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onMenuClick}
            >
              <img src={Bars3Icon} alt="Menu" className="h-8 w-8" />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Semester Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Working Semester</span>
              <select
                className="border rounded py-1 px-2 text-sm bg-white"
                value={selectedSemester}
                onChange={handleSemesterChange}
              >
                {mockSemesters.map((semester, index) => (
                  <option key={index} value={semester.name}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 
                       18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 
                       3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 
                       0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 text-white text-sm font-medium"
              >
                {getInitials()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-500">Faculty Member</p>
                  </div>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    <FaUser className="mr-2 text-gray-500" size={14} />
                    Profile
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt className="mr-2 text-gray-500" size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TeacherNavbar;

