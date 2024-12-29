// pages/student/AttendancePage.jsx
import React from 'react';

const AttendancePage = () => {
  const subjects = [
    { name: 'Mathematics', attendance: 85, total: 45, present: 38 },
    { name: 'Physics', attendance: 90, total: 42, present: 38 },
    { name: 'Chemistry', attendance: 75, total: 40, present: 30 },
    // Add more subjects as needed
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Attendance Overview</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes Attended</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Classes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm text-gray-900">{subject.attendance}%</div>
                    <div className={`ml-2 h-2 w-20 rounded-full ${
                      subject.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.present}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;