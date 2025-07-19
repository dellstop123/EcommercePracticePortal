import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartNotification from '@/components/CartNotification';
import FloatingCartButton from '@/components/FloatingCartButton';

export const metadata = {
  title: "FashionHub - E-Commerce Fashion Website",
  description: "A full-fledged fashion e-commerce website for learning automation testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      <body>
        <Providers>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              {children}
            </main>
            <Footer />
            <CartNotification />
            <FloatingCartButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
