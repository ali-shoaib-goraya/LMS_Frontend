import React, { useEffect, useState } from "react";
import batchService from "../../../services/batchService";

const ProgramBatchForm = ({ onBack, batchToEdit }) => {
  const [formData, setFormData] = useState({
    programBatch: "",
    programId: "",
    startDate: "",
    endDate: "",
    students: "",
    sections: "",
  });

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    // Fetch programs on mount
    const fetchPrograms = async () => {
      try {
        const response = await batchService.getPrograms();
        setPrograms(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    if (batchToEdit) {
      setFormData({
        programBatch: batchToEdit.batchName || "",
        programId: batchToEdit.programId || "", // <-- Fixed here
        startDate: batchToEdit.startDate || "",
        endDate: batchToEdit.endDate || "",
        students: batchToEdit.students || "",
        sections: batchToEdit.sections || "",
      });
    }
  }, [batchToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      batchName: formData.programBatch,
      programId: formData.programId, // <-- Used here
      startDate: formData.startDate,
      endDate: formData.endDate,
      students: formData.students,
      sections: formData.sections,
    };

    try {
      if (batchToEdit) {
        await batchService.updateBatch(batchToEdit.programBatchId, payload);
      } else {
        await batchService.createBatch(payload);
      }

      onBack();
    } catch (err) {
      console.error("Error submitting batch:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        {batchToEdit ? "Edit Program Batch" : "Create Program Batch"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Program Batch Name</label>
          <input
            type="text"
            name="programBatch"
            value={formData.programBatch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Program</label>
          <select
            name="programId" // <-- Fixed name
            value={formData.programId} // <-- Bound to programId
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a program</option>
            {programs.map((program) => (
              <option key={program.programId} value={program.programId}>
                {program.programName}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {batchToEdit ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramBatchForm;
