import { useState } from "react";
import mockStudents from "../../MockData/mockregisteredstudents";

const UploadMarks = ({ onClose }) => {
  const [regNoFilter, setRegNoFilter] = useState("");

  const students = mockStudents;

  const [marksData, setMarksData] = useState(() =>
    students.reduce((acc, student) => {
      acc[student.regNo] = { marks: "" }; // Start empty, not "0"
      return acc;
    }, {})
  );

  const handleMarksChange = (regNo, value) => {
    setMarksData((prev) => ({
      ...prev,
      [regNo]: { marks: value },
    }));
  };

  const filteredStudents = students.filter((student) =>
    student.regNo.toLowerCase().includes(regNoFilter.toLowerCase())
  );

  const handleSave = () => {
    const finalMarks = Object.entries(marksData).map(([regNo, data]) => ({
      regNo,
      marks: data.marks.trim() === "" ? 0 : parseFloat(data.marks),
    }));

    console.log("Saved Marks: ", finalMarks);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium">Add / Update Marks</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-600 text-xl font-bold">
            ✖
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium">Students Obtained Marks</h3>
            <input
              type="text"
              placeholder="Filter by Reg No."
              className="border p-1 rounded"
              value={regNoFilter}
              onChange={(e) => setRegNoFilter(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full">
              <thead className="bg-white">
                <tr>
                  <th className="px-2 py-2 text-left">Reg No</th>
                  <th className="px-2 py-2 text-left">Name</th>
                  <th className="px-2 py-2 text-center">Marks</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.regNo} className="border-t">
                    <td className="px-2 py-2 text-blue-600">{student.regNo}</td>
                    <td className="px-2 py-2">{student.name}</td>
                    <td className="px-2 py-2 text-center">
                      <input
                        type="text"
                        className="border w-16 p-1 text-center"
                        placeholder="0"
                        value={marksData[student.regNo]?.marks}
                        onChange={(e) => handleMarksChange(student.regNo, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadMarks;
