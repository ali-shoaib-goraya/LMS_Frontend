import React, { useState } from "react";
import { facultyData } from "../../../MockData/mockFaculty";

const FacultyTable = () => {
  const [facultyList, setFacultyList] = useState(facultyData);

  // Handle delete action
  const handleDelete = (id) => {
    setFacultyList(facultyList.filter((faculty) => faculty.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Faculty Header */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-800">Faculty/Staff</h2>
        <p className="text-gray-600">Faculty/Staff is created from users option</p>

        <div className="flex gap-2 mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Export</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md">Export 2</button>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white p-6 shadow-lg rounded-lg overflow-x-auto w-full max-w-7xl">
        <table className="w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="border border-gray-300 px-4 py-3">#</th>
              <th className="border border-gray-300 px-4 py-3">Name</th>
              <th className="border border-gray-300 px-4 py-3">Gender</th>
              <th className="border border-gray-300 px-4 py-3">Designation</th>
              <th className="border border-gray-300 px-4 py-3">Highest Degree</th>
              <th className="border border-gray-300 px-4 py-3">Faculty Type</th>
              <th className="border border-gray-300 px-4 py-3">Is PhD?</th>
              <th className="border border-gray-300 px-4 py-3">Type</th>
              <th className="border border-gray-300 px-4 py-3">Departments</th>
              <th className="border border-gray-300 px-4 py-3">Active</th>
              <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {facultyList.map((faculty, index) => (
              <tr key={faculty.id} className="text-left hover:bg-gray-100 transition">
                <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-3 flex items-center gap-2">
                  {faculty.avatar ? (
                    <div className="w-8 h-8 bg-gray-300 text-white flex items-center justify-center rounded-full">
                      {faculty.avatar}
                    </div>
                  ) : (
                    <img src="https://via.placeholder.com/40" alt="Profile" className="w-8 h-8 rounded-full" />
                  )}
                  {faculty.name}
                </td>
                <td className="border border-gray-300 px-4 py-3">{faculty.gender}</td>
                <td className="border border-gray-300 px-4 py-3">{faculty.designation}</td>
                <td className="border border-gray-300 px-4 py-3">{faculty.highestDegree}</td>
                <td className="border border-gray-300 px-4 py-3">{faculty.facultyType}</td>
                <td className="border border-gray-300 px-4 py-3">{faculty.isPhD}</td>
                <td className="border border-gray-300 px-4 py-3">{faculty.type}</td>
                <td className="border border-gray-300 px-4 py-3">
                  {faculty.departments.map((dept, i) => (
                    <p key={i}>{dept}</p>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-3">{faculty.active}</td>
                <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800">👁️</button>
                  <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(faculty.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacultyTable;
