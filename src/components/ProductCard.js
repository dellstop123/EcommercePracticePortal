'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div 
      className="card h-100 product-card border-0 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        
        {/* Quick Actions Overlay */}
        <div 
          className={`position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transition: 'opacity 0.3s ease' }}
        >
          <div className="d-flex gap-2">
            <Link 
              href={`/products/${product.id}`}
              className="btn btn-light btn-sm"
            >
              <i className="bi bi-eye"></i>
            </Link>
            <button 
              className="btn btn-primary btn-sm"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>

        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="position-absolute top-0 end-0 m-2">
            <span className="badge bg-danger">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <small className="text-muted">{product.brand}</small>
        </div>
        
        <h6 className="card-title mb-2">{product.name}</h6>
        
        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex text-warning me-2">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
              ></i>
            ))}
          </div>
          <small className="text-muted">({product.reviews})</small>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="fw-bold text-primary">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-muted text-decoration-line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            className="btn btn-outline-primary w-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 