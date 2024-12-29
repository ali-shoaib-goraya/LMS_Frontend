// App.js
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;