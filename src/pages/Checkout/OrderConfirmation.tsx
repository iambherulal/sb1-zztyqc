import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';

export const OrderConfirmation = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-lg text-gray-600">Order #12345 has been confirmed</p>
      </div>

      <div className="mt-12 bg-white shadow rounded-lg">
        <div className="px-6 py-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-6">
              <div className="flex items-center space-x-3">
                <Package className="h-6 w-6 text-gray-400" />
                <div>
                  <p className="font-medium">Order Details</p>
                  <p className="text-sm text-gray-600">March 15, 2024</p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                Confirmed
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=100"
                  alt="Product"
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">Minimal Desk Lamp</p>
                  <p className="text-sm text-gray-600">Quantity: 1</p>
                </div>
                <p className="font-medium">$89.99</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$89.99</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg mt-4">
                <span>Total</span>
                <span>$89.99</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Truck className="h-6 w-6 text-gray-400" />
            <div>
              <p className="font-medium">Shipping Information</p>
              <p className="text-sm text-gray-600 mt-1">
                John Doe<br />
                123 Main St<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We'll send you shipping confirmation when your item(s) are on the way!
          </p>
          <Link
            to="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};