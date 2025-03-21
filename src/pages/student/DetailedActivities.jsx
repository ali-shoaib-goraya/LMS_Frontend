import React from "react";
import { useNavigate } from "react-router-dom";
import mockActivities from "../../MockData/mockActivities";

const DetailedActivities = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      {/* Title Row with Bottom Border */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Detailed Activities</h2>
        <button
          onClick={() => navigate("/activities")}
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
        >
          Show Summarized
        </button>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto bg-transparent shadow-md rounded-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Total Marks</th>
              <th className="px-4 py-2 text-left">Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            {mockActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <tr className="bg-purple-700 text-white">
                  <td className="px-4 py-2">{activity.date}</td>
                  <td className="px-4 py-2 font-bold">{activity.name}</td>
                  <td className="px-4 py-2">{activity.type}</td>
                  <td className="px-4 py-2">{activity.totalMarks}</td>
                  <td className="px-4 py-2">{activity.obtainedMarks}</td>
                </tr>
                <tr>
                  <td colSpan="5" className="px-4 py-2 bg-gray-100">
                    <strong>Detail:</strong>
                  </td>
                </tr>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Question</th>
                  <th className="px-4 py-2 text-left">OBE Weight</th>
                  <th className="px-4 py-2 text-left">Max Marks</th>
                  <th className="px-4 py-2 text-left">Obtained</th>
                  <th className="px-4 py-2 text-left">CLOs</th>
                </tr>
                {activity.details.map((detail, detailIndex) => (
                  <tr key={detailIndex} className="border-b border-gray-300">
                    <td className="px-4 py-2">{detail.name}</td>
                    <td className="px-4 py-2">{detail.question}</td>
                    <td className="px-4 py-2">{detail.obeWeight}</td>
                    <td className="px-4 py-2">{detail.maxMarks}</td>
                    <td className="px-4 py-2">{detail.obtained}</td>
                    <td className="px-4 py-2">{detail.clo}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedActivities;
