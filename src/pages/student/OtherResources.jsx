import React from "react";
import mockResources from "../../MockData/mockResource";

const OtherResource = () => {
  const totalItems = mockResources.length;
  const itemsPerPage = 25;
  const startIndex = totalItems > 0 ? 1 : 0; // Start counting from 1 if items exist
  const endIndex = Math.min(totalItems, itemsPerPage); // Show up to 25 items

  return (
    <div className="p-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Other Resources</h2>
      <p className="text-sm text-gray-600 mb-2">
        Showing <strong>{startIndex}-{endIndex}</strong> of <strong>{totalItems}</strong> items.
      </p>

      <div className="border rounded-md overflow-hidden bg-transparent">
        <table className="w-full border-collapse bg-transparent">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">File Name</th>
              <th className="border px-4 py-2 text-left">Creation Date</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {mockResources.length > 0 ? (
              mockResources.slice(0, itemsPerPage).map((resource, index) => (
                <tr key={resource.id} className="even:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                    {resource.name}
                  </td>
                  <td className="border px-4 py-2">{resource.date}</td>
                  <td className="border px-4 py-2">{resource.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OtherResource;
