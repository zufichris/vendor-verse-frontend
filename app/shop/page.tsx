import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/types/product";
import { Api, QueryResponse } from "@/utils/api";
import Link from "next/link";
import { ViewModeToggle, ShopPagination } from "./components";

interface ShopPageProps {
    searchParams: Promise<{
        page?: string;
        category?: string;
        brand?: string;
        min_price?: string;
        max_price?: string;
        sort?: string;
        view_mode?: string;
        search?: string;
        limit?: number;
    }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams;

    const { view_mode = "grid", sort } = params;

    const currentPage = Number(params.page) || 1;
    const limit = Number(params.limit) || 100;
    const viewMode = view_mode === "list" ? "list" : "grid";

    const res = await Api.get<QueryResponse<Product>>(
        `/products/shop?${new URLSearchParams({ ...params, limit: limit.toString(), page: currentPage.toString() } as Record<string, string>).toString()}`,
    );

    if (!res.success) {
        return (
            <div className="text-center py-12">
                <div className="mb-4 text-red-600">Failed to load products</div>
                <Link href="/shop">
                    <Button variant="outline">Try Again</Button>
                </Link>
            </div>
        );
    }

    const { data, totalCount, totalPages, hasNextPage, hasPreviousPage } =
        res.data!;

    if (!data?.length) {
        return (
            <div className="text-center py-12">
                <div className="mb-4">No products found</div>
                <Link href="/shop">
                    <Button variant="outline">Clear Filters</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with results count and controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                    Showing {(currentPage - 1) * limit + 1}-
                    {Math.min(currentPage * 12, totalCount)} of {totalCount} products
                </div>
                <div className="flex items-center gap-4">
                    <SortSelect currentSort={sort} />
                    <ViewModeToggle currentMode={viewMode} />
                </div>
            </div>

            {/* Products */}
            <div
                className={
                    viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-4"
                }
            >
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} showQuickView />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <ShopPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                    />
                </div>
            )}
        </div>
    );
}

function SortSelect({ currentSort }: { currentSort?: string }) {
    return (
        <form>
            <Select name="sort" defaultValue={currentSort || "featured"}>
                <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="name_asc">Name: A to Z</SelectItem>
                    <SelectItem value="name_desc">Name: Z to A</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
            </Select>
        </form>
    );
}
