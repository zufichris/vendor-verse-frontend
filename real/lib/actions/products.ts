"use server";

import type { Product, Category, Brand, Banner } from "@/lib/types";

const mockProducts: Product[] = [
  // Fashion Items
  {
    id: "1",
    name: "Minimalist Cotton Shirt",
    description:
      "A premium minimalist cotton shirt perfect for any occasion. Made from 100% organic cotton for maximum comfort and breathability.",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604695573706-53170668f6a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    brand: "EcoWear",
    rating: 4.5,
    reviews: 50,
    inStock: true,
    stockCount: 100,
    isNew: true,
    isSale: false,
    tags: ["cotton", "minimalist", "shirt"],
    colors: ["White", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Classic Denim Jeans",
    description:
      "Classic straight-leg denim jeans with a comfortable fit. Made from premium denim with just the right amount of stretch.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    brand: "DenimCo",
    rating: 4.2,
    reviews: 40,
    inStock: true,
    stockCount: 80,
    isNew: false,
    isSale: false,
    tags: ["denim", "jeans", "classic"],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["30", "32", "34", "36", "38"],
  },

  // Electronics
  {
    id: "3",
    name: "Premium Wireless Headphones",
    description:
      "Premium wireless headphones with active noise cancellation and superior sound quality. 30-hour battery life with quick charge.",
    price: 299.99,
    image:
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww",
    ],
    category: "Electronics",
    brand: "AudioTech",
    rating: 4.8,
    reviews: 120,
    inStock: true,
    stockCount: 45,
    isNew: true,
    isSale: false,
    tags: ["headphones", "wireless", "noise-cancelling"],
    colors: ["Black", "White", "Silver"],
  },
  {
    id: "4",
    name: "MacBook Pro 16-inch",
    description:
      "Powerful laptop with M2 chip, perfect for professionals and creatives. Features stunning Retina display and all-day battery life.",
    price: 2499.99,
    image:
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Electronics",
    brand: "Apple",
    rating: 4.9,
    reviews: 200,
    inStock: true,
    stockCount: 15,
    isNew: true,
    isSale: false,
    tags: ["laptop", "macbook", "professional"],
    colors: ["Space Gray", "Silver"],
  },
  {
    id: "5",
    name: "Wireless Gaming Mouse",
    description:
      "High-precision wireless gaming mouse with customizable RGB lighting and ultra-responsive sensors for competitive gaming.",
    price: 89.99,
    image:
      "https://media.istockphoto.com/id/1265205636/photo/wireless-mouse-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=5geDCp-1H75VjSMKV8TTY3r2AgOY0wq26Y8EEKg2udE=",
    images: [
      "https://media.istockphoto.com/id/1265205636/photo/wireless-mouse-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=5geDCp-1H75VjSMKV8TTY3r2AgOY0wq26Y8EEKg2udE=",
      "https://images.unsplash.com/photo-1563297007-0686b7003af7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Electronics",
    brand: "GameTech",
    rating: 4.6,
    reviews: 85,
    inStock: true,
    stockCount: 30,
    isNew: false,
    isSale: true,
    tags: ["gaming", "mouse", "wireless"],
    colors: ["Black", "White"],
  },

  // Home & Living
  {
    id: "6",
    name: "Modern Floor Lamp",
    description:
      "Contemporary floor lamp with adjustable brightness and sleek design. Perfect for reading corners and ambient lighting.",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Home",
    brand: "ModernLiving",
    rating: 4.4,
    reviews: 65,
    inStock: true,
    stockCount: 25,
    isNew: false,
    isSale: false,
    tags: ["lamp", "lighting", "modern"],
    colors: ["Black", "White", "Brass"],
  },
  {
    id: "7",
    name: "Cozy Living Room Sofa",
    description:
      "Comfortable 3-seater sofa with premium fabric upholstery. Perfect centerpiece for your living room with excellent support.",
    price: 899.99,
    image:
      "https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    images: [
      "https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Home",
    brand: "ComfortHome",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    stockCount: 8,
    isNew: true,
    isSale: false,
    tags: ["sofa", "furniture", "living-room"],
    colors: ["Gray", "Beige", "Navy"],
  },
  {
    id: "8",
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 4 handcrafted ceramic coffee mugs with unique glazed finish. Perfect for your morning coffee ritual.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1533776992670-a72f4c28235e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww",
    images: [
      "https://images.unsplash.com/photo-1533776992670-a72f4c28235e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlJTIwbXVnfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Home",
    brand: "CeramicCraft",
    rating: 4.3,
    reviews: 42,
    inStock: true,
    stockCount: 60,
    isNew: false,
    isSale: true,
    tags: ["mug", "ceramic", "coffee"],
    colors: ["White", "Blue", "Green", "Brown"],
  },
  {
    id: "9",
    name: "Decorative Plant Pot",
    description:
      "Beautiful ceramic plant pot with drainage holes. Perfect for indoor plants and adds natural beauty to any space.",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1463154545680-d59320fd685d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Home",
    brand: "GreenThumb",
    rating: 4.5,
    reviews: 38,
    inStock: true,
    stockCount: 75,
    isNew: false,
    isSale: false,
    tags: ["plant", "pot", "decoration"],
    colors: ["Terracotta", "White", "Black", "Gray"],
  },

  // Anime & Collectibles
  {
    id: "10",
    name: "Anime Shirt",
    description:
      "High-quality collectible figure of Goku in Super Saiyan form. Detailed craftsmanship with articulated joints and authentic design.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1654013439359-01dd145c3f58?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1654013439359-01dd145c3f58?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1660900506164-9efffc7a4245?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5pbWUlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Anime",
    brand: "FigureArt",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    stockCount: 20,
    isNew: true,
    isSale: false,
    tags: ["anime", "figure", "dragon-ball", "collectible"],
  },
  {
    id: "11",
    name: "Naruto Kakashi Poster Set",
    description:
      "Premium quality poster set featuring iconic Naruto characters. Perfect for decorating your room or office space.",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Anime",
    brand: "PosterPro",
    rating: 4.4,
    reviews: 73,
    inStock: true,
    stockCount: 150,
    isNew: false,
    isSale: true,
    tags: ["anime", "poster", "naruto", "wall-art"],
  },
  {
    id: "12",
    name: "Attack on Titan Keychain",
    description:
      "Metal keychain featuring the Survey Corps emblem from Attack on Titan. Durable construction with detailed engraving.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Anime",
    brand: "AnimeGear",
    rating: 4.2,
    reviews: 28,
    inStock: true,
    stockCount: 200,
    isNew: false,
    isSale: false,
    tags: ["anime", "keychain", "attack-on-titan", "accessory"],
  },

  // Additional Fashion Items
  {
    id: "13",
    name: "Urban Sneakers",
    description:
      "Modern urban sneakers with cushioned sole and breathable fabric. Perfect for casual wear and light exercise.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    brand: "UrbanStyle",
    rating: 4.6,
    reviews: 94,
    inStock: true,
    stockCount: 40,
    isNew: true,
    isSale: false,
    tags: ["sneakers", "urban", "shoes"],
    colors: ["Black", "White", "Gray", "Blue"],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: "14",
    name: "Designer Watch",
    description:
      "Elegant designer watch with stainless steel case and leather strap. Features precise quartz movement and water resistance.",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    brand: "TimeCraft",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    stockCount: 35,
    isNew: false,
    isSale: true,
    tags: ["watch", "designer", "accessories"],
    colors: ["Black/Silver", "Brown/Gold", "Blue/Silver"],
  },
  {
    id: "15",
    name: "Leather Weekender Bag",
    description:
      "Premium leather weekender bag perfect for short trips. Features spacious interior and durable construction.",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    category: "Fashion",
    brand: "LeatherCraft",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    stockCount: 22,
    isNew: false,
    isSale: false,
    tags: ["bag", "leather", "weekender"],
    colors: ["Brown", "Black", "Tan"],
  },
];

const mockBrands: Brand[] = [
  {
    id: "audiotech",
    name: "AudioTech",
    logo: "/placeholder.svg",
    productCount: 45,
  },
  {
    id: "ecowear",
    name: "EcoWear",
    logo: "/placeholder.svg",
    productCount: 78,
  },
  {
    id: "fittech",
    name: "FitTech",
    logo: "/placeholder.svg",
    productCount: 23,
  },
  {
    id: "leathercraft",
    name: "LeatherCraft",
    logo: "/placeholder.svg",
    productCount: 34,
  },
  {
    id: "chargetech",
    name: "ChargeTech",
    logo: "/placeholder.svg",
    productCount: 19,
  },
  {
    id: "runfast",
    name: "RunFast",
    logo: "/placeholder.svg",
    productCount: 56,
  },
];

const mockedBanners: Banner[] = [
  {
    id: 4,
    title: "Summer Collection",
    subtitle: "New Arrivals",
    description:
      "Discover our latest summer styles with premium fabrics and minimalist designs.",
    cta: "Shop Now",
    link: "/shop",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 1,
    title: "Hard Anime Shirts",
    subtitle: "Anime Shirts that go hard",
    description: "Anime shirts from Naruto, Demon Slayer, One Piece, Bleach",
    cta: "Explore",
    link: "/shop",
    image:
      "https://images.unsplash.com/photo-1736892740703-92cc9088f2a7?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Premium Electronics",
    subtitle: "Technology meets elegance",
    description:
      "Experience cutting-edge technology with our curated selection of premium electronics and gadgets.",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
    cta: "Explore",
    link: "/products?category=electronics",
  },
  {
    id: 3,
    title: "Home & Living",
    subtitle: "Transform your space",
    description:
      "Create the perfect ambiance with our exclusive home decor and living essentials collection.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    cta: "Discover",
    link: "/products?category=home",
  },
  {
    id: 5,
    title: "Fashion",
    subtitle: "Premium Quality",
    description: "Elevate your style",
    cta: "Explore",
    link: "/shop?category=fashion",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  categories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onSale?: boolean;
  isNew?: boolean;
}

export async function getProducts(params: GetProductsParams = {}) {
  const {
    page = 1,
    limit = 12,
    search = "",
    sort = "featured",
    categories = [],
    brands = [],
    minPrice = 0,
    maxPrice = 1000,
    minRating = 0,
    onSale = false,
    isNew = false,
  } = params;

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  // Apply filters
  if (search) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        ),
    );
  }

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      categories.some(
        (cat) => product.category.toLowerCase() === cat.toLowerCase(),
      ),
    );
  }

  if (brands.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      brands.some(
        (brand) => product.brand.toLowerCase() === brand.toLowerCase(),
      ),
    );
  }

  if (minPrice > 0 || maxPrice < 1000) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
  }

  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= minRating,
    );
  }

  if (onSale) {
    filteredProducts = filteredProducts.filter((product) => product.isSale);
  }

  if (isNew) {
    filteredProducts = filteredProducts.filter((product) => product.isNew);
  }

  // Apply sorting
  switch (sort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "popular":
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      // Featured - keep original order
      break;
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(filteredProducts.length / limit),
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const product = mockProducts.find((p) => p.id === id);
  return product || null;
}

export async function getCategories(): Promise<Category[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockedBanners.map((v) => ({
    id: v.id.toString(),
    image: v.image,
    name: v.title,
    productCount: v.id * 20,
    slug: v.title.split(" ").join("-"),
  }));
}

export async function getBanners() {
  return mockedBanners;
}

export async function getBrands(): Promise<Brand[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockBrands;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return a mix of new and sale products
  const featured = mockProducts
    .filter(
      (product) => product.isNew || product.isSale || product.rating >= 4.5,
    )
    .slice(0, limit);

  return featured;
}

export async function getRelatedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const currentProduct = mockProducts.find((p) => p.id === productId);
  if (!currentProduct) return [];

  // Find products in the same category, excluding the current product
  const related = mockProducts
    .filter(
      (product) =>
        product.id !== productId &&
        product.category === currentProduct.category,
    )
    .slice(0, limit);

  return related;
}
