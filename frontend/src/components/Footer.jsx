import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavLink to="https://cbhere.vercel.app/" target="_blank" className="font-bold">About Me</NavLink>
      </div>
    </footer>
  );
};

export default Footer;