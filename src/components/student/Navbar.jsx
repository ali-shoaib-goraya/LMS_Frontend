import React, { useState } from 'react';
import BellIcon from '@/assets/bell.png'; 
import Bars3Icon from '@/assets/bars.png'; 
import logo from '@/assets/logo.png';
import ProfileImage from '@/assets/profile.jpg';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; 

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const userName = user ? user.Email : "Guest";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/faculty-login");
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="w-full px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center">
            <img src={logo} alt="LMS Logo" className="h-20 w-auto" />
            <h1 className="ml-4 text-4xl font-bold text-primary-700">LMS</h1>
          </div>

          {/* Center Section */}
          <button
            type="button"
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={onMenuClick}
          >
            <img src={Bars3Icon} alt="Menu" className="h-8 w-8" />
          </button>

          {/* Right Section */}
          <div className="ml-auto flex items-center space-x-6">
            {/* Notification Icon */}
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <img src={BellIcon} alt="Notifications" className="h-8 w-8" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <img
                src={ProfileImage}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20">
                  {/* User Info */}
                  <div className="flex items-center px-4 py-2 border-b">
                    <img
                      src={ProfileImage}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium">{userName}</p>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => alert("Profile clicked")}
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </button>

                  <button
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt className="mr-2" />
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

export default Navbar;
