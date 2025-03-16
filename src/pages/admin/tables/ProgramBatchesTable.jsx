import React, { useState } from "react";
import { mockBatches } from "../../../MockData/mockBatches"; // Assuming you have mock data for program batches
import ProgramBatchForm from "../Forms/ProgramBatchForm"; // Form for adding/editing a program batch
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const ProgramBatchTable = () => {
  const [programBatches] = useState(mockBatches);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to toggle form view

  const [filters, setFilters] = useState({
    batchName: "",
    program: "",
    startDate: "",
    endDate: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedBatches((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((batchId) => batchId !== id)
        : [...prevSelected, id]
    );
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredProgramBatches = programBatches.filter((batch) =>
    Object.keys(filters).every((key) =>
      filters[key] ? batch[key]?.toString().toLowerCase().includes(filters[key].toLowerCase()) : true
    )
  );

  const totalItems = filteredProgramBatches.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProgramBatches = filteredProgramBatches.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Program Batch Section Header */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Program Batches</h2>
      </div>

      {/* Conditional Rendering: Show form or table */}
      {showForm ? (
        <ProgramBatchForm onBack={() => setShowForm(false)} /> // Show form when button is clicked
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)} // Show form on button click
            >
              Create
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                <th className="border border-gray-300 px-4 py-3">
                  Program
                  <input
                    type="text"
                    value={filters.program}
                    onChange={(e) => handleFilterChange(e, "program")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Academic year
                  <input
                    type="number"
                    value={filters.academicYear}
                    onChange={(e) => handleFilterChange(e, "academicYear")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Program Batch
                  <input
                    type="string"
                    value={filters.programBatch}
                    onChange={(e) => handleFilterChange(e, "programBatch")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Students
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProgramBatches.length > 0 ? (
                currentProgramBatches.map((batch, index) => (
                  <tr key={batch.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedBatches.includes(batch.id)}
                        onChange={() => handleCheckboxChange(batch.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{batch.program}</td>
                    <td className="border border-gray-300 px-4 py-3">{batch.academicYear}</td>
                    <td className="border border-gray-300 px-4 py-3">{batch.programBatch}</td>
                    <td className="border border-gray-300 px-4 py-3">{batch.students}</td>
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
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    No program batches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-start mt-4">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 border rounded bg-gray-200 mr-2">
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-2 border rounded mx-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 border rounded bg-gray-200 ml-2">
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramBatchTable;
