import { mockAttendance } from '../../MockData/MockAttendance';

const AttendancePage = () => {
  const { summary, semester } = mockAttendance;

  return (
    <div className="p-6">
      {/* Header Section with Underline */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-3xl font-normal">Attendance</h1>
        <div className="flex gap-4">
          <a href="/student" className="text-blue-600 hover:text-blue-800">Home</a>
          <span className="text-gray-500">Attendance</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <span className="text-gray-600">Total Course Section: </span>
            <span>{summary.totalCourseSection}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Lectures: </span>
            <span>{summary.totalLectures}</span>
          </div>
          <div>
            <span className="text-gray-600">Attended Lectures: </span>
            <span>{summary.attendedLectures}</span>
          </div>
          <div>
            <span className="text-gray-600">Attended Percentage: </span>
            <span>{summary.attendedPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-normal mb-4">{semester.title}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-3 text-left">Course</th>
                <th className="border p-3 text-left">Teacher</th>
                <th className="border p-3 text-center">Total Lectures</th>
                <th className="border p-3 text-center">Attended Lectures</th>
                <th className="border p-3 text-center">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {semester.courses.map((course, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border p-3">
                    <div>{`${course.courseCode} - ${course.courseName}`}</div>
                    <div className="text-sm text-gray-500">
                      {`(${course.semester} - ${course.term}) (${course.section})`}
                    </div>
                  </td>
                  <td className="border p-3">{course.teacher}</td>
                  <td className="border p-3 text-center">{course.totalLectures}</td>
                  <td className="border p-3 text-center">{course.attendedLectures}</td>
                  <td
                    className={`border p-3 text-center ${
                      course.percentage < 75 ? 'text-red-600' : ''
                    }`}
                  >
                    {course.percentage}%
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan="2" className="border p-3 text-right">Total:</td>
                <td className="border p-3 text-center">
                  {semester.courses.reduce((sum, course) => sum + course.totalLectures, 0)}
                </td>
                <td className="border p-3 text-center">
                  {semester.courses.reduce((sum, course) => sum + course.attendedLectures, 0)}
                </td>
                <td className="border p-3 text-center">
                  {(
                    (semester.courses.reduce((sum, course) => sum + course.attendedLectures, 0) /
                      semester.courses.reduce((sum, course) => sum + course.totalLectures, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
