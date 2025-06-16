import React, { useState, useEffect } from "react";
import attendanceData from "../MockData/mockAttendanceRegister";
import pencil from "../assets/pencil.png";
import trash from "../assets/trash.png";
import EnrollStudentsTable from "./EnrollStudentsTable"; // Updated import
import CopyFromBatchModal from "./CopyfromBatch";
import useCourseSectionStore from "../stores/courseSectionStore";
import courseSectionService from "../services/courseSectionService"; 
const EnrolledStudents = () => {
  const course = useCourseSectionStore((state) => state.selectedCourseSection);
  const [currentPage, setCurrentPage] = useState(1);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [showEnrollTable, setShowEnrollTable] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);

  const handleEnrollSuccess = () => {
    setShowEnrollTable(false);
    // Here you would typically refresh your enrolled students list
    // For now, we'll just log it since we're using mock data
    console.log("Students enrolled successfully!");
  };

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await courseSectionService.getStudentbyCourseSectionId(course.courseSectionId);
        setEnrolledStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    fetchEnrolledStudents();
  }, [course.courseSectionId]);

  return (
    <div className="flex flex-col gap-4 p-0">
      {/* Top Action Buttons */}
      <div className="flex gap-4 mb-2">
        <button 
          onClick={() => setShowEnrollTable(true)} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enroll Student
        </button>
        <button 
          onClick={() => setShowCopyModal(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Copy from Program Batch
        </button>
      </div>

      {/* Show either the enrollment table or the enrolled students list */}
      {showEnrollTable ? (
        <EnrollStudentsTable 
          courseSectionId={course.courseSectionId}
          onBack={() => setShowEnrollTable(false)}
          onEnrollSuccess={handleEnrollSuccess}
        />
      ) : (
        /* Enrolled Students Container */
        <div className="bg-transparent p-4 border border-gray-300 rounded shadow">
          {/* Title & Count */}
          <div className="flex flex-col mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Enrolled Students</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-300 rounded">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-4 py-2 border">Registration Number</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {enrolledStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No students enrolled yet.
                    </td>
                  </tr>
                ) : (
                  enrolledStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{student.enrollmentNo}</td>
                      <td className="px-4 py-2 border">{student.fullName}</td>
                      <td className="px-4 py-2 border">{student.email}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          onClick={() => console.log("Edit", student.enrollmentNo)}
                          className="mr-2 hover:opacity-80"
                        >
                          <img src={pencil} alt="Edit" className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => console.log("Delete", student.enrollmentNo)}
                          className="hover:opacity-80"
                        >
                          <img src={trash} alt="Delete" className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Copy from Batch Modal */}
      {showCopyModal && <CopyFromBatchModal onClose={() => setShowCopyModal(false)} />}
    </div>
  );
};

export default EnrolledStudents;