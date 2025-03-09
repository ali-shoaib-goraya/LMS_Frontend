import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockStudents } from "../../../MockData/mockStudents";

const StudentsTable = () => {
  const [students, setStudents] = useState(mockStudents);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(`/dashboard/academic/students${path}`);
    setDropdownOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Course Section Header */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-800">Course Section</h2>
        <p className="text-gray-600">test-100 / CMS NAMAL / Fall 2024</p>
        <div className="border-b border-gray-300 mt-4 mb-4"></div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 text-gray-600 relative">
          {/* Dropdown Button */}
          <div className="relative">
            <button
              className="px-4 py-2 flex items-center space-x-2 hover:text-blue-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>View</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-40 z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleNavigation("/activities")}
                >
                  Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleNavigation("/attendance")}
                >
                  Attendance
                </button>
              </div>
            )}
          </div>

          <button className="px-4 py-2 hover:text-blue-600">Reports</button>
          <button
            className="px-4 py-2 hover:text-blue-600"
            onClick={() => navigate("/dashboard/academic/students")}
          >
            Configuration
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg overflow-x-auto w-full max-w-6xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                <th className="border border-gray-300 px-4 py-3">Registration No.</th>
                <th className="border border-gray-300 px-4 py-3">Name</th>
                <th className="border border-gray-300 px-4 py-3">Program Batch</th>
                <th className="border border-gray-300 px-4 py-3">Section</th>
                <th className="border border-gray-300 px-4 py-3">Status</th>
                <th className="border border-gray-300 px-4 py-3">Grade</th>
                <th className="border border-gray-300 px-4 py-3">GPA</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className="text-center hover:bg-gray-100 transition">
                  <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleCheckboxChange(student.id)}
                      className="cursor-pointer w-4 h-4"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3">{student.registrationNo}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.programBatch}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.section}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.status}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.grade}</td>
                  <td className="border border-gray-300 px-4 py-3">{student.score}</td>
                  <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800">✏️</button>
                    <button className="text-red-600 hover:text-red-800">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;
