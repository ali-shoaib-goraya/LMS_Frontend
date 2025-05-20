import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
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
import Courses from './pages/adminPages/timetable'; 
import Users from './pages/adminPages/Users';
import Acadmia from './pages/adminPages/Acadmia'; 
import Settings from './pages/adminPages/Settings';
import StudentsTable from './pages/admin/tables/StudentsTable';
import FacultyTable from './pages/admin/tables/FacultyTable';
import CourseSections from './pages/admin/tables/CourseSections';
import ProgramTable from './pages/admin/tables/programsTable';
import DepartmentTable from './pages/admin/tables/DepartmentsTable';
import ProgramBatchesTable from './pages/admin/tables/ProgramBatchesTable';
import CampusTable from './pages/admin/tables/CampusTable';
import SemesterTable from './pages/admin/tables/SemesterTable';
import SchoolTable from './pages/admin/tables/SchoolTable';
import CoursesTable from './pages/admin/tables/CoursesTable';
import AdminCourseDetails from './pages/AdminCourseDetail';
import TeachersOperations from './pages/faculty/TeachersOperations';
import TeachersReports from './pages/faculty/TeachersReports';
import TeachersSettings from './pages/faculty/TeachersSettings';
import TeacherDashboard from './pages/faculty/TeacherDashboard';
import TeacherCourseDetails from './pages/faculty/TeacherCourseDetails';
import UserManagement from './pages/adminPages/UserManagement';
import GenerateTimeTable from './pages/adminPages/timetable';
import ProtectedRoute from './auth/ProtectedRoute';
import BatchSectionTable from './pages/admin/tables/BatchSectionTable';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />

          {/* Teacher Routes */}
          <Route path="/teacher" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}>
            <Route path="coursedetail" element={<TeacherCourseDetails />} />
            <Route path="operations" element={<TeachersOperations />} />
            <Route path="reports" element={<TeachersReports />} />
            <Route path="settings" element={<TeachersSettings />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>}>
            <Route path="coursedetail" element={<CourseDetails />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="timetable" element={<TimeTable />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="obe" element={<OBEPage />} />
            <Route path="misc" element={<MiscPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/dashboard" element={<AdminDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="coursedetail" element={<AdminCourseDetails />} />
            <Route path="roles-permissions/*" element={<RolesAndPermissions />} />
            <Route path="courses" element={<Courses />} />
            <Route path="users" element={<Users />} />
            <Route path="timetable" element={<GenerateTimeTable />} />
            <Route path="academic" element={<Acadmia />} />
            <Route path="settings" element={<Settings />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="users/students" element={<StudentsTable />} />
            <Route path="users/faculty" element={<FacultyTable />} />
            <Route path="academic/course-section" element={<CourseSections />} />
            <Route path="academic/program" element={<ProgramTable />} />
            <Route path="academic/department" element={<DepartmentTable />} />
            <Route path="academic/program-batch" element={<ProgramBatchesTable />} />
            <Route path="academic/batchsections" element={<BatchSectionTable />} />
            <Route path="academic/campus" element={<CampusTable />} />
            <Route path="academic/semester" element={<SemesterTable />} />
            <Route path="academic/school" element={<SchoolTable />} />
            <Route path="academic/courses" element={<CoursesTable />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

