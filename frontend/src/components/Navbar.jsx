import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Mountain } from 'lucide-react';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ cartCount = 0 }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'All Products', path: '/', category: 'all' },
    { name: 'Clothing', path: '/category/clothing', category: 'Clothing' },
    { name: 'Shoes', path: '/category/shoes', category: 'Shoes' },
    { name: 'Accessories', path: '/category/accessories', category: 'Accessories' }
  ];

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-600">Nepal eMart</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                    location.pathname === link.path ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                    {user.isOwner && (
                      <Link
                        to="/admin"
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleAuthAction}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Cart */}
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;