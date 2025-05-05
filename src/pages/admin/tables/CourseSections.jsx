import React, { useState } from "react";
import { mockCourses } from "../../../MockData/mockCourses";
import CoursesSectionForm from "../Forms/CoursesSectionForm";
import SelectSemester from "../Forms/BulkCourses1";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const CourseSections = () => {
  const [courses] = useState(mockCourses);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    school: "",
    teacher: "",
    department: "",
    combo: "", // for combined course-semester-section
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((courseId) => courseId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCourses(currentCourses.map((c) => c.id));
    } else {
      setSelectedCourses([]);
    }
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredCourses = courses.filter((course) => {
    const comboString = `${course.course} - ${course.semester} - ${course.section}`.toLowerCase();
    return (
      (!filters.name || course.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.school || course.school.toLowerCase().includes(filters.school.toLowerCase())) &&
      (!filters.teacher || course.teacher.toLowerCase().includes(filters.teacher.toLowerCase())) &&
      (!filters.department || course.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (!filters.combo || comboString.includes(filters.combo.toLowerCase()))
    );
  });

  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Course Sections</h2>
      </div>

      {/* Forms */}
      {showForm ? (
        <CoursesSectionForm onBack={() => setShowForm(false)} />
      ) : showBulkForm ? (
        <SelectSemester onBack={() => setShowBulkForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg">
          {/* Top Buttons */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowForm(true)}
              >
                Create Course Sections
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowBulkForm(true)}
              >
                Add Courses in Bulk
              </button>
            </div>
          </div>

          {/* Table with its own scroll container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[1000px]">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">Select</span>
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onChange={handleSelectAll}
                      checked={
                        currentCourses.length > 0 &&
                        currentCourses.every((c) => selectedCourses.includes(c.id))
                      }
                    />
                  </div>
                </th>

                {/* Filters - All with same width */}
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">Name</span>
                    <input
                      type="text"
                      value={filters.name}
                      onChange={(e) => handleFilterChange(e, "name")}
                      className="w-40 p-1 border rounded text-sm bg-gray-50 text-center"
                    />
                  </div>
                </th>

                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">Course Information</span>
                    <input
                      type="text"
                      value={filters.combo}
                      onChange={(e) => handleFilterChange(e, "combo")}
                      className="w-40 p-1 border rounded text-sm bg-gray-50 text-center"
                    />
                  </div>
                </th>

                {["school", "teacher", "department"].map((key) => (
                  <th key={key} className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="mb-1 capitalize">{key}</span>
                      <input
                        type="text"
                        value={filters[key]}
                        onChange={(e) => handleFilterChange(e, key)}
                        className="w-40 p-1 border rounded text-sm bg-gray-50 text-center"
                      />
                    </div>
                  </th>
                ))}

                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <tr key={course.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleCheckboxChange(course.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.name}</td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {course.course} - {course.semester} - {course.section}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.school}</td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.teacher}</td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.department}</td>
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
                  <td colSpan="8" className="text-center text-gray-600 py-4">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

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

export default CourseSections;