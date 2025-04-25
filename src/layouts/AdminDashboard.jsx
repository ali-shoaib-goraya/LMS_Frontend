import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../components/faculty/TeacherNavbar';
import Sidebar from '../components/Sidebar';

function AdminDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <TeacherNavbar onMenuClick={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex pt-20">
        {/* Sidebar */}
        {isSidebarVisible && (
          <div className="fixed top-20 left-0 h-full w-64 bg-white shadow-md z-10">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarVisible ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
