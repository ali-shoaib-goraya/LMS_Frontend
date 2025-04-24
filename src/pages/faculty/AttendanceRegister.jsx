import React, { useState } from 'react';
import attendanceData from '../../MockData/mockAttendanceRegister'; // ✅ Ensure the file path is correct
import TeacherTakeAttendance from './TeacherTakeAttendance'; // Adjust the path as needed
import { FaEdit } from 'react-icons/fa'; // Import edit icon from react-icons

const AttendanceRegister = () => {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  const handleTakeAttendanceClick = () => {
    setShowAttendanceForm(true); // Show the attendance form
  };

  return (
    <div className="p-0">
      {!showAttendanceForm && ( // Conditionally render the button and table only when the form is not shown
        <div>
          <div className="flex justify-between items-center mb-4">
            {/* Heading on the left */}
            <h2 className="text-xl font-semibold">Attendance Register</h2>
            
            {/* Take Attendance Button on the right with green color */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              onClick={handleTakeAttendanceClick}
            >
              Take Attendance
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm text-left border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 border">Sr. #</th>
                  <th className="p-2 border">Students</th>
                  {/* Add a row for labs and dates */}
                  {attendanceData.classes.map((cls, index) => (
                    <th key={index} className="p-2 border text-center">
                      {cls.name}<br />
                      <span className="text-xs">{cls.date}</span>
                    </th>
                  ))}
                  <th className="p-2 border text-center">Total</th>
                </tr>
                {/* New row for labs and dates with edit icon */}
                <tr className="bg-gray-200 text-center">
                  <td colSpan={2}></td> {/* Empty cell to align with students column */}
                  {attendanceData.classes.map((cls, index) => (
                    <td key={index} className="p-2 border">
                      <div className="flex flex-col items-center">
                        <div className="text-blue-500 cursor-pointer mt-1">
                          <FaEdit size={16} />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td></td> {/* Empty cell for the Total column */}
                </tr>
              </thead>
              <tbody>
                {attendanceData.students.map((student, index) => {
                  const presentCount = student.attendance.filter(p => p).length;
                  const totalClasses = attendanceData.classes.length;
                  const percentage = ((presentCount / totalClasses) * 100).toFixed(2);
                  const isBelow75 = percentage < 75;

                  return (
                    <tr key={student.regNo} className="border-t">
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className={`text-sm ${isBelow75 ? 'text-red-600 font-semibold' : ''}`}>
                              {student.regNo}
                            </div>
                            <div className="text-xs">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      {student.attendance.map((attended, i) => (
                        <td key={i} className="p-2 border text-center">
                          {attended ? (
                            <div className="inline-flex items-center justify-center w-5 h-5 bg-green-600 rounded text-white">
                              ✓
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white" />
                          )}
                        </td>
                      ))}
                      <td className="p-2 border text-center">
                        <div>{percentage}%</div>
                        <div>{presentCount} / {totalClasses}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conditionally render the TeacherTakeAttendance component */}
      {showAttendanceForm && <TeacherTakeAttendance />}
    </div>
  );
};

export default AttendanceRegister;
