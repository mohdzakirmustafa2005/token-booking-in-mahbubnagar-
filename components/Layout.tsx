
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hospital as HospitalIcon, Calendar, User, Search, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: HospitalIcon },
    { name: 'Hospitals', path: '/hospitals', icon: Search },
    { name: 'My Bookings', path: '/profile', icon: Calendar },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <HospitalIcon className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-blue-900 tracking-tight hidden sm:block">
                MBNR <span className="text-blue-600">Health</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isActive(link.path) ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
            <Link to="/auth" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
              Login
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button className="text-slate-600">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
                isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <Link
            to="/auth"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-xl font-semibold mt-4"
          >
            Login / Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center space-x-2 mb-4 text-white">
          <HospitalIcon className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold tracking-tight">MBNR Health</span>
        </div>
        <p className="max-w-xs text-slate-400">
          The leading healthcare token booking platform in Mahbubnagar. Bridging the gap between patients and quality medical care.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link to="/hospitals" className="hover:text-blue-400 transition-colors">Search Hospitals</Link></li>
          <li><Link to="/profile" className="hover:text-blue-400 transition-colors">My Bookings</Link></li>
          <li><Link to="/auth" className="hover:text-blue-400 transition-colors">Emergency Services</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Support</h4>
        <ul className="space-y-2">
          <li><span className="text-slate-400">Email: support@mbnrhealth.com</span></li>
          <li><span className="text-slate-400">Phone: +91 8542 220000</span></li>
          <li><span className="text-slate-400">Mahbubnagar, TS, India</span></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} MBNR Health Token System. All rights reserved.</p>
    </div>
  </footer>
);
