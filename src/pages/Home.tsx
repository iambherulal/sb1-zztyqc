import React from 'react';
import { ArrowRight, Star, Truck, Shield, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white space-y-6">
            <h1 className="text-5xl font-bold">Minimal. Modern. You.</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our curated collection of minimal design essentials
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Home', 'Accessories', 'Clothing'].map((category) => (
            <Link
              key={category}
              to={`/shop?category=${category}`}
              className="relative h-64 group overflow-hidden rounded-lg"
            >
              <img
                src={`https://images.unsplash.com/photo-${
                  category === 'Home'
                    ? '1449247709967-25e2b247e718'
                    : category === 'Accessories'
                    ? '1523170335258-f5ed11844a49'
                    : '1441984904996-e0b6ba687e04'
                }?auto=format&fit=crop&q=80&w=800`}
                alt={category}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link to="/shop" className="text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <Truck className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="space-y-4">
              <Shield className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment</p>
            </div>
            <div className="space-y-4">
              <Clock className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">24/7 Support</h3>
              <p className="text-gray-600">Dedicated support</p>
            </div>
            <div className="space-y-4">
              <Heart className="h-8 w-8 mx-auto text-blue-600" />
              <h3 className="text-lg font-semibold">Money Back</h3>
              <p className="text-gray-600">30 days guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-2xl py-16 px-8 md:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-gray-300 mb-8">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};