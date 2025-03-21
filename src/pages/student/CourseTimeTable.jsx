import React from "react";

const TimeTable = () => {
  const schedule = []; // Empty for now to show "No results found"

  return (
    <div className="bg-tranparent rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-800">Time Table</h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left">
              <th className="border px-4 py-2 text-sm">#</th>
              <th className="border px-4 py-2 text-sm">Date</th>
              <th className="border px-4 py-2 text-sm">From Time</th>
              <th className="border px-4 py-2 text-sm">To Time</th>
              <th className="border px-4 py-2 text-sm text-purple-700">Topic</th>
              <th className="border px-4 py-2 text-sm text-purple-700">Room No.</th>
              <th className="border px-4 py-2 text-sm text-purple-700">Teacher</th>
              <th className="border px-4 py-2 text-sm text-purple-700">Is Online?</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {schedule.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No results found.
                </td>
              </tr>
            ) : (
              schedule.map((entry, index) => (
                <tr key={index} className="border-b text-gray-700">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{entry.date}</td>
                  <td className="border px-4 py-2">{entry.fromTime}</td>
                  <td className="border px-4 py-2">{entry.toTime}</td>
                  <td className="border px-4 py-2">{entry.topic}</td>
                  <td className="border px-4 py-2">{entry.roomNo}</td>
                  <td className="border px-4 py-2">{entry.teacher}</td>
                  <td className="border px-4 py-2">
                    {entry.isOnline ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
