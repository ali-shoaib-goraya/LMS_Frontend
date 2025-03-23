import React from "react";

const VideoResource = () => {
  return (
    <div className="bg-transparent p-4 rounded-md shadow">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Video Material</h2>
      <div className="border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" className="border px-4 py-2 text-center text-gray-500">
                No results found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoResource;
