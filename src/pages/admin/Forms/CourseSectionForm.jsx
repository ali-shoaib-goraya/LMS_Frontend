import React, { useState, useEffect } from "react";
import courseSectionService from "../../../services/courseSectionService";

function CourseSectionForm({ onBack, editMode = false, initialData = null }) {
  const [formData, setFormData] = useState({
    semesterId: "",
    courseId: "",
    facultyId: "",
    schoolId: "",
    courseSectionName: "",
    prefix: "",
    section: "",
    status: "",
    notes: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNameEdited, setIsNameEdited] = useState(false);
  
  // For dropdowns
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schools, setSchools] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [semestersRes, coursesRes, teachersRes, schoolsRes] = await Promise.all([
          courseSectionService.getAllSemesters(),
          courseSectionService.getAllCourses(),
          courseSectionService.getAllTeachers(),
          courseSectionService.getAllSchools()
        ]);
        
        setSemesters(semestersRes.data.data || []);
        setCourses(coursesRes.data.data || []);
        setTeachers(teachersRes.data.data || []);
        setSchools(schoolsRes.data.data || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Set initial data for edit mode
  useEffect(() => {
    if (editMode && initialData) {
      setFormData({
        semesterId: initialData.semesterId,
        courseId: initialData.courseId,
        facultyId: initialData.facultyId,
        schoolId: initialData.schoolId,
        courseSectionName: initialData.courseSectionName,
        prefix: initialData.prefix || "",
        section: initialData.section || "",
        status: initialData.status,
        notes: initialData.notes || ""
      });
      setIsNameEdited(true); // Assume name is already set
    }
  }, [editMode, initialData]);

  // Automatically generate name when semester or course changes (only in create mode)
  useEffect(() => {
    if (!editMode && !isNameEdited && formData.courseId && formData.semesterId) {
      const selectedCourse = courses.find(course => course.courseId === parseInt(formData.courseId));
      const selectedSemester = semesters.find(semester => semester.semesterId === parseInt(formData.semesterId));
      
      if (selectedCourse && selectedSemester) {
        setFormData(prev => ({
          ...prev,
          courseSectionName: `${selectedCourse.courseCode}-${selectedSemester.semesterName}`
        }));
      }
    }
  }, [formData.semesterId, formData.courseId, isNameEdited, courses, semesters, editMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If name field is edited manually, mark it as edited
    if (name === "courseSectionName") {
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

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.semesterId) newErrors.semesterId = "Semester is required";
    if (!formData.courseId) newErrors.courseId = "Course is required";
    if (!formData.facultyId) newErrors.facultyId = "Teacher is required";
    if (!formData.schoolId) newErrors.schoolId = "School is required";
    if (!formData.courseSectionName) newErrors.courseSectionName = "Name is required";
    if (!formData.status) newErrors.status = "Status is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert IDs to numbers for submission
      const dataToSubmit = {
        ...formData,
        semesterId: parseInt(formData.semesterId),
        courseId: parseInt(formData.courseId),
        schoolId: parseInt(formData.schoolId),
      };

      if (editMode && initialData) {
        // Update existing course section
        await courseSectionService.updateCourseSection(initialData.courseSectionId, dataToSubmit);
      } else {
        // Create new course section
        await courseSectionService.createCourseSection(dataToSubmit);
      }
      
      // Go back to table view after successful submission
      onBack();
    } catch (err) {
      console.error("Error submitting form:", err);
      // Handle API errors
      if (err.response && err.response.data) {
        const apiErrors = err.response.data.errors;
        if (apiErrors) {
          // Map API errors to form fields
          const formattedErrors = {};
          Object.keys(apiErrors).forEach(key => {
            formattedErrors[key] = apiErrors[key].join(', ');
          });
          setErrors(formattedErrors);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">{editMode ? "Edit Course Section" : "Create Course Section"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Semester*</label>
            <select
              name="semesterId"
              value={formData.semesterId}
              onChange={handleChange}
              disabled={editMode} // Disabled in edit mode
              className={`w-full p-2 border rounded-md ${
                errors.semesterId ? "border-red-500" : "border-gray-300"
              } ${editMode ? "bg-gray-100" : ""}`}
            >
              <option value="">Select Semester</option>
              {semesters.map(semester => (
                <option key={semester.semesterId} value={semester.semesterId}>
                  {semester.semesterName}
                </option>
              ))}
            </select>
            {errors.semesterId && (
              <p className="mt-1 text-sm text-red-600">{errors.semesterId}</p>
            )}
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Course*</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              disabled={editMode} // Disabled in edit mode
              className={`w-full p-2 border rounded-md ${
                errors.courseId ? "border-red-500" : "border-gray-300"
              } ${editMode ? "bg-gray-100" : ""}`}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="mt-1 text-sm text-red-600">{errors.courseId}</p>
            )}
          </div>

          {/* Teacher Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Teacher*</label>
            <select
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.facultyId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
            {errors.facultyId && (
              <p className="mt-1 text-sm text-red-600">{errors.facultyId}</p>
            )}
          </div>

          {/* School Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">School*</label>
            <select
              name="schoolId"
              value={formData.schoolId}
              onChange={handleChange}
              disabled={editMode} // Disabled in edit mode
              className={`w-full p-2 border rounded-md ${
                errors.schoolId ? "border-red-500" : "border-gray-300"
              } ${editMode ? "bg-gray-100" : ""}`}
            >
              <option value="">Select School</option>
              {schools.map(school => (
                <option key={school.schoolId} value={school.schoolId}>
                  {school.schoolName}
                </option>
              ))}
            </select>
            {errors.schoolId && (
              <p className="mt-1 text-sm text-red-600">{errors.schoolId}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name*</label>
            <input
              type="text"
              name="courseSectionName"
              value={formData.courseSectionName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.courseSectionName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.courseSectionName && (
              <p className="mt-1 text-sm text-red-600">{errors.courseSectionName}</p>
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.status ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
              <option value="Cancelled">Cancelled</option>
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
              className="w-full p-2 border border-gray-300 rounded-md"
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
            {isSubmitting ? "Submitting..." : editMode ? "Update" : "Submit"}
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