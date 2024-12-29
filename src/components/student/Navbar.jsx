import React from 'react';
import BellIcon from '@/assets/bell.png'; 
import Bars3Icon from '@/assets/bars.png'; 
import logo from '@/assets/logo.png';
import ProfileImage from '@/assets/profile.jpg'; // Assuming you have a profile image

function Navbar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="w-full px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center">
            <img src={logo} alt="LMS Logo" className="h-16 w-auto" />
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
            {/* Profile Image */}
            <img
              src={ProfileImage}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
