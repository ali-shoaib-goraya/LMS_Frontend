// Timetabledata.js
// Combined mock data file for timetable system

// Departments
export const departments = [
  { id: 1, name: "Mathematics", shortName: "Math" },
  { id: 2, name: "BBA", shortName: "BBA" },
  { id: 3, name: "Computer Science", shortName: "CS" },
  { id: 4, name: "Electrical Engineering", shortName: "EE" },
];

// Program Batches (8 semesters per department)
export const programBatches = [
  { id: 1, name: "Spring 2025", departmentId: 1 },
];

export const Semesters = [
  // Mathematics Semesters
  { id: 1, name: "Mathematics - Semester 2", departmentId: 1 },
  { id: 2, name: "Mathematics - Semester 4", departmentId: 1 },
  { id: 3, name: "Mathematics - Semester 6", departmentId: 1 },
  { id: 4, name: "Mathematics - Semester 8", departmentId: 1 },

  // BBA Semesters
  { id: 5, name: "BBA - Semester 2", departmentId: 2 },
  { id: 6, name: "BBA - Semester 4", departmentId: 2 },
  { id: 7, name: "BBA - Semester 6", departmentId: 2 },
  { id: 8, name: "BBA - Semester 8", departmentId: 2 },

  // Computer Science Semesters
  { id: 9, name: "CS - Semester 2", departmentId: 3 },
  { id: 10, name: "CS - Semester 4", departmentId: 3 },
  { id: 11, name: "CS - Semester 6", departmentId: 3 },
  { id: 12, name: "CS - Semester 8", departmentId: 3 },

  // Electrical Engineering Semesters
  { id: 13, name: "EE - Semester 2", departmentId: 4 },
  { id: 14, name: "EE - Semester 4", departmentId: 4 },
  { id: 15, name: "EE - Semester 6", departmentId: 4 },
  { id: 16, name: "EE - Semester 8", departmentId: 4 },
];

// Teachers (20 per department)
export const teachers = [
  // Mathematics Teachers (id 1 to 10)
  { id: 1, name: "DR. Israr Ali Khan 1", departmentId: 1 },
  { id: 2, name: "DR. Adil Jahangeer", departmentId: 1 },
  { id: 3, name: "DR. Muhammad Rafiq", departmentId: 1 },
  { id: 4, name: "DR. Rashid Mehmood", departmentId: 1 },
  { id: 5, name: "DR. Samiullah KHan", departmentId: 1 },
  { id: 6, name: "DR. Zia UR Rehman", departmentId: 1 },
  { id: 7, name: "DR. Awais SHoukat", departmentId: 1 },
  { id: 8, name: "DR. Awais Ahmed", departmentId: 1 },
  { id: 9, name: "Ms. Faiqa Ali", departmentId: 1 },
  { id: 10, name: "Ms. Tazeen Ayesha", departmentId: 1 },

  // BBA Teachers (id 11 to 20)
  { id: 11, name: "DR. Muhammad Ahmed", departmentId: 2 },
  { id: 12, name: "DR. Muhammad Ashraf", departmentId: 2 },
  { id: 13, name: "DR. Umer Farooq", departmentId: 2 },
  { id: 14, name: "DR. Hashim Zameer", departmentId: 2 },
  { id: 15, name: "DR. Shoaib Irshad", departmentId: 2 },
  { id: 16, name: "DR. Haris Bin Khalid", departmentId: 2 },
  { id: 17, name: "DR. Faisal Rasheed", departmentId: 2 },
  { id: 18, name: "DR. Azhar Rasool", departmentId: 2 },
  { id: 19, name: "MR. Hamza Wazeer Khan", departmentId: 2 },
  { id: 20, name: "MS. Zunera Batool", departmentId: 2 },

  // Computer Science Teachers (id 21 to 30)
  { id: 21, name: "DR. Malik M Ali Shahid", departmentId: 3 },
  { id: 22, name: "DR. Khawar Khurshid", departmentId: 3 },
  { id: 23, name: "DR. Mudassar Raza", departmentId: 3 },
  { id: 24, name: "DR. Shafiq Ur Rehaman", departmentId: 3 },
  { id: 25, name: "DR. Muzamil Ahmad", departmentId: 3 },
  { id: 26, name: "MR. Adnan Bashir ", departmentId: 3 },
  { id: 27, name: "MR.  Shahzad Arif", departmentId: 3 },
  { id: 28, name: "MR. Abdul Rafay", departmentId: 3 },
  { id: 29, name: "MR. Ramzan Shahid", departmentId: 3 },
  { id: 30, name: "MS. Asiya Batool", departmentId: 3 },
  { id: 31, name: "MR. Muhammad Bilal", departmentId: 3 },
  { id: 32, name: "MS. Sonia Safeer", departmentId: 3 },
  { id: 33, name: "MS. Ammar Ahmad", departmentId: 3 },

  // Electrical Engineering Teachers (id 31 to 40)
  { id: 34, name: "DR. Sami Ud Din", departmentId: 4 },
  { id: 35, name: "DR. Sajjad Ur Rehman", departmentId: 4 },
  { id: 36, name: "DR. Tassadaq Hussain", departmentId: 4 },
  { id: 37, name: "DR. Wahab Ali Shah", departmentId: 4 },
  { id: 38, name: "DR. Ahmed Salim", departmentId: 4 },
  { id: 39, name: "DR. Naureen Shaukat", departmentId: 4 },
  { id: 40, name: "DR. M Farrukh Qureshi", departmentId: 4 },
  { id: 41, name: "MS. Zulaikha Kiran", departmentId: 4 },
  { id: 42, name: "MR. Zafar Ullah", departmentId: 4 },
  { id: 43, name: "MR. Junaid Ashraf", departmentId: 4 },
  { id: 44, name: "MS. Farkhanda Aziz", departmentId: 4 },
  { id: 45, name: "MR. Muhammad Imtiaz Ul Hassan", departmentId: 4 },
  { id: 46, name: "MS. Misbah Batool", departmentId: 4 },
  { id: 47, name: "MR. Faizan Ahmad", departmentId: 4 },
  { id: 48, name: "MR. Majid ALi", departmentId: 4 },
];

