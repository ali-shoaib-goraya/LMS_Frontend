import React, { useState, useEffect } from "react";
import CampusForm from "../Forms/CampusForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";
import campusService from "../../../services/campusService";
import { toast } from "react-toastify";

const CampusTable = () => {
  const [campuses, setCampuses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);

  const [filters, setFilters] = useState({
    name: "",
    shortName: "",
    type: "",
    city: "",
  });

  useEffect(() => {
    fetchCampuses();
  }, []);

  const fetchCampuses = async () => {
    try {
      const response = await campusService.getAllCampuses();
      const campusData = response.data.data || [];
      setCampuses(campusData);
      console.log("Fetched campuses:", response.data);
    } catch (error) {
      console.error("Failed to fetch campuses:", error);
    }
  };

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

  // Select All Checkbox handler
  const handleSelectAllChange = () => {
    if (selectedCampuses.length === campuses.length) {
      setSelectedCampuses([]);
    } else {
      setSelectedCampuses(campuses.map((campus) => campus.id));
    }
  };

  // Filtering Logic
  useEffect(() => {
    fetchCampuses();
  }, []);

  const fetchCampuses = async () => {
    try {
      const response = await campusService.getAllCampuses();
      const campusData = response.data.data || [];
      setCampuses(campusData);
      console.log("Fetched campuses:", response.data);
    } catch (error) {
      console.error("Failed to fetch campuses:", error);
    }
  };

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

  const handleEdit = (campus) => {
    setEditingCampus(campus);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campus?")) return;
    console.log("Deleting campus with ID:", id);
    try {
      await campusService.deleteCampus(id);
      fetchCampuses();
    } catch (error) {
      const message = error?.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(message);
      console.error("Failed to delete campus:", message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Campus List</h2>
      </div>

      {showForm ? (
        <CampusForm
          onBack={() => {
            setShowForm(false);
            setEditingCampus(null);
            fetchCampuses();
          }}
          initialData={editingCampus}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setEditingCampus(null);
                setShowForm(true);
              }}
            >
              Add Campus
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-left border-b border-gray-300">
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">
              <tr className="text-center border-b border-gray-300">
                <th className="border border-gray-300 px-4 py-3">#</th>
                <th className="border border-gray-300 px-4 py-3">
                  Select
                  <div className="flex justify-center mt-2">
                    <input
                      type="checkbox"
                      checked={selectedCampuses.length === campuses.length}
                      onChange={handleSelectAllChange}
                      className="cursor-pointer w-4 h-4"
                    />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-3">
                  Name
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">
                  Short Name
                  <input
                    type="text"
                    value={filters.shortName}
                    onChange={(e) => handleFilterChange(e, "shortName")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">
                  Type
                  <input
                    type="text"
                    value={filters.type}
                    onChange={(e) => handleFilterChange(e, "type")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">
                  City
                  <input
                    type="text"
                    value={filters.city}
                    onChange={(e) => handleFilterChange(e, "city")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">Address</th>
                <th className="border px-4 py-3">Notes</th>
                <th className="border px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampuses.length > 0 ? (
                filteredCampuses.map((campus, index) => (
                  <tr key={campus.campusId || index} className="hover:bg-gray-100 transition">
                    <td className="border px-4 py-3 text-center">{index + 1}</td>
                    <td className="border px-4 py-3">{campus.name}</td>
                    <td className="border px-4 py-3">{campus.shortName}</td>
                    <td className="border px-4 py-3">{campus.type}</td>
                    <td className="border px-4 py-3">{campus.city}</td>
                    <td className="border px-4 py-3">{campus.address}</td>
                    <td className="border px-4 py-3">{campus.notes}</td>
                    <td className="border px-4 py-3 flex justify-center gap-2">
                      <button onClick={() => handleEdit(campus)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(campus.campusId)}>
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-600 py-4">
                    No campuses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CampusTable;
