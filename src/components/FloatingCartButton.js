'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function FloatingCartButton() {
  const { getCartCount, getCartTotal } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating button when cart has items
    setIsVisible(getCartCount() > 0);
  }, [getCartCount]);

  if (!isVisible) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1040 }}>
      <Link 
        href="/cart" 
        className="btn btn-primary btn-lg shadow-lg d-flex align-items-center gap-2"
        style={{
          borderRadius: '50px',
          padding: '12px 24px',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
        }}
      >
        <div className="position-relative">
          <i className="bi bi-cart3 fs-4"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {getCartCount()}
          </span>
        </div>
        <div className="d-none d-md-block">
          <div className="fw-bold">View Cart</div>
          <div className="small">${getCartTotal().toFixed(2)}</div>
        </div>
      </Link>
    </div>
  );
} 