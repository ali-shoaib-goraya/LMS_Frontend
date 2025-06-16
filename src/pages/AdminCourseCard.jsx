import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import mockStudents from '../MockData/mockregisteredstudents';
import UsersIcon from '../assets/users.png';
import useCourseSectionStore from '../stores/courseSectionStore'; // adjust path as needed

const AdminCourseCard = ({ courseSection }) => {
  const [showModal, setShowModal] = useState(false);

  const setSelectedCourseSection = useCourseSectionStore(state => state.setSelectedCourseSection);

  useEffect(() => {
    setSelectedCourseSection(courseSection);
  }, [courseSection, setSelectedCourseSection]);


  const registeredStudents = mockStudents.filter(student =>
    student.courses.includes(courseSection.courseCode)
  );

  const initials = courseSection.facultyName
    ? courseSection.facultyName.split(' ').map(name => name[0]).join('')
    : 'N/A';

  const handleCardClick = () => {
    setSelectedCourseSection(courseSection);
  };

  return (
    <>
      <div
        className="max-w-sm rounded-lg bg-white p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        onClick={handleCardClick}
      >
        {/* Faculty Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-500 flex items-center justify-center bg-gray-100">
            <span className="text-xl font-bold text-purple-700">{initials}</span>
          </div>
        </div>

        {/* Course Info */}
        <Link
          to={{ pathname: `/dashboard/coursedetail` }}
          state={{ courseSection }}
          className="block text-center text-lg font-medium text-purple-700 mb-1 hover:underline"
        >
          {courseSection.courseCode} - {courseSection.courseName}
        </Link>

        <Link
          to={{ pathname: `/dashboard/coursedetail` }}
          state={{ courseSection }}
          className="block text-center text-sm text-gray-600 mb-1 hover:underline"
        >
          {courseSection.courseSectionName} - {courseSection.semesterName}
        </Link>

        <div className="text-center text-sm text-gray-600 mb-4">
          {courseSection.facultyName}
        </div>

        <div className="text-center text-sm text-gray-600 mb-4">
          {courseSection.schoolName}
        </div>

        {/* Registered Students */}
        <hr className="my-2" />
        <div
          className="flex items-center justify-center gap-2 text-sm font-semibold text-purple-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // prevent parent onClick
            setShowModal(true);
          }}
        >
          <img src={UsersIcon} alt="Students Icon" className="w-6 h-6" />
          <span>{registeredStudents.length}</span>
          <span>Students</span>
        </div>
      </div>

      {/* Modal for Student List */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-purple-700">Registered Students</h2>
            {registeredStudents.length > 0 ? (
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
            ) : (
              <div className="text-gray-600">No registered students found.</div>
            )}
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

export default AdminCourseCard;

