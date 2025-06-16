import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/student/Footer';

function AdminDashboard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const accreditations = [
    'Washington Accord',
    'ABET',
    'Seoul Accord',
    'Sydney Accord',
    'Dublin Accord',
    'AACSB',
    'ACBSP'
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuClick={toggleSidebar} />

      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Sidebar */}
        {isSidebarVisible && (
          <div className="">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarVisible ? 'ml-36' : 'ml-0'
          }`}
        >
          <div className="p-6">
            <Outlet />
          </div>
                                {/* Footer */}
                                <div className={`${isSidebarVisible ? 'pl-10' : ''}`}>
    <Footer accreditations={accreditations} />
</div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
