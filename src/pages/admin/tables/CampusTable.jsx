import React, { useState } from "react";
import mockCampus from "../../../MockData/mockCampus";
import CampusForm from "../Forms/CampusForm"; // Assuming you have a form component
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const CampusTable = () => {
  const [campuses] = useState(mockCampus);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    shortName: "",
    type: "",
    city: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Checkbox handler
  const handleCheckboxChange = (id) => {
    setSelectedCampuses((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((campusId) => campusId !== id)
        : [...prevSelected, id]
    );
  };

  // Filtering Logic
  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredCampuses = campuses.filter((campus) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? campus[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  const totalItems = filteredCampuses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampuses = filteredCampuses.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Title Section */}
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Campus List</h2>
      </div>

      {/* Conditional Rendering for Form */}
      {showForm ? (
        <CampusForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Add Campus
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">Select</th>
                <th className="border border-gray-300 px-4 py-3">
                  Name
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Short Name
                  <input
                    type="text"
                    value={filters.shortName}
                    onChange={(e) => handleFilterChange(e, "shortName")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Type
                  <input
                    type="text"
                    value={filters.type}
                    onChange={(e) => handleFilterChange(e, "type")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  City
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => handleFilterChange(e, "city")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">Address</th>
                <th className="border border-gray-300 px-4 py-3">Notes</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCampuses.length > 0 ? (
                currentCampuses.map((campus, index) => (
                  <tr key={campus.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">{startIndex + index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus.id)}
                        onChange={() => handleCheckboxChange(campus.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{campus.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{campus.shortName}</td>
                    <td className="border border-gray-300 px-4 py-3">{campus.type}</td>
                    <td className="border border-gray-300 px-4 py-3">{campus.city}</td>
                    <td className="border border-gray-300 px-4 py-3">{campus.address}</td>
                    <td className="border border-gray-300 px-4 py-3">{campus.notes}</td>
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
                  <td colSpan="9" className="text-center text-gray-600 py-4">
                    No campuses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-start mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border rounded bg-gray-200 mr-2"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded mx-1 ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border rounded bg-gray-200 ml-2"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusTable;
