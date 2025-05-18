import React, { useState, useEffect } from "react";
import programService from "../../../services/programService";
import ProgramForm from "../Forms/ProgramForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import { toast } from "react-toastify";

const ProgramTable = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    programName: "",
    departmentName: "",
    degreeType: "",
    code: "",
  });

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Fetch programs on initial load and when pagination/filter changes
  useEffect(() => {
    fetchPrograms();
  }, [pagination.pageNumber, filters]);

  // Function to fetch programs
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await programService.getAllPrograms({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        programName: filters.programName,
        departmentName: filters.departmentName,
        degreeType: filters.degreeType,
        code: filters.code,
      });

      setPrograms(response.data.data.items);
      setPagination(prev => ({
        ...prev,
        totalCount: response.data.data.totalCount,
      }));
    } catch (error) {
      console.error("Failed to fetch programs:", error);
      toast.error("Failed to load programs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setPagination(prev => ({ ...prev, pageNumber: 1 })); // Reset to first page on filter change
  };

  // Handle edit program
  const handleEditProgram = (program) => {
    setSelectedProgram(program);
    setShowForm(true);
  };

  // Handle delete program
  const handleDeleteProgram = async (programId) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await programService.deleteProgram(programId);
        toast.success("Program deleted successfully");
        fetchPrograms(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete program:", error);
        toast.error("Failed to delete program. Please try again.");
      }
    }
  };

  // Handle form submission (create/update)
  const handleFormSubmit = async (isUpdated = false) => {
    setShowForm(false);
    setSelectedProgram(null);
    
    if (isUpdated) {
      toast.success("Program updated successfully");
    } else {
      toast.success("Program created successfully");
    }
    
    fetchPrograms(); // Refresh the list
  };

  // Calculate total pages
  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Programs</h2>
      </div>

      {showForm ? (
        <ProgramForm 
          onBack={() => {
            setShowForm(false);
            setSelectedProgram(null);
          }} 
          program={selectedProgram}
          onSubmitSuccess={handleFormSubmit}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {programs.length > 0 ? (pagination.pageNumber - 1) * pagination.pageSize + 1 : 0}-
              {Math.min(pagination.pageNumber * pagination.pageSize, pagination.totalCount)} of {pagination.totalCount} programs
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Create Program
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">
                  <div className="flex flex-col">
                    <span className="mb-1">Program Name</span>
                    <input
                      type="text"
                      value={filters.programName}
                      onChange={(e) => handleFilterChange(e, "programName")}
                      className="w-full p-2 border rounded text-sm bg-gray-50"
                      placeholder="Filter program"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  <div className="flex flex-col">
                    <span className="mb-1">Department</span>
                    <input
                      type="text"
                      value={filters.departmentName}
                      onChange={(e) => handleFilterChange(e, "departmentName")}
                      className="w-full p-2 border rounded text-sm bg-gray-50"
                      placeholder="Filter department"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  <div className="flex flex-col">
                    <span className="mb-1">Code</span>
                    <input
                      type="text"
                      value={filters.code}
                      onChange={(e) => handleFilterChange(e, "code")}
                      className="w-full p-2 border rounded text-sm bg-gray-50"
                      placeholder="Filter code"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  <div className="flex flex-col">
                    <span className="mb-1">Degree Type</span>
                    <input
                      type="text"
                      value={filters.degreeType}
                      onChange={(e) => handleFilterChange(e, "degreeType")}
                      className="w-full p-2 border rounded text-sm bg-gray-50"
                      placeholder="Filter degree type"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3">Duration</th>
                <th className="border border-gray-300 px-4 py-3">Credit Required</th>
                <th className="border border-gray-300 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center text-gray-600 py-4">
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  </td>
                </tr>
              ) : programs.length > 0 ? (
                programs.map((program, index) => (
                  <tr key={program.programId} className="hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      {(pagination.pageNumber - 1) * pagination.pageSize + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{program.programName}</td>
                    <td className="border border-gray-300 px-4 py-3">{program.departmentName}</td>
                    <td className="border border-gray-300 px-4 py-3">{program.code}</td>
                    <td className="border border-gray-300 px-4 py-3">{program.degreeType}</td>
                    <td className="border border-gray-300 px-4 py-3">{program.duration}</td>
                    <td className="border border-gray-300 px-4 py-3">{program.creditRequired}</td>
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button 
                        className="hover:opacity-80" 
                        onClick={() => handleEditProgram(program)}
                      >
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button 
                        className="hover:opacity-80"
                        onClick={() => handleDeleteProgram(program.programId)}
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-600 py-4">
                    No programs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setPagination(prev => ({ ...prev, pageNumber: Math.max(prev.pageNumber - 1, 1) }))}
                disabled={pagination.pageNumber === 1}
                className="px-3 py-2 border rounded bg-gray-200 mr-2 disabled:opacity-50"
              >
                «
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  const middleIndex = Math.min(
                    Math.max(pagination.pageNumber, 3),
                    totalPages - 2
                  );
                  pageNum = middleIndex - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPagination(prev => ({ ...prev, pageNumber: pageNum }))}
                    className={`px-3 py-2 border rounded mx-1 ${
                      pagination.pageNumber === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPagination(prev => ({ ...prev, pageNumber: Math.min(prev.pageNumber + 1, totalPages) }))}
                disabled={pagination.pageNumber === totalPages}
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

export default ProgramTable;