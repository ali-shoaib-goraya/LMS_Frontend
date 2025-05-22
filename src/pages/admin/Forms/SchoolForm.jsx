import React, { useState, useEffect } from "react";
import * as yup from "yup";

// Define validation schema
const formSchema = yup.object().shape({
  semester: yup.string().required("Semester is required"),
  course: yup.string().required("Course is required"),
  teacher: yup.string().required("Teacher is required"),
  school: yup.string().required("School is required"),
  name: yup.string().required("Name is required"),
  prefix: yup.string(),
  section: yup.string(),
  status: yup.string().required("Status is required"),
  notes: yup.string(),
});

function CourseSectionForm({ onBack }) {
  const [formData, setFormData] = useState({
    semester: "",
    course: "",
    teacher: "",
    school: "",
    name: "",
    prefix: "",
    section: "",
    status: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNameEdited, setIsNameEdited] = useState(false);

  // Automatically generate name when semester or course changes
  useEffect(() => {
    if (!isNameEdited && formData.semester && formData.course) {
      setFormData(prev => ({
        ...prev,
        name: `${formData.semester} ${formData.course}`
      }));
    }
  }, [formData.semester, formData.course, isNameEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If name field is edited manually, mark it as edited
    if (name === "name") {
      setIsNameEdited(true);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      await formSchema.validate(formData, { abortEarly: false });
      
      // Form is valid - submit data
      console.log("Form submitted successfully!", formData);
      
      // Reset form after submission
      setFormData({
        semester: "",
        course: "",
        teacher: "",
        school: "",
        name: "",
        prefix: "",
        section: "",
        status: "",
        notes: ""
      });
      setIsNameEdited(false);
      setErrors({});
    } catch (err) {
      // Handle validation errors
      const newErrors = {};
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Semester*</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.semester ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Semester</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
            {errors.semester && (
              <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
            )}
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course*</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.course ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Course</option>
              <option value="CS101">CS101 - Introduction to Programming</option>
              <option value="MATH201">MATH201 - Calculus</option>
              <option value="ENG102">ENG102 - English Composition</option>
            </select>
            {errors.course && (
              <p className="mt-1 text-sm text-red-600">{errors.course}</p>
            )}
          </div>

          {/* Teacher Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Teacher*</label>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.teacher ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Teacher</option>
              <option value="Dr. Smith">Dr. Smith</option>
              <option value="Prof. Johnson">Prof. Johnson</option>
              <option value="Dr. Williams">Dr. Williams</option>
            </select>
            {errors.teacher && (
              <p className="mt-1 text-sm text-red-600">{errors.teacher}</p>
            )}
          </div>

          {/* School Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">School*</label>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.school ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select School</option>
              <option value="School of Computer Science">School of Computer Science</option>
              <option value="School of Engineering">School of Engineering</option>
              <option value="School of Business">School of Business</option>
            </select>
            {errors.school && (
              <p className="mt-1 text-sm text-red-600">{errors.school}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Prefix */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Prefix</label>
            <input
              type="text"
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>

          {/* Notes (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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
}

export default CourseSectionForm;