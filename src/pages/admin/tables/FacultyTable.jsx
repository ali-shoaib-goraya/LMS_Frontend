import React, { useEffect, useState } from "react";
import facultyService from "../../../services/facultyService";
import FacultyForm from "../Forms/UsersForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const FacultyTable = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    designation: "",
    qualification: "",
    departments: "",
    facultyType: "",
    type: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // 🔁 Fetch faculty data whenever filters or page changes
  useEffect(() => {
    const fetchFaculty = async () => {
      setIsLoading(true);
      try {
        const response = await facultyService.getFaculty({
          pageNumber: currentPage,
          pageSize: itemsPerPage,
          ...filters,
        });

        setFacultyList(response.data.data.items);
        setTotalCount(response.data.data.totalCount);
      } catch (error) {
        console.error("Failed to fetch faculty data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, [filters, currentPage]);

  const handleDelete = async (id) => {
    try {
      await facultyService.deleteFaculty(id);
      setFacultyList((prev) => prev.filter((faculty) => faculty.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleFilterChange = (e, key) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-7xl flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Faculty/Staff</h2>
      </div>

      {showForm ? (
        <FacultyForm onBack={() => setShowForm(false)} />
      ) : (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-5xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Add Faculty
            </button>
          </div>

          {/* Filters */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-white-200">
                <tr className="text-left">
                  <th className="border border-gray-300 px-4 py-3 text-center">#</th>

                  {["name", "email", "designation", "qualification", "departments", "facultyType", "type"].map(
                    (key) => (
                      <th key={key} className="border border-gray-300 px-4 py-3">
                        <div className="text-center capitalize">{key}</div>
                        <input
                          type="text"
                          value={filters[key]}
                          onChange={(e) => handleFilterChange(e, key)}
                          className="w-full mt-1 p-2 border rounded text-sm bg-gray-50"
                        />
                      </th>
                    )
                  )}

                  <th className="border border-gray-300 px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-600 py-4">
                      Loading...
                    </td>
                  </tr>
                ) : facultyList.length > 0 ? (
                  facultyList.map((faculty, index) => (
                    <tr key={faculty.id} className="hover:bg-gray-100 transition">
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                        {faculty.firstName} {faculty.lastName}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.email}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.designation}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.qualification}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">
                        {faculty.departments?.join(", ")}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.employmentType}</td>
                      <td className="border border-gray-300 px-4 py-3 whitespace-nowrap">{faculty.type}</td>
                      <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                        <button className="hover:opacity-80" onClick={() => setShowForm(true)}>
                          <img src={editIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button className="hover:opacity-80" onClick={() => handleDelete(faculty.id)}>
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-600 py-4">
                      No faculty found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

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

export default FacultyTable;
