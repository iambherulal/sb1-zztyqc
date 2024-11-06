import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductGrid } from '../components/ProductGrid';
import { ShoppingBag } from 'lucide-react';

export const Wishlist = () => {
  const { state } = useWishlist();

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-4 text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="mt-2 text-gray-600">Browse our products and add items you love</p>
        <Link
          to="/shop"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-8">My Wishlist</h1>
      <ProductGrid products={state.items} columns={4} />
    </div>
  );
};