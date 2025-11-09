"use client";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/stores/cart";
import { useAuthStore } from "@/lib/stores/auth";
import { useEffect } from "react";

interface HeaderActionsProps {
    onSearchOpen: () => void;
    isMobileMenuOpen: boolean;
    onMobileMenuToggle: () => void;
}

export function HeaderActions({
    onSearchOpen,
    isMobileMenuOpen,
    onMobileMenuToggle,
}: HeaderActionsProps) {
    const { totalItems, initCart } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    useEffect(() => {
        initCart();
    }, [initCart]);
    return (
        <div className="flex items-center space-x-4">
            {/* <Button
                variant="ghost"
                size="icon"
                onClick={onSearchOpen}
                className="hidden sm:flex"
            >
                <Search className="h-5 w-5" />
            </Button> */}

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

            <Link href={isAuthenticated && user ? "/account" : "/auth"}>
                <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                </Button>
            </Link>

            <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={onMobileMenuToggle}
            >
                {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
