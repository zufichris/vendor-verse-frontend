import Link from "next/link";
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
                    href="/shop?category=leggins"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Leggings
                </Link>
                <Link
                    href="/shop?category=bras"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Bras
                </Link>
                <Link
                    href="/shop?category=jumpsuits"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Jumpsuits
                </Link>
                <Link
                    href="/shop?category=jackets"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    Jackets
                </Link>
                <Link
                    href="/about"
                    className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                    About Us
                </Link>
            </nav>
        </div>
    );
}
