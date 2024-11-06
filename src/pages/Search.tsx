import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { motion, AnimatePresence } from 'framer-motion';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');

  const query = searchParams.get('q') || '';
  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    let results = products;

    // Search filter
    if (query) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(product => selectedCategories.includes(product.category));
    }

    // Price filter
    results = results.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(results);
  }, [query, selectedCategories, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium">Filters</h3>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                {categories.map(category => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(c => c !== category));
                        }
                      }}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
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

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                value={query}
                onChange={(e) => setSearchParams({ q: e.target.value })}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-4 border rounded-lg px-4 py-2"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};