import React, { useState } from "react";
import attendanceData from "../../MockData/mockAttendanceRegister"; // Importing attendanceData

const TeacherTakeAttendance = () => {
  // Initialize attendance state with all checkboxes checked by default (true = present)
  const [attendance, setAttendance] = useState(
    attendanceData.students.reduce((acc, student) => {
      acc[student.regNo] = true; // All checkboxes checked by default (true)
      return acc;
    }, {})
  );

  const handleCheckboxChange = (regNo) => {
    setAttendance((prev) => ({
      ...prev,
      [regNo]: !prev[regNo], // Toggle attendance between present and absent
    }));
  };

  const handleSave = () => {
    console.log("Attendance saved:", attendance);
    // Implement save logic here
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  const colors = [
    "bg-red-800",
    "bg-purple-900",
    "bg-orange-800",
    "bg-blue-900",
    "bg-green-800",
    "bg-indigo-900",
    "bg-pink-800",
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">Take Attendance</h2>

      {/* Input Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Row 1 */}
        <div className="col-span-2">
          <label className="block mb-1">Lecture Name</label>
          <input type="text" className="px-4 py-2 border rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Attendance Date</label>
          <input type="datetime-local" className="px-4 py-2 border rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Duration (min)</label>
          <input type="number" className="px-4 py-2 border rounded w-full" placeholder="90" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-2">
          <label className="block mb-1">Topic Taught / Remarks</label>
          <input type="text" className="px-4 py-2 border rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Period Type</label>
          <input type="text" className="px-4 py-2 border rounded w-full" placeholder="General" />
        </div>
        <div>
          <label className="block mb-1">Room</label>
          <input type="text" className="px-4 py-2 border rounded w-full" />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <input type="text" className="px-4 py-2 border rounded w-full" placeholder="Regular" />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-2">
          <label className="block mb-1">Assessment</label>
          <input type="text" className="px-4 py-2 border rounded w-full" />
        </div>
      </div>

      {/* Attendance Table */}
      {attendanceData.students.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Sr. #</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500"></th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Registration No.</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Present</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.students.map((student, index) => (
                <tr key={student.regNo} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div
                      className={`w-10 h-10 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-medium`}
                    >
                      {getInitials(student.name)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{student.regNo}</td>
                  <td className="px-4 py-3 text-gray-600">{student.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={attendance[student.regNo]}
                        onChange={() => handleCheckboxChange(student.regNo)}
                        className="h-5 w-5 text-green-600 focus:ring-green-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Save Button */}
          <div className="mt-6 flex justify-start">
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="text-red-600">No students found for this course.</div>
      )}
    </div>
  );
};

export default TeacherTakeAttendance;
