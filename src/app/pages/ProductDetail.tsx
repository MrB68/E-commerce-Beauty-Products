import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { addToCart, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Product not found</p>
          <Link to="/" className="text-sm underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-sm text-neutral-500 uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-light mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-3xl">${product.price}</p>
            </div>

            <p className="text-neutral-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Info */}
            <div className="flex items-center gap-2 mb-8 text-sm">
              <Package className="w-4 h-4 text-green-600" />
              <span className={product.stock > 20 ? 'text-green-600' : 'text-amber-600'}>
                {product.stock > 20 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-black text-white rounded-full hover:bg-neutral-800 transition-colors text-lg"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Features */}
            <div className="mt-12 pt-12 border-t border-neutral-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                <p className="text-sm text-neutral-600">Premium quality ingredients</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                <p className="text-sm text-neutral-600">Cruelty-free and vegan</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-black mt-2"></div>
                <p className="text-sm text-neutral-600">Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
