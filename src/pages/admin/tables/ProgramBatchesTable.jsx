
import React, { useEffect, useState } from "react";
import batchService from "../../../services/batchService";
import ProgramBatchForm from "../Forms/ProgramBatchForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const ProgramBatchTable = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ program: "" });
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10, totalCount: 0 });

  const fetchBatches = async () => {
    try {
      const { data } = await batchService.getAllBatches({
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        program: filters.program,
      });
      setBatches(data.data.items);
      setPagination((prev) => ({ ...prev, totalCount: data.data.totalCount }));
    } catch (error) {
      console.error("Failed to fetch batches", error);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, [pagination.pageNumber, filters.program]);

  const handleDelete = async (programBatchId) => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;
    try {
      await batchService.deleteBatch(programBatchId);
      fetchBatches();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, program: e.target.value });
    setPagination({ ...pagination, pageNumber: 1 });
  };

  const totalPages = Math.ceil(pagination.totalCount / pagination.pageSize);
  console.log("batches", batches);
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Program Batches</h2>
      </div>

      {showForm ? (
        <ProgramBatchForm
          onBack={() => {
            setShowForm(false);
            setSelectedBatch(null);
            fetchBatches();
          }}
          batchToEdit={selectedBatch}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {pagination.pageNumber} of {totalPages} pages
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Create
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">Program Batch</th>
                <th className="border px-4 py-3">
                  <div className="flex flex-col items-center">
                    <span>Program</span>
                    <input
                      type="text"
                      value={filters.program}
                      onChange={handleFilterChange}
                      className="w-40 mt-1 p-2 border rounded text-sm bg-gray-50"
                    />
                  </div>
                </th>
                <th className="border px-4 py-3">Start Date</th>
                <th className="border px-4 py-3">End Date</th>
                <th className="border px-4 py-3">Students</th>
                <th className="border px-4 py-3">Sections</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length > 0 ? (
                batches.map((batch, index) => (
                  <tr key={batch.programBatchId} className="text-center hover:bg-gray-100">
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border px-4 py-3">{batch.batchName}</td>
                    <td className="border px-4 py-3">{batch.programName}</td>
                    <td className="border px-4 py-3">{batch.startDate}</td>
                    <td className="border px-4 py-3">{batch.endDate}</td>
                    <td className="border px-4 py-3">{batch.students}</td>
                    <td className="border px-4 py-3">{batch.sections}</td>
                    <td className="border px-4 py-3 flex justify-center gap-2">
                      <button onClick={() => { setSelectedBatch(batch); setShowForm(true); }}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(batch.programBatchId)}>
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-600 py-4">
                    No program batches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setPagination((p) => ({ ...p, pageNumber: Math.max(1, p.pageNumber - 1) }))}
              disabled={pagination.pageNumber === 1}
              className="px-3 py-2 border rounded bg-gray-200 mr-2"
            >«</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPagination((p) => ({ ...p, pageNumber: i + 1 }))}
                className={`px-3 py-2 border rounded mx-1 ${pagination.pageNumber === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPagination((p) => ({ ...p, pageNumber: Math.min(totalPages, p.pageNumber + 1) }))}
              disabled={pagination.pageNumber === totalPages}
              className="px-3 py-2 border rounded bg-gray-200 ml-2"
            >»</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramBatchTable;
