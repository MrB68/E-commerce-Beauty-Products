import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, Users } from 'lucide-react';
import { salesData, products, orders } from '../../data/mockData';

export function AdminAnalytics() {
  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const avgOrderValue = totalRevenue / totalOrders;

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Products',
      value: totalProducts.toString(),
      change: '+2 new',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Avg Order Value',
      value: `$${avgOrderValue.toFixed(0)}`,
      change: '+4.3%',
      icon: Users,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Analytics Overview</h1>
        <p className="text-neutral-500">Track your business performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-6 mb-8">
        <h2 className="text-xl mb-6">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" key="grid" />
            <XAxis dataKey="month" stroke="#999" key="x-axis" />
            <YAxis stroke="#999" key="y-axis" />
            <Tooltip
              key="tooltip"
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px'
              }}
            />
            <Line
              key="revenue-line"
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={2}
              dot={{ fill: '#000', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6">
        <h2 className="text-xl mb-6">Top Selling Products</h2>
        <div className="space-y-4">
          {products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5)
            .map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <span className="text-2xl font-light text-neutral-300 w-8">
                  {index + 1}
                </span>
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-neutral-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.sales} sales</p>
                  <p className="text-sm text-neutral-500">${product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
