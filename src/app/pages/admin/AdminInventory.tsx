import { useState } from 'react';
import { AlertCircle, TrendingDown, TrendingUp, Package } from 'lucide-react';
import { products } from '../../data/mockData';

export function AdminInventory() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Skincare', 'Makeup'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const lowStockProducts = products.filter(p => p.stock < 50);
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const averageStock = Math.round(products.reduce((sum, p) => sum + p.stock, 0) / products.length);

  const getStockStatus = (stock: number) => {
    if (stock < 20) return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50' };
    if (stock < 50) return { label: 'Low', color: 'text-amber-600', bg: 'bg-amber-50' };
    if (stock < 100) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-50' };
    return { label: 'Excellent', color: 'text-blue-600', bg: 'bg-blue-50' };
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2">Inventory Management</h1>
        <p className="text-neutral-500">Monitor stock levels and value</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-500 mb-1">Total Inventory Value</p>
          <p className="text-3xl font-semibold">${totalValue.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-50 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-500 mb-1">Average Stock Level</p>
          <p className="text-3xl font-semibold">{averageStock}</p>
        </div>

        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-amber-50 p-3 rounded-xl">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-sm text-neutral-500 mb-1">Low Stock Items</p>
          <p className="text-3xl font-semibold">{lowStockProducts.length}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900 mb-1">Low Stock Warning</h3>
              <p className="text-sm text-amber-700">
                {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} running low on stock. Consider restocking soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-3 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === cat
                ? 'bg-black text-white'
                : 'bg-white border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Unit Price</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Total Value</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-neutral-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredProducts
              .sort((a, b) => a.stock - b.stock)
              .map((product) => {
                const status = getStockStatus(product.stock);
                return (
                  <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">{product.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.stock < 50 ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        )}
                        <span className="font-medium">{product.stock}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">${product.price}</td>
                    <td className="px-6 py-4 font-medium">
                      ${(product.price * product.stock).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-sm">
                        Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
