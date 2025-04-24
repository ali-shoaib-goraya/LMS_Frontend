import React, { useState, useEffect } from "react";
import sampleActivities from "../../MockData/sampleActivities";
import AddClassActivity from "./AddClassActivity";
import UploadMarks from "./UploadMarks";
import ViewUploads from "./ViewUploads";

const ITEMS_PER_PAGE = 10;

const ClassActivities = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [activeModal, setActiveModal] = useState({ id: null, type: null });

  const flatActivities = sampleActivities.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category, gpa: cat.gpa }))
  );

  const totalItems = flatActivities.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = flatActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const closeModal = () => {
    setActiveModal({ id: null, type: null });
    setDropdownOpen(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-1">
      {showAddPage ? (
        <AddClassActivity />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Activities</h2>
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded border border-purple-500 hover:bg-green-500 hover:text-white transition mb-4"
            onClick={() => setShowAddPage(true)}
          >
            Add Class Activity
          </button>

          <div className="text-sm text-gray-600 mb-2">
            Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of {totalItems} items
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="px-2 py-3 text-center w-8">#</th>
                  <th className="px-2 py-3 w-8"></th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Total Marks</th>
                  <th className="px-4 py-3 text-left">Outcomes Added?</th>
                  <th className="px-4 py-3 text-left">Question Count</th>
                  <th className="px-4 py-3 text-left">GPA %</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-2 py-3 text-center">{startIndex + index + 1}</td>
                    <td className="px-2 py-3">
                      <input type="checkbox" className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className="px-4 py-3">{item.totalMarks}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <div
                          className={`w-4 h-4 rounded-full ${item.outcomes ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{item.questionCount}</td>
                    <td className="px-4 py-3">{item.gpa}</td>
                    <td className="px-4 py-3 relative">
                      <div className="dropdown-container relative inline-block text-left">
                        <button
                          onClick={() => setDropdownOpen(item.id)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Actions ▼
                        </button>
                        {dropdownOpen === item.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <button
                              onClick={() => {
                                setActiveModal({ id: item.id, type: "add marks" });
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Add Marks
                            </button>
                            <button
                              onClick={() => {
                                setActiveModal({ id: item.id, type: "view uploads" });
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              View Remarks
                            </button>
                            <button
                              onClick={() => {
                              // Add delete functionality here
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Delete
                          </button>

                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-start mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded text-sm ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              »
            </button>
          </div>

          {/* Modal rendering */}
          {activeModal.type === "add marks" && <UploadMarks onClose={closeModal} />}
          {activeModal.type === "view uploads" && <ViewUploads onClose={closeModal} />}
        </>
      )}
    </div>
  );
};

export default ClassActivities;
