"use client";

import { useState, useEffect } from "react";
import { Search, X, TrendingUp, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { Api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TRENDING_SEARCHES = ["Cotton Shirt", "Plant Pot", "Sofa", "Coffee Mug"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 400);
    const [results, setResults] = useState<Product[]>([]);
    const [recents, setRecents] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const stored = JSON.parse(localStorage.getItem("recents") || "[]");
                if (Array.isArray(stored)) setRecents(stored);
            } catch { }
        }
    }, []);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        async function fetchResults() {
            setLoading(true);
            if (!debouncedQuery) {
                setResults([]);
                setLoading(false);
                return;
            }
            const res = await Api.get<Product[]>(
                `/products/search?query=${debouncedQuery}`,
            );
            if (res.success) setResults(res.data || []);
            setLoading(false);
        }
        fetchResults();
    }, [debouncedQuery]);

    const handleSelectTerm = (term: string) => {
        setSearchQuery(term);
    };

    const handleSelectProduct = (product: Product) => {
        const updated = [
            ...recents
                .filter((x) => x.toLowerCase() !== product.name.toLowerCase())
                .slice(-4),
            product.name,
        ];
        localStorage.setItem("recents", JSON.stringify(updated));
        setRecents(updated);
        onClose();
        router.push(`/products/${product.slug}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="mx-auto px-4 pt-20">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl mx-auto animate-slide-up">
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
                            {loading ? (
                                <Loader className="h-5 w-5 animate-spin" />
                            ) : (
                                <X className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {debouncedQuery ? (
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-4">
                                    {results.length} results for "{debouncedQuery}"
                                </div>
                                <div className="space-y-3">
                                    {results.map((product) => (
                                        <button
                                            key={product.id}
                                            className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
                                            onClick={() => handleSelectProduct(product)}
                                        >
                                            <Image
                                                src={product.thumbnail.url || "/placeholder.svg"}
                                                alt={product.name}
                                                width={48}
                                                height={48}
                                                className="rounded-md mr-3"
                                            />
                                            <div className="flex-1 items-start flex flex-col">
                                                <h4 className="font-medium text-gray-900">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 line-clamp-1">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <span className="font-medium text-black">
                                                ${product.price}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t">
                                    <Link
                                        href={`/products?search=${encodeURIComponent(debouncedQuery)}`}
                                        className="text-black font-medium hover:underline"
                                        onClick={onClose}
                                    >
                                        View all results for "{debouncedQuery}"
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex items-center mb-3">
                                        <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                                        <span className="text-sm font-medium text-gray-700">
                                            Trending
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {TRENDING_SEARCHES.map((term) => (
                                            <Badge
                                                key={term}
                                                variant="secondary"
                                                className="cursor-pointer hover:bg-gray-200"
                                                onClick={() => handleSelectTerm(term)}
                                            >
                                                {term}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {recents.length > 0 && (
                                    <div>
                                        <span className="text-sm font-medium text-gray-700 mb-3 block">
                                            Recent Searches
                                        </span>
                                        <div className="space-y-2">
                                            {recents.map((term) => (
                                                <button
                                                    key={term}
                                                    className="block w-full text-left p-2 hover:bg-gray-50 rounded text-gray-600"
                                                    onClick={() => handleSelectTerm(term)}
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
