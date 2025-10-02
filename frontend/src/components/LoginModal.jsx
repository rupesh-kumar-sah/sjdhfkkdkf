import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ownerCredentials } from '../data/mockData';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ownerPin, setOwnerPin] = useState('');
  const [showOwnerVerification, setShowOwnerVerification] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check if owner credentials
    if (email === ownerCredentials.email && password === ownerCredentials.password) {
      setShowOwnerVerification(true);
      return;
    }

    // Regular user login
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0],
        isOwner: false
      };
      login(userData);
      onClose();
      resetForm();
    } else {
      setError('Please enter valid credentials');
    }
  };

  const handleOwnerVerification = () => {
    if (ownerPin === ownerCredentials.pin) {
      const userData = {
        email: ownerCredentials.email,
        name: ownerCredentials.name,
        isOwner: true
      };
      login(userData);
      onClose();
      resetForm();
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setOwnerPin('');
    setShowOwnerVerification(false);
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {!showOwnerVerification ? (
          <>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Log in to your Nepal E-Mart account</p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Google Sign In */}
            <button className="w-full mb-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <a href="#" className="block text-right text-sm text-green-600 hover:text-green-800 mt-1">
                  Forgot?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Log in
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-green-600 hover:text-green-800">
                Sign up
              </a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Owner Verification</h3>
            <p className="text-gray-600 mb-6">For your security, please enter your owner PIN to continue.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <input
              type="password"
              value={ownerPin}
              onChange={(e) => setOwnerPin(e.target.value)}
              placeholder="Owner PIN"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
            />

            <div className="flex space-x-3">
              <button
                onClick={() => setShowOwnerVerification(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleOwnerVerification}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;