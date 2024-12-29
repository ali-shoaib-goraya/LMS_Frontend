import React, { useState, useEffect } from "react";
import { mockCourses } from "../../MockData/AllCourses";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    course: "",
    name: "",
    semester: "",
    teacher: "",
    section: "",
  });

  useEffect(() => {
    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  const getUniqueCourses = () => {
    const uniqueCourses = [
      ...new Set(
        courses.map((course) => `${course.courseCode} - ${course.courseTitle}`)
      ),
    ].sort();
    return uniqueCourses;
  };

  useEffect(() => {
    let result = courses;

    if (filters.course) {
      result = result.filter(
        (course) =>
          `${course.courseCode} - ${course.courseTitle}` === filters.course
      );
    }
    if (filters.name) {
      result = result.filter((course) =>
        course.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.semester) {
      result = result.filter((course) => course.semester === filters.semester);
    }
    if (filters.teacher) {
      result = result.filter((course) => course.teacher === filters.teacher);
    }
    if (filters.section) {
      result = result.filter((course) =>
        course.section.toLowerCase().includes(filters.section.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [filters, courses]);

  return (
    <div className="p-4 max-w-screen-2lg mx-auto">
      <div className="p-6">
        {/* Header Section with Underline */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-2">
          <h1 className="text-2xl font-normal">My Courses</h1>
          <div className="flex gap-4">
            <a href="/student" className="text-blue-600 hover:text-blue-800">
              Home
            </a>
            <span className="text-gray-500">My Course</span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Showing 1-{filteredCourses.length} of {filteredCourses.length} items.
        </div>
        <div className="border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="px-4 py-2 border-r text-left font-medium">#</th>
                <th className="px-4 py-2 border-r">
                  <div className="text-left font-medium">Course</div>
                  <div className="mt-1">
                    <select
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1 appearance-none"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          course: e.target.value,
                        }))
                      }
                      value={filters.course}
                    >
                      <option value="">- Select -</option>
                      {getUniqueCourses().map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                </th>
                <th className="px-4 py-2 border-r">
                  <div className="text-left font-medium">Name</div>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      value={filters.name}
                    />
                  </div>
                </th>
                <th className="px-4 py-2 border-r">
                  <div className="text-left font-medium">Semester</div>
                  <div className="mt-1">
                    <select
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1 appearance-none"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          semester: e.target.value,
                        }))
                      }
                      value={filters.semester}
                    >
                      <option value="">- Select -</option>
                      {[...new Set(courses.map((c) => c.semester))]
                        .sort()
                        .map((sem) => (
                          <option key={sem} value={sem}>
                            {sem}
                          </option>
                        ))}
                    </select>
                  </div>
                </th>
                <th className="px-4 py-2 border-r">
                  <div className="text-left font-medium">Teacher</div>
                  <div className="mt-1">
                    <select
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1 appearance-none"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          teacher: e.target.value,
                        }))
                      }
                      value={filters.teacher}
                    >
                      <option value="">- Select -</option>
                      {[...new Set(courses.map((c) => c.teacher))]
                        .sort()
                        .map((teacher) => (
                          <option key={teacher} value={teacher}>
                            {teacher}
                          </option>
                        ))}
                    </select>
                  </div>
                </th>
                <th className="px-4 py-2 border-r">
                  <div className="text-left font-medium">Section</div>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          section: e.target.value,
                        }))
                      }
                      value={filters.section}
                    />
                  </div>
                </th>
                <th className="px-4 py-2 border-r text-left font-medium">
                  Status
                </th>
                <th className="px-4 py-2 text-left font-medium">Use in OBE</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className={`border-b hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 border-r">{index + 1}</td>
                  <td className="px-4 py-2 border-r">
                    {course.courseCode} - {course.courseTitle}
                  </td>
                  <td className="px-4 py-2 border-r">{course.name}</td>
                  <td className="px-4 py-2 border-r">{course.semester}</td>
                  <td className="px-4 py-2 border-r">{course.teacher}</td>
                  <td className="px-4 py-2 border-r">{course.section}</td>
                  <td className="px-4 py-2 border-r">{course.status}</td>
                  <td className="px-4 py-2">
                    {course.useInOBE ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
