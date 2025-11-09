import Link from "next/link";
import { ChevronDown } from "lucide-react";
import React from "react";

export function DesktopNav() {
    const productCategories = [
        { href: "/shop?category=leggins", title: "Leggings" },
        { href: "/shop?category=jumpsuits", title: "Jumpsuits" },
        { href: "/shop?category=jackets", title: "Jackets" },
        { href: "/shop?category=bras", title: "Bras" }
    ];

    const companyLinks = [
        { href: "/about", title: "About Us" },
        { href: "/contact", title: "Contact" },
        { href: "/blogs", title: "Blogs" },
    ];

    return (
        <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
                <Link
                    href="/shop"
                    className="text-white hovertext-black transition-colors flex items-center"
                >
                    Shop
                    <ChevronDown className="h-4 w-4 ml-1" />
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                                href="/shop"
                                className="block px-3 py-2 text-sm font-medium text-black hover:bg-gray-50 rounded"
                            >
                                Browse Products→
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Link
                href="/categories"
                className="textgray-700 hovertext-black transition-colors"
            >
                Categories
            </Link>

            <div className="relative group">
                <span className="textgray-700 hovertext-black transition-colors cursor-pointer flex items-center">
                    Company
                    <ChevronDown className="h-4 w-4 ml-1" />
                </span>
                <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
