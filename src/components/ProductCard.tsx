import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShoppingBag, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-[300px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <button
        onClick={() => toast.success('Added to wishlist!')}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-5 w-5 text-gray-600" />
      </button>

      <div className="mt-4 flex justify-between">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>

      <button
        onClick={addToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
      >
        <ShoppingBag className="h-4 w-4" />
        <span>Add to Cart</span>
      </button>
    </motion.div>
  );
};