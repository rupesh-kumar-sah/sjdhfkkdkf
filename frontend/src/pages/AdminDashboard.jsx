import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  FolderOpen, 
  FileText, 
  Users, 
  Palette,
  Home,
  LogOut,
  Mountain,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { adminStats } from '../data/mockData';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Dashboard');

  // Redirect if not owner
  React.useEffect(() => {
    if (!user || !user.isOwner) {
      navigate('/');
    }
  }, [user, navigate]);

  const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Products', icon: Package, active: false },
    { name: 'Orders', icon: ShoppingCart, active: false },
    { name: 'Messages', icon: MessageSquare, active: false },
    { name: 'Categories', icon: FolderOpen, active: false },
    { name: 'Pages', icon: FileText, active: false },
    { name: 'Customers', icon: Users, active: true },
    { name: 'Theme', icon: Palette, active: false }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `${adminStats.currency} ${adminStats.totalRevenue.toFixed(2)}`,
      description: 'From all confirmed orders.',
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: `+${adminStats.totalOrders}`,
      description: 'Total orders placed.',
      icon: ShoppingCart
    },
    {
      title: 'Total Customers',
      value: `+${adminStats.totalCustomers}`,
      description: 'Total registered users.',
      icon: Users
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-green-500">Nepal eMart</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                  activeSection === item.name
                    ? 'bg-slate-700 border-l-4 border-green-500'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="text-sm">
                  {item.active ? '☑' : '☐'}
                </span>
                <IconComponent className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's an overview of your store.</p>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-semibold text-gray-900">{user?.name}</div>
                <div className="text-sm text-gray-600">{user?.email}</div>
              </div>
              
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Storefront
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                      {stat.title}
                    </h3>
                    <IconComponent className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              );
            })}
          </div>

          {/* Section Content */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">{activeSection}</h2>
            
            {activeSection === 'Dashboard' && (
              <div className="text-gray-600">
                <p>Welcome to your Nepal eMart admin dashboard. Here you can manage all aspects of your store.</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Quick Actions</h4>
                    <ul className="mt-2 text-sm text-green-700">
                      <li>• Add new products</li>
                      <li>• Process orders</li>
                      <li>• View customer messages</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Recent Activity</h4>
                    <ul className="mt-2 text-sm text-blue-700">
                      <li>• 5 new orders today</li>
                      <li>• 2 customer reviews</li>
                      <li>• 1 new customer signup</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'Products' && (
              <div>
                <p className="text-gray-600 mb-4">Manage your product catalog here.</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  Add New Product
                </button>
              </div>
            )}
            
            {activeSection === 'Orders' && (
              <div>
                <p className="text-gray-600 mb-4">View and manage customer orders.</p>
                <div className="text-sm text-gray-500">
                  Recent orders will appear here...
                </div>
              </div>
            )}
            
            {activeSection === 'Customers' && (
              <div>
                <p className="text-gray-600 mb-4">Manage customer accounts and information.</p>
                <div className="text-sm text-gray-500">
                  Customer list and details will appear here...
                </div>
              </div>
            )}
            
            {/* Add more sections as needed */}
            {!['Dashboard', 'Products', 'Orders', 'Customers'].includes(activeSection) && (
              <div>
                <p className="text-gray-600">
                  {activeSection} management panel - Coming soon!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;