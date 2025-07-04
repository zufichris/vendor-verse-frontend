import type { Product, Category, User, Order } from "./types";

// Mock database with realistic data
const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description:
      "Experience premium audio quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    brand: "AudioTech",
    sku: "AT-WH-001",
    inStock: true,
    stockCount: 15,
    isNew: true,
    isSale: true,
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather ear cups",
      "Bluetooth 5.0 connectivity",
      "Quick charge - 5 min for 2 hours",
      "Voice assistant compatible",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "30 hours playback",
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Minimalist Watch Collection",
    description:
      "Elegant timepiece with minimalist design and premium materials.",
    price: 199,
    image: "/placeholder.svg?height=400&width=400",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    rating: 4.6,
    reviews: 89,
    category: "Accessories",
    brand: "TimeCore",
    sku: "TC-MW-002",
    inStock: true,
    stockCount: 25,
    isNew: true,
    features: [
      "Swiss movement",
      "Sapphire crystal",
      "Water resistant",
      "Leather strap",
    ],
    specifications: {
      Movement: "Swiss Quartz",
      "Case Material": "Stainless Steel",
      "Water Resistance": "50m",
      Strap: "Genuine Leather",
    },
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-16"),
  },
  // Add more products...
];

const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest technology and gadgets for modern living",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 156,
    trending: true,
    subcategories: ["Smartphones", "Laptops", "Audio", "Smart Home", "Gaming"],
    featuredProducts: [
      { name: "Premium Headphones", price: 299, rating: 4.8 },
      { name: "Smart Speaker", price: 149, rating: 4.5 },
      { name: "Wireless Mouse", price: 79, rating: 4.5 },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "fashion",
    name: "Fashion & Clothing",
    description: "Trendy apparel and accessories for every style",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 234,
    trending: false,
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Shoes",
      "Accessories",
      "Jewelry",
    ],
    featuredProducts: [
      { name: "Cotton T-Shirt", price: 49, rating: 4.7 },
      { name: "Designer Jeans", price: 89, rating: 4.6 },
      { name: "Leather Jacket", price: 199, rating: 4.8 },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  // Add more categories...
];

const users: User[] = [];
const orders: Order[] = [];
const contactSubmissions: any[] = [];

// Simulate database operations with delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const db = {
  // Product operations
  async getProducts(filters?: any, sortBy?: string, page = 1, limit = 10) {
    await delay(300);
    let filtered = [...products];

    // Apply filters
    if (filters?.categories?.length) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category),
      );
    }
    if (filters?.brands?.length) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters?.priceRange) {
      filtered = filtered.filter(
        (p) =>
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
      );
    }
    if (filters?.minRating) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }
    if (filters?.onSale) {
      filtered = filtered.filter((p) => p.isSale);
    }
    if (filters?.newItems) {
      filtered = filtered.filter((p) => p.isNew);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.category.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search),
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedProducts,
      pagination: {
        page,
        totalPages: Math.ceil(filtered.length / limit),
        totalItems: filtered.length,
        itemsPerPage: limit,
      },
    };
  },

  async getProductById(id: string) {
    await delay(200);
    return products.find((p) => p.id === id);
  },

  async getFeaturedProducts(limit = 8) {
    await delay(250);
    return products.slice(0, limit);
  },

  // Category operations
  async getCategories() {
    await delay(200);
    return categories;
  },

  async getCategoryById(id: string) {
    await delay(150);
    return categories.find((c) => c.id === id);
  },

  // User operations
  async getUserByEmail(email: string) {
    await delay(200);
    return users.find((u) => u.email === email);
  },

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
    await delay(300);
    const user: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(user);
    return user;
  },

  // Order operations
  async createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) {
    await delay(400);
    const order: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    orders.push(order);
    return order;
  },

  async getUserOrders(userId: string) {
    await delay(250);
    return orders.filter((o) => o.userId === userId);
  },

  // Contact operations
  async submitContactForm(formData: ContactForm) {
    await delay(500);
    contactSubmissions.push({
      ...formData,
    });
    return true;
  },
};
