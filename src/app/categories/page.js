'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/data/products';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Get products for selected category
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Further filter by brand if selected
  const finalProducts = selectedBrand
    ? filteredProducts.filter(product => product.brand === selectedBrand)
    : filteredProducts;

  // Sort products
  const sortedProducts = [...finalProducts].sort((a, b) => {
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

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSortBy('name');
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold">Browse Categories</h1>
          <p className="text-muted">Explore our products by category</p>
        </div>
      </div>

      <div className="row">
        {/* Categories Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Categories</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('')}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`list-group-item list-group-item-action ${selectedCategory === category.name ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Brands Filter */}
          <div className="card mt-3">
            <div className="card-header">
              <h6 className="mb-0">Brands</h6>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${!selectedBrand ? 'active' : ''}`}
                  onClick={() => setSelectedBrand('')}
                >
                  All Brands
                </button>
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    className={`list-group-item list-group-item-action ${selectedBrand === brand.name ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand.name)}
                  >
                    {brand.name} ({brand.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedBrand) && (
            <div className="mt-3">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div className="col-lg-9">
          {/* Filters and Sort */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>
                {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
                {selectedBrand && ` - ${selectedBrand}`}
              </h5>
              <p className="text-muted">
                Showing {sortedProducts.length} of {products.length} products
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

          {/* Category Cards */}
          {!selectedCategory && (
            <div className="row mb-4">
              {categories.map((category) => {
                const categoryProducts = products.filter(p => p.category === category.name);
                return (
                  <div key={category.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 product-card">
                      <div className="card-body text-center">
                        <div className="mb-3">
                          <i className="bi bi-tshirt fs-1 text-primary"></i>
                        </div>
                        <h5 className="card-title">{category.name}</h5>
                        <p className="text-muted">{category.count} products</p>
                        <button
                          className="btn btn-primary"
                          onClick={() => setSelectedCategory(category.name)}
                        >
                          Browse {category.name}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Products Grid */}
          {selectedCategory && (
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
                  <p className="text-muted">Try adjusting your filters</p>
                  <button
                    className="btn btn-primary"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Category Description */}
          {selectedCategory && (
            <div className="mt-4">
              <div className="card">
                <div className="card-body">
                  <h5>About {selectedCategory}</h5>
                  <p className="text-muted">
                    Discover our amazing collection of {selectedCategory.toLowerCase()} items. 
                    We offer high-quality products from top brands at competitive prices. 
                    Whether you're looking for casual wear, formal attire, or something in between, 
                    we have everything you need to express your unique style.
                  </p>
                  <div className="row">
                    <div className="col-md-4">
                      <h6>Quality Guarantee</h6>
                      <p className="text-muted small">All our products are carefully selected for quality and durability.</p>
                    </div>
                    <div className="col-md-4">
                      <h6>Free Shipping</h6>
                      <p className="text-muted small">Free shipping on orders over $50 for {selectedCategory.toLowerCase()} items.</p>
                    </div>
                    <div className="col-md-4">
                      <h6>Easy Returns</h6>
                      <p className="text-muted small">30-day money-back guarantee on all {selectedCategory.toLowerCase()} products.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 