// Mock data for Nepal eMart - matching the screenshots exactly

export const products = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 7999,
    originalPrice: 10000,
    discount: "20% OFF",
    category: "Clothing",
    rating: 4.5,
    reviews: 2,
    description: "A timeless leather jacket that adds a touch of classic cool to any outfit. Made from genuine leather.",
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Urban Trekking Shoes", 
    price: 1200,
    originalPrice: 1500,
    discount: "20% OFF",
    category: "Shoes",
    rating: 4.8,
    reviews: 15,
    description: "Comfortable trekking shoes perfect for urban adventures and mountain trails.",
    images: ["/api/placeholder/400/400"],
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Black", "Brown"],
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Artisan Canvas Backpack",
    price: 800,
    category: "Accessories", 
    rating: 4.6,
    reviews: 8,
    description: "Handcrafted canvas backpack with modern design, perfect for daily use.",
    images: ["/api/placeholder/400/400"],
    colors: ["Khaki", "Black"],
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "New Women's Collection",
    price: 1120,
    originalPrice: 2820,
    discount: "60% OFF",
    category: "Clothing",
    rating: 4.3,
    reviews: 5,
    description: "Latest women's fashion collection featuring traditional Nepali designs with modern cuts.",
    images: ["/api/placeholder/400/400"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Blue", "Green"],
    inStock: true,
    featured: true
  }
];

export const categories = [
  {
    id: 1,
    name: "Clothing",
    image: "/api/placeholder/300/200",
    description: "Traditional and modern Nepali clothing"
  },
  {
    id: 2, 
    name: "Shoes",
    image: "/api/placeholder/300/200",
    description: "Footwear for every occasion"
  },
  {
    id: 3,
    name: "Accessories",
    image: "/api/placeholder/300/200", 
    description: "Bags, jewelry, and more"
  }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userName: "Rupesh Yadav",
    userInitials: "RY",
    rating: 5,
    date: "September 28th, 2025",
    comment: "Amazing quality and fits perfectly. Worth every penny!"
  },
  {
    id: 2,
    productId: 1, 
    userName: "Sita Rai",
    userInitials: "SR",
    rating: 4,
    date: "September 27th, 2025",
    comment: "Very stylish and comfortable. The leather is soft."
  }
];

export const adminStats = {
  totalRevenue: 0,
  totalOrders: 5,
  totalCustomers: 1,
  currency: "NPR"
};

export const ownerCredentials = {
  email: "rsah0123456@gmail.com",
  password: "rupesh@0123456",
  pin: "12345",
  name: "Rupesh Kumar Sah"
};