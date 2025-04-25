import React, { useState } from "react";

const DiscussionForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSave = () => {
    // Handle saving logic here
    console.log("Saved:", input1, input2);
    handleCloseModal(); // Close the modal after saving
  };

  return (
    <div className="p-4 bg-transparent shadow-sm rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Discussion Forums</h2>
        <button
          className="border border-green-500 text-green-600 px-3 py-1 text-sm rounded-md hover:bg-green-100"
          onClick={handleOpenModal}
        >
          Start
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left">
              <th className="border px-4 py-2 text-sm">#</th>
              <th className="border px-4 py-2 text-sm"></th>
              <th className="border px-4 py-2 text-sm"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="bg-gray-100">
              <td colSpan={3} className="text-gray-500 px-4 py-2">
                No results found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Start Discussion Forun Thread</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
              <input
                type="text"
                className="w-full px-3 py-10 border border-gray-300 rounded-md"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              />
            </div>
            <div className="flex justify-start gap-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
