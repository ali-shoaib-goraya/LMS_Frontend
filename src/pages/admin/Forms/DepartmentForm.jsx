import React, { useState, useEffect } from "react";
import departmentService from "../../../services/departmentService";

const DepartmentForm = ({ onBack, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    departmentName: "",
    shortName: "",
    schoolId: "",
    type: "",
    vision: "",
  });

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await departmentService.getAllSchools();
        setSchoolOptions(response.data.data || []);
      } catch (error) {
        console.error("Failed to load schools:", error);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        departmentName: initialData.departmentName || "",
        shortName: initialData.shortName || "",
        schoolId: initialData.schoolId || "",
        type: initialData.type || "",
        vision: initialData.vision || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.departmentName.trim() &&
      formData.schoolId &&
      formData.type.trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white p-6 shadow-md rounded-md mb-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department Name *
          </label>
          <input
            type="text"
            name="departmentName"
            value={formData.departmentName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              isSubmitted && !formData.departmentName ? "border-red-500" : ""
            }`}
          />
          {isSubmitted && !formData.departmentName && (
            <p className="text-red-500 text-sm">Required field</p>
          )}
        </div>

        {/* Short Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Name</label>
          <input
            type="text"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* School Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">School *</label>
          <select
            name="schoolId"
            value={formData.schoolId}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              isSubmitted && !formData.schoolId ? "border-red-500" : ""
            }`}
            disabled={loadingSchools}
          >
            <option value="">-- Select a School --</option>
            {schoolOptions.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.schoolName}
              </option>
            ))}
          </select>
          {isSubmitted && !formData.schoolId && (
            <p className="text-red-500 text-sm">Required field</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type *</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              isSubmitted && !formData.type ? "border-red-500" : ""
            }`}
          />
          {isSubmitted && !formData.type && (
            <p className="text-red-500 text-sm">Required field</p>
          )}
        </div>

        {/* Vision */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Vision</label>
          <textarea
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {initialData?.departmentId ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;