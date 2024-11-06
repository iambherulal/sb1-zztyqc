import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderStatus {
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
  location?: string;
  description: string;
}

const mockOrderStatuses: Record<string, OrderStatus[]> = {
  '12345': [
    {
      status: 'delivered',
      date: '2024-03-15',
      location: 'New York, NY',
      description: 'Package delivered'
    },
    {
      status: 'shipped',
      date: '2024-03-13',
      location: 'Chicago, IL',
      description: 'Package in transit'
    },
    {
      status: 'processing',
      date: '2024-03-12',
      description: 'Order confirmed'
    }
  ]
};

export const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus[] | null>(null);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const status = mockOrderStatuses[orderNumber];
    if (status) {
      setOrderStatus(status);
      setError('');
    } else {
      setOrderStatus(null);
      setError('Order not found. Please check the order number and try again.');
    }
  };

  const getStatusIcon = (status: OrderStatus['status']) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-6 w-6 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <Package className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="mt-4 text-3xl font-bold">Track Your Order</h1>
        <p className="mt-2 text-gray-600">
          Enter your order number to track your package
        </p>
      </div>

      <form onSubmit={handleTrackOrder} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Enter order number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Track Order
          </button>
        </div>
      </form>

      {error && (
        <div className="text-center text-red-600 mb-8">
          {error}
        </div>
      )}

      {orderStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="space-y-8">
            {orderStatus.map((status, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex items-center h-full">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                      {getStatusIcon(status.status)}
                    </div>
                    {index < orderStatus.length - 1 && (
                      <div className="absolute top-10 left-5 w-0.5 h-16 bg-gray-200" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium capitalize">
                      {status.status}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(status.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    {status.location && (
                      <p className="text-gray-600">{status.location}</p>
                    )}
                    <p className="text-gray-600">{status.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <h4 className="font-medium mb-2">Shipping Address</h4>
            <p className="text-gray-600">
              John Doe<br />
              123 Main St<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};