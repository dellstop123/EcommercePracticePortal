'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = params.category;
    const filteredProducts = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    setCategoryProducts(filteredProducts);
    setLoading(false);
  }, [params.category]);

  const getCategoryTitle = (category) => {
    switch (category.toLowerCase()) {
      case 'men':
        return "Men's Collection";
      case 'women':
        return "Women's Collection";
      case 'kids':
        return "Kids' Collection";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
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

  if (categoryProducts.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card shadow-sm">
              <div className="card-body py-5">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h2 className="mb-3">No products found</h2>
                <p className="text-muted mb-4">
                  We couldn&apos;t find any products in the &quot;{getCategoryTitle(params.category)}&quot; category.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <Link href="/" className="btn btn-primary">
                    <i className="bi bi-house me-2"></i>
                    Back to Home
                  </Link>
                  <Link href="/categories" className="btn btn-outline-primary">
                    <i className="bi bi-grid me-2"></i>
                    Browse All Categories
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
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none">
                  <i className="bi bi-house me-1"></i>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/categories" className="text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {getCategoryTitle(params.category)}
              </li>
            </ol>
          </nav>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold">
              <i className="bi bi-collection me-2"></i>
              {getCategoryTitle(params.category)}
            </h1>
            <span className="badge bg-primary fs-6">
              {categoryProducts.length} products
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        {categoryProducts.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-12 text-center">
          <Link href="/categories" className="btn btn-outline-primary btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Back to All Categories
          </Link>
        </div>
      </div>
    </div>
  );
} 