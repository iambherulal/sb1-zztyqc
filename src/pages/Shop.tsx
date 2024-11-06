import React, { useState, useEffect } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';

export const Shop = () => {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    let result = products;

    // Category filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setFilteredProducts(result);
  }, [category, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Shop All Products</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-3 py-1"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                {categories.map(cat => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      className="text-blue-600"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>

              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} columns={3} />
        </div>
      </div>
    </div>
  );
};