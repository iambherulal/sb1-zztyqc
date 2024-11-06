import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Profile } from './pages/Profile/Profile';
import { OrderConfirmation } from './pages/Checkout/OrderConfirmation';
import { Checkout } from './pages/Checkout/Checkout';
import { ProductDetail } from './pages/ProductDetail';
import { Category } from './pages/Category';
import { Search } from './pages/Search';
import { Wishlist } from './pages/Wishlist';
import { OrderTracking } from './pages/OrderTracking';
import { BlogList } from './pages/Blog/BlogList';
import { BlogPost } from './pages/Blog/BlogPost';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category/:category" element={<Category />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;