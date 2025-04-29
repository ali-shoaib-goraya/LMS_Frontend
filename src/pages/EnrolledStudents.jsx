import React, { useState } from "react";
import attendanceData from "../MockData/mockAttendanceRegister";
import pencil from "../assets/pencil.png";
import trash from "../assets/trash.png";
import EnrollStudentModal from "./EnrollStudent";
import CopyFromBatchModal from "./CopyfromBatch";

const EnrolledStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  const itemsPerPage = 10;
  const totalItems = attendanceData.students.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudents = attendanceData.students.slice(startIndex, endIndex);

  const handleCheckboxChange = (regNo) => {
    setSelectedStudents((prev) =>
      prev.includes(regNo) ? prev.filter((id) => id !== regNo) : [...prev, regNo]
    );
  };

  return (
    <div className="flex flex-col gap-4 p-0">
      {/* Top Action Buttons */}
      <div className="flex gap-4 mb-2">
        <button onClick={() => setShowEnrollModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Enroll Student</button>
        <button onClick={() => setShowCopyModal(true)} className="bg-green-500 text-white px-4 py-2 rounded">Copy from Program Batch</button>
      </div>

      {/* Enrolled Students Container */}
      <div className="bg-transparent p-4 border border-gray-300 rounded shadow">
        {/* Title & Count */}
        <div className="flex flex-col mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Enrolled Students</h2>
          <div className="text-sm text-gray-700 mt-1">
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-4 py-2 border">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      onChange={() =>
                        setSelectedStudents(
                          selectedStudents.length === attendanceData.students.length
                            ? []
                            : attendanceData.students.map((s) => s.regNo)
                        )
                      }
                      checked={selectedStudents.length === attendanceData.students.length}
                    />
                    <span>Select</span>
                  </div>
                </th>
                <th className="px-4 py-2 border">Registration Number</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {currentStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.regNo)}
                      onChange={() => handleCheckboxChange(student.regNo)}
                    />
                  </td>
                  <td className="px-4 py-2 border">{student.regNo}</td>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border text-center">
                    <button onClick={() => console.log("Edit", student.regNo)} className="mr-2">
                      <img src={pencil} alt="Edit" className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => console.log("Delete", student.regNo)}>
                      <img src={trash} alt="Delete" className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-start items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded bg-gray-200 mr-1"
          >
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 border rounded mx-0.5 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded bg-gray-200 ml-1"
          >
            »
          </button>
        </div>
      </div>

      {/* Modals */}
      {showEnrollModal && <EnrollStudentModal onClose={() => setShowEnrollModal(false)} />}
      {showCopyModal && <CopyFromBatchModal onClose={() => setShowCopyModal(false)} />}
    </div>
  );
};

export default EnrolledStudents;
