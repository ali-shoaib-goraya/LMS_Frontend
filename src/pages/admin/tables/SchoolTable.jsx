import React, { useState, useEffect } from "react";
import schoolService from "../../../services/schoolService";
import SchoolForm from "../Forms/SchoolForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const SchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSchool, setEditSchool] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const [filters, setFilters] = useState({
    name: "",
    shortName: "",
    city: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const { data } = await schoolService.getAllSchools({
        page: currentPage,
        pageSize: itemsPerPage,
        name: filters.name,
        shortName: filters.shortName,
        city: filters.city,
      });
      setSchools(data.data.items || []);
      setTotalItems(data.data.totalCount || 0);
    } catch (error) {
      console.error("Failed to fetch schools:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [currentPage, filters]);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1);
  };

  const handleEdit = (school) => {
    setEditSchool(school);
    setShowForm(true);
  };

  const handleDelete = async (schoolId) => {
    const confirm = window.confirm("Are you sure you want to delete this school?");
    if (!confirm) return;

    try {
      await schoolService.deleteSchool(schoolId);
      fetchSchools(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditSchool(null);
    fetchSchools(); // refresh list after add/edit
    
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">School List</h2>
      </div>

      {showForm ? (
       <SchoolForm
       onBack={() => {
         setShowForm(false);
         setEditSchool(null);
       }}
       onSaveSuccess={handleFormSubmit}
       editData={editSchool} // <-- corrected prop name
     />
     
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setShowForm(true);
                setEditSchool(null); // clear if previously editing
              }}
            >
              Add School
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
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
                  City
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => handleFilterChange(e, "city")}
                    className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border border-gray-300 px-4 py-3">Address</th>
                <th className="border border-gray-300 px-4 py-3">Is Academic</th>
                <th className="border border-gray-300 px-4 py-3">Notes</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-600">
                    Loading...
                  </td>
                </tr>
              ) : schools.length > 0 ? (
                schools.map((school, index) => (
                  <tr key={school.schoolId} className="text-center hover:bg-gray-100 transition">
                    <td className="border border-gray-300 px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{school.schoolName}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.shortName}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.city}</td>
                    <td className="border border-gray-300 px-4 py-3">{school.address}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      {school.academic ? "Yes" : "No"}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">{school.notes || "-"}</td>
                    <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                      <button className="hover:opacity-80" onClick={() => handleEdit(school)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button
                        className="hover:opacity-80"
                        onClick={() => handleDelete(school.schoolId)}
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-600 py-4">
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
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 border rounded mx-1 ${
                    currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
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
