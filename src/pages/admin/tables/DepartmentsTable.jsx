import React, { useState, useEffect } from "react";
import departmentService from "../../../services/departmentService";
import DepartmentForm from "../Forms/DepartmentForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filters, setFilters] = useState({
    departmentName: "",
    schoolName: "",
    type: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentService.getAllDepartments({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        departmentName: filters.departmentName,
        schoolName: filters.schoolName,
        type: filters.type,
      });

      const data = response.data.data;
      setDepartments(data.items || []);
      setTotalItems(data.totalCount || 0);
      setLoading(false);
    } catch (err) {
      setError("Failed to load departments.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [currentPage, filters]);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
    setCurrentPage(1);
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await departmentService.deleteDepartment(id);
        fetchDepartments();
      } catch (err) {
        alert("Failed to delete department.");
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedDepartment) {
        await departmentService.updateDepartment(selectedDepartment.departmentId, formData);
      } else {
        await departmentService.createDepartment(formData);
      }
      setShowForm(false);
      setSelectedDepartment(null);
      fetchDepartments();
    } catch (err) {
      alert(`Failed to ${selectedDepartment ? "update" : "create"} department.`);
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setSelectedDepartment(null);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const fromItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const toItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Departments</h2>
      </div>

      {showForm ? (
        <DepartmentForm
          onBack={handleBack}
          onSubmit={handleSubmit}
          initialData={selectedDepartment}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-gray-800">
              Showing {fromItem}-{toItem} of {totalItems} items
            </h2>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowForm(true)}
            >
              Create
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-white-200">
                  <tr className="text-left border-b border-gray-300">
                    <th className="border border-gray-300 px-4 py-3">#</th>
                    <th className="border border-gray-300 px-4 py-1">
                      <div className="flex flex-col text-center">
                        <span>Department Name</span>
                        <input
                          type="text"
                          className="mt-1 p-1 border rounded text-sm bg-gray-50"
                          value={filters.departmentName}
                          onChange={(e) => handleFilterChange(e, "departmentName")}
                        />
                      </div>
                    </th>
                    <th className="border border-gray-300 px-4 py-1">
                      <div className="flex flex-col text-center">
                        <span>School</span>
                        <input
                          type="text"
                          className="mt-1 p-1 border rounded text-sm bg-gray-50"
                          value={filters.schoolName}
                          onChange={(e) => handleFilterChange(e, "schoolName")}
                        />
                      </div>
                    </th>
                    <th className="border border-gray-300 px-4 py-1">
                      <div className="flex flex-col text-center">
                        <span>Type</span>
                        <input
                          type="text"
                          className="mt-1 p-1 border rounded text-sm bg-gray-50"
                          value={filters.type}
                          onChange={(e) => handleFilterChange(e, "type")}
                        />
                      </div>
                    </th>
                    <th className="border border-gray-300 px-4 py-1">Short Name</th>
                    <th className="border border-gray-300 px-4 py-1">Vision</th>
                    <th className="border border-gray-300 px-4 py-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.length > 0 ? (
                    departments.map((dept, index) => (
                      <tr key={dept.departmentId} className="text-center hover:bg-gray-100 transition">
                        <td className="border border-gray-300 px-4 py-3">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">{dept.departmentName}</td>
                        <td className="border border-gray-300 px-4 py-3">{dept.schoolName}</td>
                        <td className="border border-gray-300 px-4 py-3">{dept.type}</td>
                        <td className="border border-gray-300 px-4 py-3">{dept.shortName}</td>
                        <td className="border border-gray-300 px-4 py-3">{dept.vision}</td>
                        <td className="border border-gray-300 px-4 py-3 flex justify-center gap-2">
                          <button className="hover:opacity-80" onClick={() => handleEdit(dept)}>
                            <img src={editIcon} alt="Edit" className="w-5 h-5" />
                          </button>
                          <button
                            className="hover:opacity-80"
                            onClick={() => handleDelete(dept.departmentId)}
                          >
                            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-gray-600 py-4">
                        No departments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
