'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'cash-on-delivery'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle empty cart navigation
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  // Don't render anything if cart is empty (will redirect)
  if (items.length === 0) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        break;
      case 3:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show error message
      alert('Please fill in all required fields correctly before proceeding.');
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = () => {
    // Final validation
    if (!validateStep(currentStep)) {
      alert('Please fill in all required fields correctly before placing your order.');
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
    console.log('Confirmation modal should be visible now');
  };

  const confirmOrder = () => {
    console.log('Confirming order...');
    setShowConfirmation(false);
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Generate order number
      const orderNumber = 'ORD-' + Date.now();
      
      // Store order in localStorage
      const order = {
        orderNumber,
        items,
        total: getCartTotal() * 1.08,
        customerInfo: formData,
        date: new Date().toISOString(),
        paymentMethod: formData.paymentMethod
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      // Redirect to order confirmation
      router.push(`/order-confirmation/${orderNumber}`);
    }, 2000);
  };

  const cancelOrder = () => {
    console.log('Canceling order...');
    setShowConfirmation(false);
  };

  // Test function to manually show modal
  const testModal = () => {
    setShowConfirmation(true);
    console.log('Test modal triggered');
  };

  const steps = [
    { number: 1, title: 'Customer Info', icon: 'bi-person' },
    { number: 2, title: 'Shipping', icon: 'bi-truck' },
    { number: 3, title: 'Payment', icon: 'bi-credit-card' }
  ];

  return (
    <div className="container mt-4">
      {/* Progress Indicator */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="d-flex align-items-center">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                  currentStep >= step.number ? 'bg-primary text-white' : 'bg-light text-muted'
                }`} style={{ width: '40px', height: '40px' }}>
                  <i className={`${step.icon} ${currentStep >= step.number ? 'text-white' : ''}`}></i>
                </div>
                <span className={`ms-2 ${currentStep >= step.number ? 'fw-bold' : 'text-muted'}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-3 ${currentStep > step.number ? 'text-primary' : 'text-muted'}`}>
                    <i className="bi bi-chevron-right"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row">
        {/* Checkout Form */}
        <div className="col-lg-8">
          <div className="card mb-4">
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <>
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-person me-2"></i>
                    Customer Information
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <>
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-truck me-2"></i>
                    Shipping Address
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">ZIP Code *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <>
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-credit-card me-2"></i>
                    Payment Method
                  </h5>
                </div>
                <div className="card-body">
                  {/* Cash on Delivery - Default Option */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cash-on-delivery"
                        value="cash-on-delivery"
                        checked={formData.paymentMethod === 'cash-on-delivery'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="cash-on-delivery">
                        <i className="bi bi-cash-coin me-2 text-success"></i>
                        <strong>Cash on Delivery</strong>
                        <small className="text-muted d-block ms-4">Pay when you receive your order</small>
                      </label>
                    </div>
                  </div>

                  <hr />

                  {/* Credit Card */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="credit-card"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="credit-card">
                        <i className="bi bi-credit-card me-2"></i>
                        Credit Card
                      </label>
                    </div>
                  </div>

                  {/* PayPal */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="paypal"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        <i className="bi bi-paypal me-2"></i>
                        PayPal
                      </label>
                    </div>
                  </div>

                  {/* Apple Pay */}
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="apple-pay"
                        value="apple-pay"
                        checked={formData.paymentMethod === 'apple-pay'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="apple-pay">
                        <i className="bi bi-apple me-2"></i>
                        Apple Pay
                      </label>
                    </div>
                  </div>

                  {/* Cash on Delivery Info */}
                  {formData.paymentMethod === 'cash-on-delivery' && (
                    <div className="alert alert-info mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-info-circle me-2"></i>
                        <div>
                          <strong>Cash on Delivery</strong>
                          <p className="mb-0 mt-1">You can pay with cash when your order is delivered. No upfront payment required.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock Credit Card Form */}
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="border rounded p-3 bg-light mt-3">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label className="form-label">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Expiry Date</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="123"
                            maxLength="4"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Info */}
                  {formData.paymentMethod === 'paypal' && (
                    <div className="alert alert-warning mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-paypal me-2"></i>
                        <div>
                          <strong>PayPal</strong>
                          <p className="mb-0 mt-1">You will be redirected to PayPal to complete your payment securely.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Apple Pay Info */}
                  {formData.paymentMethod === 'apple-pay' && (
                    <div className="alert alert-dark mt-3">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-apple me-2"></i>
                        <div>
                          <strong>Apple Pay</strong>
                          <p className="mb-0 mt-1">Use Apple Pay for a quick and secure checkout experience.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final Order Confirmation */}
                  <div className="alert alert-success mt-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check-circle me-2"></i>
                      <div>
                        <strong>Ready to Place Your Order!</strong>
                        <p className="mb-0 mt-1">Please review your information above and click &quot;Place Order&quot; to complete your purchase.</p>
                      </div>
                    </div>
                  </div>

                  {/* Test Button for Modal */}
                  <div className="mt-3">
                    <button 
                      type="button" 
                      className="btn btn-outline-info btn-sm"
                      onClick={testModal}
                    >
                      <i className="bi bi-bug me-1"></i>
                      Test Confirmation Modal
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={prevStep}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Previous
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                className="btn btn-primary ms-auto"
                onClick={nextStep}
              >
                Next
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success btn-lg ms-auto"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing Your Order...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Place Order - ${(getCartTotal() * 1.08).toFixed(2)}
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '2rem' }}>
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} className="d-flex justify-content-between mb-2">
                  <div>
                    <span className="fw-bold">{item.name}</span>
                    <div className="text-muted small">
                      Qty: {item.quantity}
                      {item.selectedSize && ` | Size: ${item.selectedSize}`}
                      {item.selectedColor && ` | Color: ${item.selectedColor}`}
                    </div>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 text-primary">${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div 
          className="modal fade show" 
          style={{ 
            display: 'block', 
            zIndex: 1055,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }} 
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1056 }}>
            <div className="modal-content shadow-lg">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Your Order
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={cancelOrder}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <strong>Order Summary:</strong>
                  <ul className="mb-0 mt-2">
                    <li>Total Amount: <strong>${(getCartTotal() * 1.08).toFixed(2)}</strong></li>
                    <li>Payment Method: <strong>{formData.paymentMethod === 'cash-on-delivery' ? 'Cash on Delivery' : formData.paymentMethod}</strong></li>
                    <li>Items: <strong>{items.length} product(s)</strong></li>
                    <li>Customer: <strong>{formData.firstName} {formData.lastName}</strong></li>
                    <li>Email: <strong>{formData.email}</strong></li>
                  </ul>
                </div>
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Important:</strong> Are you sure you want to place this order? This action cannot be undone.
                </div>
                <p className="text-muted">
                  Please review all the information above carefully before confirming your order.
                </p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-lg" 
                  onClick={cancelOrder}
                  style={{ minWidth: '120px' }}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-success btn-lg" 
                  onClick={confirmOrder}
                  style={{ minWidth: '150px' }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 