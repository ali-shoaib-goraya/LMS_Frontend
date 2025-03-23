import React from "react";

const TeachingPlanResource = () => {
  const teachingPlan = {
    lecture: "Lecture 01",
    fromDate: "26-09-2022",
    toDate: "28-02-2023",
    subject: "Introduction",
    topics: ["Introduction", "List of Symbols"],
    CLOs: "",
    comments: "",
    classActivities: "",
    attachments: [],
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="p-6 border rounded-lg bg-transparent shadow-md">
      {/* Section Title with Export Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Section Teaching Plan</h2>
        <button 
          className="px-6 py-2 bg-white border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={handleFileUpload}
        >
          Export
        </button>
        <input type="file" id="fileInput" className="hidden" />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Showing <strong>1-1</strong> of <strong>1</strong> item.
      </p>

      {/* Teaching Plan Table */}
      <div className="border rounded-md overflow-hidden bg-gray-50">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border bg-gray-200">
              <th className="border px-4 py-2 text-left w-12">#</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border bg-gray-100">
              <td className="border px-4 py-4">
                <div className="flex justify-between w-full">
                  <strong className="text-lg flex-1 text-left">{teachingPlan.lecture}</strong>
                  <span className="text-gray-600 flex-1 text-center">From: {teachingPlan.fromDate}</span>
                  <span className="text-gray-600 flex-1 text-right">To: {teachingPlan.toDate}</span>
                </div>

                <div className="mt-2 text-gray-700">
                  <p className="font-semibold">Subject: <span className="font-normal">{teachingPlan.subject}</span></p>
                  <p className="font-semibold">Topics:</p>
                  <ul className="list-disc pl-6 text-sm text-gray-800">
                    {teachingPlan.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold">
                      CLOs: <span className="font-normal">{teachingPlan.CLOs || "—"}</span>
                    </p>
                    <p className="font-semibold">
                      Class Activities: <span className="font-normal">{teachingPlan.classActivities || "—"}</span>
                    </p>
                  </div>
                  <p className="font-semibold mt-2">
                    Comments: <span className="font-normal">{teachingPlan.comments || "—"}</span>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Attachments Section */}
      <div className="mt-6 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
        <table className="w-full border-collapse bg-transparent mt-2">
          <thead>
            <tr className="border bg-gray-200">
              <th className="border px-4 py-2 text-left w-12">#</th>
              <th className="border px-4 py-2 text-left">File Name</th>
              <th className="border px-4 py-2 text-left">Creation Date</th>
              <th className="border px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {teachingPlan.attachments.length > 0 ? (
              teachingPlan.attachments.map((attachment, index) => (
                <tr key={index} className="border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{attachment.name}</td>
                  <td className="border px-4 py-2">{attachment.date}</td>
                  <td className="border px-4 py-2">{attachment.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border px-4 py-2 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachingPlanResource;
