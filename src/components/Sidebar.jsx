import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@/assets/home.png';
import UserGroupIcon from '@/assets/users.png';
import AcademicCapIcon from '@/assets/academiccap.png';
import ClipboardDocumentListIcon from '@/assets/clipboardlist.png';
import ChartBarIcon from '@/assets/chartbar.png';
import DocumentCheckIcon from '@/assets/documentcheck.png';
import KeyIcon from '@/assets/key.png';
import Cog6ToothIcon from '@/assets/cog6tooth.png';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Users Management',
    icon: UserGroupIcon,  },
  { name: 'Roles & Permissions', href: '/dashboard/roles-permissions', icon: KeyIcon },
  { name: 'Academic Structure', icon: AcademicCapIcon, 
    panel: [
      { name: 'Manage Campus', href: '/dashboard/academic/campus' },
      { name: 'Manage School', href: '/dashboard/academic/school' },
      { name: 'Manage Program', href: '/dashboard/academic/program' },
      { name: 'Manage Program Batch ', href: '/dashboard/academic/program-batch' },
      { name: 'Manage Department', href: '/dashboard/academic/department' },
      { name: 'Manage Semester', href: '/dashboard/academic/semester' },
      { name: 'Manage Course Sections', href: '/dashboard/academic/course-section' },
      { name: 'Manage Faculty ', href: '/dashboard/academic/faculty' },
      { name: 'Manage Students', href: '/dashboard/academic/students' },
      { name: 'Manage Courses', href: '/dashboard/academic/courses' },
    ],

  },
  { name: 'Course Management', href: '/dashboard/courses', icon: ClipboardDocumentListIcon },
  { name: 'Grades', href: '/dashboard/grades', icon: DocumentCheckIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

function Sidebar() {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState(null);
  const [isSubSidebarHovered, setIsSubSidebarHovered] = useState(false);

  const handleMouseEnter = (item) => {
    if (item.panel) {
      setActivePanel(item.name);
    }
  };

  const handleMouseLeave = () => {
    if (!isSubSidebarHovered) {
      setActivePanel(null);
    }
  };

  const handleSubSidebarEnter = () => {
    setIsSubSidebarHovered(true);
  };

  const handleSubSidebarLeave = () => {
    setIsSubSidebarHovered(false);
    setActivePanel(null);
  };

  const handleSubItemClick = () => {
    setActivePanel(null); // Close sub-sidebar on link click
  };

  return (
    <div className="flex pt-20">
      {/* Main Sidebar */}
      <div
        className="w-48 bg-white border-r border-gray-200 h-[calc(100vh-80px)] fixed top-20 flex flex-col z-10"
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex-1 overflow-y-auto pt-4">
          <nav className="p-4">
            <ul className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <div
                    onMouseEnter={() => handleMouseEnter(item)}
                    className="relative"
                  >
                    {item.panel ? (
                      <button
                        className={`flex flex-col items-center text-center p-3 rounded-lg transition-colors min-h-[100px] w-full ${
                          activePanel === item.name
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        <div className="w-10 h-10 mb-2">
                          <img src={item.icon} alt={`${item.name} icon`} />
                        </div>
                        <span className="text-sm font-semibold">{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={`flex flex-col items-center text-center p-3 rounded-lg transition-colors min-h-[100px] ${
                          location.pathname === item.href
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                        }`}
                      >
                        <div className="w-10 h-10 mb-2">
                          <img src={item.icon} alt={`${item.name} icon`} />
                        </div>
                        <span className="text-sm font-semibold">{item.name}</span>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Dynamic Sub-Sidebar */}
      {activePanel && (
        <div
          className="w-64 bg-white border-l border-gray-200 h-[calc(100vh-80px)] fixed top-20 left-48 z-20"
          onMouseEnter={handleSubSidebarEnter}
          onMouseLeave={handleSubSidebarLeave}
        >
          <div className="p-4">
            <ul className="space-y-2">
              {navigation
                .find((item) => item.name === activePanel)
                ?.panel.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.href}
                      onClick={handleSubItemClick} // Close sub-sidebar on link click
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === subItem.href
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