// Courses (4 courses per semester per department, total 64 courses)
export const courses = [
  // Mathematics Courses (id 1 to 16)
  { id: 1, name: "Calculus 2", teacherId: 1, departmentId: 1, SemestersId: 1 },
  { id: 2, name: "Linear Algebra 1", teacherId: 2, departmentId: 1, SemestersId: 1 },
  { id: 3, name: "Iqbaliyat", teacherId: 3, departmentId: 1, SemestersId: 1 },
  { id: 4, name: "Technical Writing and Communication ", teacherId: 4, departmentId: 1, SemestersId: 1 },
  { id: 5, name: "Introdunction to Programming", teacherId: 5, departmentId: 1, SemestersId: 1 },
  { id: 6, name: "Pakistan Studies", teacherId: 6, departmentId: 1, SemestersId: 1 },
  { id: 7, name: "Quranic Studies 2", teacherId: 7, departmentId: 1, SemestersId: 1 },

  { id: 8, name: "Real Analysis 1 ", teacherId: 8, departmentId: 1, SemestersId: 2 },
  { id: 9, name: "Algebra 1 ", teacherId: 9, departmentId: 1, SemestersId: 2 },
  { id: 10, name: "Probability and Statics 2 ", teacherId: 10, departmentId: 1, SemestersId: 2 },
  { id: 11, name: "Physics 2 ", teacherId: 1, departmentId: 1, SemestersId: 2 },
  { id: 12, name: "Creative and Rhetoric Writing ", teacherId: 2, departmentId: 1, SemestersId: 2 },
  { id: 13, name: "Quranic Studies 4 ", teacherId: 3, departmentId: 1, SemestersId: 2 },

  { id: 14, name: "Complex Variable ", teacherId: 4, departmentId: 1, SemestersId: 3 },
  { id: 15, name: "Introduction to Linear Programming and Optimization ", teacherId: 5, departmentId: 1, SemestersId: 3 },
  { id: 16, name: "Elective 2", teacherId: 6, departmentId: 1, SemestersId: 3 },
  { id: 17, name: "Introdunction to Philosophy ", teacherId: 7, departmentId: 1, SemestersId: 3 },
  { id: 18, name: "Algebra 2 ", teacherId: 8, departmentId: 1, SemestersId: 3 },

  { id: 19, name: "Introduction to Accounting and Finance/Economics ", teacherId: 9, departmentId: 1, SemestersId: 4 },
  { id: 20, name: "Functional Analysis ", teacherId: 10, departmentId: 1, SemestersId: 4 },
  { id: 21, name: "Differential Geometry ", teacherId: 11, departmentId: 1, SemestersId: 4 },
  { id: 22, name: "Elective 4 ", teacherId: 12, departmentId: 1, SemestersId: 4 },
  { id: 23, name: "Project 2 ", teacherId: 13, departmentId: 1, SemestersId: 4 },

  // BBA Courses (id 17 to 33)
  { id: 24, name: "Oral Communication ", teacherId: 11, departmentId: 2, SemestersId: 5 },
  { id: 25, name: "Civilization Course 1 ", teacherId: 12, departmentId: 2, SemestersId: 5 },
  { id: 26, name: "Quantitaive and Computational Reasoning 1 ", teacherId: 13, departmentId: 2, SemestersId: 5 },
  { id: 27, name: "Basics of Agriculture ", teacherId: 14, departmentId: 2, SemestersId: 5 },
  { id: 28, name: "Principles of Marketing ", teacherId: 15, departmentId: 2, SemestersId: 5 },
  { id: 29, name: "Financial Accouting 1 ", teacherId: 16, departmentId: 2, SemestersId: 5 },

  { id: 30, name: "Civilization Course 3 ", teacherId: 17, departmentId: 2, SemestersId: 6 },
  { id: 31, name: "Principles of Finance ", teacherId: 18, departmentId: 2, SemestersId: 6 },
  { id: 32, name: "Introdunction to Data Analytics ", teacherId: 19, departmentId: 2, SemestersId: 6 },
  { id: 33, name: "Natural Science ", teacherId: 20, departmentId: 2, SemestersId: 6 },
  { id: 34, name: "Managerial Accounting ", teacherId: 11, departmentId: 2, SemestersId: 6 },
  { id: 35, name: "Entrepreneurship ", teacherId: 12, departmentId: 2, SemestersId: 6 },

  { id: 36, name: "Financial Statement Analysis ", teacherId: 13, departmentId: 2, SemestersId: 7 },
  { id: 37, name: "Management Information System ", teacherId: 24, departmentId: 2, SemestersId: 7 },
  { id: 38, name: "Elective 1 ", teacherId: 15, departmentId: 2, SemestersId: 7 },
  { id: 39, name: "Specialization 1 ", teacherId: 16, departmentId: 2, SemestersId: 7 },
  { id: 40, name: "Organizational Behavior ", teacherId: 17, departmentId: 2, SemestersId: 7 },
  { id: 41, name: "Quranic Studeis 2 ", teacherId: 18, departmentId: 2, SemestersId: 7 },

  { id: 42, name: "Enterprise Resource Planning ", teacherId: 19, departmentId: 2, SemestersId: 8 },
  { id: 43, name: "Specialization 3 ", teacherId: 20, departmentId: 2, SemestersId: 8 },
  { id: 44, name: "Specialization 4 ", teacherId: 11, departmentId: 2, SemestersId: 8 },
  { id: 45, name: "Specialization 5 ", teacherId: 12, departmentId: 2, SemestersId: 8 },
  { id: 46, name: "FYP ", teacherId: 13, departmentId: 2, SemestersId: 8 },

  // Computer Science Courses (id 33 to 48)
  { id: 47, name: "Calculus and Analytical Geometry - QR1", teacherId: 21, departmentId: 3, SemestersId: 9 },
  { id: 48, name: "Foundation Math 2 (for Pre-Medical students) ", teacherId: 22, departmentId: 3, SemestersId: 9 },
  { id: 49, name: "Object Oriented Programming ", teacherId: 23, departmentId: 3, SemestersId: 9 },
  { id: 50, name: "Digital Logic Design ", teacherId: 24, departmentId: 3, SemestersId: 9 },
  { id: 51, name: "Expository Writing ", teacherId: 25, departmentId: 3, SemestersId: 9 },
  { id: 52, name: "Applied Physics (Natural Science) ", teacherId: 26, departmentId: 3, SemestersId: 9 },

  { id: 53, name: "Probability and Statistics ", teacherId: 27, departmentId: 3, SemestersId: 10 },
  { id: 54, name: "Database Systems ", teacherId: 28, departmentId: 3, SemestersId: 10 },
  { id: 55, name: "Analysis of Algorithms ", teacherId: 29, departmentId: 3, SemestersId: 10 },
  { id: 56, name: "Theory of Automata ", teacherId: 30, departmentId: 3, SemestersId: 10 },
  { id: 57, name: "Computer Architecture ", teacherId: 31, departmentId: 3, SemestersId: 10 },
  { id: 58, name: "Quranic Studies II ", teacherId: 32, departmentId: 3, SemestersId: 10 },

  { id: 59, name: "HCI and Graphics ", teacherId: 33, departmentId: 3, SemestersId: 11 },
  { id: 60, name: "Domain Elective 1 ", teacherId: 21, departmentId: 3, SemestersId: 11 },
  { id: 61, name: "Advance Database Management System ", teacherId: 22, departmentId: 3, SemestersId: 11 },
  { id: 62, name: "Compiler Construction ", teacherId: 23, departmentId: 3, SemestersId: 11 },
  { id: 63, name: "Domain Elective 2 ", teacherId: 24, departmentId: 3, SemestersId: 11 },
  { id: 64, name: "Iqbaliyat (Social Science group) ", teacherId: 25, departmentId: 3, SemestersId: 11 },

  { id: 65, name: "Domain Elective 6 ", teacherId: 26, departmentId: 3, SemestersId: 12 },
  { id: 66, name: "Domain Elective 7 ", teacherId: 27, departmentId: 3, SemestersId: 12 },
  { id: 67, name: "Civics and Community Engagement ", teacherId: 28, departmentId: 3, SemestersId: 12 },
  { id: 68, name: "Technical and Business Writing ", teacherId: 29, departmentId: 3, SemestersId: 12 },
  { id: 69, name: "FYP-2 ", teacherId: 30, departmentId: 3, SemestersId: 12 },

  // EE Courses (id 49 to 64)
  { id: 70, name: "Applied Physics ", teacherId: 34, departmentId: 4, SemestersId: 13 },
  { id: 71, name: "Quantitative & Computational Reasoning II ", teacherId: 35, departmentId: 4, SemestersId: 13},
  { id: 72, name: "Expository Writing ", teacherId: 36, departmentId: 4, SemestersId: 13 },
  { id: 73, name: "Electrical Network Analysis & Design ", teacherId: 37, departmentId: 4, SemestersId: 13 },
  { id: 74, name: "Engineering Workshop ", teacherId: 38, departmentId: 4, SemestersId: 13 },
  { id: 75, name: "Differential Equations	", teacherId: 39, departmentId: 4, SemestersId: 13 },

  { id: 76, name: "Digital Logic Design ", teacherId: 40, departmentId: 4, SemestersId: 14 },
  { id: 77, name: "Signal & Systems ", teacherId: 41, departmentId: 4, SemestersId: 14 },
  { id: 78, name: "Probability Methods in Engineering	", teacherId: 42, departmentId: 4, SemestersId: 14 },
  { id: 79, name: "Introduction to Power Engineering ", teacherId: 43, departmentId: 4, SemestersId: 14 },
  { id: 80, name: "Math Elective	", teacherId: 44, departmentId: 4, SemestersId: 14 },

  { id: 81, name: "Communication Systems ", teacherId: 45, departmentId: 4, SemestersId: 15 },
  { id: 82, name: "Machine Learning	", teacherId: 46, departmentId: 4, SemestersId: 15 },
  { id: 83, name: "Elective – I ", teacherId: 47, departmentId: 4, SemestersId: 15 },
  { id: 84, name: "Power Electronics ", teacherId: 48, departmentId: 4, SemestersId: 15 },
  { id: 85, name: "Project Management	", teacherId: 34, departmentId: 4, SemestersId: 15 },
  { id: 86, name: "Occupational Health and Safety	", teacherId: 35, departmentId: 4, SemestersId: 15 },

  { id: 87, name: "Ideology and Constitution of Pakistan ", teacherId: 36, departmentId: 4, SemestersId: 16 },
  { id: 88, name: "Islamic Studies or Ethics ", teacherId: 37, departmentId: 4, SemestersId: 16 },
  { id: 89, name: "Quranic Studies II	", teacherId: 38, departmentId: 4, SemestersId: 16 },
  { id: 90, name: "Elective – IV	", teacherId: 39, departmentId: 4, SemestersId: 16 },
  { id: 91, name: "Elective – V	 ", teacherId: 40, departmentId: 4, SemestersId: 16 },
  { id: 92, name: "Final Year Project – II	", teacherId: 41, departmentId: 4, SemestersId: 16 },
];

