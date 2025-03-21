import React, { useState } from "react";
import { mockCourses2 } from "../../../MockData/mockCourses2";
import SelectTeachers from "../Forms/BulkCourses3";

const CoursesTablePopup = ({ onClose, onSave, selectedCourses }) => {
  const [selected, setSelected] = useState(selectedCourses);

  const handleCheckboxChange = (courseId) => {
    setSelected((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Select Courses</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Select</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Credit Hours</th>
              <th className="border px-4 py-2">Delivery Format</th>
            </tr>
          </thead>
          <tbody>
            {mockCourses2.map((course) => {
              let deliveryFormat = "";
              let adjustedCreditHours = course.creditHours;

              if (!course.isTheory) {
                deliveryFormat = "Lab";
              } else if (course.isTheory && !course.isLab) {
                deliveryFormat = "Theory";
              } else if (course.isTheory && course.isLab) {
                deliveryFormat = "Theory + Lab";
              }

              return (
                <tr key={course.courseId} className="text-center">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.courseId)}
                      onChange={() => handleCheckboxChange(course.courseId)}
                      className="cursor-pointer w-4 h-4"
                    />
                  </td>
                  <td className="border px-4 py-2">{course.courseCode}</td>
                  <td className="border px-4 py-2">{course.courseName}</td>
                  <td className="border px-4 py-2">{course.department}</td>
                  <td className="border px-4 py-2">{adjustedCreditHours}</td>
                  <td className="border px-4 py-2">{deliveryFormat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => onSave(selected)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCourses = ({ school, semester, prefix, onBack, onNext }) => {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(2); // Start from Step 2

  const handleSaveCourses = (selectedCourseIds) => {
    const selectedCourses = mockCourses2.filter((course) =>
      selectedCourseIds.includes(course.courseId)
    );

    const updatedCourses = selectedCourses.map((course) => ({
      ...course,
      deliveryFormat: course.isTheory
        ? course.isLab
          ? "Theory + Lab"
          : "Theory"
        : "Lab",
      creditHours: course.isTheory && course.isLab ? course.creditHours + 1 : course.creditHours,
      sections: 1, // Default section count
    }));

    setCourses(updatedCourses);
    setShowPopup(false);
  };

  return (
    <div className="w-full max-w-6xl bg-white p-6 shadow-md rounded-md mb-4">
      {step === 3 ? (
        <SelectTeachers 
          school={school} 
          semester={semester} 
          prefix={prefix} 
          courses={courses}
          onBack={() => setStep(2)}
        />
      ) : (
        <div className="bg-white p-4 shadow rounded-md">
          {/* Steps Navigation */}
          <div className="flex border-b border-gray-200">
            <div
              className={`w-1/3 text-center pb-2 font-semibold cursor-pointer ${
                step === 1 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={onBack}
            >
              Step 1 <br /> Select Semester
            </div>
            <div
              className={`w-1/3 text-center pb-2 cursor-pointer ${
                step === 2 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={() => setStep(2)}
            >
              Step 2 <br /> Add Courses & Select No. of Sections
            </div>
            <div
              className={`w-1/3 text-center pb-2 cursor-pointer ${
                step === 3 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={() => setStep(3)}
            >
              Step 3 <br /> Select Teachers
            </div>
          </div>

          {/* School, Semester, Prefix Fields */}
          <div className="mt-6 grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium">School</label>
              <input type="text" value={school} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Semester</label>
              <input type="text" value={semester} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Prefix</label>
              <input type="text" value={prefix} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
          </div>

          {/* Add Course Button */}
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => setShowPopup(true)}>
            Add Course
          </button>

          {/* Selected Courses Table */}
          {courses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Courses</h3>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Course Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.courseId}>
                      <td className="border px-4 py-2">{course.courseCode}</td>
                      <td className="border px-4 py-2">{course.courseName}</td>
                      <td className="border px-4 py-2">{course.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
            <button onClick={() => setStep(3)} className="bg-green-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {/* Pop-up Modal */}
      {showPopup && <CoursesTablePopup onClose={() => setShowPopup(false)} onSave={handleSaveCourses} selectedCourses={courses.map((c) => c.courseId)} />}
    </div>
  );
};

export default AddCourses;
