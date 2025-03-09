import React, { useState } from "react";
import { mockCourses } from "../../../MockData/mockCourses"; // Ensure correct import

const CourseSections = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    course: "",
    semester: "",
    school: "",
    teacher: "",
    department: "",
    section: "",
  });

  // Handle Input Changes for Filters
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter Courses
  const filteredCourses = mockCourses.filter((course) => {
    return (
      course.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.course ? String(course.course).includes(filters.course) : true) &&
      (filters.semester ? String(course.semester).includes(filters.semester) : true) &&
      (filters.school ? String(course.school).includes(filters.school) : true) &&
      (filters.teacher ? String(course.teacher).includes(filters.teacher) : true) &&
      (filters.department ? String(course.department).includes(filters.department) : true) &&
      (filters.section ? String(course.section).includes(filters.section) : true)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Sections</h2>

      {/* Search & Controls */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Create
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Import
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Create Bulk
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-sm border-collapse">
          {/* Table Header */}
          <thead className="bg-gray-200">
            <tr>
              {[
                { key: "name", label: "Name" },
                { key: "course", label: "Course" },
                { key: "semester", label: "Semester" },
                { key: "school", label: "School" },
                { key: "teacher", label: "Teacher" },
                { key: "department", label: "Department" },
                { key: "section", label: "Section" },
                { key: "status", label: "Status" },
                { key: "programBatch", label: "Program Batch" },
                { key: "useOBE", label: "Use OBE" },
              ].map(({ key, label }) => (
                <th key={key} className="px-4 py-2 border text-left">
                  {label}
                  {["course", "semester", "school", "teacher", "department", "section"].includes(
                    key
                  ) && (
                    <select
                      name={key}
                      onChange={handleFilterChange}
                      className="ml-2 border p-1 text-xs rounded-md"
                    >
                      <option value="">- Select -</option>
                      {[...new Set(mockCourses.map((c) => String(c[key])))].map((value, index) => (
                        <option key={index} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">{course.course}</td>
                <td className="border px-4 py-2">{course.semester}</td>
                <td className="border px-4 py-2">{course.school}</td>
                <td className="border px-4 py-2">{course.teacher}</td>
                <td className="border px-4 py-2">{course.department}</td>
                <td className="border px-4 py-2">{course.section}</td>
                <td className="border px-4 py-2">{course.status}</td>
                <td className="border px-4 py-2">{course.programBatch}</td>
                <td className="border px-4 py-2">{course.useOBE ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseSections;
