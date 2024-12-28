import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function AdminDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        {isSidebarVisible && <Sidebar />}

        {/* Main Content */}
        <main className={`flex-1 ${isSidebarVisible ? '' : ''} p-0`}>
            <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;