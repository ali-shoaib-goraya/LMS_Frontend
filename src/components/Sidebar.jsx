import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@/assets/home.png';
import UserGroupIcon from '@/assets/users.png';
import AcademicCapIcon from '@/assets/academiccap.png';
import ClipboardDocumentListIcon from '@/assets/clipboardlist.jpg';
import ChartBarIcon from '@/assets/chartbar.png';
import DocumentCheckIcon from '@/assets/documentcheck.png';
import KeyIcon from '@/assets/key.png';
import Cog6ToothIcon from '@/assets/cog6tooth.png';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Users Management', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Roles & Permissions', href: '/dashboard/roles-permissions', icon: KeyIcon },
  { name: 'Academic Structure', href: '/dashboard/academic', icon: AcademicCapIcon },
  { name: 'Course Management', href: '/dashboard/courses', icon: ClipboardDocumentListIcon },
  { name: 'Grades', href: '/dashboard/grades', icon: DocumentCheckIcon },
  { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-48 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pt-16">
        <nav className="p-4">
          <ul role="list" className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex flex-col items-center text-center p-3 rounded-lg transition-colors duration-200 min-h-[100px] ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                  }`}
                >
                  <div className="w-10 h-10 mb-2">
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;