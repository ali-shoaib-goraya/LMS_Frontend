import React from "react";
import { useNavigate } from "react-router-dom";
import mockActivities from "../../MockData/mockActivities"; // Import mock data

const Activities = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      {/* Title Row with Bottom Border */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
        <button
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Show Detailed
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-transparent shadow-md rounded-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Total Marks</th>
              <th className="px-4 py-2 text-left">Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            {mockActivities.map((activity, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{activity.date}</td>
                <td className="px-4 py-2">{activity.name}</td>
                <td className="px-4 py-2">{activity.type}</td>
                <td className="px-4 py-2">{activity.totalMarks}</td>
                <td className="px-4 py-2">{activity.obtainedMarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
