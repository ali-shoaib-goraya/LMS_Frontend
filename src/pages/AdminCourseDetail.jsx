import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminCourseHeader from "./AdminCourseHeader";
import TeacherTakeAttendance from "./faculty/TeacherTakeAttendance";
import ClassActivities from "./faculty/ClassActivities";
import AttendanceRegister from "./faculty/AttendanceRegister";
import AwardList from "./faculty/AwardList";
import VideoMaterial from "./faculty/VideoMaterial";
import ActivityWeights from "./faculty/ActivityWeights";
import CourseAttachment from "./faculty/CourseAttachment";
import EnrolledStudents from "./EnrolledStudents";
import useCourseSectionStore from '../stores/courseSectionStore'; 
const AdminCourseDetails = () => {
  const course = useCourseSectionStore(state => state.selectedCourseSection);

  const tabsConfig = {
    View: [],
    Activities: ["Class Activites", "Attendance Register"],
    Reports: ["Award List"],
    Configuration: ["Video Material", "Activity Weights", "Course Attachment"],
    TakeAttendance: null,
    EnrolledStudents: null, // Add EnrolledStudents to tabs configuration
  };

  const [activeTab, setActiveTab] = useState("View");
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // Store selected items for each tab category
  const [selectedItems, setSelectedItems] = useState({
    Activities: null,
    Reports: null,
    Configuration: null
  });

  if (!course) {
    return (
      <div className="text-center text-red-600 mt-10">Course not found!</div>
    );
  }
 
  const handleTabClick = (tab) => {
    if (tabsConfig[tab]?.length > 0) {
      setOpenDropdown(openDropdown === tab ? null : tab);
    } else {
      setActiveTab(tab);
      setOpenDropdown(null);
    }
  };

  const handleDropdownItemClick = (item, tab) => {
    // Update the selected item for this specific tab category
    setSelectedItems({
      ...selectedItems,
      [tab]: item
    });
    setActiveTab(tab);
    setOpenDropdown(null);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "Activities":
        switch (selectedItems.Activities) {
          case "Class Activites":
            return <ClassActivities />;
          case "Attendance Register":
            return <AttendanceRegister />;
          default:
            return null;
        }
      case "Reports":
        switch (selectedItems.Reports) {
          case "Award List":
            return <AwardList course={course} />;
          default:
            return null;
        }
      case "Configuration":
        switch (selectedItems.Configuration) {
          case "Video Material":
            return <VideoMaterial />;
          case "Activity Weights":
            return <ActivityWeights />;
          case "Course Attachment":
            return <CourseAttachment />;
          default:
            return null;
        }
      case "EnrolledStudents":
        return <EnrolledStudents course={course} />; // Pass course prop to EnrolledStudents
      case "TakeAttendance":
        return <TeacherTakeAttendance course={course} />; // Pass course prop to TeacherTakeAttendance
      default:
        return null;
    }
  };

  const handleTakeAttendance = () => {
    setActiveTab("TakeAttendance");
  };
  const handleEnrolledStudents = () => {
    setActiveTab("EnrolledStudents");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col">
      <AdminCourseHeader course={course} />

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {Object.keys(tabsConfig)
          .filter((tab) => tab !== "TakeAttendance" && tab !== "EnrolledStudents")
          .map((tab) => (
            <div key={tab} className="relative">
              <button
                className={`py-2 px-4 flex items-center ${
                  activeTab === tab || openDropdown === tab
                    ? "text-gray-800 font-medium"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
                {tabsConfig[tab]?.length > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {(activeTab === tab || openDropdown === tab) &&
                tabsConfig[tab]?.length === 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500" />
                )}

              {openDropdown === tab && tabsConfig[tab]?.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-white border rounded-md shadow-lg w-48 z-10">
                  {tabsConfig[tab].map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleDropdownItemClick(option, tab)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Tab Content */}
      <div className="w-full p-4 bg-transparent">
        {activeTab === "View" && (
          <div className="flex flex-col gap-4 pb-2">
            <div className="flex gap-4">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded border border-purple-500 hover:bg-green-500 hover:text-white transition"
                onClick={handleTakeAttendance}
              >
                Take Attendance
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded border border-blue-500 hover:bg-blue-600 hover:text-white transition"
                onClick={handleEnrolledStudents}
              >
                Enrolled Students 
              </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-64 table-auto border border-gray-300 border-collapse">
                <tbody className="text-sm text-gray-700">
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">School</td>
                    <td className="px-6 py-3 border border-gray-300">{course.schoolName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Department</td>
                    <td className="px-6 py-3 border border-gray-300">Department of {course.department}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Semester</td>
                    <td className="px-6 py-3 border border-gray-300">{course.semesterName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Course Section</td>
                    <td className="px-6 py-3 border border-gray-300">
                      {course.courseSectionName}
                    </td> 
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Teacher</td>
                    <td className="px-6 py-3 border border-gray-300">{course.facultyName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Course</td>
                    <td className="px-6 py-3 border border-gray-300">{course.courseCode}-{course.courseName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Delivery Format</td>
                    <td className="px-6 py-3 border border-gray-300">{course.delieveryformat}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Credit Hours</td>
                    <td className="px-6 py-3 border border-gray-300">{course.credithours}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Render the appropriate component based on active tab */}
        {activeTab !== "View" && (
          <div className="mt-4">
            {renderComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourseDetails;

