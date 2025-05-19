import React, { useState, useEffect } from "react";
import SemesterForm from "../Forms/SemesterForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import semesterService from "../../../services/semesterService";

const SemesterTable = () => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({
    name: "",
    status: "",
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch semesters from the API
  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await semesterService.getAllSemesters({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        name: filters.name,
        status: filters.status,
      });
      
      setSemesters(response.data.data.items.map(item => ({
        id: item.semesterId,
        name: item.semesterName,
        status: item.status,
        startDate: new Date(item.startDate).toISOString().split('T')[0],
        endDate: new Date(item.endDate).toISOString().split('T')[0],
        notes: item.notes
      })));
      
      setTotalCount(response.data.data.totalCount);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch semesters");
      setLoading(false);
      console.error("Error fetching semesters:", err);
    }
  };

  // Initial fetch and refetch when filters or pagination changes
  useEffect(() => {
    fetchSemesters();
  }, [currentPage, filters]);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleEdit = (semester) => {
    setSelectedSemester(semester);
    setShowForm(true);
  };

  const handleDelete = async (semesterId) => {
    if (window.confirm("Are you sure you want to delete this semester?")) {
      try {
        await semesterService.deleteSemester(semesterId);
        fetchSemesters(); // Refresh the data after deletion
      } catch (err) {
        setError("Failed to delete semester");
        console.error("Error deleting semester:", err);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedSemester(null);
    fetchSemesters(); // Refresh the data after submission
  };

  const handleAddNewClick = () => {
    setSelectedSemester(null); // Clear any previously selected semester
    setShowForm(true);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Semester List</h2>
      </div>

      {showForm ? (
        <SemesterForm 
          semesterData={selectedSemester}
          onBack={() => setShowForm(false)}
          onSubmitSuccess={handleFormSubmit}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              {loading ? "Loading..." : `Showing ${Math.min(1, totalCount)}-${Math.min(currentPage * itemsPerPage, totalCount)} of ${totalCount} items`}
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleAddNewClick}
            >
              Add Semester
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>

                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="mb-1">Name</span>
                    <input
                      type="text"
                      value={filters.name}
                      onChange={(e) => handleFilterChange(e, "name")}
                      className="w-40 p-1 border rounded text-sm bg-gray-50"
                    />
                  </div>
                </th>

                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="mb-1">Status</span>
                    <input
                      type="text"
                      value={filters.status}
                      onChange={(e) => handleFilterChange(e, "status")}
                      className="w-40 p-1 border rounded text-sm bg-gray-50"
                    />
                  </div>
                </th>

                <th className="border border-gray-300 px-4 py-3 text-center">Start Date</th>
                <th className="border border-gray-300 px-4 py-3 text-center">End Date</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Notes</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    Loading semesters...
                  </td>
                </tr>
              ) : semesters.length > 0 ? (
                semesters.map((semester, index) => (
                  <tr key={semester.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{semester.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.status}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.startDate}</td>
                    <td className="border border-gray-300 px-4 py-3">{semester.endDate}</td>
                    <td className="border border-gray-300 px-4 py-3 max-w-xs truncate" title={semester.notes}>
                      {semester.notes}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button className="hover:opacity-80" onClick={() => handleEdit(semester)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button className="hover:opacity-80" onClick={() => handleDelete(semester.id)}>
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    No semesters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded mr-2 ${
                  currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 border rounded mx-1 ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border rounded ml-2 ${
                  currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-gray-200 hover:bg-gray-300"
                }`}
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

export default SemesterTable;