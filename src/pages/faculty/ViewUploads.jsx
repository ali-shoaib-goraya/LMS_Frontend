import { useState } from "react";
import mockStudents from "../../MockData/mockregisteredstudents";

const ViewUploads = ({ onClose }) => {
  const [filter, setFilter] = useState("");

  // Store editable remarks locally
  const initialRemarks = mockStudents.reduce((acc, student) => {
    acc[student.regNo] = student.teacherRemarks || "";
    return acc;
  }, {});
  const [teacherRemarks, setTeacherRemarks] = useState(initialRemarks);

  const students = mockStudents.map((student, index) => ({
    srNo: student.srNo || index + 1,
    regNo: student.regNo,
    name: student.name,
    uploadFile: student.uploadFile || "",
    uploadedOn: student.uploadedOn || "",
    studentComment: student.studentComment || "",
  }));

  const filteredStudents = students.filter((student) =>
    student.regNo.toLowerCase().includes(filter.toLowerCase()) ||
    student.name.toLowerCase().includes(filter.toLowerCase())
  );

  const calculateUploadStats = () => {
    const totalStudents = students.length;
    const uploadedCount = students.filter(student => student.uploadFile).length;
    const percentage = Math.round((uploadedCount / totalStudents) * 100);
    return { uploadedCount, totalStudents, percentage };
  };

  const stats = calculateUploadStats();

  const handleDownloadAll = () => {
    console.log("Downloading all files");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium">View Student Remarks & Uploads</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-600 text-xl font-bold">
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="bg-purple-100 rounded-lg p-3 mb-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-semibold">Info!</span> Students uploaded: {stats.uploadedCount} out of {stats.totalStudents} ({stats.percentage}%)
            </div>
            <button className="text-gray-500 hover:text-gray-700">✖</button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium">Students Remarks</h3>
            <button 
              onClick={handleDownloadAll}
              className="text-purple-600 hover:text-purple-800 text-sm flex items-center"
            >
              <span className="mr-1">↓</span> Download All Files
            </button>
          </div>

          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full">
              <thead className="bg-white">
                <tr>
                  <th className="px-2 py-2 text-left">Sr. #</th>
                  <th className="px-2 py-2 text-left">Registration No. / Name</th>
                  <th className="px-2 py-2 text-left">Teacher's Remarks</th>
                  <th className="px-2 py-2 text-left">Student Uploads</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.regNo} className="border-t">
                    <td className="px-2 py-2">{student.srNo}</td>
                    <td className="px-2 py-2">
                      <div>{student.regNo}</div>
                      <div className="text-gray-600">{student.name}</div>
                    </td>
                    <td className="px-2 py-2">
                      <textarea
                        rows="2"
                        className="w-full border p-2 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={teacherRemarks[student.regNo]}
                        onChange={(e) =>
                          setTeacherRemarks((prev) => ({
                            ...prev,
                            [student.regNo]: e.target.value,
                          }))
                        }
                        placeholder="-"
                      />
                    </td>
                    <td className="px-2 py-2">
                      {student.uploadFile ? (
                        <div>
                          <div className="text-purple-600 hover:underline cursor-pointer">
                            {student.uploadFile}
                          </div>
                          <div className="text-xs text-gray-500">
                            Uploaded on: {student.uploadedOn}
                          </div>
                          <div className="text-xs text-gray-500">
                            Student's comment: {student.studentComment}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No upload</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUploads;
