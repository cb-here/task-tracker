import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Menu, X, Code, MessageCircle, Lightbulb, Route } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-2xl font-bold">
              Pathik
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
            <NavLink
                to="/path"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <span title='Path'><Route className="h-5 w-5"/></span>
              </NavLink>
              <NavLink
                to="/reccomendation"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <span title='Reccomendation'><Lightbulb className="h-5 w-5" /></span>
              </NavLink>
              <NavLink
                to="/coding"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <span title='Coding'><Code className='h-6 w-6'/></span>
              </NavLink>
              <NavLink
                to="/discuss"
                className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <span title='Forum'><MessageCircle className='h-6 w-6'/></span>
              </NavLink>
              {token && (
                <NavLink
                  to="/profile"
                  className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <User className="h-7 w-7" />
                </NavLink>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 p-2 rounded-md transition duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/reccomendation"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={toggleMenu}
            >
              <Lightbulb className="h-5 w-5 inline-block" /> Reccomendation
            </NavLink>
            <NavLink
              to="/coding"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={toggleMenu}
            >
              <Code className="h-5 w-5 inline-block"/> Code
            </NavLink>
            <NavLink
              to="/forum"
              className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
              onClick={toggleMenu}
            >
              <MessageCircle className="h-5 w-5 inline-block" /> Forum
            </NavLink>
            {token && (
              <NavLink
                to="/profile"
                className="text-white block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                onClick={toggleMenu}
              >
                <User className="h-5 w-5 inline-block" /> Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;