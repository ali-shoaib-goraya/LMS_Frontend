import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Paths to local images
import HomeIcon from '@/assets/home.png';
import BookOpenIcon from '@/assets/book.png';
import CalendarIcon from '@/assets/calender.png';
import ClipboardListIcon from '@/assets/clipboardlist.png';
import FolderIcon from '@/assets/folder.png';
import FoldersIcon from '@/assets/folders.png';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/student', icon: HomeIcon, label: 'Home' },
    { path: '/student/courses', icon: BookOpenIcon, label: 'My Courses' },
    { path: '/student/timetable', icon: CalendarIcon, label: 'Time Table' },
    { path: '/student/attendance', icon: ClipboardListIcon, label: 'Attendance' },
    { path: '/student/obe', icon: FolderIcon, label: 'OBE' },
    { path: '/student/misc', icon: FoldersIcon, label: 'Misc' },
  ];

  const isActive = (path) => {
    if (path === '/student' && location.pathname === '/student') {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pt-16">
        <div className="flex flex-col space-y-4 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-center p-2 rounded-lg transition-colors duration-200 min-h-[100px] ${
                isActive(item.path)
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="w-12 h-12 mb-2">
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;