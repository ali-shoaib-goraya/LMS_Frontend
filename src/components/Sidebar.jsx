import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  KeyIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

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
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] mt-16 flex flex-col overflow-y-auto">
      <div className="flex flex-col gap-y-5 p-6">
        <div className="flex h-16 items-center">
          <span className="text-xl font-bold text-primary-700">Admin Panel</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                    location.pathname === item.href
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                  } transition-colors duration-200`}
                >
                  <item.icon className="h-6 w-6 shrink-0" />
                  {item.name}
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