'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const router = useRouter();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-sm">
              <div className="card-body py-5">
                <i className="bi bi-cart-x display-1 text-muted mb-3"></i>
                <h2 className="mb-3">Your cart is empty</h2>
                <p className="text-muted mb-4">Looks like you haven&apos;t added any items to your cart yet.</p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => router.push('/products')}
                >
                  <i className="bi bi-bag me-2"></i>
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h3 className="mb-0">
                <i className="bi bi-cart me-2"></i>
                Shopping Cart ({items.length} items)
              </h3>
            </div>
            <div className="card-body">
              {items.map((item) => (
                <div key={item.id} className="row align-items-center py-3 border-bottom">
                  <div className="col-md-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted mb-0">${item.price}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        min="1"
                        style={{ maxWidth: '60px' }}
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 text-end">
                    <p className="fw-bold mb-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="col-md-1 text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">${getCartTotal().toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => router.push('/checkout')}
              >
                <i className="bi bi-credit-card me-2"></i>
                Proceed to Checkout
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => router.push('/products')}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 