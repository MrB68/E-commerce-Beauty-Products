import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';

export function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light mb-2">Products</h1>
          <p className="text-neutral-500">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-full outline-none focus:border-neutral-400 transition-colors"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Product</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Category</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Price</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Stock</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-neutral-600">Sales</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-neutral-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {filteredProducts.map((product) => (
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
                <td className="px-6 py-4 font-medium">${product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    product.stock > 50
                      ? 'bg-green-50 text-green-700'
                      : product.stock > 20
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{product.sales}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setEditingProduct(product.id)}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light">Add New Product</h2>
              <button
                onClick={() => setIsAddingProduct(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g., Radiant Glow Serum"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors">
                    <option>Skincare</option>
                    <option>Makeup</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Stock Quantity</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Product description..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 px-6 py-3 border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
