'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.orderNumber === params.orderNumber);
    setOrder(foundOrder);
    
    // Show confetti effect immediately
    console.log('Starting confetti animation...');
    setShowConfetti(true);
    
    // Hide confetti after 4 seconds
    const timer = setTimeout(() => {
      console.log('Stopping confetti animation...');
      setShowConfetti(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [params.orderNumber]);

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <div className="mb-4">
          <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
        </div>
        <h2>Order not found</h2>
        <p className="text-muted">The order you're looking for doesn't exist.</p>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Confetti Effect - Enhanced */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: (Math.random() * 2 + 2) + 's',
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)]
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Success Header */}
      <div className="text-center mb-5">
        <div className="success-animation mb-4">
          <div className="success-circle">
            <i className="bi bi-check-lg text-white" style={{ fontSize: '3rem' }}></i>
          </div>
        </div>
        <h1 className="fw-bold text-success mb-3">🎉 Order Placed Successfully! 🎉</h1>
        <div className="alert alert-success d-inline-block">
          <h4 className="mb-2">Thank you for your purchase!</h4>
          <p className="mb-2">Your order has been confirmed and is being processed.</p>
          <p className="mb-0">
            <strong>Order Number:</strong> 
            <span className="badge bg-primary ms-2 fs-6">{order.orderNumber}</span>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10 mx-auto">
          {/* Order Summary Card */}
          <div className="card shadow-lg border-success">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="fw-bold text-primary">
                        <i className="bi bi-info-circle me-2"></i>
                        Order Information
                      </h6>
                      <p className="mb-1"><strong>Order Number:</strong> {order.orderNumber}</p>
                      <p className="mb-1"><strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                      <p className="mb-1"><strong>Payment Method:</strong> {order.paymentMethod === 'cash-on-delivery' ? 'Cash on Delivery' : order.paymentMethod}</p>
                      <p className="mb-0"><strong>Total Amount:</strong> <span className="text-success fw-bold fs-5">${order.total.toFixed(2)}</span></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="fw-bold text-primary">
                        <i className="bi bi-geo-alt me-2"></i>
                        Shipping Address
                      </h6>
                      <p className="mb-1">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                      <p className="mb-1">{order.customerInfo.address}</p>
                      <p className="mb-1">{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
                      <p className="mb-0">{order.customerInfo.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="card">
                <div className="card-header bg-light">
                  <h6 className="fw-bold mb-0">
                    <i className="bi bi-bag me-2"></i>
                    Items Ordered ({order.items.length} items)
                  </h6>
                </div>
                <div className="card-body p-0">
                  {order.items.map((item, index) => (
                    <div key={index} className="row align-items-center py-3 border-bottom mx-0">
                      <div className="col-md-2 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded shadow-sm"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-5">
                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                        <p className="text-muted mb-1">{item.brand}</p>
                        {item.selectedSize && (
                          <span className="badge bg-secondary me-2">Size: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className="badge bg-info">Color: {item.selectedColor}</span>
                        )}
                      </div>
                      <div className="col-md-2 text-center">
                        <span className="badge bg-primary fs-6">Qty: {item.quantity}</span>
                      </div>
                      <div className="col-md-3 text-end">
                        <span className="fw-bold fs-5 text-success">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-4">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="bi bi-arrow-right-circle me-2"></i>
                  What's Next?
                </h6>
                <div className="row">
                  <div className="col-md-4 text-center mb-3">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <i className="bi bi-envelope text-primary fs-1 mb-3"></i>
                        <h6 className="fw-bold">Order Confirmation</h6>
                        <small className="text-muted">You'll receive an email confirmation shortly with all order details</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <i className="bi bi-truck text-primary fs-1 mb-3"></i>
                        <h6 className="fw-bold">Shipping Updates</h6>
                        <small className="text-muted">Track your order using the order number: <strong>{order.orderNumber}</strong></small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center mb-3">
                    <div className="card h-100 border-primary">
                      <div className="card-body">
                        <i className="bi bi-box text-primary fs-1 mb-3"></i>
                        <h6 className="fw-bold">Delivery</h6>
                        <small className="text-muted">Expected delivery in 3-5 business days to your address</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Message for Cash on Delivery */}
              {order.paymentMethod === 'cash-on-delivery' && (
                <div className="alert alert-warning mt-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-cash-coin fs-4 me-3"></i>
                    <div>
                      <strong>Cash on Delivery Payment:</strong>
                      <p className="mb-0 mt-1">Please have the exact amount of <strong>${order.total.toFixed(2)}</strong> ready when your order is delivered. Our delivery partner will collect the payment upon delivery.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-5">
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => router.push('/products')}
              >
                <i className="bi bi-bag me-2"></i>
                Continue Shopping
              </button>
              <button
                className="btn btn-outline-success btn-lg"
                onClick={() => router.push('/')}
              >
                <i className="bi bi-house me-2"></i>
                Back to Home
              </button>
              <button
                className="btn btn-outline-info btn-lg"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer me-2"></i>
                Print Receipt
              </button>
              <button
                className="btn btn-warning btn-lg"
                onClick={() => {
                  console.log('Manual confetti trigger!');
                  setShowConfetti(true);
                  setTimeout(() => setShowConfetti(false), 4000);
                }}
              >
                <i className="bi bi-stars me-2"></i>
                Test Confetti!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 