import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    orderNotes: ''
  });
  
  const [paymentStep, setPaymentStep] = useState('details'); // 'details', 'payment', 'confirmation'
  const [paymentCode, setPaymentCode] = useState('');
  
  const total = getCartTotal();
  const shippingCost = 0; // Free shipping as shown in the screenshot
  const finalTotal = total + shippingCost;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setPaymentStep('payment');
  };

  const handleConfirmPayment = () => {
    if (!paymentCode) {
      toast({
        title: "Please enter the transaction ID",
        variant: "destructive"
      });
      return;
    }
    
    // Generate order ID (matching the format from screenshot)
    const orderId = `NEm-${Math.floor(Math.random() * 900000) + 100000}`;
    
    // Clear cart and show success
    clearCart();
    
    toast({
      title: "Order placed successfully!",
      description: `Order ID: ${orderId}. You will receive payment verification shortly.`
    });
    
    // Redirect to home after delay
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="text-green-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to cart
          </Link>
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your order by providing the details below.</p>
          </div>

          {/* Nepal eMart Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <Link to="/" className="hover:text-gray-800">All Products</Link>
              <Link to="/category/clothing" className="hover:text-gray-800">Clothing</Link>
              <Link to="/category/shoes" className="hover:text-gray-800">Shoes</Link>
              <Link to="/category/accessories" className="hover:text-gray-800">Accessories</Link>
            </div>
          </div>
        </div>

        {paymentStep === 'details' && (
          <form onSubmit={handleSubmitDetails} className="space-y-8">
            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Customer Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="hello"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="new"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="new@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' • '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">Rs.{(item.price * item.quantity).toLocaleString()}.00</div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>Rs.{total.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `Rs.${shippingCost}.00`}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>Rs.{finalTotal.toLocaleString()}.00</span>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        )}

        {paymentStep === 'payment' && (
          <div className="space-y-8">
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Pay with eSewa</h2>
              
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-center mb-4">
                    <h3 className="font-medium">Pay with eSewa</h3>
                    <p className="text-sm text-gray-600">Scan this QR to pay</p>
                    <p className="text-sm text-gray-600">eSewa QR Code</p>
                  </div>
                  
                  {/* Mock QR Code */}
                  <div className="w-48 h-48 mx-auto bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center text-gray-500">
                      <div className="text-xs">QR Code</div>
                      <div className="text-xs">Rs.{finalTotal.toLocaleString()}.00</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Account Name: Rupesh Kumar Sah</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    After completing the payment, please enter the Transaction ID (Payment Code) below to confirm.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Confirmation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Confirm Payment</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID (Payment Code) *
                </label>
                <input
                  type="text"
                  value={paymentCode}
                  onChange={(e) => setPaymentCode(e.target.value)}
                  placeholder="Enter your Transaction ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Additional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder="Notes about your order, e.g. special delivery instructions."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Final Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="font-semibold">Rs.{(item.price * item.quantity).toLocaleString()}.00</div>
                  </div>
                ))}
                
                <div className="border-t pt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>Rs.{total.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>Rs.{finalTotal.toLocaleString()}.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              onClick={handleConfirmPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
            >
              Confirm Payment & Place Order
            </button>
            
            <p className="text-xs text-center text-gray-500">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;