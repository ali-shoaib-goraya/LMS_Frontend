import React, { useState } from "react";

const SemesterForm = () => {
  const [formData, setFormData] = useState({
    academicYear: "",
    name: "",
    gpaRoundMethod: "",
    startDate: "",
    endDate: "",
    status: "",
    attendanceCutoffDate: "",
    showResultInTranscript: false,
    showGpaResultToStudents: false,
    showObeResultToStudents: false,
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
    const { 
      academicYear, 
      name, 
      gpaRoundMethod, 
      startDate, 
      endDate, 
      status, 
      attendanceCutoffDate, 
      notes 
    } = formData;
    
    // Ensure all required fields have values
    return (
      academicYear &&
      name &&
      gpaRoundMethod &&
      startDate &&
      endDate &&
      status &&
      attendanceCutoffDate &&
      notes
    );
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark the form as submitted

    if (validateForm()) {
      alert("Form submitted successfully!");
      // Reset form after successful submission
      setFormData({
        academicYear: "",
        name: "",
        gpaRoundMethod: "",
        startDate: "",
        endDate: "",
        status: "",
        attendanceCutoffDate: "",
        showResultInTranscript: false,
        showGpaResultToStudents: false,
        showObeResultToStudents: false,
        notes: "",
      });
      setIsSubmitted(false); // Reset submission state
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <form onSubmit={handleSubmit}>
        {/* Academic Year, Name, GPA Round Method */}
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Academic Year</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className={`p-2 text-lg border ${isSubmitted && !formData.academicYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            >
              <option value="" disabled>- Select -</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter semester name"
              className={`p-2 text-lg border ${isSubmitted && !formData.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">GPA Round Method</label>
            <select
              name="gpaRoundMethod"
              value={formData.gpaRoundMethod}
              onChange={handleChange}
              className={`p-2 text-lg border ${isSubmitted && !formData.gpaRoundMethod ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            >
              <option value="" disabled>- Select -</option>
              <option value="Round">Round</option>
              <option value="Ceil">Ceil</option>
              <option value="Floor">Floor</option>
            </select>
          </div>
        </div>

        {/* Start Date, End Date, status & Attendance Cutoff Date */}
        <div className="grid grid-cols-3 gap-5 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`p-2 text-lg border ${isSubmitted && !formData.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`p-2 text-lg border ${isSubmitted && !formData.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Active"
              classsName={`p-2 text-lg border ${isSubmitted && !formData.status ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700">Attendance Cutoff Date</label>
            <input
              type="date"
              name="attendanceCutoffDate"
              value={formData.attendanceCutoffDate}
              onChange={handleChange}
              className={`p-2 text-lg border ${isSubmitted && !formData.attendanceCutoffDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              required
            />
          </div>
        </div>

{/* Checkboxes */}
<div className="flex space-x-6 mt-4">
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="showResultInTranscript"
      checked={formData.showResultInTranscript}
      onChange={handleChange}
      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
    />
    <label htmlFor="showResultInTranscript" className="text-sm text-gray-700">
      Show Result in Transcript (GPA)
    </label>
  </div>

  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="showGpaResultToStudents"
      checked={formData.showGpaResultToStudents}
      onChange={handleChange}
      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
    />
    <label htmlFor="showGpaResultToStudents" className="text-sm text-gray-700">
      Show GPA Result to Students
    </label>
  </div>

  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      name="showObeResultToStudents"
      checked={formData.showObeResultToStudents}
      onChange={handleChange}
      className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
    />
    <label htmlFor="showObeResultToStudents" className="text-sm text-gray-700">
      Show OBE Result to Students
    </label>
  </div>
</div>


        {/* Notes */}
        <div className="flex flex-wrap gap-5 mt-4">
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            <label className="text-sm text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
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
  );
};

export default SemesterForm;
