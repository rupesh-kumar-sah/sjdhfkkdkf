import React from 'react';
import { Mountain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold text-green-500">Nepal eMart</span>
            </div>
            <p className="text-gray-300 text-sm">
              Made in Nepal – Shop Smart, Shop Local.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>rsah0123456@gmail.com</p>
            </div>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal & Policies</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Customer Support</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <a href="#" className="block hover:text-white transition-colors">
                FAQs
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Shipping & Returns
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Orders
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to get the latest deals and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 Nepal eMart. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348c0-1.297 1.051-2.348 2.348-2.348c1.297 0 2.348 1.051 2.348 2.348C10.797 15.937 9.746 16.988 8.449 16.988z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">TikTok</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.326-1.963-1.349-3.145h-2.85v13.894c0 2.726-2.206 4.932-4.932 4.932s-4.932-2.206-4.932-4.932 2.206-4.932 4.932-4.932c.338 0 .671.034.992.101v-2.936a7.932 7.932 0 0 0-.992-.065c-4.378 0-7.932 3.554-7.932 7.932s3.554 7.932 7.932 7.932 7.932-3.554 7.932-7.932V8.695a9.159 9.159 0 0 0 5.204 1.615v-2.993a6.185 6.185 0 0 1-2.425-.755z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;