import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { products } from '../data/products';
import { Product } from '../types';

export const Category = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    let result = products.filter(p => 
      p.category.toLowerCase() === category?.toLowerCase()
    );

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
  }, [category, sortBy]);

  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="text-2xl font-semibold capitalize">{category}</h1>
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

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} columns={4} />
      )}
    </div>
  );
};