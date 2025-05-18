import React, { useState, useEffect } from "react";
import BatchSectionForm from "../Forms/BatchSectionForm";
import editIcon from "../../../assets/pencil.png";
import deleteIcon from "../../../assets/trash.png";

const dummyData = [
  { id: 1, name: "Section A", programBatch: "BSCS 7th", capacity: 40 },
  { id: 2, name: "Section B", programBatch: "BSSE 5th", capacity: 35 },
];

const BatchSections = () => {
  const [batchSections, setBatchSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [filters, setFilters] = useState({ name: "", programBatch: "", capacity: "" });

  useEffect(() => {
    // Load dummy data initially
    setBatchSections(dummyData);
  }, []);

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  const filteredSections = batchSections.filter((section) =>
    Object.keys(filters).every((key) =>
      filters[key]
        ? section[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        : true
    )
  );

  const handleEdit = (section) => {
    setEditingSection(section);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this batch section?")) {
      setBatchSections((prev) => prev.filter((section) => section.id !== id));
    }
  };

  const handleFormSubmit = (data) => {
    if (editingSection) {
      setBatchSections((prev) =>
        prev.map((sec) =>
          sec.id === editingSection.id ? { ...sec, ...data } : sec
        )
      );
    } else {
      const newSection = {
        ...data,
        id: Date.now(),
        programBatch: "BSCS Default", // Assign some default values for demo
        capacity: 30,
      };
      setBatchSections((prev) => [...prev, newSection]);
    }

    setEditingSection(null);
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Batch Sections</h2>
      </div>

      {showForm ? (
        <BatchSectionForm
          onBack={() => {
            setShowForm(false);
            setEditingSection(null);
          }}
          initialData={editingSection}
          onSubmitData={handleFormSubmit}
        />
      ) : (
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg overflow-x-auto">
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                setEditingSection(null);
                setShowForm(true);
              }}
            >
              Add Batch Section
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-white">
              <tr className="text-center border-b border-gray-300">
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">
                  Name
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">
                  Program Batch
                  <input
                    type="text"
                    value={filters.programBatch}
                    onChange={(e) => handleFilterChange(e, "programBatch")}
                    className="w-full mt-2 p-2 border rounded text-sm bg-gray-50"
                  />
                </th>
                <th className="border px-4 py-3">
                  Capacity
                </th>
                <th className="border px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSections.length > 0 ? (
                filteredSections.map((section, index) => (
                  <tr key={section.id || index} className="hover:bg-gray-100 transition">
                    <td className="border px-4 py-3 text-center">{index + 1}</td>
                    <td className="border px-4 py-3">{section.name}</td>
                    <td className="border px-4 py-3">{section.programBatch}</td>
                    <td className="border px-4 py-3">{section.capacity}</td>
                    <td className="border px-4 py-3 flex justify-center gap-2">
                      <button onClick={() => handleEdit(section)}>
                        <img src={editIcon} alt="Edit" className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(section.id)}>
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-600 py-4">
                    No batch sections found.
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

export default BatchSections;
