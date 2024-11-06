import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { CreditCard, Truck, Shield, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 0, time: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 15, time: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 25, time: '1 business day' },
];

export const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const TAX_RATE = 0.08;
  const subtotal = state.total;
  const shippingCost = shippingMethod.price;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleOrderSubmit = () => {
    toast.success('Order placed successfully!');
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />

      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

        {/* Progress Steps */}
        <div className="mt-8 mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((number) => (
              <div key={number} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > number ? <Check className="w-5 h-5" /> : number}
                </div>
                {number < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > number ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 text-sm">
            <div className="flex space-x-20">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            lastName: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingAddress.email}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            email: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            phone: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            state: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.zipCode}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            zipCode: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
                  <div className="space-y-4">
                    {SHIPPING_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod.id === method.id}
                            onChange={() => setShippingMethod(method)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-4">
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.time}</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {method.price === 0 ? 'Free' : `$${method.price}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentMethod.cardNumber}
                        onChange={(e) =>
                          setPaymentMethod({
                            ...paymentMethod,
                            cardNumber: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentMethod.cardHolder}
                        onChange={(e) =>
                          setPaymentMethod({
                            ...paymentMethod,
                            cardHolder: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={paymentMethod.expiryDate}
                          onChange={(e) =>
                            setPaymentMethod({
                              ...paymentMethod,
                              expiryDate: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentMethod.cvv}
                          onChange={(e) =>
                            setPaymentMethod({
                              ...paymentMethod,
                              cvv: e.target.value,
                            })
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-6">Order Review</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium">Shipping Address</h3>
                      <p className="mt-2 text-gray-600">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                        <br />
                        {shippingAddress.address}
                        <br />
                        {shippingAddress.city}, {shippingAddress.state}{' '}
                        {shippingAddress.zipCode}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Shipping Method</h3>
                      <p className="mt-2 text-gray-600">
                        {shippingMethod.name} - {shippingMethod.time}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Payment Method</h3>
                      <p className="mt-2 text-gray-600">
                        Card ending in {paymentMethod.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Back to Payment
                  </button>
                  <button
                    onClick={handleOrderSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>We accept all major credit cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};