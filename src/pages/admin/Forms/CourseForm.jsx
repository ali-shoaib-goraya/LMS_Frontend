import React, { useState } from "react";

function CoursesForm({onBack}) {
  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    deliveryFormat: "",
    theory: "",
    lab: "",
    tutorial: "",
    baseType: "CLO Based",
    department: "",
    courseLevel: "",
    knowledgeArea: "",
    connectedCourses: "",
    alternativeCourses: "",
    knowledgeProfiles: "",
    objectives: "",
    notes: "",
    active: false,
    supervisorBased: false,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark the form as submitted

    // Check if all required fields are filled. If not, don't submit.
    const isFormValid = Object.entries(formData).every(
      ([key, value]) =>
        key === "notes" || key === "active" || key === "supervisorBased" || value.trim() !== ""
    );

    if (isFormValid) {
      console.log("Form submitted successfully!", formData);

      // Reset the form fields after successful submission
      setFormData({
        code: "",
        name: "",
        deliveryFormat: "",
        theory: "",
        lab: "",
        tutorial: "",
        baseType: "CLO Based",
        department: "",
        courseLevel: "",
        knowledgeArea: "",
        connectedCourses: "",
        alternativeCourses: "",
        knowledgeProfiles: "",
        objectives: "",
        notes: "",
        active: false,
        supervisorBased: false,
      });

      setIsSubmitted(false); // Reset the submission state
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <form onSubmit={handleSubmit}>
        {/* Global Error Message */}
        {isSubmitted && Object.values(formData).some((value) => value === "") && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            Please fill all required fields!
          </div>
        )}

        <div className="grid grid-cols-12 gap-4">
          {/* Code and Name */}
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.code ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>
          <div className="col-span-5">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.name ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
          </div>

          {/* Checkboxes */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Active</label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-5 w-5 ml-2"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Supervisor Based</label>
            <input
              type="checkbox"
              name="supervisorBased"
              checked={formData.supervisorBased}
              onChange={handleChange}
              className="h-5 w-5 ml-2"
            />
          </div>

          {/* Department, Course Level, and Knowledge Area */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.department ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">- Select -</option>
              <option value="CS">Computer Science</option>
              <option value="BA">Business Administration</option>
            </select>
          </div>

          {/* Connected Courses and Alternative Courses */}
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Connected Courses</label>
            <select
              name="connectedCourses"
              value={formData.connectedCourses}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.connectedCourses ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">- Select -</option>
              <option value="Math">Mathematics</option>
              <option value="Science">Science</option>
            </select>
          </div>
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Alternative Courses</label>
            <select
              name="alternativeCourses"
              value={formData.alternativeCourses}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.alternativeCourses ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">- Select -</option>
              <option value="Math">Mathematics</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Knowledge Profiles */}
          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700">Knowledge Profiles</label>
            <select
              name="knowledgeProfiles"
              value={formData.knowledgeProfiles}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                isSubmitted && !formData.knowledgeProfiles ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">- Select -</option>
              <option value="Math">Mathematics</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Objectives */}
          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700">Objectives</label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="2"
              required
            ></textarea>
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
        </div>
      </form>
    </div>
  );
}

export default CoursesForm;
