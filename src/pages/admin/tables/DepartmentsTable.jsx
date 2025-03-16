import React, { useState } from "react";
import mockDepartments from "../../../MockData/mockDepartments";
import DepartmentForm from "../Forms/DepartmentForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const DepartmentTable = () => {
  const [departments] = useState(mockDepartments);
  const [showForm, setShowForm] = useState(false); // Toggle form view

  // Pagination (Mock for now)
  const totalItems = departments.length;
  const startIndex = 0;
  const endIndex = totalItems;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Section Header */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Departments</h2>
      </div>

      {/* Show Form or Table */}
      {showForm ? (
        <DepartmentForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Header & Create Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)} // Show form
            >
              Create
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Department Name</th>
                <th className="border border-gray-300 px-4 py-3">School</th>
                <th className="border border-gray-300 px-4 py-3">Type</th>
                <th className="border border-gray-300 px-4 py-3">Default GPA Method</th>
                <th className="border border-gray-300 px-4 py-3">Attendance %</th>
                <th className="border border-gray-300 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <tr key={dept.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.departmentName}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.school}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.type}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.defaultGPAMethod}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.attendancePercentage}%</td>
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button className="hover:opacity-80" onClick={() => setShowForm(true)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button className="hover:opacity-80">
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
