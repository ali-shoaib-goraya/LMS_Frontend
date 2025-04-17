import React from "react";
import { Link } from "react-router-dom";

const TeacherCourseHeader = ({ course }) => {
  return (
    <div>
      {/* Course Section Header with Breadcrumbs */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Course Section</h2>
        <div className="text-gray-600 text-sm flex gap-2">
          <Link to="/teacher" className="text-purple-700 hover:underline">Home</Link>
          <span>/</span>
          <Link to="/teacher/courses" className="text-purple-700 hover:underline">Course Sections</Link>
          <span>/</span>
          <span className="text-gray-700">{course.semester}-{course.code}-{course.term}</span>
        </div>
      </div>
      <hr className="border-t-2 border-gray-300 mt-2 mb-4" />

      {/* Course Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-bold">
          {course.instructorName.split(" ").map((name) => name[0]).join("")}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            {course.code} - {course.title}{" "}
            <span className="text-sm text-gray-600">(Elective)</span>
          </h1>
          <p className="text-gray-600 text-sm">
            {course.semester}-{course.code}-{course.term} (A) / {course.instructorName} / {course.term}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseHeader;
