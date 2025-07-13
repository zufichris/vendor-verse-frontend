export default function ShopLoading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Skeleton */}
                <main className="flex-1">
                    <div className="space-y-6">
                        {/* Header Skeleton */}
                        <div className="flex justify-between items-center">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-48" />
                            <div className="flex gap-4">
                                <div className="h-10 bg-gray-100 rounded animate-pulse w-48" />
                                <div className="h-10 bg-gray-100 rounded animate-pulse w-20" />
                            </div>
                        </div>

                        {/* Products Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(9)].map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>

                        {/* Pagination Skeleton */}
                        <div className="flex justify-center">
                            <div className="flex gap-2">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-10 w-10 bg-gray-100 rounded animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ProductCardSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-4">
            {/* Image Skeleton */}
            <div className="aspect-square bg-gray-200 rounded animate-pulse" />

            {/* Content Skeleton */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>

            {/* Button Skeleton */}
            <div className="h-10 bg-gray-100 rounded animate-pulse" />
        </div>
    );
}
