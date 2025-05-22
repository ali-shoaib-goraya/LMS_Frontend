import React, { useState, useEffect } from "react";
import studentService from "../../../services/studentService";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import StudentForm from "../Forms/StudentForm";
import BulkStudentsForm from "../Forms/BulkStudentsForm";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Load students on component mount and when filters/page change
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

  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
    setShowBulkForm(false);
  };

  const handleAddStudentInBulk = () => {
    setShowBulkForm(true);
    setShowForm(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
    setShowBulkForm(false);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentService.deleteStudent(studentId);
        fetchStudents(); // Refresh the list
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setShowBulkForm(false);
    setEditingStudent(null);
    fetchStudents(); // Refresh the list
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setShowBulkForm(false);
    setEditingStudent(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + students.length, totalCount);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white p-4 shadow-md rounded-md mb-4 mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Students</h2>
      </div>

      {showForm ? (
        <StudentForm
          onBack={handleFormCancel}
          onSuccess={handleFormSuccess}
          student={editingStudent}
        />
      ) : showBulkForm ? (
        <BulkStudentsForm
          onBack={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      ) : (
        <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
          {/* Top Bar */}
          <div className="flex justify-between items-center p-6">
            <h2 className="text-lg text-gray-800">
              {loading ? (
                "Loading..."
              ) : (
                <>Showing {startIndex + 1}-{endIndex} of {totalCount} items</>
              )}
            </h2>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleAddStudentInBulk}
              >
                Add Students in Bulk
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
                    <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">Guardian Name</th>
                    <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">Guardian Contact</th>
                    <th className="border border-gray-300 px-4 py-3 whitespace-nowrap">Email</th>
                    <th className="border border-gray-300 px-4 py-3 text-center whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center text-gray-600 py-8">
                        Loading students...
                      </td>
                    </tr>
                  ) : students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id} className="text-center hover:bg-gray-100 transition">
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
                        <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                          {student.guardianName || "-"}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                          {student.guardianContact || "-"}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                          {student.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                          <div className="flex justify-center gap-2">
                            <button
                              className="hover:opacity-80"
                              onClick={() => handleEditStudent(student)}
                              title="Edit Student"
                            >
                              <img src={editIcon} alt="Edit" className="w-5 h-5" />
                            </button>
                            <button
                              className="hover:opacity-80"
                              onClick={() => handleDeleteStudent(student.id)}
                              title="Delete Student"
                            >
                              <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-gray-600 py-8">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination - Always show but disable when only one page */}
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
      )}
    </div>
  );
};

export default StudentsTable;