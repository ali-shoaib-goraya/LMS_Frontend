import { useState } from "react";

const CourseAttachment = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Course Attachment</h2>
          <button
            onClick={() => setShowModal(true)}
            className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50 transition"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left w-10">#</th>
                <th className="border px-4 py-2 w-20">File Name</th>
                <th className="border px-4 py-2 w-20">User</th>
                <th className="border px-4 py-2 w-20">Creation Date</th>
                <th className="border px-4 py-2 w-20">Description</th>
                <th className="border px-4 py-2 w-20">Visible to Students</th>
                <th className="border px-4 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td colSpan={7} className="text-center px-4 py-3 text-gray-500">
                  No results found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="text-lg font-semibold">Add Course Attachment</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 text-xl hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Two-column rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">File Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">User</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Creation Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Visible to Students</label>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-300"
                    />
                    <span className="text-sm text-gray-700">Yes</span>
                  </div>
                </div>
              </div>

              {/* Upload Attachment */}
              <div>
                <label className="block mb-1 text-sm font-medium">Upload Attachment</label>
                <input
                  type="file"
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>

              {/* Full-width row for Description */}
              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
                ></textarea>
              </div>

              <div className="flex justify-start gap-2 mt-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                  Save
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAttachment;
