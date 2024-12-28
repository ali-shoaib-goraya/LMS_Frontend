import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

function Navbar({ onMenuClick }) {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="LMS Logo" className="h-8 w-auto" />
            <h1 className="ml-4 text-xl font-bold text-primary-700">LMS</h1>
          </div>
          <button
            type="button"
            className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={onMenuClick}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <button className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
