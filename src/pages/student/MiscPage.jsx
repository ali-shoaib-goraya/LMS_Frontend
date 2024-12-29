// pages/student/MiscPage.jsx
import React from 'react';

const Misc = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Miscellaneous Information</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Important Announcements</h3>
            <p className="mt-2 text-gray-600">No new announcements</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Downloads</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-blue-600 hover:underline cursor-pointer">Academic Calendar</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Fee Structure</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Student Handbook</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Misc;