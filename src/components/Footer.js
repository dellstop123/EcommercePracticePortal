import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5 className="mb-3">
              <i className="bi bi-shop me-2"></i>
              E-commerce Practice Portal
            </h5>
            <p className="text-muted">
              Your one-stop destination for all your shopping needs. 
              Quality products, competitive prices, and excellent service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-muted text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/products" className="text-muted text-decoration-none">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/categories" className="text-muted text-decoration-none">
                  Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/cart" className="text-muted text-decoration-none">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/categories/men" className="text-muted text-decoration-none">
                  Men
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/categories/women" className="text-muted text-decoration-none">
                  Women
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/categories/kids" className="text-muted text-decoration-none">
                  Kids
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 mb-4">
            <h6 className="mb-3">Contact Info</h6>
            <div className="mb-3">
              <i className="bi bi-geo-alt me-2"></i>
              <span className="text-muted">123 Shopping St, E-commerce City, EC 12345</span>
            </div>
            <div className="mb-3">
              <i className="bi bi-telephone me-2"></i>
              <span className="text-muted">+1 (555) 123-4567</span>
            </div>
            <div className="mb-3">
              <i className="bi bi-envelope me-2"></i>
              <span className="text-muted">support@ecommercepractice.com</span>
            </div>
            <div className="mb-3">
              <i className="bi bi-clock me-2"></i>
              <span className="text-muted">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</span>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              © 2024 E-commerce Practice Portal. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <Link href="/privacy" className="text-muted text-decoration-none small">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted text-decoration-none small">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-muted text-decoration-none small">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 