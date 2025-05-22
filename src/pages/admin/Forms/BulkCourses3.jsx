import React, { useState } from "react";
import Select from "react-select"; // Just imported react-select
import { facultyData } from "../../../MockData/mockFaculty";

const SelectTeachers = ({ school, semester, prefix, onBack, onSave, courses }) => {
  const [courseData, setCourseData] = useState(courses ?? []);
  const [step, setStep] = useState(3);

  // Prepare teacher options for react-select
  const teacherOptions = facultyData.map((teacher) => ({
    value: teacher.name,
    label: teacher.name,
  }));

  const handleChange = (id, field, value) => {
    setCourseData((prevCourses) =>
      prevCourses.map((course) =>
        course.courseId === id ? { ...course, [field]: value } : course
      )
    );
  };

  const handleRemove = (id) => {
    setCourseData(courseData.filter((course) => course.courseId !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow rounded-md">
        {/* Steps Navigation */}
        <div className="flex border-b border-gray-200">
          <div
            className={`w-1/3 text-center pb-2 font-semibold cursor-pointer ${
              step === 1
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
            }`}
            onClick={() => setStep(1)}
          >
            Step 1 <br /> Select Semester
          </div>
          <div
            className={`w-1/3 text-center pb-2 cursor-pointer ${
              step === 2
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
            }`}
            onClick={() => onBack()}
          >
            Step 2 <br /> Add Courses & Select No. of Sections
          </div>
          <div
            className={`w-1/3 text-center pb-2 cursor-pointer ${
              step === 3
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
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
            <input
              type="text"
              value={school}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Semester</label>
            <input
              type="text"
              value={semester}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Prefix</label>
            <input
              type="text"
              value={prefix}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {courseData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Selected Courses</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Course Code</th>
                  <th className="border px-4 py-2">Course Name</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Teacher</th>
                  <th className="border px-4 py-2">Section</th>
                </tr>
              </thead>
              <tbody>
                {courseData.flatMap((course) =>
                  Array.from({ length: course.sections || 1 }, (_, index) => (
                    <tr key={`${course.courseId}-${index}`} className="text-center">
                      <td className="border px-4 py-2">{course.courseCode}</td>
                      <td className="border px-4 py-2">{course.courseName}</td>
                      <td className="border px-4 py-2">{course.department}</td>
                      <td className="border px-4 py-2">
                        {/* -------------- Only this part changed to React Select -------------- */}
                        <Select
                          options={teacherOptions}
                          value={
                            course.selectedTeachers?.[index]
                              ? { value: course.selectedTeachers[index], label: course.selectedTeachers[index] }
                              : null
                          }
                          onChange={(selectedOption) => {
                            const selectedTeacher = selectedOption?.value || "";
                            setCourseData((prevCourses) =>
                              prevCourses.map((c) => {
                                if (c.courseId === course.courseId) {
                                  const updatedTeachers = [...(c.selectedTeachers || [])];
                                  updatedTeachers[index] = selectedTeacher;
                                  return { ...c, selectedTeachers: updatedTeachers };
                                }
                                return c;
                              })
                            );
                          }}
                          placeholder="Select Teacher"
                          isClearable
                          className="w-full" // keep it fitting the table width
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              minHeight: "35px", // match native select height
                              fontSize: "14px",
                            }),
                          }}
                        />
                        {/* --------------------------------------------------------------- */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onBack()}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={() => onSave(courseData)}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTeachers;
