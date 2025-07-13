import { Skeleton } from "@/components/ui/skeleton";

export default function() {
    return (
        <section className="py-16">
            <div className="  mx-auto px-4">
                <div className="text-center mb-12">
                    <Skeleton className="h-8 rounded w-64 mx-auto mb-4 animate-pulse" />
                    <Skeleton className="h-4 rounded w-96 mx-auto animate-pulse" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="bg-white rounded-lg p-4 animate-pulse">
                            <Skeleton className="aspect-square bg-gray-200 rounded mb-4" />
                            <Skeleton className="h-4 bg-gray-200 rounded mb-2" />
                            <Skeleton className="h-4 bg-gray-200 rounded w-3/4" />
                        </Skeleton>
                    ))}
                </div>
            </div>
        </section>
    );
}
