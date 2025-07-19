'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/data/products';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Get category from URL and find matching category
  const categoryName = decodeURIComponent(params.category);
  const category = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());

  // Get products for this category
  const categoryProducts = category 
    ? products.filter(product => product.category === category.name)
    : [];

  // Filter by brand if selected
  const filteredProducts = selectedBrand
    ? categoryProducts.filter(product => product.brand === selectedBrand)
    : categoryProducts;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Get brands available in this category
  const availableBrands = brands.filter(brand => 
    categoryProducts.some(product => product.brand === brand.name)
  );

  if (!category) {
    return (
      <div className="container mt-5 text-center">
        <h2>Category not found</h2>
        <p className="text-muted">The category you're looking for doesn't exist.</p>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/categories')}
        >
          Browse All Categories
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/categories" className="text-decoration-none">Categories</a>
          </li>
          <li className="breadcrumb-item active">{category.name}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold">{category.name}</h1>
          <p className="text-muted">
            Discover our amazing collection of {category.name.toLowerCase()} items. 
            {category.count} products available.
          </p>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Filters</h5>
            </div>
            <div className="card-body">
              {/* Brand Filter */}
              <div className="mb-4">
                <h6>Brands</h6>
                <div className="list-group list-group-flush">
                  <button
                    className={`list-group-item list-group-item-action ${!selectedBrand ? 'active' : ''}`}
                    onClick={() => setSelectedBrand('')}
                  >
                    All Brands
                  </button>
                  {availableBrands.map((brand) => (
                    <button
                      key={brand.id}
                      className={`list-group-item list-group-item-action ${selectedBrand === brand.name ? 'active' : ''}`}
                      onClick={() => setSelectedBrand(brand.name)}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h6>Price Range</h6>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Min"
                  />
                  <span className="align-self-center">-</span>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {selectedBrand && (
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={() => setSelectedBrand('')}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Info */}
          <div className="card mt-3">
            <div className="card-body">
              <h6>About {category.name}</h6>
              <p className="text-muted small">
                Our {category.name.toLowerCase()} collection features high-quality items 
                from top brands. We offer competitive prices and excellent customer service.
              </p>
              <div className="small text-muted">
                <div className="mb-1">
                  <i className="bi bi-check-circle text-success me-1"></i>
                  Free shipping over $50
                </div>
                <div className="mb-1">
                  <i className="bi bi-check-circle text-success me-1"></i>
                  30-day returns
                </div>
                <div>
                  <i className="bi bi-check-circle text-success me-1"></i>
                  Quality guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="col-lg-9">
          {/* Sort and Results */}
          <div className="row mb-4">
            <div className="col-md-6">
              <p className="text-muted">
                Showing {sortedProducts.length} of {categoryProducts.length} products
                {selectedBrand && ` in ${selectedBrand}`}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <select
                className="form-select d-inline-block w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h4>No products found</h4>
                <p className="text-muted">
                  No {category.name.toLowerCase()} products match your current filters.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedBrand('')}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Related Categories */}
          <div className="mt-5">
            <h5>Other Categories</h5>
            <div className="row">
              {categories
                .filter(c => c.name !== category.name)
                .slice(0, 3)
                .map((otherCategory) => (
                  <div key={otherCategory.id} className="col-md-4 mb-3">
                    <div className="card h-100 product-card">
                      <div className="card-body text-center">
                        <div className="mb-2">
                          <i className="bi bi-tshirt fs-4 text-primary"></i>
                        </div>
                        <h6 className="card-title">{otherCategory.name}</h6>
                        <p className="text-muted small">{otherCategory.count} products</p>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => router.push(`/categories/${otherCategory.name.toLowerCase()}`)}
                        >
                          Browse
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 