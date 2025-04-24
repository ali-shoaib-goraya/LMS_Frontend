import { useState } from 'react';
import mockAwardList from '../../MockData/mockAwardList';

const AwardList = ({ course }) => {
  const [data] = useState(mockAwardList);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalStudents = data.students.length;
  const totalPages = Math.ceil(totalStudents / itemsPerPage);

  const currentStudents = data.students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalStudents);

  return (
    <div className="p-4 bg-transparent border rounded-lg shadow-lg">
      <h2 className="text-2xl text-700 mb-6">Award List</h2>

      {/* Buttons */}
      <div className="mb-4 flex gap-2">
        <button className="bg-blue-500 border-blue-500 text-white py-1 px-4 rounded">Excel</button>
        <button className="bg-green-500 border-green-500 text-white py-1 px-4 rounded">PDF</button>
      </div>

      {/* Title and Info */}
      <h1 className="text-xl font-bold text-blue-800 mb-2">
        Final Exam Award Sheet (Relative Grading System)
      </h1>

      <div className="mb-4 space-y-1">
        <p><span className="font-bold">Course:</span> {course.title}</p>
        <p><span className="font-bold">Teacher:</span> {course.instructorName}</p>
        <p><span className="font-bold">Semester:</span> {course.semester}</p>
        <p><span className="font-bold">Department:</span> {course.department}</p>
        <p><span className="font-bold">Total Credit Hours:</span> {course.credithours}</p>
      </div>

      {/* Pagination Info */}
      <div className="text-sm text-gray-600 mb-2">
        Showing {startItem}–{endItem} of {totalStudents} items
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm whitespace-nowrap">
          <thead>
            <tr>
              <th colSpan="4" className="border border-gray-300"></th>
              <th colSpan="5" className="border border-gray-300 text-center font-bold">Grading Instruments</th>
              <th colSpan="3" className="border border-gray-300 text-center font-bold">Final Result</th>
            </tr>
            <tr>
              <th colSpan="4" className="border border-gray-300"></th>
              <th colSpan="5" className="border border-gray-300 text-center">Continual Assessment</th>
              <th colSpan="3" className="border border-gray-300"></th>
            </tr>
            <tr>
              <th className="border border-gray-300 text-center">Sr. No.</th>
              <th className="border border-gray-300 text-center">Registration No.</th>
              <th className="border border-gray-300 text-center">Student Name</th>
              <th className="border border-gray-300 text-center">Assignments</th>
              <th className="border border-gray-300 text-center">Quizzes</th>
              <th className="border border-gray-300 text-center">Class Participation</th>
              <th className="border border-gray-300 text-center">Any Other</th>
              <th className="border border-gray-300 text-center">
                <div>%age Weight</div>
                <div>(a)</div>
                <div className="text-xs">(20-50%)</div>
                <div>{data.gradingWeights.continualAssessment}</div>
              </th>
              <th className="border border-gray-300 text-center">
                <div>%age Weight</div>
                <div>(b)</div>
                <div className="text-xs">(20-30%)</div>
                <div>{data.gradingWeights.mid}</div>
              </th>
              <th className="border border-gray-300 text-center">
                <div>%age Weight</div>
                <div>(c)</div>
                <div className="text-xs">(40-50%)</div>
                <div>{data.gradingWeights.final}</div>
              </th>
              <th className="border border-gray-300 text-center">
                <div>Sum</div>
                <div>(a + b + c)</div>
                <div>{data.gradingWeights.total}</div>
              </th>
              <th className="border border-gray-300 text-center">Letter Grade</th>
              <th className="border border-gray-300 text-center">Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.srNo}>
                <td className="border border-gray-300 text-center">{student.srNo}</td>
                <td className="border border-gray-300 px-2">{student.registrationNo}</td>
                <td className="border border-gray-300 px-2">{student.studentName}</td>
                <td className="border border-gray-300 text-center">{student.assignments || ''}</td>
                <td className="border border-gray-300 text-center">{student.quizzes || ''}</td>
                <td className="border border-gray-300 text-center">{student.classParticipation || ''}</td>
                <td className="border border-gray-300 text-center">{student.anyOther}</td>
                <td className="border border-gray-300 text-center">{student.continualAssessment}</td>
                <td className="border border-gray-300 text-center">{student.mid}</td>
                <td className="border border-gray-300 text-center">{student.final}</td>
                <td className="border border-gray-300 text-center">{student.total}</td>
                <td className="border border-gray-300 text-center">{student.letterGrade}</td>
                <td className="border border-gray-300 text-center">{student.gradePoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-start mt-4 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
        >
          «
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            onClick={() => goToPage(idx + 1)}
            className={`px-3 py-1 rounded text-sm ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default AwardList;
