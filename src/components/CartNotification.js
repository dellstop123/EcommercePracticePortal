'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartNotification() {
  const { items } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [lastItemCount, setLastItemCount] = useState(0);

  useEffect(() => {
    // Show notification when items are added to cart
    if (items.length > lastItemCount) {
      setShowNotification(true);
      setLastItemCount(items.length);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setLastItemCount(items.length);
    }
  }, [items.length, lastItemCount]);

  if (!showNotification) return null;

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div className="toast show" role="alert">
        <div className="toast-header bg-success text-white">
          <i className="bi bi-check-circle me-2"></i>
          <strong className="me-auto">Added to Cart!</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowNotification(false)}
          ></button>
        </div>
        <div className="toast-body">
          <p className="mb-2">Item has been added to your cart successfully.</p>
          <div className="d-flex gap-2">
            <Link href="/cart" className="btn btn-primary btn-sm">
              View Cart ({items.length})
            </Link>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowNotification(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 