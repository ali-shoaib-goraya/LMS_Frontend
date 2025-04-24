import { useState } from "react";
import mockActivityWeights from "../../MockData/mockActivityWeights";
import { Pencil, Trash2, X } from "lucide-react";

const ActivityWeights = () => {
  const [data] = useState(mockActivityWeights);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalWeight = data.reduce((sum, item) => sum + item.weight, 0);

  return (
    <>
      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Activity Weights (GPA)</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50 transition"
          >
            Add
          </button>
        </div>

        <p className="text-sm mb-2">
          Showing <strong>1-{data.length}</strong> of <strong>{data.length}</strong> items.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left w-10">#</th>
                <th className="border px-4 py-2 text-left text-purple-700 font-semibold">Activity</th>
                <th className="border px-4 py-2 text-left text-purple-700 font-semibold">Weight</th>
                <th className="border px-4 py-2 text-left text-purple-700 font-semibold">Calculation Mode</th>
                <th className="border px-4 py-2 text-left text-purple-700 font-semibold">N-1 Type</th>
                <th className="border px-4 py-2 w-20"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.activity}</td>
                  <td className="border px-4 py-2">{item.weight.toFixed(2)}</td>
                  <td className="border px-4 py-2">{item.calculationMode}</td>
                  <td className="border px-4 py-2">{item.nMinus1Type}</td>
                  <td className="border px-4 py-2 flex justify-center gap-2 text-purple-700">
                    <button><Pencil size={16} /></button>
                    <button><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2">Total</td>
                <td className="border px-4 py-2">{totalWeight.toFixed(2)}</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-6">Add Activity Weights</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option value="">Select</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Project">Project</option>
                  <option value="Mid">Mid</option>
                  <option value="Final">Final</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">N-1 Type</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Normal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Mode</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Automatic"
                />
              </div>
            </div>

            <div className="flex justify-start gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityWeights;
