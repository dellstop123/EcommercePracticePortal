'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h2>Product not found</h2>
        <p className="text-muted">The product you're looking for doesn't exist.</p>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/products')}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity
      });
    } else {
      addToCart({
        ...product,
        quantity
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="position-relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="img-fluid rounded"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-danger fs-6">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            )}
          </div>
          
          {/* Thumbnail Images */}
          <div className="row mt-3">
            {product.images.map((image, index) => (
              <div key={index} className="col-3 mb-2">
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`img-fluid rounded cursor-pointer ${selectedImage === index ? 'border border-primary' : 'border'}`}
                  style={{ 
                    width: '100%', 
                    height: '80px', 
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/products" className="text-decoration-none">Products</a>
              </li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>

          <h1 className="fw-bold mb-2">{product.name}</h1>
          <p className="text-muted mb-3">by {product.brand}</p>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3">
            <div className="d-flex text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                ></i>
              ))}
            </div>
            <span className="text-muted">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3">
              <span className="h3 fw-bold text-primary mb-0">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="h5 text-muted text-decoration-line-through mb-0">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mb-4">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 1 && (
            <div className="mb-4">
              <label className="form-label fw-bold">Size</label>
              <div className="d-flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 1 && (
            <div className="mb-4">
              <label className="form-label fw-bold">Color</label>
              <div className="d-flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`btn ${selectedColor === color ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <label className="form-label fw-bold">Quantity</label>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="fw-bold">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="d-grid gap-2 mb-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Product Details */}
          <div className="border-top pt-4">
            <h5 className="fw-bold mb-3">Product Details</h5>
            <div className="row">
              <div className="col-6">
                <p className="mb-2"><strong>Category:</strong> {product.category}</p>
                <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
              </div>
              <div className="col-6">
                <p className="mb-2"><strong>Rating:</strong> {product.rating}/5</p>
                <p className="mb-2"><strong>Reviews:</strong> {product.reviews}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 