// Rooms data (15 rooms)
export const rooms = [
  { id: 1, name: "Room Au1" },
  { id: 2, name: "Room Au2" },
  { id: 3, name: "Room Au3" },
  { id: 4, name: "Room Au4" },
  { id: 5, name: "Room Au5" },
  { id: 6, name: "Room Au6" },
  { id: 7, name: "Room Au7" },
  { id: 8, name: "Room LH1" },
  { id: 9, name: "Room LH2" },
  { id: 10, name: "Room LH3" },
  { id: 11, name: "Room HL" },
  { id: 12, name: "Room SYS-L" },
];

// Base timeslots for each day
const baseTimeslots = [
  { id: 1, start: "09:00", end: "10:30" },
  { id: 2, start: "10:30", end: "12:00" },
  { id: 3, start: "12:00", end: "13:30" },
  { id: 4, start: "13:30", end: "14:00" }, // Break time
  { id: 5, start: "14:00", end: "15:30" },
  { id: 6, start: "15:30", end: "17:00" },
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Generate timeslots with day included
export const timeslots = [];

weekdays.forEach((day, dayIndex) => {
  baseTimeslots.forEach(slot => {
    timeslots.push({
      id: dayIndex * baseTimeslots.length + slot.id,
      day,
      start: slot.start,
      end: slot.end,
    });
  });
});

export default { departments, courses, teachers, rooms, timeslots, programBatches };