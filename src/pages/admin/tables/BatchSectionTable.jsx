import React, { useState, useEffect } from "react";
import BatchSectionForm from "../Forms/BatchSectionForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import sectionService from "../../../services/sectionService"; // Adjust the import path as needed

const BatchSectionTable = () => {
  const [batchSections, setBatchSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ sectionName: "", programBatch: "" });
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [totalCount, setTotalCount] = useState(0);

  // Fetch data from API
  const fetchSections = async () => {
    try {
      setIsLoading(true);
      const response = await sectionService.getAllSections({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        sectionName: filters.sectionName,
        programBatch: filters.programBatch,
      });
      
      const { items, totalCount } = response.data.data;
      setBatchSections(items || []);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Failed to fetch batch sections:", error);
      alert("Error loading batch sections. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchSections();
  }, [pagination.pageNumber, pagination.pageSize]);

  // Handle filter changes
  const handleFilterChange = (e, key) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters when search button is clicked
  const applyFilters = () => {
    setPagination((prev) => ({ ...prev, pageNumber: 1 })); // Reset to first page
    fetchSections();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ sectionName: "", programBatch: "" });
    setPagination({ pageNumber: 1, pageSize: 10 });
    fetchSections();
  };

  // Handle edit
  const handleEdit = (section) => {
    setEditingSection(section);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this batch section?")) {
      try {
        setIsLoading(true);
        await sectionService.deleteSection(id);
        await fetchSections(); // Refresh the list after deletion
      } catch (error) {
        console.error("Failed to delete section:", error);
        alert("Error deleting section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    await fetchSections(); // Refresh the table after form submission
    setEditingSection(null);
    setShowForm(false);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Batch Sections</h2>
      </div>

      {showForm ? (
        <BatchSectionForm
          onBack={() => {
            setShowForm(false);
            setEditingSection(null);
          }}
          initialData={editingSection}
          onSubmitData={handleFormSubmit}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  Showing {totalCount > 0 ? (pagination.pageNumber - 1) * pagination.pageSize + 1 : 0}-
                  {Math.min(pagination.pageNumber * pagination.pageSize, totalCount)} of {totalCount} items
                </>
              )}
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
              onClick={() => {
                setEditingSection(null);
                setShowForm(true);
              }}
              disabled={isLoading}
            >
              Add Batch Section
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
              <input
                type="text"
                value={filters.sectionName}
                onChange={(e) => handleFilterChange(e, "sectionName")}
                className="w-full p-2 border rounded text-sm bg-gray-50"
                placeholder="Filter by name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Batch</label>
              <input
                type="text"
                value={filters.programBatch}
                onChange={(e) => handleFilterChange(e, "programBatch")}
                className="w-full p-2 border rounded text-sm bg-gray-50"
                placeholder="Filter by program batch..."
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={isLoading}
              >
                Search
              </button>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200"
                disabled={isLoading}
              >
                Reset
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-center border-b border-gray-300">
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">Section Name</th>
                <th className="border px-4 py-3">Program Batch</th>
                <th className="border px-4 py-3">Capacity</th>
                <th className="border px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-600 py-4">
                    Loading...
                  </td>
                </tr>
              ) : batchSections.length > 0 ? (
                batchSections.map((section, index) => (
                  <tr key={section.programBatchSectionId} className="hover:bg-gray-100 transition">
                    <td className="border px-4 py-3 text-center">
                      {(pagination.pageNumber - 1) * pagination.pageSize + index + 1}
                    </td>
                    <td className="border px-4 py-3">{section.sectionName}</td>
                    <td className="border px-4 py-3">{section.programBatch}</td>
                    <td className="border px-4 py-3">{section.capacity}</td>
                    <td className="border px-4 py-3 flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(section)}
                        disabled={isLoading}
                      >
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(section.programBatchSectionId)}
                        disabled={isLoading}
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-600 py-4">
                    No batch sections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex justify-start mt-4">
              <button
                onClick={() => setPagination(p => ({ ...p, pageNumber: Math.max(1, p.pageNumber - 1) }))}
                disabled={pagination.pageNumber === 1 || isLoading}
                className="px-3 py-2 border rounded bg-gray-200 mr-2 disabled:opacity-50"
              >
                «
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show 5 pages max with current page in the middle when possible
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else {
                  const start = Math.max(1, pagination.pageNumber - 2);
                  const end = Math.min(totalPages, start + 4);
                  const adjustedStart = Math.max(1, end - 4);
                  pageNum = adjustedStart + i;
                }
                
                return pageNum <= totalPages ? (
                  <button
                    key={pageNum}
                    onClick={() => setPagination(p => ({ ...p, pageNumber: pageNum }))}
                    disabled={isLoading}
                    className={`px-3 py-2 border rounded mx-1 ${
                      pagination.pageNumber === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                ) : null;
              })}
              
              <button
                onClick={() => setPagination(p => ({ ...p, pageNumber: Math.min(totalPages, p.pageNumber + 1) }))}
                disabled={pagination.pageNumber === totalPages || isLoading}
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

export default BatchSectionTable;