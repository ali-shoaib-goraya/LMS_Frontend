import React from "react";

const DiscussionForum = () => {
  return (
    <div className="p-4 bg-transparent shadow-sm rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Discussion Forums</h2>
        <button className="border border-green-500 text-green-600 px-3 py-1 text-sm rounded-md hover:bg-green-100">
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
    </div>
  );
};

export default DiscussionForum;
