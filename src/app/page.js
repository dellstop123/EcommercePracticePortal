import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import Image from 'next/image';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section position-relative bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Discover Your Style
              </h1>
              <p className="lead mb-4">
                Explore our latest collection of trendy fashion items. From casual wear to formal attire, 
                we have everything you need to express your unique style.
              </p>
              <div className="d-flex gap-3">
                <Link href="/products" className="btn btn-light btn-lg">
                  Shop Now
                </Link>
                <Link href="/categories" className="btn btn-outline-light btn-lg">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <Image 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Fashion Collection"
                className="img-fluid rounded"
                width={600}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Shop by Category</h2>
            <p className="text-muted">Find what you&apos;re looking for in our organized categories</p>
          </div>
          <div className="row">
            {categories.map((category) => (
              <div key={category.id} className="col-lg-3 col-md-6 mb-4">
                <Link href={`/categories/${category.name.toLowerCase()}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm h-100 product-card">
                    <div className="card-body text-center">
                      <div className="mb-3">
                        <i className="bi bi-tshirt fs-1 text-primary"></i>
                      </div>
                      <h5 className="card-title">{category.name}</h5>
                      <p className="text-muted">{category.count} products</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Featured Products</h2>
            <p className="text-muted">Our most popular items handpicked for you</p>
          </div>
          <div className="row">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-6 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/products" className="btn btn-primary btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 text-center">
              <div className="mb-3">
                <i className="bi bi-truck fs-1 text-primary"></i>
              </div>
              <h5>Free Shipping</h5>
              <p className="text-muted">Free shipping on orders over $50</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 text-center">
              <div className="mb-3">
                <i className="bi bi-shield-check fs-1 text-primary"></i>
              </div>
              <h5>Quality Guarantee</h5>
              <p className="text-muted">30-day money-back guarantee</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 text-center">
              <div className="mb-3">
                <i className="bi bi-headset fs-1 text-primary"></i>
              </div>
              <h5>24/7 Support</h5>
              <p className="text-muted">Round the clock customer support</p>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 text-center">
              <div className="mb-3">
                <i className="bi bi-credit-card fs-1 text-primary"></i>
              </div>
              <h5>Secure Payment</h5>
              <p className="text-muted">Safe and secure payment methods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h3 className="mb-3">Stay Updated</h3>
              <p className="mb-4">Subscribe to our newsletter for the latest fashion trends and exclusive offers.</p>
              <form className="d-flex gap-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <button type="submit" className="btn btn-light">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
