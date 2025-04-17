import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './layouts/AdminDashboard';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import RolesAndPermissions from './pages/RolesAndPermissions';
import DashboardHome from './pages/DashboardHome';
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import CourseDetails from './pages/student/CourseDetails';
import TimeTable from './pages/student/TimeTablePage';
import AttendancePage from './pages/student/AttendancePage';
import OBEPage from './pages/student/OBEPage';
import MiscPage from './pages/student/MiscPage';
import Courses from './pages/adminPages/Courses'; 
import Users from './pages/adminPages/Users';
import Acadmia from './pages/adminPages/Acadmia'; 
import Reports from './pages/adminPages/Reports';
import Settings from './pages/adminPages/Settings';
import Grades from './pages/adminPages/Grades';
import React from 'react';
import CampusForm from './pages/admin/Forms/CampusForm';
import DepartmentForm from './pages/admin/Forms/DepartmentForm';
import ProgramBatchForm from './pages/admin/Forms/ProgramBatchForm';
import UserForm from './pages/admin/Forms/UsersForm';
import SchoolForm from './pages/admin/Forms/SchoolForm';
import ProgramForm from './pages/admin/Forms/ProgramForm';
import SemesterForm from './pages/admin/Forms/SemesterForm';
import CoursesForm from './pages/admin/Forms/CoursesSectionForm';
import StudentsTable from './pages/admin/tables/StudentsTable';
import FacultyTable from './pages/admin/tables/FacultyTable';
// import AttendanceTable from './pages/admin/tables/AttendanceTable';
import CourseSections from './pages/admin/tables/CourseSections';
import ProgramTable from './pages/admin/tables/programsTable';
import DepartmentTable from './pages/admin/tables/DepartmentsTable';
import ProgramBatchesTable from './pages/admin/tables/ProgramBatchesTable';
import CampusTable from './pages/admin/tables/CampusTable';
import SemesterTable from './pages/admin/tables/SemesterTable';
import SchoolTable from './pages/admin/tables/SchoolTable';
import CoursesTable from './pages/admin/tables/CoursesTable';
// import AddClassActivity from './pages/admin/Forms/ActivityForm';

import TeacherDashboard from './pages/faculty/TeacherDashboard';
import TeacherCourseDetails from './pages/faculty/TeacherCourseDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} >
        <Route path="/teacher/coursedetail" element={<TeacherCourseDetails />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />}>
        <Route path="/student/coursedetail" element={<CourseDetails />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="timetable" element={<TimeTable />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="obe" element={<OBEPage />} />
          <Route path="misc" element={<MiscPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="roles-permissions/*" element={<RolesAndPermissions />} />
          <Route path="courses" element={<Courses />} />
          <Route path="users" element={<Users />} />
          <Route path="academic" element={<Acadmia />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="grades" element={<Grades />} />

          {/* Users Management Sub-Routes */}
          <Route path="users/campus" element={<CampusForm />} />
          <Route path="users/department" element={<DepartmentForm />} />
          <Route path="users/program-batch" element={<ProgramBatchForm />} />
          <Route path="users/user" element={<UserForm />} />
          <Route path="users/school" element={<SchoolForm />} />
          <Route path="users/program" element={<ProgramForm />} />
          <Route path="users/semester" element={<SemesterForm />} />
          <Route path="users/course-section" element={<CoursesForm />} />

          {/* Academic Structure Sub-Routes */}
          <Route path="academic/students" element={<StudentsTable />} />
          <Route path="academic/faculty" element={<FacultyTable />} />
          <Route path="academic/course-section" element={<CourseSections />} />
          <Route path="academic/program" element={<ProgramTable />} />
          <Route path="academic/department" element={<DepartmentTable />} />
          <Route path="academic/program-batch" element={<ProgramBatchesTable />} />
          <Route path="academic/campus" element={<CampusTable />} />
          <Route path="academic/semester" element={<SemesterTable />} />
          <Route path="academic/school" element={<SchoolTable />} />
          <Route path="academic/courses" element={<CoursesTable />} />


          {/* <Route path="academic/students/activities" element={<AddClassActivity />} /> */}
          {/* <Route path="academic/students/attendance" element={<AttendanceTable />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
