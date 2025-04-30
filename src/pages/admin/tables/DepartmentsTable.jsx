import React, { useState } from "react";
import mockDepartments from "../../../MockData/mockDepartments";
import DepartmentForm from "../Forms/DepartmentForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const DepartmentTable = () => {
  const [departments] = useState(mockDepartments);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    departmentName: "",
    school: "",
    type: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter departments
  const filteredDepartments = departments.filter((dept) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? dept[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
              Showing {filteredDepartments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
              -
              {Math.min(currentPage * itemsPerPage, filteredDepartments.length)} of{" "}
              {filteredDepartments.length} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Create
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white-200">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-1">
                  <div className="flex flex-col text-center">
                    <span>Department Name</span>
                    <input
                      type="text"
                      className="mt-1 p-1 border rounded text-sm bg-gray-50"
                      value={filters.departmentName}
                      onChange={(e) => handleFilterChange(e, "departmentName")}
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-1">
                  <div className="flex flex-col text-center">
                    <span>School</span>
                    <input
                      type="text"
                      className="mt-1 p-1 border rounded text-sm bg-gray-50"
                      value={filters.school}
                      onChange={(e) => handleFilterChange(e, "school")}
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-1">
                  <div className="flex flex-col text-center">
                    <span>Type</span>
                    <input
                      type="text"
                      className="mt-1 p-1 border rounded text-sm bg-gray-50"
                      value={filters.type}
                      onChange={(e) => handleFilterChange(e, "type")}
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-1">Default GPA Method</th>
                <th className="border border-gray-300 px-4 py-1">Attendance %</th>
                <th className="border border-gray-300 px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepartments.length > 0 ? (
                paginatedDepartments.map((dept, index) => (
                  <tr key={dept.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{dept.departmentName}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.school}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.type}</td>
                    <td className="border border-gray-300 px-4 py-3">{dept.defaultGPAMethod}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      {dept.attendancePercentage}%
                    </td>
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

          <div className="flex justify-start mt-4">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 border rounded bg-gray-200 mr-2">
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-2 border rounded mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 border rounded bg-gray-200 ml-2">
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
