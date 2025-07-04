"use client";

import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Send,
  ThumbsUp,
  ThumbsDown,
  Flag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { getProductById } from "@/lib/actions/products";
import type { Product } from "@/lib/types";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
}

const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Absolutely amazing sound quality!",
    comment:
      "The noise cancellation is incredible and the battery life is exactly as advertised. I've been using these for work calls and music, and they're perfect for both. The comfort level is outstanding even after hours of use.",
    date: "2024-01-15",
    verified: true,
    helpful: 24,
    notHelpful: 2,
    images: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  },
  {
    id: "2",
    userId: "user2",
    userName: "Mike Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Great headphones with minor issues",
    comment:
      "Overall very satisfied with the purchase. The sound quality is excellent and the build feels premium. Only minor complaint is they can get a bit warm after extended use, but that's pretty common with over-ear headphones.",
    date: "2024-01-10",
    verified: true,
    helpful: 18,
    notHelpful: 1,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Emily Davis",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Best purchase I've made this year!",
    comment:
      "The build quality is exceptional and the sound is crystal clear. Love the quick charge feature and the carrying case is a nice touch. Highly recommend for anyone looking for premium headphones.",
    date: "2024-01-08",
    verified: true,
    helpful: 31,
    notHelpful: 0,
  },
  {
    id: "4",
    userId: "user4",
    userName: "Alex Rodriguez",
    rating: 3,
    title: "Good but not great",
    comment:
      "They're decent headphones but I expected more for the price. The noise cancellation works well but the sound profile is a bit too bass-heavy for my taste. Customer service was helpful though.",
    date: "2024-01-05",
    verified: false,
    helpful: 8,
    notHelpful: 5,
  },
];

