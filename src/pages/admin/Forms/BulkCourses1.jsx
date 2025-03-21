import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockSchools } from "../../../MockData/mockSchools";
import { mockSemesters } from "../../../MockData/mockSemesters";
import AddCourses from "../Forms/BulkCourses2";
import SelectTeachers from "../Forms/BulkCourses3";

const SelectSemester = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState("");
  const [semester, setSemester] = useState("");
  const [prefix, setPrefix] = useState("");
  const [step, setStep] = useState(1); // Track the step (1, 2, or 3)

  const [errors, setErrors] = useState({ school: "", semester: "", prefix: "" });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { school: "", semester: "", prefix: "" };

    if (!school) {
      newErrors.school = "Please select a school.";
      isValid = false;
    }
    if (!semester) {
      newErrors.semester = "Please select a semester.";
      isValid = false;
    }
    if (!prefix.trim()) {
      newErrors.prefix = "Prefix is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2); // Move to Step 2 after validation
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white p-4 shadow-md rounded-md mb-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Create Course Sections in Bulk
      </h1>

      {step === 2 ? (
        <AddCourses
          school={school}
          semester={semester}
          prefix={prefix}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      ) : step === 3 ? (
        <SelectTeachers 
        school={school}
          semester={semester}
          prefix={prefix}
        onBack={() => setStep(2)} />
      ) : (
        <div className="bg-white p-4 shadow rounded-md">
          {/* Steps Navigation */}
          <div className="flex border-b border-gray-200">
            <div
              className={`w-1/3 text-center pb-2 font-semibold cursor-pointer ${
                step === 1 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={() => setStep(1)}
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

          {/* Step 1: Select Semester Form */}
          <div className="mt-6">
            <label className="block text-gray-700 font-medium">School</label>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className={`w-full mt-1 p-2 border rounded ${errors.school ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">-Select-</option>
              {mockSchools.map((s) => (
                <option key={s.id} value={s.schoolName}>
                  {s.schoolName}
                </option>
              ))}
            </select>
            {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}

            <label className="block text-gray-700 font-medium mt-4">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className={`w-full mt-1 p-2 border rounded ${errors.semester ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">-Select-</option>
              {mockSemesters.map((sem) => (
                <option key={sem.id} value={sem.name}>
                  {sem.name}
                </option>
              ))}
            </select>
            {errors.semester && <p className="text-red-500 text-sm">{errors.semester}</p>}

            <label className="block text-gray-700 font-medium mt-4">Prefix</label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className={`w-full mt-1 p-2 border rounded ${errors.prefix ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter Prefix i.e Semester 4"
            />
            {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix}</p>}

            <button
              className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSemester;
