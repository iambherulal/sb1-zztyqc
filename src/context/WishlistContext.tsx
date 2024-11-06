import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | null>(null);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      if (state.items.some(item => item.id === action.payload.id)) {
        toast.error('Item already in wishlist');
        return state;
      }
      toast.success('Added to wishlist');
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case 'REMOVE_FROM_WISHLIST': {
      toast.success('Removed from wishlist');
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};