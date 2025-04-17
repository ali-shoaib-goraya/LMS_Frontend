import React, { useState } from "react";
import sampleActivities from "../../MockData/sampleActivities";
import AddClassActivity from "./AddClassActivity";

const ITEMS_PER_PAGE = 10;

const ClassActivities = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const flatActivities = sampleActivities.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category, gpa: cat.gpa }))
  );

  const totalItems = flatActivities.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = flatActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleButtonClick = () => {
    setShowAddPage(true);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-1">
      {/* Show only Add Class Activity page when `showAddPage` is true */}
      {showAddPage ? (
        <AddClassActivity />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Activities</h2>

          {/* Show "Add Class Activity" button only if we are not on the add page */}
          <div className="flex gap-2 mb-4">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded border border-purple-500 hover:bg-green-500 hover:text-white transition"
              onClick={handleButtonClick}
            >
              Add Class Activity
            </button>
          </div>

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
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">Detail</span>
                        <span className="ml-2">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.totalMarks}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <div className={`w-4 h-4 rounded-full ${item.outcomes ? "bg-green-500" : "bg-red-500"}`}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                          {item.questionCount}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{item.gpa}</td>
                    <td className="px-4 py-3">
                      <button className="text-gray-600 hover:text-gray-800">Actions ▼</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            {/* Pagination on the left */}
            <div className="flex gap-1 items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                ◀
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded bg-white text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                ▶
              </button>
            </div>

            {/* Delete Button on the right */}
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Delete Selected
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassActivities;
