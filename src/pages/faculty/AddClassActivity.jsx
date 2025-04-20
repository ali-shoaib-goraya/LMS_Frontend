import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

const AddClassActivity = () => {
  const [questions, setQuestions] = useState([1]);

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions) + 1 : 1;
    setQuestions([...questions, newId]);
  };

  const removeQuestion = (index) => {
    if (index !== 0) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-10xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Class Activity</h2>

      {/* Activity Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-medium">Activity/Assessment Method</label>
          <select className="w-full border rounded p-2">
            <option>- Select -</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input type="text" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input type="date" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">Total Marks</label>
          <input type="number" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-medium">GPA Weight</label>
          <input type="number" className="w-full border rounded p-2" />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Include for GPA Calculation
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Show Activity to Students
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Show Result to Students?
        </label>
      </div>

      {/* Sub Activities */}
      <div className="border rounded p-4 mb-4">
        <h3 className="font-semibold text-lg mb-4">Sub Activities/ Questions</h3>

        {questions.map((questionId, index) => (
          <div
            key={questionId}
            className="border border-gray-300 rounded p-4 mb-4 relative"
          >
            {index !== 0 && (
              <button
                onClick={() => removeQuestion(index)}
                className="absolute top-2 right-2 text-red-500"
              >
                <FaTimes />
              </button>
            )}

            <p className="font-medium mb-2">Line # {index + 1}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label>Name</label>
                <input type="text" className="w-full border rounded p-2" placeholder={`Q${index + 1}`} />
              </div>

              <div>
                <label>Max Marks</label>
                <input type="number" className="w-full border rounded p-2" />
              </div>

              <div>
                <label>%OBE Weight</label>
                <input type="number" className="w-full border rounded p-2" />
              </div>
            </div>

            <input
              type="text"
              className="w-full border rounded p-2 mb-2"
              placeholder="CLOs"
            />

            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" />
              Not for OBE
            </label>

            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="2"
              placeholder="Question (Guidelines for Question)"
            ></textarea>

            <input type="file" className="mb-2" />

            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="2"
              placeholder="Choices (Choices Guide) [Set Choices]"
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Question Type</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="Text Base"
                />
              </div>
              <div>
                <label>Correct Answer (Answer Guide)</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* Save / Close Buttons */}
      <div className="flex gap-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Save
        </button>
        <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">

          Close
        </button>
      </div>
    </div>
  );
};

export default AddClassActivity;
