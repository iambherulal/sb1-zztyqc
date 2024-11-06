import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const quickResults = products
    .filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(!!e.target.value);
          }}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>

      <AnimatePresence>
        {isOpen && query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border"
          >
            {quickResults.length > 0 ? (
              <ul>
                {quickResults.map(product => (
                  <li key={product.id}>
                    <button
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                    </button>
                  </li>
                ))}
                <li className="border-t">
                  <button
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                  >
                    View all results
                  </button>
                </li>
              </ul>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No products found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};