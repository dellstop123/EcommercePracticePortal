'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="card h-100 product-card shadow-sm hover-lift" onClick={handleCardClick}>
      <div className="position-relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="card-img-top"
          style={{ objectFit: 'cover', height: '200px' }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-primary">{product.category}</span>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold mb-2">{product.name}</h6>
        <p className="text-muted small mb-2">{product.brand}</p>
        <div className="d-flex align-items-center mb-2">
          <div className="text-warning me-1">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
              ></i>
            ))}
          </div>
          <small className="text-muted">({product.rating})</small>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold text-primary fs-5">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-muted text-decoration-line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 