import { Link, useLocation } from 'react-router-dom';
import UserIcon from '@/assets/user.png'; 
import ShieldCheckIcon from '@/assets/shieldcheck.jpeg';
import LockClosedIcon from '@/assets/lockclosed.jpeg';

const tabs = [
  { name: 'Users', path: 'users', icon: UserIcon },
  { name: 'Roles', path: 'roles', icon: ShieldCheckIcon },
  { name: 'Permissions', path: 'permissions', icon: LockClosedIcon },
];

function TabNavigation() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            to={tab.path}
            className={`${
              currentPath === tab.path
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <img src={tab.icon} alt={`${tab.name} icon`} className="h-5 w-5 mr-2" />
            {tab.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default TabNavigation;
