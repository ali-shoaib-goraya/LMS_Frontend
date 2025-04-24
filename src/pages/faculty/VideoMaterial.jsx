import { useState } from "react";

const VideoMaterial = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Video Material</h2>
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
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2 w-20"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td colSpan={3} className="text-center px-4 py-3 text-gray-500">
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
              <h3 className="text-lg font-semibold">Add Video Material</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 text-xl hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-4">
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mb-4 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
              />

              <label className="block mb-2 text-sm font-medium">Youtube Link</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 mb-4 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
              />

              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                rows="4"
                className="w-full border rounded-md px-3 py-2 bg-gray-100 outline-none focus:ring-2 focus:ring-purple-300"
              ></textarea>

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

export default VideoMaterial;
