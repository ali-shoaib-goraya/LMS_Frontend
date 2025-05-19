import React, { useState, useEffect } from "react";
import courseService from "../../../services/courseService";

function CoursesForm({ onBack, editingCourse = null, onSubmitSuccess }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    isTheory: false,
    isLab: false,
    isCompulsory: false,
    creditHours: "",
    departmentId: "",
    connectedCourseId: "",
    objective: "",
    notes: "",
  });

  // Load departments and courses on component mount
  useEffect(() => {
    loadDepartments();
    loadAllCourses();
  }, []);

  // Populate form data when editing
  useEffect(() => {
    if (editingCourse && departments.length > 0) {
      // Find the department ID based on department name
      const selectedDepartment = departments.find(
        dept => dept.departmentName === editingCourse.department
      );
      
      setFormData({
        courseName: editingCourse.courseName || "",
        courseCode: editingCourse.courseCode || "",
        isTheory: editingCourse.isTheory || false,
        isLab: editingCourse.isLab || false,
        isCompulsory: editingCourse.isCompulsory || false,
        creditHours: editingCourse.creditHours?.toString() || "",
        departmentId: selectedDepartment ? selectedDepartment.departmentId.toString() : "",
        connectedCourseId: editingCourse.connectedCourseId?.toString() || "",
        objective: editingCourse.objective || "",
        notes: editingCourse.notes || "",
      });
    }
  }, [editingCourse, departments]);

  const loadDepartments = async () => {
    try {
      const response = await courseService.getAllDepartments();
      setDepartments(response.data.data || []);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  const loadAllCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setAllCourses(response.data.data || []);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate required fields
    const requiredFields = ['courseName', 'courseCode', 'creditHours', 'departmentId', 'objective'];
    const isFormValid = requiredFields.every(field => 
      formData[field] && formData[field].toString().trim() !== ""
    );

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        creditHours: parseInt(formData.creditHours),
        departmentId: parseInt(formData.departmentId),
        connectedCourseId: formData.connectedCourseId ? parseInt(formData.connectedCourseId) : null,
      };

      if (editingCourse) {
        // Update existing course using PATCH
        await courseService.updateCourse(editingCourse.courseId, submissionData);
        console.log("Course updated successfully!");
      } else {
        // Create new course
        await courseService.createCourse(submissionData);
        console.log("Course created successfully!");
      }

      // Reset form
      setFormData({
        courseName: "",
        courseCode: "",
        isTheory: false,
        isLab: false,
        isCompulsory: false,
        creditHours: "",
        departmentId: "",
        connectedCourseId: "",
        objective: "",
        notes: "",
      });

      setIsSubmitted(false);
      
      // Notify parent component
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
      // Go back to table
      onBack();
    } catch (error) {
      console.error("Failed to submit course:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
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
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {editingCourse ? "Edit Course" : "Create Course"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {isSubmitted && !["courseName", "courseCode", "creditHours", "departmentId", "objective"].every(field => 
          formData[field] && formData[field].toString().trim() !== ""
        ) && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            Please fill all required fields.
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Course Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              className={`mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isSubmitted && !formData.courseCode ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            />
          </div>

          <div className="col-span-5">
            <label className="block text-sm font-medium text-gray-700">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className={`mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isSubmitted && !formData.courseName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            />
          </div>

          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className={`mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isSubmitted && !formData.departmentId ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            >
              <option value="">- Select Department -</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Credit Hours <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="creditHours"
              value={formData.creditHours}
              onChange={handleChange}
              min="1"
              className={`mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isSubmitted && !formData.creditHours ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            />
          </div>

          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700">Connected Course</label>
            <select
              name="connectedCourseId"
              value={formData.connectedCourseId}
              onChange={handleChange}
              className="mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-500"
            >
              <option value="">- Select Connected Course -</option>
              {allCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-8 flex items-center space-x-8 mt-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="isTheory"
                checked={formData.isTheory}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2">Theory</span>
            </label>

            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="isLab"
                checked={formData.isLab}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2">Lab</span>
            </label>

            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                name="isCompulsory"
                checked={formData.isCompulsory}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2">Compulsory</span>
            </label>
          </div>

          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700">
              Objective <span className="text-red-500">*</span>
            </label>
            <textarea
              name="objective"
              value={formData.objective}
              onChange={handleChange}
              rows="3"
              className={`mt-1 w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                isSubmitted && !formData.objective ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            ></textarea>
          </div>

          <div className="col-span-12">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="mt-1 w-full border px-3 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-md transition ${
              isLoading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isLoading ? "Saving..." : editingCourse ? "Update" : "Submit"}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CoursesForm;