import React, { useState } from "react";
import { mockCourses2 } from "../../../MockData/mockCourses2";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import CoursesForm from "../Forms/CourseForm";

const CoursesTable = () => {
  const [courses] = useState(mockCourses2);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [filters, setFilters] = useState({
    courseId: "",
    courseName: "",
    courseCode: "",
    creditHours: "",
    isLab: "",
    isCompulsory: "",
    isTheory: "",
    connectedCourseId: "",
    objective: "",
    notes: "",
    departmentId: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((courseId) => courseId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle filter change
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  // Filtering courses based on search input
  const filteredCourses = courses.filter((course) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? course[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-7xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Course Details</h2>
      </div>

      {/* Conditional Rendering for Forms */}
      {showForm ? (
        <CoursesForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="w-full max-w-7xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowForm(true)}
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                {["courseId", "courseName", "courseCode", "creditHours", "isLab", "isCompulsory", "isTheory", "connectedCourseId", "departmentId"].map((key) => (
                  <th key={key} className="border border-gray-300 px-4 py-3">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <input
                      type="text"
                      value={filters[key]}
                      onChange={(e) => handleFilterChange(e, key)}
                      className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                      placeholder={`Search ${key}`}
                    />
                  </th>
                ))}
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.courseId)}
                        onChange={() => handleCheckboxChange(course.courseId)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    {["courseId", "courseName", "courseCode", "creditHours", "isLab", "isCompulsory", "isTheory", "connectedCourseId", "departmentId"].map((key) => (
                      <td key={key} className="border border-gray-300 px-4 py-3">{course[key]?.toString()}</td>
                    ))}
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button className="hover:opacity-80">
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
                  <td colSpan="13" className="text-center text-gray-600 py-4">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
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
                className={`px-3 py-2 border rounded mx-1 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
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

export default CoursesTable;
