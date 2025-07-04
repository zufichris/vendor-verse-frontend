"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import SearchModal from "../shared/search-modal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-4 mb-3">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-black">
              VendorVerse
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-black transition-colors flex items-center"
                >
                  Products
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 space-y-2">
                    <Link
                      href="/products?category=electronics"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Electronics
                    </Link>
                    <Link
                      href="/products?category=fashion"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Fashion & Clothing
                    </Link>
                    <Link
                      href="/products?category=home"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Home & Living
                    </Link>
                    <Link
                      href="/products?category=sports"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Sports & Fitness
                    </Link>
                    <Link
                      href="/products?category=accessories"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Accessories
                    </Link>
                    <div className="border-t pt-2 mt-2">
                      <Link
                        href="/products"
                        className="block px-3 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/categories"
                className="text-gray-700 hover:text-black transition-colors"
              >
                Categories
              </Link>

              <div className="relative group">
                <span className="text-gray-700 hover:text-black transition-colors cursor-pointer flex items-center">
                  Company
                  <ChevronDown className="h-4 w-4 ml-1" />
                </span>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 space-y-1">
                    <Link
                      href="/about"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link href={user ? "/account" : "/auth/login"}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t animate-fade-in">
              <nav className="flex flex-col space-y-4 p-4">
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  All Products
                </Link>
                <Link
                  href="/categories"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  Contact
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                  className="justify-start"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
