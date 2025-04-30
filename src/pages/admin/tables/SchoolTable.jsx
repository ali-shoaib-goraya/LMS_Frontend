import React, { useState } from "react";
import { mockSchools } from "../../../MockData/mockSchools";
import SchoolForm from "../Forms/SchoolForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const SchoolTable = () => {
  const [schools] = useState(mockSchools);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [filters, setFilters] = useState({
    schoolName: "",
    shortName: "",
    city: "",
  });

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedSchools((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((schoolId) => schoolId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    const currentPageIds = currentSchools.map((school) => school.id);
    const allSelected = currentPageIds.every((id) =>
      selectedSchools.includes(id)
    );

    if (allSelected) {
      setSelectedSchools((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedSchools((prevSelected) => [
        ...prevSelected,
        ...currentPageIds.filter((id) => !prevSelected.includes(id)),
      ]);
    }
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1);
  };

  const filteredSchools = schools.filter((school) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? school[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  const totalItems = filteredSchools.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchools = filteredSchools.slice(startIndex, endIndex);

  const isCurrentPageFullySelected = currentSchools.every((school) =>
    selectedSchools.includes(school.id)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">School List</h2>
      </div>

      {showForm ? (
        <SchoolForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Add School
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3 text-center">#</th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="mb-1">Select</span>
                    <input
                      type="checkbox"
                      checked={isCurrentPageFullySelected}
                      onChange={handleSelectAll}
                      className="cursor-pointer w-4 h-4"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">Name</span>
                    <input
                      type="text"
                      value={filters.schoolName}
                      onChange={(e) => handleFilterChange(e, "schoolName")}
                      className="w-36 p-1 border rounded text-sm text-center bg-gray-50"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">Short Name</span>
                    <input
                      type="text"
                      value={filters.shortName}
                      onChange={(e) => handleFilterChange(e, "shortName")}
                      className="w-28 p-1 border rounded text-sm text-center bg-gray-50"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <span className="mb-1">City</span>
                    <input
                      type="text"
                      value={filters.city}
                      onChange={(e) => handleFilterChange(e, "city")}
                      className="w-28 p-1 border rounded text-sm text-center bg-gray-50"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center">Address</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSchools.length > 0 ? (
                currentSchools.map((school, index) => (
                  <tr key={school.id} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      {startIndex + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedSchools.includes(school.id)}
                        onChange={() => handleCheckboxChange(school.id)}
                        className="cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{school.schoolName}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.shortName}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.city}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.address}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button className="hover:opacity-80" onClick={() => setShowForm(true)}>
                          <img src={editIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button className="hover:opacity-80">
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-600 py-4">
                    No schools found.
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

export default SchoolTable;
