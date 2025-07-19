export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">FashionHub</h5>
            <p className="text-muted">
              Your one-stop destination for trendy fashion items. Quality products at affordable prices.
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

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-muted text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/products" className="text-muted text-decoration-none">Products</a>
              </li>
              <li className="mb-2">
                <a href="/categories" className="text-muted text-decoration-none">Categories</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-muted text-decoration-none">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-muted text-decoration-none">Contact</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/help" className="text-muted text-decoration-none">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="/shipping" className="text-muted text-decoration-none">Shipping Info</a>
              </li>
              <li className="mb-2">
                <a href="/returns" className="text-muted text-decoration-none">Returns</a>
              </li>
              <li className="mb-2">
                <a href="/size-guide" className="text-muted text-decoration-none">Size Guide</a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="text-muted text-decoration-none">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h6 className="mb-3">Newsletter</h6>
            <p className="text-muted mb-3">
              Subscribe to get special offers and updates.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter your email"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              © 2024 FashionHub. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex gap-3 justify-content-md-end">
              <a href="/privacy" className="text-muted text-decoration-none">Privacy Policy</a>
              <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 