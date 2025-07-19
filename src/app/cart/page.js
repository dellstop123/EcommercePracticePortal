'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-cart3 text-muted" style={{ fontSize: '4rem' }}></i>
          </div>
          <h2>Your cart is empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => router.push('/products')}
            >
              <i className="bi bi-bag me-2"></i>
              Start Shopping
            </button>
            <button 
              className="btn btn-outline-primary btn-lg"
              onClick={() => router.push('/categories')}
            >
              <i className="bi bi-grid me-2"></i>
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold mb-4">
            <i className="bi bi-cart3 me-2"></i>
            Shopping Cart
          </h1>
        </div>
      </div>
      
      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                Cart Items ({items.length})
              </h5>
            </div>
            <div className="card-body p-0">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`} 
                     className={`row align-items-center py-3 ${index !== items.length - 1 ? 'border-bottom' : ''}`}>
                  <div className="col-md-2 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1 fw-bold">{item.name}</h6>
                    <p className="text-muted mb-1">{item.brand}</p>
                    {item.selectedSize && (
                      <small className="text-muted d-block">Size: {item.selectedSize}</small>
                    )}
                    {item.selectedColor && (
                      <small className="text-muted d-block">Color: {item.selectedColor}</small>
                    )}
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <span className="fw-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    {item.quantity > 1 && (
                      <div className="text-muted small">
                        ${item.price} each
                      </div>
                    )}
                  </div>
                  <div className="col-md-2 text-center">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="p-3 bg-light">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={clearCart}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Clear Cart
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => router.push('/products')}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>
                Order Summary
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="fw-bold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success fw-bold">Free</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-4 text-primary">${(getCartTotal() * 1.08).toFixed(2)}</span>
              </div>
              
              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => router.push('/checkout')}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Proceed to Checkout
                </button>
              </div>
              
              <div className="border-top pt-3">
                <div className="d-flex align-items-center text-success mb-2">
                  <i className="bi bi-check-circle me-2"></i>
                  <small>Free shipping on orders over $50</small>
                </div>
                <div className="d-flex align-items-center text-success mb-2">
                  <i className="bi bi-shield-check me-2"></i>
                  <small>30-day money-back guarantee</small>
                </div>
                <div className="d-flex align-items-center text-success">
                  <i className="bi bi-lock me-2"></i>
                  <small>Secure checkout</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 