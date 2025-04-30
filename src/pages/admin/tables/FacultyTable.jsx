import React, { useState } from "react";
import { facultyData } from "../../../MockData/mockFaculty";
import FacultyForm from "../Forms/UsersForm"; // Make sure the form is correctly imported
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const FacultyTable = () => {
  const [facultyList, setFacultyList] = useState(facultyData);
  const [showForm, setShowForm] = useState(false); // Toggle faculty form
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    designation: "",
    facultyType: "",
    isPhD: "",
    type: "",
    active: "",
  });

  // Pagination State
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Handle Delete Faculty
  const handleDelete = (id) => {
    setFacultyList(facultyList.filter((faculty) => faculty.id !== id));
  };

  // Handle Filter Change
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  // Apply Filters
  const filteredFaculty = facultyList.filter((faculty) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? faculty[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  // Pagination Logic
  const totalItems = filteredFaculty.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaculty = filteredFaculty.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Faculty Header */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-7xl flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Faculty/Staff</h2>
      </div>

      {/* Conditional Rendering: Show Form or Table */}
      {showForm ? (
        <FacultyForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-7xl">
          {/* Fixed Header Area (not scrollable) */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Add Faculty
            </button>
          </div>

          {/* Table Container - ONLY THIS PART IS SCROLLABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              {/* Table Head */}
              <thead className="bg-white-200">
                <tr className="text-left">
                  <th className="border border-gray-300 px-4 py-3 text-center">#</th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Name</div>
                    <input
                      type="text"
                      value={filters.name}
                      onChange={(e) => handleFilterChange(e, "name")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    />
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Gender</div>
                    {/* <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange(e, "gender")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    >
                      <option value="">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select> */}
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Designation</div>
                    <input
                      type="text"
                      value={filters.designation}
                      onChange={(e) => handleFilterChange(e, "designation")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    />
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Faculty Type</div>
                    <input
                      type="text"
                      value={filters.facultyType}
                      onChange={(e) => handleFilterChange(e, "facultyType")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    />
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Is PhD?</div>
                    {/* <select
                      value={filters.isPhD}
                      onChange={(e) => handleFilterChange(e, "isPhD")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    >
                      <option value="">All</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select> */}
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Type</div>
                    <input
                      type="text"
                      value={filters.type}
                      onChange={(e) => handleFilterChange(e, "type")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    />
                  </th>
                  <th className="border border-gray-300 px-4 py-3">
                    <div className="text-center">Active</div>
                    {/* <select
                      value={filters.active}
                      onChange={(e) => handleFilterChange(e, "active")}
                      className="w-32 mx-auto mt-1 p-2 border rounded text-sm bg-gray-50 block"
                    >
                      <option value="">All</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select> */}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body with whitespace-nowrap to prevent text breaking */}
              <tbody>
                {currentFaculty.length > 0 ? (
                  currentFaculty.map((faculty, index) => (
                    <tr key={faculty.id} className="text-left hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-3 text-center">{startIndex + index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.name}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.gender}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.designation}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.facultyType}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.isPhD}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.type}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.active}</td>
                      <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                        <button className="hover:opacity-80" onClick={() => setShowForm(true)}>
                          <img src={editIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button className="hover:opacity-80" onClick={() => handleDelete(faculty.id)}>
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-gray-600 py-4">
                      No faculty found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination - Outside scrollable area */}
          <div className="flex justify-start mt-4">
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-2 border rounded bg-gray-200 mr-2"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1} 
                onClick={() => setCurrentPage(i + 1)} 
                className={`px-3 py-2 border rounded mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-3 py-2 border rounded bg-gray-200 ml-2"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyTable;