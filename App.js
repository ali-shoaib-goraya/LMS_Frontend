// App.js
import React from "react";
import CampusForm from "./components/CampusForm";
import DepartmentForm from "./components/DepartmentForm";
import ProgramBatch from "./components/ProgramBatchForm";
import UserForm from "./components/UsersForm";
import SchoolForm from "./components/SchoolForm";
import ProgramForm from "./components/ProgramForm";
import SemesterForm from "./components/SemesterForm";
import CoursesForm from "./components/CoursesForm";

function App() {
  return (
    <div className="App">
      {/* <CampusForm /> */}
      {/* <DepartmentForm/> */}
      {/* <ProgramBatch/> */}
      {/* <UserForm/> */}
      {/* <SchoolForm/> */}
      {/* <ProgramForm/> */}
      {/* <SemesterForm/> */}
      <CoursesForm/>
    </div>
  );
}

export default App;
