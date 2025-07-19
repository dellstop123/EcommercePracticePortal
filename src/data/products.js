export const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    category: "Men",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop"
    ],
    description: "Premium cotton classic white t-shirt perfect for everyday wear. Comfortable fit and breathable fabric.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    inStock: true,
    rating: 4.5,
    reviews: 128,
    tags: ["casual", "cotton", "basic"]
  },
  {
    id: 2,
    name: "Floral Summer Dress",
    price: 89.99,
    originalPrice: 119.99,
    category: "Women",
    brand: "Zara",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=400&h=400&fit=crop"
    ],
    description: "Beautiful floral print summer dress with adjustable straps. Perfect for warm weather and special occasions.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Pink Floral"],
    inStock: true,
    rating: 4.8,
    reviews: 95,
    tags: ["dress", "summer", "floral", "casual"]
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    price: 79.99,
    originalPrice: 99.99,
    category: "Men",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop"
    ],
    description: "Premium denim slim fit jeans with stretch comfort. Classic blue wash with modern styling.",
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    colors: ["Blue", "Black", "Gray"],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    tags: ["jeans", "denim", "slim-fit", "casual"]
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 129.99,
    originalPrice: 159.99,
    category: "Accessories",
    brand: "Coach",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop"
    ],
    description: "Genuine leather crossbody bag with adjustable strap. Perfect size for everyday essentials.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    inStock: true,
    rating: 4.7,
    reviews: 67,
    tags: ["bag", "leather", "crossbody", "accessory"]
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 149.99,
    originalPrice: 199.99,
    category: "Footwear",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
    ],
    description: "Lightweight running shoes with superior cushioning and breathable mesh upper. Perfect for daily runs.",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White/Black", "Gray/Blue", "Black/Red"],
    inStock: true,
    rating: 4.9,
    reviews: 342,
    tags: ["shoes", "running", "sports", "athletic"]
  },
  {
    id: 6,
    name: "Knit Sweater",
    price: 69.99,
    originalPrice: 89.99,
    category: "Women",
    brand: "H&M",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    ],
    description: "Soft knit sweater perfect for cooler weather. Comfortable fit with ribbed cuffs and hem.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Navy", "Pink"],
    inStock: true,
    rating: 4.4,
    reviews: 156,
    tags: ["sweater", "knit", "winter", "casual"]
  },
  {
    id: 7,
    name: "Formal Shirt",
    price: 59.99,
    originalPrice: 79.99,
    category: "Men",
    brand: "Calvin Klein",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop"
    ],
    description: "Classic formal shirt with wrinkle-resistant fabric. Perfect for office wear and formal occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink", "Black"],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    tags: ["formal", "shirt", "office", "business"]
  },
  {
    id: 8,
    name: "Denim Jacket",
    price: 99.99,
    originalPrice: 129.99,
    category: "Women",
    brand: "Gap",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop"
    ],
    description: "Classic denim jacket with comfortable fit. Perfect for layering in any season.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    inStock: true,
    rating: 4.5,
    reviews: 112,
    tags: ["jacket", "denim", "casual", "outerwear"]
  }
];

export const categories = [
  { id: 1, name: "Men", count: 3 },
  { id: 2, name: "Women", count: 3 },
  { id: 3, name: "Footwear", count: 1 },
  { id: 4, name: "Accessories", count: 1 }
];

export const brands = [
  { id: 1, name: "Nike", count: 1 },
  { id: 2, name: "Zara", count: 1 },
  { id: 3, name: "Levi's", count: 1 },
  { id: 4, name: "Coach", count: 1 },
  { id: 5, name: "Adidas", count: 1 },
  { id: 6, name: "H&M", count: 1 },
  { id: 7, name: "Calvin Klein", count: 1 },
  { id: 8, name: "Gap", count: 1 }
]; 