'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { products } from '@/data/products';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(params.id));
    setProduct(foundProduct);
    setLoading(false);
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      ...product,
      quantity,
      selectedSize: selectedSize || null,
      selectedColor: selectedColor || null
    };
    
    addToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-sm">
              <div className="card-body py-5">
                <i className="bi bi-exclamation-triangle display-1 text-warning mb-3"></i>
                <h2 className="mb-3">Product Not Found</h2>
                <p className="text-muted mb-4">
                  We couldn&apos;t find the product you&apos;re looking for.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <Link href="/products" className="btn btn-primary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Products
                  </Link>
                  <Link href="/" className="btn btn-outline-primary">
                    <i className="bi bi-house me-2"></i>
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none">
              <i className="bi bi-house me-1"></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/products" className="text-decoration-none">
              Products
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-body p-0">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="img-fluid w-100"
                style={{ objectFit: 'cover', height: '400px' }}
              />
            </div>
          </div>
          
          {/* Thumbnail Images */}
          <div className="row mt-3">
            <div className="col-3">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="img-fluid rounded border"
                style={{ objectFit: 'cover', height: '80px' }}
              />
            </div>
            <div className="col-3">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="img-fluid rounded border"
                style={{ objectFit: 'cover', height: '80px' }}
              />
            </div>
            <div className="col-3">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="img-fluid rounded border"
                style={{ objectFit: 'cover', height: '80px' }}
              />
            </div>
            <div className="col-3">
              <Image
                src={product.image}
                alt={product.name}
                width={100}
                height={100}
                className="img-fluid rounded border"
                style={{ objectFit: 'cover', height: '80px' }}
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <div className="mb-3">
                <span className="badge bg-primary mb-2">{product.category}</span>
                <h2 className="fw-bold mb-2">{product.name}</h2>
                <p className="text-muted mb-2">by {product.brand}</p>
                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-muted">({product.rating})</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="fw-bold text-primary fs-3 me-3">${product.price}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-muted text-decoration-line-through fs-5">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="badge bg-success">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <p className="text-muted">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <h6 className="mb-2">Size</h6>
                  <div className="d-flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`btn btn-outline-secondary ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h6 className="mb-2">Color</h6>
                  <div className="d-flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`btn btn-outline-secondary ${selectedColor === color ? 'active' : ''}`}
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
                <h6 className="mb-2">Quantity</h6>
                <div className="input-group" style={{ maxWidth: '150px' }}>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>

              {/* Product Features */}
              <div className="border-top pt-4">
                <h6 className="mb-3">Product Features</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    High-quality materials
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Comfortable fit
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Durable construction
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle text-success me-2"></i>
                    Easy to care for
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Related Products</h3>
          <div className="row">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="col-lg-3 col-md-6 mb-4">
                  <div className="card h-100 product-card shadow-sm">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body">
                      <h6 className="card-title">{relatedProduct.name}</h6>
                      <p className="text-primary fw-bold">${relatedProduct.price}</p>
                      <button
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() => router.push(`/products/${relatedProduct.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 