import React, { useState } from "react";

function CoursesForm() {
  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    deliveryFormat: "",
    theory: "",
    lab: "",
    tutorial: "",
    baseType:"",
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
    baseType: "CLO Based",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Mark the form as submitted
  
    // Check if all required fields are filled. If not, don't submit.
    const formElements = e.target.elements;
    let isFormValid = true;
  
    for (let element of formElements) {
      if (element.required && !element.value) {
        isFormValid = false;
        break;
      }
    }
  
    if (isFormValid) {
      // Here you would handle the form submission (e.g., API call)
      console.log("Form submitted successfully!");
  
      // Reset the form fields after successful submission
      setFormData({
        code: "",
        name: "",
        deliveryFormat: "",
        theory: "",
        lab: "",
        tutorial: "",
        baseType:"",
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
        baseType: "CLO Based",
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
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
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
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.code ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.name ? 'border-red-500' : 'border-gray-300'}`}
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

          {/* Delivery Format, Theory, Lab, Tutorial, BaseType */}
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">Delivery Format</label>
            <input
              type="text"
              name="deliveryFormat"
              value={formData.deliveryFormat}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.deliveryFormat ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Theory</label>
            <input
              type="number"
              name="theory"
              value={formData.theory}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.theory ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Lab</label>
            <input
              type="number"
              name="lab"
              value={formData.lab}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.lab ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tutorial</label>
            <input
              type="number"
              name="tutorial"
              value={formData.tutorial}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.tutorial ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">Base Type</label>
            <input
              type="text"
              name="Base Type"
              value={formData.baseType}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.baseType ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>

          {/* department, courselevel and Knowledge Area */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.department ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">- Select -</option>
              <option value="Math">Computer Science</option>
              <option value="Science">Business Administration</option>
            </select>
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">Course Level</label>
            <select
              name="courseLevel"
              value={formData.courseLevel}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.courseLevel ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">- Select -</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">Knowledge Area</label>
            <select
              name="knowledgeArea"
              value={formData.knowledgeArea}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.knowledgeArea ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">- Select -</option>
              <option value="Math">Mathematics</option>
              <option value="Science">Science</option>
            </select>
          </div>

          {/* Connected Courses and Alternative Courses */}
          <div className="col-span-6">
            <label className="block text-sm font-medium text-gray-700">Connected Courses</label>
            <select
              name="connectedCourses"
              value={formData.connectedCourses}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.connectedCourses ? 'border-red-500' : 'border-gray-300'}`}
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
              type="text"
              name="alternativeCourses"
              value={formData.alternativeCourses}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.alternativeCourses ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.knowledgeProfiles ? 'border-red-500' : 'border-gray-300'}`}
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
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.objectives ? 'border-red-500' : 'border-gray-300'}`}
              rows="2"
              required
            ></textarea>
          </div>

          {/* Notes */}
          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !formData.notes ? 'border-red-500' : 'border-gray-300'}`}
              rows="3"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="col-span-12 text-left">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CoursesForm;
