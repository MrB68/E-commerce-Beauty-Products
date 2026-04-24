import { Link } from "react-router-dom";
import { ShoppingCart, Search, Sparkles, ArrowRight, Star, Heart, Truck, Shield, Leaf, Award, Users, TrendingUp, Gift, Zap, User } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useState } from 'react';


export function StoreFront() {
  const { addToCart, totalItems } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const skincare = products.filter(p => p.category === 'Skincare');
  const makeup = products.filter(p => p.category === 'Makeup');
  const accessories = products.filter(p => p.category === 'Accessories');
  const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 4);
  const newArrivals = products.slice(-3);

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <div
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-neutral-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {hoveredProduct === product.id && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                Quick View
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs text-neutral-500 uppercase tracking-wider">{product.category}</span>
          <h3 className="font-medium mt-1 mb-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-neutral-500 ml-1">(4.9)</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-medium">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="px-5 py-2.5 bg-black text-white text-sm rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-black text-white py-2 text-center text-sm">
        <div className="flex items-center justify-center gap-2">
          <Gift className="w-4 h-4" />
          <span>Free shipping on orders over $50 • Limited time offer</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-xl font-semibold">Beauty Co</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#bestsellers" className="text-sm hover:opacity-60 transition-opacity">Best Sellers</a>
              <a href="#skincare" className="text-sm hover:opacity-60 transition-opacity">Skincare</a>
              <a href="#makeup" className="text-sm hover:opacity-60 transition-opacity">Makeup</a>
              <a href="#accessories" className="text-sm hover:opacity-60 transition-opacity">Accessories</a>
            </nav>

            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full">
                <Search className="w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm w-48"
                />
              </div>

              <button className="hidden md:block">
                <Heart className="w-5 h-5 hover:fill-red-500 hover:text-red-500 transition-all" />
              </button>

              <Link to="/account">
                <User className="w-5 h-5 hover:opacity-70 transition" />
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-neutral-200">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-medium">New Spring Collection 2026</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-light mb-6 tracking-tight leading-tight">
                Radiance
                <br />
                <span className="italic bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Redefined</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-lg leading-relaxed">
                Discover premium beauty essentials crafted with the finest natural ingredients for your unique glow
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#bestsellers"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#skincare"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-300 rounded-full hover:bg-neutral-50 transition-all hover:scale-105 active:scale-95"
                >
                  Explore Collection
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-12">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Shield className="w-5 h-5" />
                  <span>Dermatologist Tested</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Leaf className="w-5 h-5" />
                  <span>100% Cruelty-Free</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"
                      alt="Beauty Product"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80"
                      alt="Beauty Product"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80"
                      alt="Beauty Product"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80"
                      alt="Beauty Product"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50K+', label: 'Happy Customers' },
              { icon: Award, value: '100%', label: 'Natural Ingredients' },
              { icon: TrendingUp, value: '4.9/5', label: 'Customer Rating' },
              { icon: Truck, value: 'Free', label: 'Shipping Over $50' }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-neutral-600" />
                  <p className="text-3xl font-light mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="bestsellers" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-light mb-3">Best Sellers</h2>
              <p className="text-neutral-600">Customer favorites that everyone loves</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">Top Rated</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {bestSellers.map(product => (
              <div key={product.id} className="relative">
                <div className="absolute -top-3 -right-3 z-10 bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  {product.sales}+ sold
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium mb-4">
              Just Launched
            </span>
            <h2 className="text-4xl font-light mb-4">New Arrivals</h2>
            <p className="text-neutral-600">Fresh additions to our collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Skincare Category */}
      <section id="skincare" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-green-50 rounded-full text-sm font-medium mb-6">
                Skincare Collection
              </div>
              <h2 className="text-4xl sm:text-5xl font-light mb-6">
                Nourish Your Natural Beauty
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our carefully curated skincare collection features premium serums, creams, and treatments formulated with powerful natural ingredients to reveal your healthiest, most radiant skin.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Vitamin C for brightness', icon: Sparkles },
                  { label: 'Hyaluronic Acid for hydration', icon: Sparkles },
                  { label: 'Natural botanical extracts', icon: Leaf }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-green-600" />
                      <span className="text-neutral-700">{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <a href="#skincare" className="inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline">
                Shop Skincare <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
                alt="Skincare"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skincare.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Makeup Category */}
      <section id="makeup" className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=800&q=80"
                alt="Makeup"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-sm font-medium mb-6">
                Makeup Collection
              </div>
              <h2 className="text-4xl sm:text-5xl font-light mb-6">
                Express Your True Colors
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our vibrant makeup collection features long-lasting, high-performance products designed to enhance your natural beauty while caring for your skin.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['Long-lasting', 'Cruelty-free', 'Vegan', 'Waterproof', 'Smudge-proof', 'SPF 30'].map((tag, i) => (
                  <span key={i} className="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-sm text-center border border-pink-200">
                    {tag}
                  </span>
                ))}
              </div>
              <a href="#makeup" className="inline-flex items-center gap-2 text-sm font-medium underline hover:no-underline">
                Shop Makeup <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {makeup.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Category */}
      <section id="accessories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-amber-50 rounded-full text-sm font-medium mb-6">
              Beauty Accessories
            </div>
            <h2 className="text-4xl sm:text-5xl font-light mb-6">
              Essential Tools for Your Routine
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Elevate your beauty ritual with our curated selection of premium tools and accessories designed for professional results at home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-light mb-4">Loved by Thousands</h2>
            <p className="text-neutral-600">Real reviews from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                review: 'The Radiant Glow Serum has completely transformed my skin! I can see visible results in just two weeks.',
                rating: 5,
                product: 'Radiant Glow Serum'
              },
              {
                name: 'Emily R.',
                review: 'Best lipstick I\'ve ever used. The velvet matte finish lasts all day and feels so comfortable.',
                rating: 5,
                product: 'Velvet Matte Lipstick'
              },
              {
                name: 'Jessica L.',
                review: 'The jade roller set is a game-changer for my morning routine. My skin looks so much more refreshed!',
                rating: 5,
                product: 'Jade Roller Set'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 leading-relaxed">"{testimonial.review}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-neutral-500">Purchased {testimonial.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              {
                icon: Leaf,
                title: '100% Natural',
                description: 'Premium botanical ingredients sourced sustainably'
              },
              {
                icon: Shield,
                title: 'Dermatologist Tested',
                description: 'Safe for all skin types, clinically proven'
              },
              {
                icon: Heart,
                title: 'Cruelty-Free',
                description: 'Never tested on animals, certified vegan options'
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'On orders over $50 with fast delivery'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium mb-2">{value.title}</h3>
                  <p className="text-sm text-neutral-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-gradient-to-br from-black to-neutral-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-light mb-6">
            Join the Beauty Co Community
          </h2>
          <p className="text-lg text-neutral-300 mb-10">
            Subscribe to get exclusive offers, beauty tips, and early access to new products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white text-black rounded-full outline-none"
            />
            <button className="px-8 py-4 bg-white text-black rounded-full hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-neutral-400">Join 50,000+ beauty enthusiasts</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="text-xl font-semibold">Beauty Co</span>
              </Link>
              <p className="text-sm text-neutral-600 mb-6 max-w-xs">
                Premium beauty essentials crafted with the finest natural ingredients for your unique glow.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'TikTok', 'Pinterest'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Shop</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li><a href="#bestsellers" className="hover:text-black transition-colors">Best Sellers</a></li>
                <li><a href="#skincare" className="hover:text-black transition-colors">Skincare</a></li>
                <li><a href="#makeup" className="hover:text-black transition-colors">Makeup</a></li>
                <li><a href="#accessories" className="hover:text-black transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Ingredients</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-neutral-600">
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© 2026 Beauty Co. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <Link to="/admin" className="hover:text-black transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
