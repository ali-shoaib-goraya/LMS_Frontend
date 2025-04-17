import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TeacherCourseHeader from "../../components/faculty/TeacherCourseHeader";
import TeacherTakeAttendance from "./TeacherTakeAttendance";
import ClassActivities from "./ClassActivities";
import AttendanceRegister from "./AttendanceRegister";
import Report1 from "./Report1";
import Report2 from "./Report2";
import Report3 from "./Report3";
import Config1 from "./config1";
import Config2 from "./config2";
import Config3 from "./config3";

const TeacherCourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course;

  const tabsConfig = {
    View: [],
    Activities: ["Class Activites", "Attendance Register"],
    Reports: ["Report 1", "Report 2", "Report 3"],
    Configuration: ["Config 1", "Config 2", "Config 3"],
    TakeAttendance: null,
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
            return <ClassActivities course={course} />;
          case "Attendance Register":
            return <AttendanceRegister course={course} />;
          default:
            return null;
        }
      case "Reports":
        switch (selectedItems.Reports) {
          case "Report 1":
            return <Report1 />;
          case "Report 2":
            return <Report2 />;
          case "Report 3":
            return <Report3 />;
          default:
            return null;
        }
      case "Configuration":
        switch (selectedItems.Configuration) {
          case "Config 1":
            return <Config1 />;
          case "Config 2":
            return <Config2 />;
          case "Config 3":
            return <Config3 />;
          default:
            return null;
        }
      default:
        return null;
    }
  };

  const handleTakeAttendance = () => {
    setActiveTab("TakeAttendance");
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col">
      <TeacherCourseHeader course={course} />

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {Object.keys(tabsConfig)
          .filter((tab) => tab !== "TakeAttendance")
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
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-64 table-auto border border-gray-300 border-collapse">
                <tbody className="text-sm text-gray-700">
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">School</td>
                    <td className="px-6 py-3 border border-gray-300">{course.school}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Department</td>
                    <td className="px-6 py-3 border border-gray-300">Department of {course.department}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Semester</td>
                    <td className="px-6 py-3 border border-gray-300">{course.term}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Name</td>
                    <td className="px-6 py-3 border border-gray-300">
                      {course.semester}-{course.code}-{course.term}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Teacher</td>
                    <td className="px-6 py-3 border border-gray-300">{course.instructorName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-semibold border border-gray-300">Course</td>
                    <td className="px-6 py-3 border border-gray-300">{course.code}-{course.title}</td>
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

        {activeTab === "TakeAttendance" && (
          <div className="mt-4 text-gray-700">
            <TeacherTakeAttendance coursecode={course.code} />
          </div>
        )}

        {(activeTab === "Activities" ||
          activeTab === "Reports" ||
          activeTab === "Configuration") && (
          <div className="mt-4">
            {renderComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseDetails;
