import React, { useState } from "react";

const CampusForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    type: "",
    city: "",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "");
    if (allFieldsFilled) {
      console.log("Form submitted successfully!", formData);
      // Clear the form
      setFormData({
        name: "",
        shortName: "",
        type: "",
        city: "",
        address: "",
        notes: "",
      });
      setIsSubmitted(false);
      onBack(); // Close form after submission
    }
  };

  const getInputStyle = (field) =>
    `mt-1 block w-full border py-2 px-3 text-base rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
      isSubmitted && !formData[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="flex gap-6">
            <div className="w-2/5">
              <label htmlFor="name">Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className={getInputStyle("name")} required />
            </div>
            <div className="w-1/5">
              <label htmlFor="shortName">Short Name</label>
              <input name="shortName" value={formData.shortName} onChange={handleChange} className={getInputStyle("shortName")} required />
            </div>
            <div className="w-1/5">
              <label htmlFor="type">Type</label>
              <input name="type" placeholder="Main Campus" value={formData.type} onChange={handleChange} className={getInputStyle("type")} required />
            </div>
            <div className="w-1/5">
              <label htmlFor="city">City</label>
              <input name="city" value={formData.city} onChange={handleChange} className={getInputStyle("city")} required />
            </div>
          </div>

          {/* Textarea fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="address">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} className={getInputStyle("address")} required />
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} className={getInputStyle("notes")} required />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Submit
            </button>
            <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampusForm;
