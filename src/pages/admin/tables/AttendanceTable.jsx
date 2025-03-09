import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockStudents } from "../../../MockData/mockStudents";

const AttendanceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [students] = useState(mockStudents);
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );

  // Form State
  const [formData, setFormData] = useState({
    lectureName: "",
    attendanceDate: "",
    duration: "",
    topic: "",
    room: "",
    assessment: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState({});

  // Handle Attendance Change
  const handleAttendanceChange = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Save Attendance with Validation
  const handleSaveAttendance = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Attendance Saved:", attendance);
    alert("Attendance has been saved successfully!");
  };

  // Function to handle navigation
  const handleNavigation = (route) => {
    setDropdownOpen(false); // Close dropdown
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Course Section Header */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-800">Course Section</h2>
        <p className="text-gray-600">test-100 / CMS NAMAL / Fall 2024</p>
        <div className="border-b border-gray-300 mt-4 mb-4"></div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 text-gray-600 relative">
          <div className="relative">
            <button
              className="px-4 py-2 flex items-center space-x-2 hover:text-blue-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>View</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-40 z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() =>
                    handleNavigation("/dashboard/academic/students/activities")
                  }
                >
                  Activities
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() =>
                    handleNavigation("/dashboard/academic/students/attendance")
                  }
                >
                  Attendance
                </button>
              </div>
            )}
          </div>
          <button className="px-4 py-2 hover:text-blue-600">Reports</button>
          <button
            className="px-4 py-2 hover:text-blue-600"
            onClick={() => navigate("/dashboard/academic/students")}
          >
            Configuration
          </button>
        </div>
      </div>

      {/* Attendance Form */}
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-6xl border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Take Attendance
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: "lectureName", label: "Lecture Name" },
            { name: "attendanceDate", label: "Attendance Date", type: "date" },
            { name: "duration", label: "Duration (min)", type: "number" },
            { name: "topic", label: "Topic Taught / Remarks", span: 3 },
            { name: "room", label: "Room" },
            { name: "assessment", label: "Assessment" },
          ].map(({ name, label, type = "text", span }) => (
            <div key={name} className={span ? `col-span-${span}` : ""}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="bg-white p-6 shadow-md rounded-lg overflow-x-auto w-full max-w-6xl mt-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Students List
        </h3>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Sr. #
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Reg. No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Present
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  {student.registrationNo}
                </td>
                <td className="border px-4 py-2 text-center">{student.name}</td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={attendance[student.id]}
                    onChange={() => handleAttendanceChange(student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Save Attendance Button */}
        <div className="flex justify-start mt-4">
          <button
            onClick={handleSaveAttendance}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
