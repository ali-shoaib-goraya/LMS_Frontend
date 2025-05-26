import React, { useState, useEffect } from "react";
import courseSectionService from "../../../services/courseSectionService";
import SelectTeachers from "../Forms/BulkCourses3";

const CoursesTablePopup = ({ onClose, onSave, selectedCourses }) => {
  const [selected, setSelected] = useState(selectedCourses);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    code: "",
    name: "",
    department: "",
    creditHours: "",
    deliveryFormat: ""
  });

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await courseSectionService.getAllCourses();
        if (response.data?.statusCode === 200) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId) => {
    setSelected((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filteredCourses.map(course => course.courseId));
    } else {
      setSelected([]);
    }
  };

  const handleFilterChange = (e, key) => {
    setFilters({ ...filters, [key]: e.target.value });
  };

  // Filter courses based on search criteria
  const filteredCourses = courses.filter((course) => {
    let deliveryFormat = "";
    if (!course.isTheory) {
      deliveryFormat = "Lab";
    } else if (course.isTheory && !course.isLab) {
      deliveryFormat = "Theory";
    } else if (course.isTheory && course.isLab) {
      deliveryFormat = "Theory + Lab";
    }

    return (
      (!filters.code || course.courseCode.toLowerCase().includes(filters.code.toLowerCase())) &&
      (!filters.name || course.courseName.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.department || course.department.toLowerCase().includes(filters.department.toLowerCase())) &&
      (!filters.creditHours || course.creditHours.toString().includes(filters.creditHours)) &&
      (!filters.deliveryFormat || deliveryFormat.toLowerCase().includes(filters.deliveryFormat.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <div className="text-lg text-gray-600">Loading courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-2/3 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Select Courses</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Select</span>
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={handleSelectAll}
                    checked={
                      filteredCourses.length > 0 &&
                      filteredCourses.every((c) => selected.includes(c.courseId))
                    }
                  />
                </div>
              </th>
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Code</span>
                  <input
                    type="text"
                    value={filters.code}
                    onChange={(e) => handleFilterChange(e, "code")}
                    className="w-32 p-1 border rounded text-sm bg-gray-50 text-center"
                  />
                </div>
              </th>
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Name</span>
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => handleFilterChange(e, "name")}
                    className="w-32 p-1 border rounded text-sm bg-gray-50 text-center"
                  />
                </div>
              </th>
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Department</span>
                  <input
                    type="text"
                    value={filters.department}
                    onChange={(e) => handleFilterChange(e, "department")}
                    className="w-32 p-1 border rounded text-sm bg-gray-50 text-center"
                  />
                </div>
              </th>
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Credit Hours</span>
                </div>
              </th>
              <th className="border px-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-1">Delivery Format</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => {
              let deliveryFormat = "";
              let adjustedCreditHours = course.creditHours;

              if (!course.isTheory) {
                deliveryFormat = "Lab";
              } else if (course.isTheory && !course.isLab) {
                deliveryFormat = "Theory";
              } else if (course.isTheory && course.isLab) {
                deliveryFormat = "Theory + Lab";
              }

              return (
                <tr key={course.courseId} className="text-center">
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.courseId)}
                      onChange={() => handleCheckboxChange(course.courseId)}
                      className="cursor-pointer w-4 h-4"
                    />
                  </td>
                  <td className="border px-4 py-2">{course.courseCode}</td>
                  <td className="border px-4 py-2">{course.courseName}</td>
                  <td className="border px-4 py-2">{course.department}</td>
                  <td className="border px-4 py-2">{adjustedCreditHours}</td>
                  <td className="border px-4 py-2">{deliveryFormat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => onSave(selected)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCourses = ({ school, semester, prefix, onBack, onNext }) => {
  const [courses, setCourses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(2);
  const [allCourses, setAllCourses] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [semesterName, setSemesterName] = useState("");

  // Fetch school and semester names for display
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const [schoolsResponse, semestersResponse] = await Promise.all([
          courseSectionService.getAllSchools(),
          courseSectionService.getAllSemesters()
        ]);

        if (schoolsResponse.data?.statusCode === 200) {
          const selectedSchool = schoolsResponse.data.data.find(s => s.schoolId.toString() === school.toString());
          if (selectedSchool) {
            setSchoolName(selectedSchool.schoolName);
          }
        }

        if (semestersResponse.data?.statusCode === 200) {
          const selectedSemester = semestersResponse.data.data.find(s => s.semesterId.toString() === semester.toString());
          if (selectedSemester) {
            setSemesterName(selectedSemester.semesterName);
          }
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    fetchNames();
  }, [school, semester]);

  // Fetch all courses for selection
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseSectionService.getAllCourses();
        if (response.data?.statusCode === 200) {
          setAllCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSaveCourses = (selectedCourseIds) => {
    const selectedCourses = allCourses.filter((course) =>
      selectedCourseIds.includes(course.courseId)
    );

    const updatedCourses = selectedCourses.map((course) => ({
      ...course,
      deliveryFormat: course.isTheory
        ? course.isLab
          ? "Theory + Lab"
          : "Theory"
        : "Lab",
      creditHours: course.isTheory && course.isLab ? course.creditHours + 1 : course.creditHours,
      sections: 1, // Default section count
    }));

    setCourses(updatedCourses);
    setShowPopup(false);
  };

  return (
    <div className="w-full max-w-6xl bg-white p-6 shadow-md rounded-md mb-4">
      {step === 3 ? (
        <SelectTeachers 
          school={school} 
          semester={semester} 
          prefix={prefix} 
          courses={courses}
          onBack={() => setStep(2)}
        />
      ) : (
        <div className="bg-white p-4 shadow rounded-md">
          {/* Steps Navigation */}
          <div className="flex border-b border-gray-200">
            <div
              className={`w-1/3 text-center pb-2 font-semibold cursor-pointer ${
                step === 1 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={onBack}
            >
              Step 1 <br /> Select Semester
            </div>
            <div
              className={`w-1/3 text-center pb-2 cursor-pointer ${
                step === 2 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={() => setStep(2)}
            >
              Step 2 <br /> Add Courses & Select No. of Sections
            </div>
            <div
              className={`w-1/3 text-center pb-2 cursor-pointer ${
                step === 3 ? "border-b-4 border-green-600 text-gray-800" : "border-gray-300 text-gray-400"
              }`}
              onClick={() => setStep(3)}
            >
              Step 3 <br /> Select Teachers
            </div>
          </div>

          {/* School, Semester, Prefix Fields */}
          <div className="mt-6 grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium">School</label>
              <input type="text" value={schoolName} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Semester</label>
              <input type="text" value={semesterName} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Prefix</label>
              <input type="text" value={prefix} readOnly className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700" />
            </div>
          </div>

          {/* Add Course Button */}
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => setShowPopup(true)}>
            Add Course
          </button>

          {/* Selected Courses Table */}
          {courses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Courses</h3>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Course Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Sections</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.courseId}>
                      <td className="border px-4 py-2">{course.courseCode}</td>
                      <td className="border px-4 py-2">{course.courseName}</td>
                      <td className="border px-4 py-2">{course.department}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          min="1"
                          value={course.sections}
                          onChange={(e) => {
                            const newCourses = [...courses];
                            newCourses[index].sections = parseInt(e.target.value) || 1;
                            setCourses(newCourses);
                          }}
                          className="w-20 p-1 border rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button onClick={onBack} className="bg-gray-600 text-white px-4 py-2 rounded">Back</button>
            <button onClick={() => setStep(3)} className="bg-green-600 text-white px-4 py-2 rounded">Next</button>
          </div>
        </div>
      )}

      {/* Pop-up Modal */}
      {showPopup && <CoursesTablePopup onClose={() => setShowPopup(false)} onSave={handleSaveCourses} selectedCourses={courses.map((c) => c.courseId)} />}
    </div>
  );
};

export default AddCourses;