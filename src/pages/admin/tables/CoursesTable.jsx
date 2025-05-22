import React, { useState, useEffect } from "react";
import courseService from "../../../services/courseService";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import CoursesForm from "../Forms/CourseForm";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    courseName: "",
    courseCode: "",
    department: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Load courses on component mount and when filters/pagination change
  useEffect(() => {
    loadCourses();
  }, [currentPage, filters]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await courseService.getCourses({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        courseCode: filters.courseCode,
        department: filters.department,
        courseName: filters.courseName,
      });

      const { items, totalCount } = response.data.data;
      setCourses(items || []);
      setTotalItems(totalCount || 0);
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.error("Failed to load courses:", error);
      setCourses([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.deleteCourse(courseId);
        console.log("Course deleted successfully!");
        loadCourses(); // Refresh the table
      } catch (error) {
        console.error("Failed to delete course:", error);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const handleFormSubmitSuccess = () => {
    loadCourses(); // Refresh the table after successful form submission
  };

  const handleFormBack = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-7xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Course Details</h2>
      </div>

      {/* Conditional Rendering for Form */}
      {showForm ? (
        <CoursesForm 
          onBack={handleFormBack} 
          editingCourse={editingCourse}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      ) : (
        <div className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg">
          {/* Table Info and Controls */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4">
            <h2 className="text-lg text-gray-800">
              {loading ? (
                "Loading..."
              ) : (
                `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, totalItems)} of ${totalItems} items`
              )}
            </h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 whitespace-nowrap"
                onClick={handleAddCourse}
                disabled={loading}
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Scrollable Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[1400px]">
              <thead className="bg-white-100">
                <tr className="border-b border-gray-300 text-center">
                  <th className="border border-gray-300 px-4 py-3 w-16">#</th>
                  <th className="border border-gray-300 px-4 py-3 text-center min-w-40">
                    Course Name
                    <div className="flex justify-center mt-1">
                      <input
                        type="text"
                        value={filters.courseName}
                        onChange={(e) => handleFilterChange(e, "courseName")}
                        className="w-40 p-2 border rounded text-sm bg-gray-50"
                        placeholder="Filter by name..."
                        disabled={loading}
                      />
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center min-w-32">
                    Course Code
                    <div className="flex justify-center mt-1">
                      <input
                        type="text"
                        value={filters.courseCode}
                        onChange={(e) => handleFilterChange(e, "courseCode")}
                        className="w-40 p-2 border rounded text-sm bg-gray-50"
                        placeholder="Filter by code..."
                        disabled={loading}
                      />
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center min-w-48">
                    Department
                    <div className="flex justify-center mt-1">
                      <input
                        type="text"
                        value={filters.department}
                        onChange={(e) => handleFilterChange(e, "department")}
                        className="w-40 p-2 border rounded text-sm bg-gray-50"
                        placeholder="Filter by department..."
                        disabled={loading}
                      />
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-3 w-24">Credit Hours</th>
                  <th className="border border-gray-300 px-4 py-3 w-20">Is Lab</th>
                  <th className="border border-gray-300 px-4 py-3 w-20">Is Theory</th>
                  <th className="border border-gray-300 px-4 py-3 w-24">Is Compulsory</th>
                  <th className="border border-gray-300 px-4 py-3 min-w-64">Objective</th>
                  <th className="border border-gray-300 px-4 py-3 min-w-64">Notes</th>
                  <th className="border border-gray-300 px-4 py-3 text-center w-24">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center text-gray-600 py-8">
                      Loading courses...
                    </td>
                  </tr>
                ) : courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={course.courseId} className="text-center hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        <div className="whitespace-nowrap overflow-visible">
                          {course.courseName}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="whitespace-nowrap">
                          {course.courseCode}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        <div className="whitespace-nowrap overflow-visible">
                          {course.department}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">{course.creditHours}</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                          course.isLab ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.isLab ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                          course.isTheory ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.isTheory ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                          course.isCompulsory ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.isCompulsory ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        <div className="whitespace-nowrap overflow-visible" title={course.objective}>
                          {course.objective}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        <div className="whitespace-nowrap overflow-visible" title={course.notes}>
                          {course.notes || '-'}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button 
                            className="hover:opacity-80"
                            onClick={() => handleEdit(course)}
                            title="Edit course"
                          >
                            <img src={editIcon} alt="Edit" className="w-5 h-5" />
                          </button>
                          <button 
                            className="hover:opacity-80"
                            onClick={() => handleDelete(course.courseId)}
                            title="Delete course"
                          >
                            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center text-gray-600 py-8">
                      No courses found. {filters.courseName || filters.courseCode || filters.department ? 'Try adjusting your filters.' : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Fixed Pagination */}
          {totalPages > 1 && (
            <div className="flex  items-center mt-4 sticky bottom-0 bg-white pt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="px-3 py-2 border rounded bg-gray-200 mr-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                ≪
              </button>
              
              {generatePageNumbers().map((page, index) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    className={`px-3 py-2 border rounded mx-1 disabled:opacity-50 min-w-10 ${
                      currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className="px-3 py-2 border rounded bg-gray-200 ml-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                ≫
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesTable;