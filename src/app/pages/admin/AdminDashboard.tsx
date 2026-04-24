import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Package, BarChart3, ShoppingCart, Home, LogOut } from 'lucide-react';

export function AdminDashboard() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Analytics', icon: BarChart3 },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/inventory', label: 'Inventory', icon: LayoutDashboard },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <h1 className="text-xl font-semibold">Beauty Co Admin</h1>
          <p className="text-sm text-neutral-500 mt-1">Dashboard</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-neutral-200 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Store</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
