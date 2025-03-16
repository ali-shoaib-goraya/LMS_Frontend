import React, { useState } from "react";

const SchoolForm = () => {
  const [formData, setFormData] = useState({
    campus: "",
    schoolName: "",
    shortName: "",
    city: "",
    isAcademic: false,
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const { campus, schoolName, shortName, city, address, notes } = formData;
    return campus && schoolName && shortName && city && address && notes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark the form as submitted

    if (validateForm()) {
      alert("Form submitted successfully!");
      // Reset form after successful submission
      setFormData({
        campus: "",
        schoolName: "",
        shortName: "",
        city: "",
        isAcademic: false,
        address: "",
        notes: "",
      });
      setIsSubmitted(false); // Reset submission state
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <div>
        <form onSubmit={handleSubmit}>
          {/* Campus Input */}
          <div className="flex flex-wrap gap-5">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">Campus</label>
              <input
                type="text"
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                placeholder="Namal Campus"
                className={`p-2 text-lg border ${isSubmitted && !formData.campus ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
          </div>

          {/* School Name, Short Name, City */}
          <div className="flex flex-wrap gap-5">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">School Name</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className={`p-2 text-lg border ${isSubmitted && !formData.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                className={`p-2 text-lg border ${isSubmitted && !formData.shortName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`p-2 text-lg border ${isSubmitted && !formData.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
          </div>

          {/* Checkbox for Academic */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              name="isAcademic"
              checked={formData.isAcademic}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="indirect-assessment" className="text-sm text-gray-700">
              Academic?
            </label>
          </div>

          {/* Address and Notes */}
          <div className="flex flex-wrap gap-5 mt-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`p-2 text-lg border ${isSubmitted && !formData.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-5 mt-4">
            <div className="flex-1 min-w-[200px] flex flex-col gap-2">
              <label className="text-sm text-gray-700">Notes</label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={`p-2 text-lg border ${isSubmitted && !formData.notes ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-start mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolForm;
