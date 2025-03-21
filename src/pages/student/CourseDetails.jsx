import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CourseHeader from "../../components/student/CourseHeader";
import OBE from "./OBE"; // Import OBE component
import DiscussionForum from "./DiscussionForum"; // Import DiscussionForum component
import TimeTable from "./CourseTimeTable";
import Activities from "./Activities";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state?.course;

  const [activeTab, setActiveTab] = useState("View");

  if (!course) {
    return <div className="text-center text-red-600 mt-10">Course not found!</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 flex flex-col">
      {/* Reusable CourseHeader Component */}
      <CourseHeader course={course} />

      {/* Navigation Tabs */}
      <div className="border-b flex gap-3 text-gray-700">
        {["View", "Resources", "Time Table", "OBE", "Discussion Forums"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-3 ${
              activeTab === tab
                ? "border-b-2 border-purple-700 text-purple-700 font-medium"
                : "hover:text-purple-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      <div className="w-full p-4 bg-transparent shadow-sm rounded-md">
        {activeTab === "View" && (
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-300">
              <div className="flex gap-56 text-gray-700 text-md">
                <p><strong>GPA Score:</strong> N/A</p>
                <p><strong>Grade:</strong> N/A</p>
                <p><strong>Attendance:</strong> 50% (5 / 10)</p>
              </div>
              <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
                See Detail
              </button>
            </div>

            {/* Activities Section */}
            <Activities />
          </div>
        )}

        {activeTab === "OBE" && <OBE />}
        {activeTab === "Discussion Forums" && <DiscussionForum />}
        {activeTab === "Time Table" && <TimeTable />}
      </div>
    </div>
  );
};

export default CourseDetails;
