import React, { useState } from "react";
import { mockBatches } from "../MockData/mockBatches";
import { mockStudents } from "../MockData/mockStudents";

const CopyFromBatchModal = ({ onClose }) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleBatchSelect = (e) => {
    const selected = e.target.value;
    setSelectedBatch(selected);

    const matchedStudents = mockStudents.filter(
      (student) => student.programBatch === selected
    );
    setFilteredStudents(matchedStudents);
    setSelectedStudents([]);
    setSearchRegNo("");
    setSearchName("");
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.registrationNo));
    }
  };

  const handleCheckboxChange = (regNo) => {
    setSelectedStudents((prev) =>
      prev.includes(regNo)
        ? prev.filter((id) => id !== regNo)
        : [...prev, regNo]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Students:", selectedStudents);
    onClose();
  };

  const displayedStudents = filteredStudents.filter((student) => {
    return (
      student.registrationNo.toLowerCase().includes(searchRegNo.toLowerCase()) &&
      student.name.toLowerCase().includes(searchName.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Copy From Program Batch</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Program Batch</label>
            <select
              value={selectedBatch}
              onChange={handleBatchSelect}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Batch</option>
              {mockBatches.map((batch, index) => (
                <option key={index} value={batch.programBatch}>
                  {batch.programBatch}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredStudents.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Matching Students</h3>
            <div className="overflow-x-auto max-h-64 overflow-y-auto border border-gray-200 rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-2 border">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedStudents.length === filteredStudents.length &&
                          filteredStudents.length !== 0
                        }
                      />
                    </th>
                    <th className="p-2 border">
                      <div className="flex flex-col items-center">
                        <span>Reg. No</span>
                        <input
                          type="text"
                          className="w-40 border-2 border-gray-500 px-2 py-1 rounded mt-1 text-center"
                          value={searchRegNo}
                          onChange={(e) => setSearchRegNo(e.target.value)}
                        />
                      </div>
                    </th>
                    <th className="p-2 border">
                      <div className="flex flex-col items-center">
                        <span>Name</span>
                        <input
                          type="text"
                          className="w-40 border-2 border-gray-500 px-2 py-1 rounded mt-1 text-center"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.map((student) => (
                    <tr key={student.registrationNo} className="hover:bg-gray-50">
                      <td className="p-2 border text-center">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.registrationNo)}
                          onChange={() => handleCheckboxChange(student.registrationNo)}
                        />
                      </td>
                      <td className="p-2 border">{student.registrationNo}</td>
                      <td className="p-2 border">{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyFromBatchModal;
