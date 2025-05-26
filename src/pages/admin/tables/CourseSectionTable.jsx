import React, { useState, useEffect } from "react";
import CourseSectionForm from "../Forms/CourseSectionForm";
import SelectSemester from "../Forms/BulkCourses1";
import courseSectionService from "../../../services/courseSectionService";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const CourseSectionTable = () => {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCourseSection, setEditCourseSection] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    name: "",
    school: "",
    teacher: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseSectionService.getCourseSection({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        name: filters.name,
        school: filters.school,
        teacher: filters.teacher,
      });
      
      setCourses(response.data.data.items || []);
      setTotalCount(response.data.data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filters/pagination change
  useEffect(() => {
    fetchCourses();
  }, [currentPage, filters]);

  const handleFilterChange = (e, key) => {
    // Reset to first page when filters change
    setCurrentPage(1);
    setFilters({ ...filters, [key]: e.target.value });
  };

  // Handle edit action
  const handleEdit = async (courseSectionId) => {
    try {
      const response = await courseSectionService.getCourseSectionById(courseSectionId);
      setEditCourseSection(response.data.data);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching course section details:", error);
    }
  };

  // Handle delete action
  const handleDelete = async (courseSectionId) => {
    if (window.confirm("Are you sure you want to delete this course section?")) {
      try {
        await courseSectionService.deleteCourseSection(courseSectionId);
        // Refresh the table
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course section:", error);
      }
    }
  };

  // Handle form close and refresh data
  const handleFormClose = () => {
    setShowForm(false);
    setEditCourseSection(null);
    fetchCourses(); // Refresh data when form closes
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Course Sections</h2>
      </div>

      {/* Forms */}
      {showForm ? (
        <CourseSectionForm 
          onBack={handleFormClose} 
          editMode={!!editCourseSection} 
          initialData={editCourseSection} 
        />
      ) : showBulkForm ? (
        <SelectSemester onBack={() => setShowBulkForm(false)} />
      ) : (
        <div className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg">
          {/* Top Buttons */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {totalCount > 0 ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalCount)}` : "0"} of {totalCount} items
            </h2>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  setEditCourseSection(null);
                  setShowForm(true);
                }}
              >
                Create Course Section
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowBulkForm(true)}
              >
                Add Courses in Bulk
              </button>
            </div>
          </div>

          {/* Table with scroll container */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
              <thead className="bg-white">
                <tr className="text-left border-b border-gray-300">
                  <th className="border border-gray-300 px-4 py-3">#</th>

                  {/* Filters */}
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
                    <span>Course Information</span>
                  </th>

                  <th className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="mb-1">School</span>
                      <input
                        type="text"
                        value={filters.school}
                        onChange={(e) => handleFilterChange(e, "school")}
                        className="w-40 p-1 border rounded text-sm bg-gray-50 text-center"
                      />
                    </div>
                  </th>

                  <th className="border border-gray-300 px-4 py-3 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="mb-1">Teacher</span>
                      <input
                        type="text"
                        value={filters.teacher}
                        onChange={(e) => handleFilterChange(e, "teacher")}
                        className="w-40 p-1 border rounded text-sm bg-gray-50 text-center"
                      />
                    </div>
                  </th>

                  <th className="border border-gray-300 px-4 py-3 text-center">Status</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={course.courseSectionId} className="text-center hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.courseSectionName}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                        {course.courseCode} - {course.semesterName} {course.section ? `- ${course.section}` : ""}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.schoolName}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{course.facultyName}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs ${course.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                                                     course.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                                     'bg-red-100 text-red-800'}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                        <button 
                          className="hover:opacity-80" 
                          onClick={() => handleEdit(course.courseSectionId)}
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button 
                          className="hover:opacity-80"
                          onClick={() => handleDelete(course.courseSectionId)}
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-600 py-4">
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded bg-gray-200 mr-2 disabled:opacity-50"
              >
                «
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show a sensible range of pages
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 border rounded mx-1 ${
                      currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded bg-gray-200 ml-2 disabled:opacity-50"
              >
                »
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSectionTable;