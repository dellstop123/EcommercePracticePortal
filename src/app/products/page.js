'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/data/products';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
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

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSearchQuery('');
    setSortBy('name');
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold">All Products</h1>
          <p className="text-muted">Discover our complete collection of fashion items</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <label className="form-label">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-lg-2 col-md-6 mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-2 col-md-6 mb-3">
          <label className="form-label">Brand</label>
          <select
            className="form-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.name}>
                {brand.name} ({brand.count})
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-2 col-md-6 mb-3">
          <label className="form-label">Sort By</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="col-lg-3 col-md-6 mb-3 d-flex align-items-end">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No products found</h4>
            <p className="text-muted">Try adjusting your filters or search terms</p>
            <button
              className="btn btn-primary"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 