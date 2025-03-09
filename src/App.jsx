import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './layouts/AdminDashboard';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import RolesAndPermissions from './pages/RolesAndPermissions';
import DashboardHome from './pages/DashboardHome';
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import TimeTable from './pages/student/TimeTablePage';
import AttendancePage from './pages/student/AttendancePage';
import OBEPage from './pages/student/OBEPage';
import MiscPage from './pages/student/MiscPage';
import CampusForm from './pages/admin/Forms/CampusForm';
import DepartmentForm from './pages/admin/Forms/DepartmentForm';
import ProgramBatchForm from './pages/admin/Forms/ProgramBatchForm';
import UserForm from './pages/admin/Forms/UsersForm';
import SchoolForm from './pages/admin/Forms/SchoolForm';
import ProgramForm from './pages/admin/Forms/ProgramForm';
import SemesterForm from './pages/admin/Forms/SemesterForm';
import CoursesForm from './pages/admin/Forms/CoursesForm';
import StudentsTable from './pages/admin/tables/StudentsTable';
import FacultyTable from './pages/admin/tables/FacultyTable';
import AttendanceTable from './pages/admin/tables/AttendanceTable';
import CourseSections from './pages/admin/tables/CourseSections';
// import AddClassActivity from './pages/admin/Forms/ActivityForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />}>
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
          
          {/* Users Management Sub-Routes */}
          <Route path="users/campus" element={<CampusForm />} />
          <Route path="users/department" element={<DepartmentForm />} />
          <Route path="users/program-batch" element={<ProgramBatchForm />} />
          <Route path="users/user" element={<UserForm />} />
          <Route path="users/school" element={<SchoolForm />} />
          <Route path="users/program" element={<ProgramForm />} />
          <Route path="users/semester" element={<SemesterForm />} />
          <Route path="users/courses" element={<CoursesForm />} />
          
          {/* Academic Structure Sub-Routes */}
          <Route path="academic/students" element={<StudentsTable />} />
          <Route path="academic/faculty" element={<FacultyTable />} />
          <Route path="academic/students/attendance" element={<AttendanceTable />} />
          {/* <Route path="academic/students/activities" element={<AddClassActivity />} /> */}
          <Route path="academic/courses" element={<CourseSections />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
