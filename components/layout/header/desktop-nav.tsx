// components/layout/header/desktop-nav.tsx
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import React from "react";

// You can define your menu structure here or pass it as a prop
// type MenuItem = {
//     href: string;
//     title: string;
//     subMenu?: MenuItem[];
// };

export function DesktopNav() {
    // This could also be passed as a prop if your menu is dynamic
    const productCategories = [
        { href: "/products?category=electronics", title: "Electronics" },
        { href: "/products?category=fashion", title: "Fashion & Clothing" },
        { href: "/products?category=home", title: "Home & Living" },
        { href: "/products?category=sports", title: "Sports & Fitness" },
        { href: "/products?category=accessories", title: "Accessories" },
    ];

    const companyLinks = [
        { href: "/about", title: "About Us" },
        { href: "/contact", title: "Contact" },
    ];

    return (
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
                        {productCategories.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                            >
                                {item.title}
                            </Link>
                        ))}
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
                        {companyLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