export function ProductDetails({ product }: { product: Product }) {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    images: [] as string[],
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [sortReviews, setSortReviews] = useState("newest");
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!user || !newReview.title.trim() || !newReview.comment.trim()) return;

    setIsSubmittingReview(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const review: Review = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      helpful: 0,
      notHelpful: 0,
      images: newReview.images,
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 5, title: "", comment: "", images: [] });
    setIsSubmittingReview(false);
  };

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    setReviews((prev) =>
      prev.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
          };
        }
        return review;
      }),
    );
  };

  const filteredReviews = reviews.filter((review) => {
    if (reviewFilter === "all") return true;
    if (reviewFilter === "verified") return review.verified;
    if (reviewFilter === "5") return review.rating === 5;
    if (reviewFilter === "4") return review.rating === 4;
    if (reviewFilter === "3") return review.rating === 3;
    if (reviewFilter === "2") return review.rating === 2;
    if (reviewFilter === "1") return review.rating === 1;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortReviews === "newest")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortReviews === "oldest")
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortReviews === "highest") return b.rating - a.rating;
    if (sortReviews === "lowest") return a.rating - b.rating;
    if (sortReviews === "helpful") return b.helpful - a.helpful;
    return 0;
  });

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) *
      100,
  }));

  if (!product) {
    return (
      <div
        className="min-h-screen pt-20"
        style={{ backgroundColor: "rgb(255, 255, 255)" }}
      >
        <div className="  mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div
      className="min-h-screen pt-20"
      style={{ backgroundColor: "rgb(255, 255, 255)" }}
    >
      <div className="  mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div
          className="flex items-center space-x-2 text-sm mb-8"
          style={{ color: "rgb(107, 114, 128)" }}
        >
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category.toLowerCase()}`}
            className="hover:text-black"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: "rgb(17, 24, 39)" }}>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              className="aspect-square  relative overflow-hidden rounded-lg h-[57vh] w-full"
              style={{ backgroundColor: "rgb(249, 250, 251)" }}
            >
              <Image
                src={
                  allImages[selectedImage] ||
                  "/placeholder.svg?height=600&width=600"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.originalPrice && (
                <Badge
                  className="absolute top-4 left-4 text-white"
                  style={{ backgroundColor: "rgb(239, 68, 68)" }}
                >
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg?height=150&width=150"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                <span
                  className="text-sm"
                  style={{ color: "rgb(107, 114, 128)" }}
                >
                  SKU: {product.id.toUpperCase()}
                </span>
              </div>

              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: "rgb(17, 24, 39)" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="font-medium ml-2">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span style={{ color: "rgb(107, 114, 128)" }}>
                  ({reviews.length} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "rgb(17, 24, 39)" }}
                >
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span
                    className="text-xl line-through"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p
                className="leading-relaxed mb-6"
                style={{ color: "rgb(75, 85, 99)" }}
              >
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
              />
              <span
                className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}
              >
                {product.inStock
                  ? `In Stock (${product.stockCount} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.min(product.stockCount, quantity + 1))
                    }
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 hover:bg-gray-800"
                  style={{ backgroundColor: "rgb(17, 24, 39)" }}
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="px-6"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck
                  className="h-5 w-5"
                  style={{ color: "rgb(107, 114, 128)" }}
                />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p
                    className="text-xs"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    Orders over $100
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Shield
                  className="h-5 w-5"
                  style={{ color: "rgb(107, 114, 128)" }}
                />
                <div>
                  <p className="font-medium text-sm">2 Year Warranty</p>
                  <p
                    className="text-xs"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    Full coverage
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw
                  className="h-5 w-5"
                  style={{ color: "rgb(107, 114, 128)" }}
                />
                <div>
                  <p className="font-medium text-sm">30-Day Returns</p>
                  <p
                    className="text-xs"
                    style={{ color: "rgb(107, 114, 128)" }}
                  >
                    No questions asked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p
                      className="leading-relaxed mb-4"
                      style={{ color: "rgb(75, 85, 99)" }}
                    >
                      {product.description}
                    </p>
                    <p
                      className="leading-relaxed mb-4"
                      style={{ color: "rgb(75, 85, 99)" }}
                    >
                      Our premium products represent the pinnacle of
                      engineering, combining cutting-edge technology with
                      luxurious materials to deliver an unparalleled experience.
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{ color: "rgb(75, 85, 99)" }}
                    >
                      Whether you're at home, work, or on the go, this product
                      provides the perfect balance of functionality, style, and
                      exceptional quality.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span
                        className="font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        Brand
                      </span>
                      <span style={{ color: "rgb(75, 85, 99)" }}>
                        {product.brand}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span
                        className="font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        Category
                      </span>
                      <span style={{ color: "rgb(75, 85, 99)" }}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span
                        className="font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        Weight
                      </span>
                      <span style={{ color: "rgb(75, 85, 99)" }}>
                        {product.weight || "N/A"} lbs
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span
                        className="font-medium"
                        style={{ color: "rgb(17, 24, 39)" }}
                      >
                        Dimensions
                      </span>
                      <span style={{ color: "rgb(75, 85, 99)" }}>
                        {product.dimensions
                          ? `${product.dimensions.length}" x ${product.dimensions.width}" x ${product.dimensions.height}"`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {/* Review Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div
                          className="text-5xl font-bold mb-2"
                          style={{ color: "rgb(17, 24, 39)" }}
                        >
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(averageRating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "rgb(107, 114, 128)" }}
                        >
                          {reviews.length} reviews
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                          <div
                            key={item.rating}
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm w-8">{item.rating}★</span>
                            <div
                              className="flex-1 rounded-full h-2"
                              style={{ backgroundColor: "rgb(229, 231, 235)" }}
                            >
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  backgroundColor: "rgb(251, 191, 36)",
                                  width: `${item.percentage}%`,
                                }}
                              />
                            </div>
                            <span
                              className="text-sm w-8"
                              style={{ color: "rgb(107, 114, 128)" }}
                            >
                              {item.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Write a Review */}
                {user && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Write a Review
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Rating</Label>
                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() =>
                                  setNewReview((prev) => ({ ...prev, rating }))
                                }
                                className="p-1"
                              >
                                <Star
                                  className={`h-6 w-6 transition-colors ${
                                    rating <= newReview.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 hover:text-yellow-400"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="reviewTitle">Review Title</Label>
                          <Input
                            id="reviewTitle"
                            value={newReview.title}
                            onChange={(e) =>
                              setNewReview((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            placeholder="Summarize your experience"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="reviewComment">Your Review</Label>
                          <Textarea
                            id="reviewComment"
                            value={newReview.comment}
                            onChange={(e) =>
                              setNewReview((prev) => ({
                                ...prev,
                                comment: e.target.value,
                              }))
                            }
                            placeholder="Share your thoughts about this product..."
                            rows={4}
                            className="mt-1"
                          />
                        </div>

                        <Button
                          onClick={handleSubmitReview}
                          disabled={
                            isSubmittingReview ||
                            !newReview.title.trim() ||
                            !newReview.comment.trim()
                          }
                          className="hover:bg-gray-800"
                          style={{ backgroundColor: "rgb(17, 24, 39)" }}
                        >
                          {isSubmittingReview ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Submit Review
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Review Filters */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Filter:</span>
                    <select
                      value={reviewFilter}
                      onChange={(e) => setReviewFilter(e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="all">All Reviews</option>
                      <option value="verified">Verified Only</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Sort:</span>
                    <select
                      value={sortReviews}
                      onChange={(e) => setSortReviews(e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {sortedReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage
                              src={review.userAvatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">
                                    {review.userName}
                                  </span>
                                  {review.verified && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span
                                    className="text-sm"
                                    style={{ color: "rgb(107, 114, 128)" }}
                                  >
                                    {review.date}
                                  </span>
                                </div>
                              </div>

                              <Button variant="ghost" size="sm">
                                <Flag className="h-4 w-4" />
                              </Button>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">
                                {review.title}
                              </h4>
                              <p
                                className="leading-relaxed"
                                style={{ color: "rgb(75, 85, 99)" }}
                              >
                                {review.comment}
                              </p>
                            </div>

                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2">
                                {review.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image || "/placeholder.svg"}
                                    alt={`Review image ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover cursor-pointer hover:opacity-80"
                                  />
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-4 pt-2">
                              <button
                                onClick={() =>
                                  handleHelpfulVote(review.id, true)
                                }
                                className="flex items-center gap-1 text-sm hover:text-green-600 transition-colors"
                                style={{ color: "rgb(107, 114, 128)" }}
                              >
                                <ThumbsUp className="h-4 w-4" />
                                Helpful ({review.helpful})
                              </button>

                              <button
                                onClick={() =>
                                  handleHelpfulVote(review.id, false)
                                }
                                className="flex items-center gap-1 text-sm hover:text-red-600 transition-colors"
                                style={{ color: "rgb(107, 114, 128)" }}
                              >
                                <ThumbsDown className="h-4 w-4" />
                                Not Helpful ({review.notHelpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {sortedReviews.length === 0 && (
                  <div className="text-center py-8">
                    <p style={{ color: "rgb(107, 114, 128)" }}>
                      No reviews match your current filters.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
