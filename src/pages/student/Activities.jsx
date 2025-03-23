import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockActivities from "../../MockData/mockActivities"; // Import mock data

const Activities = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log("File Uploaded:", selectedFile.name);
      setShowModal(false);
      setSelectedFile(null);
    } else {
      alert("Please select a file before saving.");
    }
  };

  return (
    <div className="mt-6">
      {/* Title Row with Bottom Border */}
      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
        <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
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
              <React.Fragment key={index}>
                {/* Main Row */}
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-2">{activity.date}</td>
                  <td className="px-4 py-2">{activity.name}</td>
                  <td className="px-4 py-2">{activity.type}</td>
                  <td className="px-4 py-2">{activity.totalMarks}</td>
                  <td className="px-4 py-2">{activity.obtainedMarks}</td>
                </tr>

                {/* Upload Button Row (Only for Assignments) */}
                {activity.type === "Assignment" && (
                  <tr className="border-b border-gray-300">
                    <td colSpan="5" className="px-4 py-2">
                      <div className="flex justify-end">
                        <button
                          onClick={handleUploadClick}
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Upload Assignment
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Upload Assignment</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            <input
              type="file"
              accept=".ppt,.pptx,.doc,.docx,.xls,.xlsx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
