import React, { useState } from "react";
import { mockStudents } from "../../../MockData/mockStudents";
import UserForm from "../Forms/UsersForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const StudentsTable = () => {
  const [students] = useState(mockStudents);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form view

  const [filters, setFilters] = useState({
    registrationNo: "",
    name: "",
    programBatch: "",
    section: "",
    status: "",
    grade: "",
    gpa: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredStudents = students.filter((student) =>
    Object.keys(filters).every((key) =>
      filters[key] ? student[key]?.toString().toLowerCase().includes(filters[key].toLowerCase()) : true
    )
  );

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Course Section Header */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Studetns</h2>
      </div>

      {/* Conditional Rendering: Show form or table */}
      {showForm ? (
        <UserForm onBack={() => setShowForm(false)} /> // Show form when button is clicked
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)} // Show form on button click
            >
              Add Studnets
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                <th className="border border-gray-300 px-4 py-3">
                  Registration No.
                  <input
                    type="text"
                    value={filters.registrationNo}
                    onChange={(e) => handleFilterChange(e, "registrationNo")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Name
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Program Batch
                  <select
                    value={filters.programBatch}
                    onChange={(e) => handleFilterChange(e, "programBatch")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  >
                    <option value="">- Select -</option>
                    {[...new Set(students.map((s) => s.programBatch))].map((batch) => (
                      <option key={batch} value={batch}>
                        {batch}
                      </option>
                    ))}
                  </select>
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Section
                  <input
                    type="text"
                    value={filters.section}
                    onChange={(e) => handleFilterChange(e, "section")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">Status</th>
                <th className="border border-gray-300 px-4 py-3">Grade</th>
                <th className="border border-gray-300 px-4 py-3">GPA</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? (
                currentStudents.map((student, index) => (
                  <tr key={student.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
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
                    <td className="border border-gray-300 px-4 py-3">{student.gpa}</td>
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
                  <td colSpan="10" className="text-center text-gray-600 py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        {/* Pagination */}
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

export default StudentsTable;
