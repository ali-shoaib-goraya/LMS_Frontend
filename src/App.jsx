import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './layouts/AdminDashboard';
import StudentLogin from './pages/StudentLogin';
import FacultyLogin from './pages/FacultyLogin';
import RolesAndPermissions from './pages/RolesAndPermissions';
import DashboardHome from './pages/DashboardHome';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>}>
          <Route index element={<DashboardHome/>} />
          <Route path="roles-permissions/*" element={<RolesAndPermissions />} />
        </Route>
        
        {/* Redirect root to login */}
        
      </Routes>
    </Router>
  );
}

export default App;