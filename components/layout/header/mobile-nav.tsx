import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface MobileNavProps {
    onSearchOpen: () => void;
}

export function MobileNav({ onSearchOpen }: MobileNavProps) {
    return (
        <div className="md:hidden bg-white border-t animate-fade-in">
            <nav className="flex flex-col space-y-4 p-4">
                <Link
                    href="/shop"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Browse Products
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
                <Link
                    href="/blogs"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Blogs
                </Link>
            </nav>
        </div>
    );
}
