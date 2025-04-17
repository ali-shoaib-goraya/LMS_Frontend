import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockStudents from '../../MockData/mockregisteredstudents';
import UsersIcon from '../../assets/users.png'; // Adjust if necessary

const TeacherCourseCard = ({ course }) => {
  const [showModal, setShowModal] = useState(false);

  const registeredStudents = mockStudents.filter(student =>
    student.courses.includes(course.code)
  );

  return (
    <>
      <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        {/* Profile and Title Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-500 flex items-center justify-center bg-gray-100">
            <span className="text-xl font-bold text-purple-700">
              {course.instructorName
                .split(' ')
                .map(name => name[0])
                .join('')}
            </span>
          </div>
        </div>

        {/* Course Info */}
        <Link
          to={{ pathname: `/teacher/coursedetail` }}
          state={{ course }}
          className="block text-center text-lg font-medium text-purple-700 mb-1 hover:underline"
        >
          {course.code} - {course.title}
        </Link>

        <Link
          to={{ pathname: `/teacher/coursedetail` }}
          state={{ course }}
          className="block text-center text-sm text-gray-600 mb-1 hover:underline"
        >
          {course.semester} - {course.term}
        </Link>

        <div className="text-center text-sm text-gray-600 mb-4">
          {course.instructorName}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          Department of {course.department}
        </div>

        {/* Registered Students */}
        <hr className="my-2" />
        <div
          className="flex items-center justify-center gap-2 text-sm font-semibold text-purple-700 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img src={UsersIcon} alt="Students Icon" className="w-7 h-7 text-yellow-500" />
          <span>{registeredStudents.length}</span>
          <span>Students</span>
        </div>
      </div>

      {/* Modal for Student List */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-purple-700">Registered Students</h2>
            <table className="w-full text-left border">
              <thead>
                <tr>
                  <th className="border px-3 py-2">Name</th>
                  <th className="border px-3 py-2">Reg No</th>
                </tr>
              </thead>
              <tbody>
                {registeredStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-2">{student.name}</td>
                    <td className="border px-3 py-2">{student.regNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherCourseCard;
