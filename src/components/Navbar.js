'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount, getCartTotal } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold text-primary" href="/">
          FashionHub
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          {/* Right Side Items */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart">
                <i className="bi bi-cart3 fs-5"></i>
                {getCartCount() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </li>
            {/* View Cart Button */}
            {getCartCount() > 0 && (
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm ms-2" href="/cart">
                  <i className="bi bi-cart3 me-1"></i>
                  View Cart (${getCartTotal().toFixed(2)})
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
} 