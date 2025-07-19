'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    
    // Create category objects with counts
    const categoryData = uniqueCategories.map(category => {
      const count = products.filter(product => product.category === category).length;
      return {
        name: category,
        count: count,
        id: category.toLowerCase().replace(/\s+/g, '-')
      };
    });

    setCategories(categoryData);
    setLoading(false);
  }, []);

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'men':
        return 'bi-person';
      case 'women':
        return 'bi-person-heart';
      case 'kids':
        return 'bi-emoji-smile';
      default:
        return 'bi-tshirt';
    }
  };

  const getCategoryDescription = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'men':
        return "Discover our collection of men's clothing and accessories";
      case 'women':
        return "Explore our stylish women's fashion and accessories";
      case 'kids':
        return "Find adorable and comfortable clothing for kids";
      default:
        return `Browse our ${categoryName.toLowerCase()} collection`;
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

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="fw-bold mb-3">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Shop by Category
          </h1>
          <p className="text-muted fs-5">
            Explore our wide range of products organized by category
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 category-card shadow-sm hover-lift">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <div className="category-icon-wrapper">
                    <i className={`bi ${getCategoryIcon(category.name)} display-4 text-primary`}></i>
                  </div>
                </div>
                <h4 className="card-title fw-bold mb-2">{category.name}</h4>
                <p className="text-muted mb-3">
                  {getCategoryDescription(category.name)}
                </p>
                <div className="mb-3">
                  <span className="badge bg-primary fs-6">
                    {category.count} products
                  </span>
                </div>
                <Link 
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="btn btn-primary btn-lg w-100"
                >
                  <i className="bi bi-arrow-right me-2"></i>
                  Browse {category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-light">
            <div className="card-body text-center py-5">
              <h3 className="mb-3">Can&apos;t find what you&apos;re looking for?</h3>
              <p className="text-muted mb-4">
                Browse our complete product catalog or use our search feature to find exactly what you need.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link href="/products" className="btn btn-primary btn-lg">
                  <i className="bi bi-search me-2"></i>
                  Browse All Products
                </Link>
                <Link href="/" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-house me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 