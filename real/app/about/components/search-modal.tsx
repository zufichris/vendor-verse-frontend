"use client";

import { useState, useEffect } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = [
  "Wireless Headphones",
  "Smart Watch",
  "Coffee Maker",
  "Yoga Mat",
  "Laptop Stand",
];

const recentSearches = [
  "Premium Headphones",
  "Minimalist Watch",
  "Organic T-Shirt",
];

const searchResults = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    image: "/placeholder.svg?height=60&width=60",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Minimalist Watch Collection",
    price: 199,
    image: "/placeholder.svg?height=60&width=60",
    category: "Accessories",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 49,
    image: "/placeholder.svg?height=60&width=60",
    category: "Clothing",
  },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setShowResults(searchQuery.length > 0);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="  mx-auto px-4 pt-20">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl mx-auto animate-slide-up">
          {/* Search Header */}
          <div className="flex items-center p-6 border-b">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {!showResults ? (
              <div className="p-6">
                {/* Trending Searches */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Trending
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <Badge
                        key={term}
                        variant="secondary"
                        className="cursor-pointer hover:bg-gray-200"
                        onClick={() => setSearchQuery(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700 mb-3 block">
                      Recent Searches
                    </span>
                    <div className="space-y-2">
                      {recentSearches.map((term) => (
                        <button
                          key={term}
                          className="block w-full text-left p-2 hover:bg-gray-50 rounded text-gray-600"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-4">
                  {searchResults.length} results for "{searchQuery}"
                </div>
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="rounded-md mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                      <span className="font-medium text-black">
                        ${product.price}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                    className="text-black font-medium hover:underline"
                    onClick={onClose}
                  >
                    View all results for "{searchQuery}"
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
