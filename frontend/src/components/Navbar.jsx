import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="text-white text-2xl font-bold">
              Task Tracker
            </NavLink>
            <NavLink to="/profile">
              <User size="24" color="white" />
            </NavLink>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;