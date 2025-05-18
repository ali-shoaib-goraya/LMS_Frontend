import React, { useState } from "react";
import {
  departments,
  teachers,
  courses,
  rooms,
  timeslots,
  programBatches,
  Semesters
} from "../../mockData/Timetabledata";
import { generateWithGeneticAlgorithm } from "./geneticalgorithm";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const GenerateTimetable = () => {
  const [timetableMatrix, setTimetableMatrix] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = () => {
    setIsLoading(true);
    setError(null);

    try {
      const semesterToYear = {};
      Semesters.forEach(sem => {
        const semNumber = parseInt(sem.name.split("Semester ")[1]);
        if (semNumber <= 2) semesterToYear[sem.id] = 1;
        else if (semNumber <= 4) semesterToYear[sem.id] = 2;
        else if (semNumber <= 6) semesterToYear[sem.id] = 3;
        else semesterToYear[sem.id] = 4;
      });

      const generated = generateWithGeneticAlgorithm({
        departments,
        programBatches,
        teachers,
        courses,
        rooms,
        timeslots,
        Semesters
      });

      const matrix = {};
      for (let day of days) {
        matrix[day] = {};
        const daySlots = timeslots.filter((s) => s.day === day);
        for (let slot of daySlots) {
          matrix[day][slot.id] = {
            slotTime: `${slot.start} - ${slot.end}`,
            yearDepartments: {
              1: { 1: "", 2: "", 3: "", 4: "" },
              2: { 1: "", 2: "", 3: "", 4: "" },
              3: { 1: "", 2: "", 3: "", 4: "" },
              4: { 1: "", 2: "", 3: "", 4: "" }
            }
          };
        }
      }

      generated.forEach((entry) => {
        const slot = timeslots.find(
          (s) => s.day === entry.day && s.start === entry.startTime
        );
        if (!slot) return;

        const cellText = `${entry.departmentName}: ${entry.courseName} (${entry.roomName})`;
        if (entry.year && entry.departmentId) {
          matrix[entry.day][slot.id].yearDepartments[entry.year][entry.departmentId] = cellText;
        }
      });

      setTimetableMatrix(matrix);
    } catch (err) {
      console.error("Error generating timetable:", err);
      setError("Failed to generate timetable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get slots grouped by day
  const slotsByDay = days.reduce((acc, day) => {
    acc[day] = timeslots.filter((s) => s.day === day).sort((a, b) => a.id - b.id);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-left">Generate Timetable</h1>

      <div className="text-left mb-6">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-2 rounded transition`}
        >
          {isLoading ? "Generating..." : "Generate Timetable"}
        </button>
      </div>

      {error && <div className="text-red-600 mb-4 text-left">{error}</div>}

      {timetableMatrix && (
        <div className="overflow-x-auto border rounded-lg">
          <table className="border-collapse w-full text-sm min-w-[1000px]">
            <thead>
              <tr>
                <th className="border px-2 py-1 text-center bg-gray-100"></th>
                {days.map((day) => (
                  <th
                    key={day}
                    colSpan={slotsByDay[day].length}
                    className="border px-2 py-1 text-center bg-gray-100"
                  >
                    {day}
                  </th>
                ))}
              </tr>
              <tr>
                <th className="border px-2 py-1 text-center bg-gray-100"></th>
                {days.map((day) =>
                  slotsByDay[day].map((slot) => (
                    <th
                      key={`${day}-${slot.id}`}
                      className="border px-2 py-1 text-center bg-gray-50 whitespace-nowrap"
                    >
                      {slot.id % 6 === 4 ? (
                        <>
                          Break
                          <br />
                          {slot.start} - {slot.end}
                        </>
                      ) : (
                        <>
                          Slot {slot.id % 6 === 0 ? 6 : slot.id % 6}
                          <br />
                          {slot.start} - {slot.end}
                        </>
                      )}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((year) => (
                <React.Fragment key={`year-${year}`}>
                  {[1, 2, 3, 4].map((deptId, deptIndex) => {
                    const deptName =
                      departments.find((d) => d.id === deptId)?.shortName || `Dept ${deptId}`;
                    return (
                      <tr key={`year-${year}-dept-${deptId}`}>
                        {deptIndex === 0 && (
                          <td
                            rowSpan={4}
                            className="border px-2 py-20 font-medium text-center bg-gray-100 whitespace-nowrap"
                          >
                            Year {year}
                          </td>
                        )}
                        {days.map((day) =>
                          slotsByDay[day].map((slot) => {
                            const cell = timetableMatrix[day]?.[slot.id];
                            const text = cell?.yearDepartments[year][deptId] || "";
                            return (
                              <td
                                key={`${day}-${slot.id}-year-${year}-dept-${deptId}`}
                                className={`border px-2 py-1 whitespace-pre-line text-left ${
                                  text ? "bg-green-50" : ""
                                }`}
                              >
                                {text}
                              </td>
                            );
                          })
                        )}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenerateTimetable;
