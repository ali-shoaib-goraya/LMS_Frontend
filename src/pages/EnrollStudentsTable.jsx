import React, { useState, useEffect } from "react";
import studentService from "../services/studentService";

// --- Custom Checkbox Component ---
// This is the custom checkbox component we're using instead of Material-UI's Checkbox.
const CustomCheckbox = ({ checked, onChange, indeterminate = false }) => {
  const checkboxRef = React.useRef();

  // useEffect to set the indeterminate state
  // This is necessary because the `indeterminate` prop is a property, not an HTML attribute,
  // and needs to be set programmatically on the DOM element.
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      checked={checked}
      onChange={onChange}
      // You can add Tailwind CSS classes here for basic styling if needed
      // For example: className="form-checkbox h-5 w-5 text-blue-600 rounded"
    />
  );
};
// --- End Custom Checkbox Component ---

const EnrollStudentsTable = ({ courseSectionId, onBack, onEnrollSuccess }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  const [filters, setFilters] = useState({
    enrollmentNo: "",
    name: "",
    programBatch: "",
    section: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch students from backend
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentService.getAllStudents({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        name: filters.name,
        enrollmentNo: filters.enrollmentNo,
        programBatch: filters.programBatch,
        section: filters.section,
      });

      if (response.data && response.data.data) {
        setStudents(response.data.data.items || []);
        setTotalCount(response.data.data.totalCount || 0);
        setTotalPages(Math.ceil((response.data.data.totalCount || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students. Please try again.");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchStudents();
    }, 300); // Debounce search

    return () => clearTimeout(debounceTimer);
  }, [currentPage, filters]);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all students currently displayed in the table
      setSelectedStudents(students.map(student => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleEnrollStudents = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student to enroll.");
      return;
    }

    setEnrolling(true);
    try {
      // Replace with your actual enrollment service call
      await studentService.enrollStudentsInCourseSection({
        studentIds: selectedStudents,
        courseSectionId: courseSectionId
      });
      onEnrollSuccess(); // Trigger success callback from parent
      setSelectedStudents([]); // Clear selection after successful enrollment
      alert("Students enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling students:", error);
      alert("Failed to enroll students. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  // endIndex calculation is slightly off if itemsPerPage is not exactly students.length
  // It should be startIndex + students.length to reflect the actual number of items on the current page
  const displayEndIndex = startIndex + students.length;


  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6">
        <h2 className="text-lg text-gray-800">
          {loading ? (
            "Loading..."
          ) : (
            <>Showing {startIndex + 1}-{displayEndIndex} of {totalCount} students</>
          )}
        </h2>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={onBack}
          >
            Back
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={handleEnrollStudents}
            disabled={selectedStudents.length === 0 || enrolling}
          >
            {enrolling ? "Enrolling..." : `Enroll Selected (${selectedStudents.length})`}
          </button>
        </div>
      </div>

      {error && (
        <div className="px-6 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Table with horizontal scrolling */}
      <div className="px-6">
        <div className="overflow-x-auto w-full border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                  {/* Master checkbox for select all/none */}
                  <CustomCheckbox
                    checked={selectedStudents.length > 0 && selectedStudents.length === students.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedStudents.length > 0 && selectedStudents.length < students.length}
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">#</th>
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col text-center">
                    <span>Registration No.</span>
                    <input
                      type="text"
                      value={filters.enrollmentNo}
                      onChange={(e) => handleFilterChange(e, "enrollmentNo")}
                      className="w-full mt-1 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Filter..."
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col text-center">
                    <span>Name</span>
                    <input
                      type="text"
                      value={filters.name}
                      onChange={(e) => handleFilterChange(e, "name")}
                      className="w-full mt-1 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Filter..."
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col text-center">
                    <span>Program Batch</span>
                    <input
                      type="text"
                      value={filters.programBatch}
                      onChange={(e) => handleFilterChange(e, "programBatch")}
                      className="w-full mt-1 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Filter..."
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col text-center">
                    <span>Section</span>
                    <input
                      type="text"
                      value={filters.section}
                      onChange={(e) => handleFilterChange(e, "section")}
                      className="w-full mt-1 p-1 text-sm border border-gray-300 rounded"
                      placeholder="Filter..."
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center text-gray-600 py-8">
                    Loading students...
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student, index) => (
                  <tr key={student.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      <CustomCheckbox
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {startIndex + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {student.enrollmentNo}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {student.programBatch}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                      {student.section}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-600 py-8">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-start p-6 pt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded bg-gray-200 mr-2 disabled:opacity-50"
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const showPage =
            pageNum === 1 ||
            pageNum === totalPages ||
            (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

          if (!showPage) {
            if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
              return <span key={pageNum} className="px-3 py-2">...</span>;
            }
            return null;
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
    </div>
  );
};

export default EnrollStudentsTable;