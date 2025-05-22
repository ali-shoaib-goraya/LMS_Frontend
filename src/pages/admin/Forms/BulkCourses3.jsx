import React, { useState, useEffect } from "react";
import Select from "react-select";
import courseSectionService from "../../../services/courseSectionService";

const SelectTeachers = ({ school, semester, prefix, onBack, courses }) => {
  const [courseData, setCourseData] = useState(courses ?? []);
  const [step, setStep] = useState(3);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [semesterName, setSemesterName] = useState("");

  // Fetch teachers and other data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teachersResponse, schoolsResponse, semestersResponse] = await Promise.all([
          courseSectionService.getAllTeachers(),
          courseSectionService.getAllSchools(),
          courseSectionService.getAllSemesters()
        ]);

        if (teachersResponse.data?.statusCode === 200) {
          setTeachers(teachersResponse.data.data);
        }

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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [school, semester]);

  // Prepare teacher options for react-select
  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.id,
    label: `${teacher.firstName} ${teacher.lastName}`,
  }));

  const validateData = () => {
    const errors = [];
    
    courseData.forEach((course) => {
      const sectionsCount = course.sections || 1;
      const selectedTeachers = course.selectedTeachers || [];
      
      for (let i = 0; i < sectionsCount; i++) {
        if (!selectedTeachers[i]) {
          errors.push(`Please select a teacher for ${course.courseCode} - Section ${i + 1}`);
        }
      }
    });

    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return false;
    }

    return true;
  };

  const prepareBulkData = () => {
    const courseSections = [];

    courseData.forEach((course) => {
      const sectionsCount = course.sections || 1;
      const selectedTeachers = course.selectedTeachers || [];
      const sectionNames = course.sectionNames || [];

      for (let i = 0; i < sectionsCount; i++) {
        const teacherId = selectedTeachers[i];
        
        if (teacherId) {
          // CourseSectionName should be combo of Semester and CourseCode
          const courseSectionName = `${semesterName} - ${course.courseCode}`;
          // Use custom section name or default
          const sectionName = sectionNames[i] || `${prefix} - Section ${i + 1}`;
          
          courseSections.push({
            courseSectionName: courseSectionName,
            status: "Active",
            section: sectionName,
            notes: "",
            facultyId: teacherId,
            courseId: course.courseId
          });
        }
      }
    });

    // Return data in the correct backend format
    return {
      schoolId: parseInt(school),
      semesterId: parseInt(semester),
      prefix: prefix,
      courseSections: courseSections
    };
  };

  const handleSave = async () => {
    if (!validateData()) {
      return;
    }

    setSaving(true);
    try {
      const bulkData = prepareBulkData();
      console.log("Bulk data to be sent:", bulkData); // For debugging
      
      const response = await courseSectionService.createCourseSectionBulk(bulkData);
      
      if (response.data?.statusCode === 200 || response.data?.statusCode === 201) {
        alert("Course sections created successfully!");
        // You might want to navigate back or reset the form here
        // navigate('/course-sections'); // Uncomment if you want to navigate
      } else {
        throw new Error(response.data?.message || "Failed to create course sections");
      }
    } catch (error) {
      console.error("Error creating course sections:", error);
      alert("Error creating course sections: " + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-4 shadow rounded-md">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 shadow rounded-md">
        {/* Steps Navigation */}
        <div className="flex border-b border-gray-200">
          <div
            className={`w-1/3 text-center pb-2 font-semibold cursor-pointer ${
              step === 1
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
            }`}
          >
            Step 1 <br /> Select Semester
          </div>
          <div
            className={`w-1/3 text-center pb-2 cursor-pointer ${
              step === 2
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
            }`}
            onClick={() => onBack()}
          >
            Step 2 <br /> Add Courses & Select No. of Sections
          </div>
          <div
            className={`w-1/3 text-center pb-2 cursor-pointer ${
              step === 3
                ? "border-b-4 border-green-600 text-gray-800"
                : "border-gray-300 text-gray-400"
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
            <input
              type="text"
              value={schoolName}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Semester</label>
            <input
              type="text"
              value={semesterName}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Prefix</label>
            <input
              type="text"
              value={prefix}
              readOnly
              className="w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        {courseData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Select Teachers for Course Sections</h3>
            <div className="overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Course Code</th>
                    <th className="border px-4 py-2">Course Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Section</th>
                    <th className="border px-4 py-2">Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.flatMap((course) =>
                    Array.from({ length: course.sections || 1 }, (_, index) => (
                      <tr key={`${course.courseId}-${index}`} className="text-center">
                        <td className="border px-4 py-2">{course.courseCode}</td>
                        <td className="border px-4 py-2">{course.courseName}</td>
                        <td className="border px-4 py-2">{course.department}</td>
                        <td className="border px-4 py-2">
                          <input
                            type="text"
                            value={course.sectionNames?.[index] || `${prefix} - Section ${index + 1}`}
                            onChange={(e) => {
                              setCourseData((prevCourses) =>
                                prevCourses.map((c) => {
                                  if (c.courseId === course.courseId) {
                                    const updatedSectionNames = [...(c.sectionNames || [])];
                                    updatedSectionNames[index] = e.target.value;
                                    return { ...c, sectionNames: updatedSectionNames };
                                  }
                                  return c;
                                })
                              );
                            }}
                            className="w-full p-1 border rounded text-sm"
                            placeholder={`${prefix} - Section ${index + 1}`}
                          />
                        </td>
                        <td className="border px-4 py-2">
                          <Select
                            options={teacherOptions}
                            value={
                              course.selectedTeachers?.[index]
                                ? teacherOptions.find(option => option.value === course.selectedTeachers[index])
                                : null
                            }
                            onChange={(selectedOption) => {
                              const selectedTeacherId = selectedOption?.value || "";
                              setCourseData((prevCourses) =>
                                prevCourses.map((c) => {
                                  if (c.courseId === course.courseId) {
                                    const updatedTeachers = [...(c.selectedTeachers || [])];
                                    updatedTeachers[index] = selectedTeacherId;
                                    return { ...c, selectedTeachers: updatedTeachers };
                                  }
                                  return c;
                                })
                              );
                            }}
                            placeholder="Select Teacher"
                            isClearable
                            className="min-w-48"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                minHeight: "35px",
                                fontSize: "14px",
                              }),
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onBack()}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
            disabled={saving}
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 disabled:bg-gray-400"
            disabled={saving || courseData.length === 0}
          >
            {saving ? "Creating..." : "Create Course Sections"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectTeachers;