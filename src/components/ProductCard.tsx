import React from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-[300px] w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <button
        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
      >
        <ShoppingBag className="h-4 w-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};