// src/MockData/MockAttendance.js

const attendanceData = {
    classes: [
      { name: "Lab 1", date: "20-Feb-25" },
      { name: "Lab 2", date: "27-Feb-25" },
      { name: "Lab 3", date: "06-Mar-25" },
      { name: "Lab 4", date: "13-Mar-25" },
      { name: "Lab 5", date: "20-Mar-25" },
      { name: "Lab 6", date: "27-Mar-25" },
      { name: "Lecture 7", date: "10-Apr-25" },
    ],
    students: [
      {
        regNo: "NUM-BSCS-2022-22",
        name: "Mehwish Sana",
        avatar: "https://via.placeholder.com/32x32.png?text=M",
        attendance: [true, false, false, true, true, false, true],
      },
      {
        regNo: "NUM-BSCS-2023-01",
        name: "Hasnat Akram",
        avatar: "https://via.placeholder.com/32x32.png?text=H",
        attendance: [true, true, true, false, true, false, true],
      },
      {
        regNo: "NUM-BSCS-2023-02",
        name: "Ejaz Ahmed",
        avatar: "https://via.placeholder.com/32x32.png?text=E",
        attendance: [false, true, true, true, true, true, true],
        isRed: true,
      },
      {
        regNo: "NUM-BSCS-2023-03",
        name: "Ejaz Ahmed",
        avatar: "https://via.placeholder.com/32x32.png?text=E",
        attendance: [false, true, true, true, true, true, true],
        isRed: true,
      },
      {
        regNo: "NUM-BSCS-2023-04",
        name: "Ejaz Ahmed",
        avatar: "https://via.placeholder.com/32x32.png?text=E",
        attendance: [false, true, true, true, true, true, true],
        isRed: true,
      },
      {
        regNo: "NUM-BSCS-2023-05",
        name: "Ejaz Ahmed",
        avatar: "https://via.placeholder.com/32x32.png?text=E",
        attendance: [false, true, true, true, true, true, true],
        isRed: true,
      },
      {
        regNo: "NUM-BSCS-2023-06",
        name: "Ejaz Ahmed",
        avatar: "https://via.placeholder.com/32x32.png?text=E",
        attendance: [false, true, true, true, true, true, true],
        isRed: true,
      },
      {
        regNo: "NUM-BSCS-2023-07",
        name: "Javeria Nawal",
        avatar: "https://via.placeholder.com/32x32.png?text=J",
        attendance: [true, true, true, false, true, false, true],
      },
    ],
  };

  export default attendanceData;