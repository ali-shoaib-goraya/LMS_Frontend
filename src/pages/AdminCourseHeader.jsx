import React from "react";
import { Link } from "react-router-dom";

const AdminCourseHeader = ({ course }) => {
  return (
    <div>
      {/* Course Section Header with Breadcrumbs */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Course Section</h2>
        <div className="text-gray-600 text-sm flex gap-2">
          <Link to="/dashboard" className="text-purple-700 hover:underline">Home</Link>
          <span>/</span>
          <span className="text-gray-700">{course.courseName}-{course.courseCode}-{course.semesterName}</span>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 mt-2 mb-4" />

      {/* Course Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold">
          {course.facultyName.split(" ").map((name) => name[0]).join("")}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {course.courseCode} - {course.courseName}{" "}
            <span className="text-sm text-gray-600">({course.section})</span>
          </h1>
          <p className="text-gray-600 text-sm">
            {course.courseSectionName} ({course.section}) / {course.facultyName} / {course.semesterName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseHeader;
