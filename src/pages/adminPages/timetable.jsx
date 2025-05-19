import React, { useState } from "react";
import {
  departments,
  teachers,
  courses,
  rooms,
  timeslots,
  Semesters,
} from "../../MockData/Timetabledata";
import {
  generateWithGeneticAlgorithm,
  formatTimetableForDisplay,
} from "./geneticalgorithm";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const GenerateTimetable = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [timetableMatrix, setTimetableMatrix] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationStats, setGenerationStats] = useState(null);
  const [conflicts, setConflicts] = useState([]);

  const handleGenerate = () => {
    setIsLoading(true);
    setError(null);
    setConflicts([]);

    try {
      const generated = generateWithGeneticAlgorithm({
        departments,
        teachers,
        courses,
        rooms,
        timeslots,
        Semesters,
      });

      setTimetableData(generated);

      const stats = {
        totalEntries: generated.length,
        entriesByDept: {},
        entriesBySemester: {},
        courseSessionCounts: {},
      };

      departments.forEach((dept) => {
        stats.entriesByDept[dept.id] = generated.filter(
          (entry) => entry.departmentId === dept.id
        ).length;
      });

      Semesters.forEach((sem) => {
        stats.entriesBySemester[sem.id] = generated.filter(
          (entry) => entry.semesterId === sem.id
        ).length;
      });

      courses.forEach((course) => {
        stats.courseSessionCounts[course.id] = generated.filter(
          (entry) => entry.courseId === course.id
        ).length;
      });

      setGenerationStats(stats);

      const detectedConflicts = detectConflicts(generated);
      setConflicts(detectedConflicts);

      convertToMatrixFormat(generated);
    } catch (err) {
      setError("Failed to generate timetable: " + (err.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const detectConflicts = (generated) => {
    const conflicts = [];
    const semesterToYear = {};

    Semesters.forEach((sem) => {
      const semNumber = parseInt(sem.name.replace(/\D/g, ""));
      if (semNumber <= 2) semesterToYear[sem.id] = 1;
      else if (semNumber <= 4) semesterToYear[sem.id] = 2;
      else if (semNumber <= 6) semesterToYear[sem.id] = 3;
      else semesterToYear[sem.id] = 4;
    });

    const entriesBySlot = {};

    generated.forEach((entry) => {
      const slotKey = `${entry.day}-${entry.startTime}-${entry.departmentId}-${semesterToYear[entry.semesterId]}`;

      if (!entriesBySlot[slotKey]) {
        entriesBySlot[slotKey] = [];
      }

      entriesBySlot[slotKey].push(entry);
    });

    Object.entries(entriesBySlot).forEach(([slotKey, entries]) => {
      if (entries.length > 1) {
        const year = semesterToYear[entries[0].semesterId];
        const dept = departments.find((d) => d.id === entries[0].departmentId);

        conflicts.push({
          day: entries[0].day,
          time: entries[0].startTime,
          year,
          department: dept?.name || `Dept ${entries[0].departmentId}`,
          courses: entries.map((e) => e.courseName),
          count: entries.length,
        });
      }
    });

    return conflicts;
  };

  const convertToMatrixFormat = (generated) => {
    const matrix = {};
    const semesterToYear = {};

    days.forEach((day) => {
      matrix[day] = {};
      const daySlots = timeslots
        .filter((s) => s.day === day)
        .sort((a, b) => {
          const timeA = a.start.split(":").map(Number);
          const timeB = b.start.split(":").map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });

      for (let slot of daySlots) {
        matrix[day][slot.id] = {
          slotTime: `${slot.start} - ${slot.end}`,
          yearDepartments: {
            1: {},
            2: {},
            3: {},
            4: {},
          },
        };

        departments.forEach((dept) => {
          for (let year = 1; year <= 4; year++) {
            matrix[day][slot.id].yearDepartments[year][dept.id] = [];
          }
        });
      }
    });

    Semesters.forEach((sem) => {
      const semNumber = parseInt(sem.name.replace(/\D/g, ""));
      if (semNumber <= 2) semesterToYear[sem.id] = 1;
      else if (semNumber <= 4) semesterToYear[sem.id] = 2;
      else if (semNumber <= 6) semesterToYear[sem.id] = 3;
      else semesterToYear[sem.id] = 4;
    });

    generated.forEach((entry) => {
      const slot = timeslots.find(
        (s) => s.day === entry.day && s.start === entry.startTime
      );

      if (!slot) return;

      const year = semesterToYear[entry.semesterId] || 1;
      const cellText = `${entry.courseName} (${entry.roomName}) [Session ${entry.sessionNumber}]`;

      matrix[entry.day][slot.id].yearDepartments[year][entry.departmentId].push(cellText);
    });

    setTimetableMatrix(matrix);
  };

  const slotsByDay = days.reduce((acc, day) => {
    acc[day] = timeslots
      .filter((s) => s.day === day)
      .sort((a, b) => {
        const timeA = a.start.split(":").map(Number);
        const timeB = b.start.split(":").map(Number);
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
      });
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-left">Generate Timetable</h1>

      <div className="flex flex-wrap gap-4 text-left mb-6">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-2 rounded transition`}
        >
          {isLoading ? "Generating..." : "Generate Timetable"}
        </button>

        {timetableMatrix && (
          <div className="flex gap-4">
            <div>
              <label className="mr-2">Department:</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mr-2">Year:</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="all">All Years</option>
                {[1, 2, 3, 4].map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {error && <div className="text-red-600 mb-4 text-left">{error}</div>}

      {conflicts.length > 0 && (
        <div className="mb-6 text-left bg-red-50 p-4 rounded-lg border border-red-200">
          <h2 className="text-lg font-semibold mb-2 text-red-700">
            Timetable Conflicts Detected
          </h2>
          <p className="text-red-600 mb-2">
            Found {conflicts.length} slots with multiple sessions:
          </p>
          <ul className="list-disc pl-8 text-red-600">
            {conflicts.slice(0, 5).map((conflict, idx) => (
              <li key={idx}>
                {conflict.day} at {conflict.time}: {conflict.department} Year{" "}
                {conflict.year} has {conflict.count} courses (
                {conflict.courses.join(", ")})
              </li>
            ))}
            {conflicts.length > 5 && (
              <li>...and {conflicts.length - 5} more conflicts</li>
            )}
          </ul>
        </div>
      )}

      {generationStats && (
        <div className="mb-6 text-left bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Generation Statistics</h2>
          <p>Total scheduled sessions: {generationStats.totalEntries}</p>
          <p>Expected sessions: {courses.length * 2} (2 per course)</p>

          <div className="mt-2">
            <h3 className="font-medium">Sessions by Department:</h3>
            <ul className="list-disc pl-8">
              {departments.map((dept) => (
                <li key={dept.id}>
                  {dept.name}: {generationStats.entriesByDept[dept.id] || 0}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-2">
            {
              Object.values(generationStats.courseSessionCounts).filter(
                (count) => count !== 2
              ).length
            }{" "}
            courses don't have exactly 2 sessions
          </p>
        </div>
      )}

      {timetableMatrix && (
        <div className="w-full overflow-x-auto border rounded-lg">
          <div className="min-w-[1000px]">
            <table className="border-collapse w-full text-sm">
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
                        {slot.start === "13:30" && slot.end === "14:00"
                          ? `Break\n${slot.start} - ${slot.end}`
                          : `${slot.start} - ${slot.end}`}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {(yearFilter === "all" ? [1, 2, 3, 4] : [parseInt(yearFilter)]).map(
                  (year) =>
                    (departmentFilter === "all"
                      ? departments
                      : departments.filter((d) => d.id === parseInt(departmentFilter))
                    ).map((dept) => (
                      <tr key={`${dept.id}-${year}`}>
                        <td className="border px-2 py-1 text-left font-medium">
                          {dept.shortName || dept.name} - Year {year}
                        </td>
                        {days.map((day) =>
                          slotsByDay[day].map((slot) => (
                            <td
                              key={`${dept.id}-${year}-${day}-${slot.id}`}
                              className="border px-2 py-1 text-left whitespace-pre-line"
                            >
                              {timetableMatrix[day][slot.id].yearDepartments[year][
                                dept.id
                              ]?.join("\n") || ""}
                            </td>
                          ))
                        )}
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateTimetable;
