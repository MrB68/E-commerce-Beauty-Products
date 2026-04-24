import { useState } from 'react';
import { Search, ChevronDown, Clock, Package, Truck, CheckCircle } from 'lucide-react';
import { orders as initialOrders, products } from '../../data/mockData';

export function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = ['All', 'pending', 'processing', 'shipped', 'delivered'];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700';
      case 'processing': return 'bg-blue-50 text-blue-700';
      case 'shipped': return 'bg-purple-50 text-purple-700';
      case 'delivered': return 'bg-green-50 text-green-700';
      default: return 'bg-neutral-50 text-neutral-700';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: typeof orders[0]['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Orders</h1>
        <p className="text-neutral-500">Manage customer orders and fulfillment</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: orders.length, icon: Package },
          { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, icon: Clock },
          { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, icon: Package },
          { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-neutral-100 p-3 rounded-xl">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-full outline-none focus:border-neutral-400 transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-black text-white'
                  : 'bg-white border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {status === 'All' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-lg">{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-600">
                  <span>{order.customer}</span>
                  <span>•</span>
                  <span>{new Date(order.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-semibold mb-2">${order.total}</p>
                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className="appearance-none px-4 py-2 pr-8 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-sm cursor-pointer outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-neutral-200 pt-4 space-y-3">
              {order.items.map((item, index) => {
                const product = products.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
            <p className="text-neutral-600">No orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
