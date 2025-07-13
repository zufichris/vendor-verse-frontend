export default function FiltersLoading() {
    return (
        <div className="space-y-6">
            <div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-10 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 bg-gray-100 rounded animate-pulse flex-1" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200 mb-6" />

                <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                    <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center space-x-2">
                                <div className="h-4 w-4 bg-gray-100 rounded animate-pulse" />
                                <div className="h-3 bg-gray-100 rounded animate-pulse flex-1" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gray-200 mb-6" />

                {/* Price Range Section Skeleton */}
                <div className="space-y-3 mb-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                    <div className="space-y-2">
                        <div className="h-10 bg-gray-100 rounded animate-pulse" />
                        <div className="h-10 bg-gray-100 rounded animate-pulse" />
                    </div>
                </div>

                {/* Separator */}
                <div className="h-px bg-gray-200 mb-6" />

                {/* Clear Filters Button Skeleton */}
                <div className="h-10 bg-gray-100 rounded animate-pulse" />
            </div>
        </div>
    );
}
